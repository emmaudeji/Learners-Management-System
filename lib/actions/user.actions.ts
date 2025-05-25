"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/actions/config";
import { Query, ID } from "node-appwrite";
import { cookies } from "next/headers";
import { avatarPlaceholderUrl, urls } from "@/constants/admin";
import { redirect } from "next/navigation";
import {  User,   } from "@/types";
import { parseStringify } from "../utils";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])],
  );
  return result.total > 0 ? result.documents[0] : null;
};


export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    // console.log({session})
    return  { sessionId: session.$id };
  } catch (error) {
return { sessionId: null, error: "Failed to verify OTP. Check your network and try again" };
  }
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);
    // console.log({session})

    return session.userId;
  } catch (error) {
    console.log({error})
    throw error
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}): Promise<{ success: boolean;  accountId?: string; error?: string }> => {
  try {
    const existingUser = await getUserByEmail(email);
 
    const userId = await sendEmailOTP({ email });

    if (!userId) {
      return { success: false, error: "Failed to send an OTP. Check your network and try again" };
    }

    if (!existingUser) {
      const { databases } = await createAdminClient();

     await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        ID.unique(),
        {
          fullName,
          email,
          avatar: avatarPlaceholderUrl,
          userId,
        }
      );
    }


    return { success: true, accountId:userId };
  } catch (error) {
    return { success: false, error: (error as Error)?.message || "An error occurred while creating the account." };
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { databases, account } = await createSessionClient();

    const result = await account.get();

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("userId", result.$id)]
    );

    if (user.total <= 0) return null;
    const u = user.documents[0]

    const structuredUser = {
        id: u.$id,
        email: u.email,
        userId: u.userId,
        fullName: u.fullName,
        country: u.country,
        address: u.address,
        role: u.role, 
        phone: u.phone,
        avatar: u.avatar,
        status: u.status,
        createdAt: u.$createdAt,
        updatedAt: u.$updatedAt,
    }

    return structuredUser;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Ensure function always returns a valid Promise<UserCms | null>
  }
};

export const signOutUser = async () => {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    console.log(error, "Failed to sign out user");
    throw error
  } 
  // finally {
  //   redirect(urls.basePath);
  // }
};

export const signInUser = async ({ email }: { email: string }): Promise<{ success: boolean;  accountId?: string; error?: string }> => {
  try {
    const existingUser = await getUserByEmail(email);
    console.log({existingUser})

    // User exists, send OTP
    if (existingUser) {
      await sendEmailOTP({ email });
      return parseStringify({ accountId: existingUser.userId, success:true });
    }

    return parseStringify({ accountId: null,  error: "There was a problem logging in. Check your email or sign up." });
  } catch (error) {
    console.log(error)
    return {success:false, error: "Failed to sign in. Check your network and try again."}
  }
};

export const protectPage = async (permittedRoles:string[]) => {
  const user = await getCurrentUser()
  if(!permittedRoles.includes(user?.role!)   ){
      redirect(`${urls.basePath}?msg=You do not have permision to access the page`)
  }
} 
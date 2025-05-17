"use server";

import { Account, Avatars, Query, Client,ID, Databases, Storage } from "node-appwrite";
import { appwriteConfig } from "@/lib/actions/config";
import { cookies } from "next/headers";
import { settings } from "@/constants";

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

  const session = (await cookies()).get("appwrite-session");

  if (!session || !session.value) {
    console.warn("No session found, redirecting to login...");
    throw new Error("No session found, redirecting to login...")
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
};

// without SDKs
// {
//   search:JSON.stringify({ method: "search", attribute: "header", values: ['Rome'] })
// }

export interface PublicQueryParams {
  search?: string | null;
  start?: number;
  end?: number;
  orderBy?: string; // Field to sort by
  ascending?: boolean; // Sort order
  cache?: "revalidate" | "dynamic"; // Caching Strategy
  [key: string]: any; // Other dynamic filters
}
export const fetchPublicCollection = async <T extends Record<string, any>>(
  collectionId: string,
  params: PublicQueryParams = {},
  fields?: string[],
  orderBy?: { attribute: string; order: "asc" | "desc" } // New order parameter
): Promise<{ data: T[]; tableSize: number; error: string | null }> => {
  try {
    const url = `${appwriteConfig.endpointUrl}/databases/${appwriteConfig.databaseId}/collections/${collectionId}/documents`;

    const start = params.start ?? 0;
    const limit = params.end ? params.end - start : 100;

    const queries: string[] = [
      JSON.stringify({ method: "limit", values: [limit] }),
      JSON.stringify({ method: "offset", values: [start] }),
      JSON.stringify({ method: "equal", attribute: "status", values: ["ACTIVE"] }),
      JSON.stringify({"method":"orderDesc","attribute":"$updatedAt"}),
    ];

    if (params.search) {
      queries.push(params.search);
    }

    // Apply sorting if provided
    if (orderBy) {
      const orderMethod = orderBy.order === "asc" ? "orderAsc" : "orderDesc";
      queries.push(JSON.stringify({ method: orderMethod, attribute: orderBy.attribute }));
    }
    
    queries.push(JSON.stringify({ method: "orderAsc" , attribute: '$updatedAt' }));

    const queryParams = queries.map((q) => `queries[]=${encodeURIComponent(q)}`).join("&");

    // Handle cache logic correctly
    const fetchOptions: RequestInit = {
      method: "GET",
      headers: {
        "X-Appwrite-Project": appwriteConfig.projectId,
        "Content-Type": "application/json",
      },
    };

    if (params.cache === "dynamic") {
      fetchOptions.cache = "no-cache";
    } else if (params.cache === "revalidate") {
      fetchOptions.next = { revalidate: settings.REVALIDATE_TIME };
    } else {
      fetchOptions.cache = "force-cache";
    }

    const response = await fetch(`${url}?${queryParams}`, fetchOptions);

    if (!response.ok) throw new Error("Failed to fetch data");

    const result = await response.json();
    // console.log({ result:result.documents[0] });

    // Process and structure the data
    const structuredData: T[] = result.documents.map((doc: any) => {
      const transformedDoc: Partial<T> = {};

      // Ensure "id" is explicitly set from "$id"
      if (!fields || fields.includes("id")) {
        transformedDoc["id" as keyof T] = doc.$id as any;
        transformedDoc["createdAt" as keyof T] = doc.$createdAt as any;
        transformedDoc["updatedAt" as keyof T] = doc.$updatedAt as any;
      }

      if (!fields) return { ...doc, id: doc?.$id } as T;

      fields.forEach((field) => {
        if (field === "createdBy" && doc.createdBy ) {
          transformedDoc["createdBy" as keyof T] = {
            // id: doc.createdBy.$id,
            fullName: doc.createdBy.fullName,
          } as any;
        } else if (field === "author" && doc.author) {
          transformedDoc["author" as keyof T] = {
            // id: doc.createdBy.$id,
            fullName: doc.author.fullName,
            email: doc.author.email,
            phone: doc.author.phone,
            bio: doc.author.bio,
          } as any;
        } else if (field in doc) {
          transformedDoc[field as keyof T] = doc[field];
        } 
      });

      return transformedDoc as T;
    });


    // Optional: Remove `createdBy` if fetching blogs
    // if (collectionId === appwriteConfig.blogsCollectionId) {
    //   structuredData.forEach((item) => delete item["createdBy" as keyof T]);
    // }


    return {
      data: structuredData,
      tableSize: result.total || 0,
      error: null,
    };
  } catch (error: any) {
    console.error("fetchPublicCollection Error:", {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace",
      status: error?.status || "Unknown status",
      details: error?.details || "No additional details",
      params,
    });
    return { data: [], tableSize: 0, error: error.message || "Failed to fetch." };
  }
};

export const addDocument = async <T extends Record<string, any>>(
  collectionId: string,
  data: any,
  fields: string[]
): Promise<{ success: boolean; data?: T; error?: string }> => {
  try {
    const res= await createSessionClient();

    // console.log({res})

    if(!res) return { success: false,  error: 'You are not authenticated' }

    // Get response from database
    const response = (await res?.databases.createDocument(
      appwriteConfig.databaseId,
      collectionId,
      ID.unique(),
      data
    )) as any; 

    // console.log({ response });

    // Build structured data based on selected fields
    const structuredData = fields.reduce((acc, field) => {
      if (field in response) {
        if (field === "createdBy" && response.createdBy) {
          acc["createdBy" as keyof T] = {
            id: response.createdBy.$id,
            fullName: response.createdBy.fullName,
          } as any; // `as any` ensures correct typing
          // acc["id" as keyof T] = response.$id as any;
        } else {
          acc[field as keyof T] = response[field]; // ✅ Now TypeScript is happy
        }
      }
      return acc;
    }, {} as Partial<T>);

    structuredData["id" as keyof T] = response.$id as any;
    structuredData["createdAt" as keyof T] = response.$createdAt as any;
    structuredData["updatedAt" as keyof T] = response.$updateddAt as any;

    console.log({ structuredData});

    return {
      success: true,
      data: structuredData as T, // Ensure the correct return type
    };
  } catch (error: any) {
    console.error("Add Document Error:", {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace",
      status: error?.status || "Unknown status",
      details: error?.details || "No additional details",
    });
    return { success: false, error: error.message || "Failed to add document." };
  }
};

export const updateDocument = async <T extends Record<string, any>>(
  collectionId: string,
  documentId: string,
  data: any,
  fields?: string[]
): Promise<{ success: boolean; data?: T; error?: string }> => {
  try {
    const { databases } = await createSessionClient();
    // make sure createdAt is removed
    const {createdAt, ...newData} = data

    // Get response from database
    const response = (await databases.updateDocument(
      appwriteConfig.databaseId,
      collectionId,
      documentId,
      newData
    )) as any;  
 
    // If specific fields are requested, return only those
    const structuredData = fields
      ? fields.reduce((acc, field) => {
          if (field in response) {
            if (field === "createdBy" && response.createdBy) {
              acc["createdBy" as keyof T] = {
                id: response.createdBy.$id,
                fullName: response.createdBy.fullName,
              } as any;
              // acc["id" as keyof T] = response.$id as any;
            } else {
              acc[field as keyof T] = response[field];
            }
          }
          return acc;
        }, {} as Partial<T>)
      : (response as T);

      structuredData["id" as keyof T] = response.$id as any;
      structuredData["createdAt" as keyof T] = response.$createdAt as any;

      // console.log({response, structuredData});

    return {
      success: true,
      data: structuredData as T, // Ensure correct return type
    };
  } catch (error: any) {
    console.error("Update Document Error:", {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace",
      status: error?.status || "Unknown status",
      details: error?.details || "No additional details",
    });
    return { success: false, error: error.message || "Failed to update document." };
  }
};

export const deleteDocument = async (collectionId: string, documentId: string): Promise<{ success: boolean }> => {
  const { databases } = await createSessionClient();

  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      collectionId, 
      documentId,
    );

    return { success: true };
  } catch (error:any) {
    console.error("Delete Document Error:", {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace",
      status: error?.status || "Unknown status",
      details: error?.details || "No additional details",
    });
    return { success: false };
  }
};

export interface QueryParams {
  search?: string | null;
  page?: number;
  [key: string]: any; // Allows dynamic filters based on collection fields
}

export const fetchCollectionData = async <T>(
  collectionId: string,
  params: QueryParams,
  fields?: string[],
): Promise<{ data: T[]|any[]; tableSize: number; error: string | null }> => {
  try {
    const client = createSessionClient()

    const databases =  (await client).databases;
    let queries: string[] = [];

    // Validate keys from params against available fields
    const validKeys = Object.keys(params).filter((key) => fields?.includes(key));

    // Search Filter (applies only to string fields)
    if (params.search) {
      const searchableFields = fields?.filter(
        (field) => typeof params[field] === "string"
      );

      if (searchableFields&&searchableFields?.length > 0) {
        queries.push(Query.or(searchableFields.map((field) => Query.search(field, params?.search!))));
      }
    }

    // Apply filters only for valid fields
    validKeys.forEach((key) => {
      if (key !== "search" && key !== "page") {
        queries.push(Query.equal(key, params[key]));
      }
    });

    // Pagination
    const start = params.page ? Number(params.page)  - 1 : 0;
    const limit = start + (settings.COUNTLIMIT ?? 10);
    queries.push(Query.limit(limit));
    queries.push(Query.offset(start));
    queries.push(Query.orderAsc("$createdAt"));

    // Fetch Data
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      collectionId,
      queries
    );

    // Process and structure the data
    const structuredData: T[] = response.documents.map((doc: any) => {
      const transformedDoc: Partial<T> = {};

      // Ensure "id" is explicitly set from "$id"
      if (!fields || fields.includes("id")) {
        transformedDoc["id" as keyof T] = doc.$id as any;
        transformedDoc["createdAt" as keyof T] = doc.$createdAt as any;
        transformedDoc["updatedAt" as keyof T] = doc.$updatedAt as any;
      }

      if (!fields) return { ...doc, id: doc?.$id } as T;

      fields.forEach((field) => {
        if (field === "createdBy" && doc.createdBy) {
          transformedDoc["createdBy" as keyof T] = {
            id: doc.createdBy.$id,
            fullName: doc.createdBy.fullName,
          } as any;
        } else if (field in doc) {
          transformedDoc[field as keyof T] = doc[field];
        }
      });

      return transformedDoc as T;
    });

    // console.log({queries, structuredData})
    return {
      data: fields ? structuredData : response.documents,
      tableSize: response.total,
      error: null,
    };
  } catch (error: any) {
    console.error("Fetch Document Error:", {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace",
      status: error?.status || "Unknown status",
      details: error?.details || "No additional details",
      params,
    });
    return { data: [], tableSize: 0, error: error.message || "Failed to fetch documents." };
  }
};

export interface DocumentResponse {
  document: any | null;
  error: string | null;
}

export const getDocumentById = async (
  collectionId: string,
  documentId: string
): Promise<DocumentResponse> => {
  try {
    const client = await createSessionClient();
    const databases = client.databases;

    const document = await databases.getDocument(
      appwriteConfig.databaseId,
      collectionId,
      documentId
    );
    return {document,error:null};
  } catch (error:any) {
    console.error("Fetch Document By ID Error:", {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace",
      status: error?.status || "Unknown status",
      details: error?.details || "No additional details",
    });
    return {document:null,error:"Failed to fetch document"};
  }
}

export const fetchData = async (collectionId:string) => {
  try {
    const client = await createSessionClient();
    const databases = client.databases;

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      collectionId
    );

    return {
      data: response.documents,
      error: null,
    };
  } catch (error:any) {
    console.error("Fetch Data Error:", {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace",
      status: error?.status || "Unknown status",
      details: error?.details || "No additional details",
    });
    return {
      data: [],
      error: error.message || "Unknown error",
    };
  }
}

export const fetchCollections = async <T>(
  collectionId: string,
  params: QueryParams,
  fields?: string[],
): Promise<{ data: T[]|any[]; tableSize: number; error: string | null }> => {
  try {
    const client = createSessionClient()

    const databases =  (await client).databases;
    let queries: string[] = [];

    // Validate keys from params against available fields
    const validKeys = Object.keys(params).filter((key) => fields?.includes(key));

    // Search Filter (applies only to string fields)
    if (params.search) {
      const searchableFields = fields?.filter(
        (field) => typeof params[field] === "string"
      );

      if (searchableFields&&searchableFields?.length > 0) {
        queries.push(Query.or(searchableFields.map((field) => Query.search(field, params?.search!))));
      }
    }

    // Apply filters only for valid fields
    validKeys.forEach((key) => {
      if (key !== "search" && key !== "page") {
        queries.push(Query.equal(key, params[key]));
      }
    });

    // Pagination
    const start = params.page ? Number(params.page)  - 1 : 0;
    const limit = start + (settings.COUNTLIMIT ?? 10);
    queries.push(Query.limit(limit));
    queries.push(Query.offset(start));
    queries.push(Query.orderAsc("$createdAt"));

    // Fetch Data
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      collectionId,
      queries
    );

    // Process and structure the data
    const structuredData: T[] = response.documents.map((doc: any) => {
      const transformedDoc: Partial<T> = {};

      // Ensure "id" is explicitly set from "$id"
      if (!fields || fields.includes("id")) {
        transformedDoc["id" as keyof T] = doc.$id as any;
        transformedDoc["createdAt" as keyof T] = doc.$createdAt as any;
        transformedDoc["updatedAt" as keyof T] = doc.$updatedAt as any;
      }

      if (!fields) return { ...doc, id: doc?.$id } as T;

      fields.forEach((field) => {
        if (field === "createdBy" && doc.createdBy) {
          transformedDoc["createdBy" as keyof T] = {
            id: doc.createdBy.$id,
            fullName: doc.createdBy.fullName,
          } as any;
        } else if (field in doc) {
          transformedDoc[field as keyof T] = doc[field];
        }
      });

      return transformedDoc as T;
    });

    // console.log({queries})
    return {
      data: fields ? structuredData : response.documents,
      tableSize: response.total,
      error: null,
    };
  } catch (error: any) {
    console.error("Fetch Document Error:", {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace",
      status: error?.status || "Unknown status",
      details: error?.details || "No additional details",
      params,
    });
    return { data: [], tableSize: 0, error: error.message || "Failed to fetch documents." };
  }
};
 
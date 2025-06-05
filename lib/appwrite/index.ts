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
    console.warn("No session found. User might not be authenticated.");
    // Optionally, you can redirect to login or handle unauthenticated state
    return null
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
  fields: string[] = ["createdBy"],
  orderBy?: { attribute: string; order: "asc" | "desc" }
): Promise<{ data: T[]; tableSize: number; error: string | null }> => {
  try {
    const { endpointUrl, databaseId, projectId } = appwriteConfig;

    // Default pagination setup
    const start = params.start ?? 0;
    const limit = params.end ? params.end - start : 100;

    // Base URL to fetch documents from Appwrite
    const url = `${endpointUrl}/databases/${databaseId}/collections/${collectionId}/documents`;

    // Query builder
    const queries: string[] = [
      JSON.stringify({ method: "limit", values: [limit] }),
      JSON.stringify({ method: "offset", values: [start] }),
      JSON.stringify({ method: "equal", attribute: "status", values: ["ACTIVE"] }),
    ];

    // Apply full-text search if provided
    if (params.search) {
      queries.push(params.search);
    }

    // Optional custom sorting
    if (orderBy) {
      const orderMethod = orderBy.order === "asc" ? "orderAsc" : "orderDesc";
      queries.push(JSON.stringify({ method: orderMethod, attribute: orderBy.attribute }));
    } else {
      // Default sort by most recently updated
      queries.push(JSON.stringify({ method: "orderDesc", attribute: "$updatedAt" }));
    }

    // Final query string
    const queryParams = queries.map((q) => `queries[]=${encodeURIComponent(q)}`).join("&");

    // Set request headers and caching options
    const fetchOptions: RequestInit = {
      method: "GET",
      headers: {
        "X-Appwrite-Project": projectId,
        "Content-Type": "application/json",
      },
    };

    // Handle cache policy
    switch (params.cache) {
      case "dynamic":
        fetchOptions.cache = "no-cache";
        break;
      case "revalidate":
        fetchOptions.next = { revalidate: settings.REVALIDATE_TIME };
        break;
      default:
        fetchOptions.cache = "force-cache";
    }

    // Make the request
    const response = await fetch(`${url}?${queryParams}`, fetchOptions);
    if (!response.ok) throw new Error("Failed to fetch data");

    const result = await response.json();

    // Clean/transform data before returning
    const structuredData: T[] = result.documents.map((doc: any) =>
      structureDocument<T>(doc, fields)
    );
    const tableSize = result.total || structuredData.length;
    console.log({structuredData, result})
    return { data: structuredData, tableSize, error: null };
  } catch (error: any) {
    console.error("Fetch public collection error:", {
      message: error.message,
      stack: error.stack,
      status: error?.status,
      details: error?.details,
    });
    return { data: [], tableSize: 0, error: error.message };
  }
};


function structureDocument<T extends Record<string, any>>(
  response: any,
  fields?: string[]
): T {
  const result: Partial<T> = {};

  // Always include these system fields
  result["id" as keyof T] = response?.$id;
  result["createdAt" as keyof T] = response?.$createdAt;
  result["updatedAt" as keyof T] = response?.$updatedAt;

  // Handle permissions cleanup
  if (response?.$permissions) {
    result["permissions" as keyof T] = response.$permissions.map((perm: string) =>
      perm.split("(")[0]
    ) as any;
  }

  // If fields are defined, selectively include
  if (fields && fields.length > 0) {
    for (const field of fields) {
      if (field in response) {
        if (field === "createdBy" && response.createdBy) {
          result["createdBy" as keyof T] = {
            id: response.createdBy.$id,
            fullName: response.createdBy.fullName,
            avatar: response.createdBy?.avatar,
            email: response.createdBy?.email,
          } as any;
        } else {
          result[field as keyof T] = response[field];
        }
      }
    }
  } else {
    // Include all other top-level fields except Appwrite system fields
    for (const key in response) {
      if (
        !["$id", "$createdAt", "$updatedAt", "$permissions", "$databaseId", "$collectionId"].includes(key)
      ) {
        result[key as keyof T] = response[key];
      }
    }
  }

  return result as T;
}

export const addDocument = async <T extends Record<string, any>>(
  collectionId: string,
  data: any,
  fields?: string[]  
): Promise<{ success: boolean; data?: T; error?: string }> => {
  try {
    const client = await createSessionClient();

    if (!client) {
      return { success: false, error: "You are not authenticated" };
    }
 

    const response = await client.databases.createDocument(
      appwriteConfig.databaseId,
      collectionId,
      data.alias,
      data
    );

    const structuredData = structureDocument<T>(response, fields);

    return { success: true, data: structuredData };
  } catch (error: any) {
    console.error("Add Document Error:", {
      message: error.message,
      stack: error.stack,
      status: error?.status,
      details: error?.details,
    });
    return { success: false, error: error.message||"Failed to add document." };
  }
};


export const updateDocument = async <T extends Record<string, any>>(
  collectionId: string,
  documentId: string,
  data: Partial<T>,
  fields?: string[] 
): Promise<{ success: boolean; data?: T; error?: string }> => {
  try {
    const client = await createSessionClient();
    if (!client) {
      return { success: false, error: "You are not authenticated" };
    }
    const databases = client.databases;
    const { createdAt, ...cleanData } = data; // strip `createdAt` if exists

    const response = await databases.updateDocument(
      appwriteConfig.databaseId,
      collectionId,
      documentId,
      cleanData
    );

    const structuredData = structureDocument<T>(response, fields);

    return {
      success: true,
      data: structuredData,
    };
  } catch (error: any) {
    console.error("Update Document Error:", {
      message: error.message,
      stack: error.stack,
      status: error?.status,
      details: error?.details,
    });

    return {
      success: false,
      error: error.message || "Failed to update document.",
    };
  }
};

export const deleteDocument = async (collectionId: string, documentId: string): Promise<{ success: boolean, error?:string }> => {
      const client = await createSessionClient();
    if (!client) {
      return { success: false, error: "You are not authenticated" };
    }
    const databases = client.databases;

  try {
   await databases.deleteDocument(
      appwriteConfig.databaseId,
      collectionId, 
      documentId,
    );
  // console.log('DELETE: ', {collectionId,documentId, res})
    return { success: true };
  } catch (error:any) {
    console.error("Delete Document Error:", {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace",
      status: error?.status || "Unknown status",
      details: error?.details || "No additional details",
    });
    return { success: false, error: error.message||"Failed to delete document." };

  }
};

export const getDocumentById = async <T extends Record<string, any>>(
  collectionId: string,
  documentId: string,
  fields?: string[]  
): Promise<{ data: T | null; error: string | null }> => {
  try {
    const client = await createSessionClient();
    if (!client) {
      return { data: null, error: "You are not authenticated" };
    }
    const databases = client.databases;

    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      collectionId,
      documentId
    );

    const data = structureDocument<T>(response, fields);
    return { data, error: null };
  } catch (error: any) {
    console.error("Fetch Document By ID Error:", {
      message: error.message,
      stack: error.stack,
      status: error?.status,
      details: error?.details,
    });

    return {  data:null, error: error.message||"Failed to add document." };
  }
};

export interface QueryParams {
  search?: string | null;
  page?: number;
  [key: string]: any; // Allows dynamic filters based on collection fields
}

export const fetchCollectionData = async <T extends Record<string, any>>( 
  collectionId: string,
  params: QueryParams = {},
  fields: string[] = ["createdBy"]
): Promise<{ data: T[]; tableSize: number; error: string | null }> => {
  try {
    const client = await createSessionClient();
    if (!client) {
      return { data: [], tableSize: 0, error: "You are not authenticated" };  
    }
    const databases = client.databases;
    let queries: string[] = [];

    const validKeys = Object.keys(params).filter((key) => fields?.includes(key));

    if (params.search) {
      const searchableFields = fields?.filter(
        (field) => typeof params[field] === "string"
      );
      if (searchableFields && searchableFields.length > 0) {
        queries.push(Query.or(searchableFields.map((field) => Query.search(field, params.search!))));
      }
    }

    validKeys.forEach((key) => {
      if (key !== "search" && key !== "page") {
        queries.push(Query.equal(key, params[key]));
      }
    });

    const start = params.page ? Number(params.page) - 1 : 0;
    const limit = start + (settings.COUNTLIMIT ?? 10);
    queries.push(Query.limit(limit));
    queries.push(Query.offset(start));
    queries.push(Query.orderAsc("$createdAt"));

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      collectionId,
      queries
    );

    const structuredData: T[] = response.documents.map((doc: any) =>
      structureDocument<T>(doc, fields)
    );

    return {
      data: structuredData,
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


export const fetchData = async (collectionId:string) => {
  try {
       const client = await createSessionClient();

    if (!client) {
      return { data: [], error: "You are not authenticated" };
    }
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

export const fetchCollectionsAdmin = async <T extends Record<string, any>>(
  collectionId: string,
  params: QueryParams,
  fields?: string[],
): Promise<{ data: T[]|any[]; tableSize: number; error: string | null }> => {
  try {
    const client = await createAdminClient();
    // const client = await createSessionClient();

    if (!client) {
      return { data: [], tableSize: 0, error: "You are not authenticated" };
    }

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
      return structureDocument<T>(doc, fields);
    });
 

    console.log({structuredData,  })
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
export const fetchDocumentByIdAdmin = async <T extends Record<string, any>>(
  collectionId: string,
  documentId: string,
  fields?: string[]
): Promise<{ data: T | null; error: string | null }> => {
  try {
    const client = await createSessionClient();
    if (!client) {
      return { data: null, error: "You are not authenticated" };
    }
    const databases = client.databases;

    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      collectionId,
      documentId
    );

    const data = structureDocument<T>(response, fields);
    return { data, error: null };
  } catch (error: any) {
    console.error("Fetch Document By ID Error:", {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace",
      status: error?.status || "Unknown status",
      details: error?.details || "No additional details",
    });
    return { data: null, error: error.message || "Failed to fetch document." };
  }
};


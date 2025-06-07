export type CloudinaryUploadResult = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: "image" | "video" | "raw" | string;
  created_at: string;
  tags: string[];
  pages?: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder?: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
  api_key?: string;

  // Optional fields
  context?: Record<string, any>;
  metadata?: Record<string, any>;
  image_metadata?: Record<string, any>;
  moderation?: any[];
  colors?: [string, number][];
  predominant?: any;
  coordinates?: any;
};
export type CloudinaryMedia = {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  resource_type: "image" | "video" | "raw" | string;
  created_at: string;
  bytes: number;
  type: string;
  folder: string;
  access_mode: string;

  // Optional fields
  context?: Record<string, any>;
  metadata?: Record<string, any>;
};

export type CloudinaryDeleteResult = {
  result: "ok" | "not found" | string;
};

export type CloudinaryBulkDeleteResult = {
  deleted: {
    [public_id: string]: "deleted" | "not_found" | string;
  };
};


export type CloudinarySearchResult = {
  resources: CloudinaryMedia[];
  next_cursor?: string;
  total_count: number;
  max_results: number;
  offset: number;
  time_taken: number;
  context?: Record<string, any>;
};
export type CloudinaryUploadOptions = {
  folder?: string;
  publicId?: string;
  filename?: string;
  buffer: Buffer;
};



// export async function uploadToCloudinary({
//   folder,
//   publicId,
//   filename,
//   buffer,
// }: CloudinaryUploadOptions): Promise<CloudinaryUploadResult> {
//   const cloudinary = require("cloudinary").v2;

//   if (!buffer || !Buffer.isBuffer(buffer)) {
//     throw new Error("Invalid buffer provided for upload");
//   }

//   if (!folder) {
//     folder = "lms"; // Default folder
//   }

//   if (!publicId) {
//     publicId = `file-${Date.now()}`; // Generate a unique public ID
//   }
//     if (!filename) {
//         filename = publicId; // Use publicId as filename if not provided
//     }       
//     console.log("Uploading to Cloudinary with publicId:", publicId, filename, folder);
//     const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
//     cloudinary.uploader.upload_stream(
//       {
//         resource_type: "auto",
//         folder: folder,
//         public_id: publicId,
//         display_name: filename,
//         use_filename: !filename ? true : false,
//       },
//       (err, res) => {
//         if (err) reject(err);
//         else resolve(res as CloudinaryUploadResult);
//       }
//     ).end(buffer);
//     });
//     console.log("Cloudinary upload result:", result);
//     return result;
// }
// export async function fetchCloudinaryMedia(
//   folder: string,
//   maxResults: number = 100
// ): Promise<CloudinarySearchResult> {
//   const cloudinary = require("cloudinary").v2;

//   try {
//     const res = await cloudinary.search
//       .expression(`folder:${folder}`)
//       .sort_by("created_at", "desc")
//       .max_results(maxResults)
//       .execute();

//     return res as CloudinarySearchResult; // Cast to expected type
//   } catch (error) {
//     console.error("Error fetching Cloudinary media:", error);
//     throw error;
//   }
// }

// export async function deleteCloudinaryMedia(publicId: string): Promise<CloudinaryDeleteResult> {
//   const cloudinary = require("cloudinary").v2;

//   try {
//     const res = await cloudinary.uploader.destroy(publicId, {
//       invalidate: true,
//       resource_type: "auto",
//     });

//     return res as CloudinaryDeleteResult; // Cast to expected type
//   } catch (error) {
//     console.error("Error deleting Cloudinary media:", error);
//     throw error;
//   }
// }

// // This file defines types and functions for interacting with Cloudinary, including uploading, fetching, and deleting media files.

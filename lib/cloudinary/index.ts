"use server";

import { v4 as uuidv4 } from "uuid";
import { generateSlug } from "../helper";
import cloudinary from "@/utils/cloudinary";

export async function deleteCloudinaryAsset(publicId: string) {
  const res = await fetch("/api/cloudinary/delete", {
    method: "POST",
    body: JSON.stringify({ publicId }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  return data;
}

export async function uploadToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/cloudinary/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to upload file");
  }

  return res.json();
}

export async function uploadToCloudinaryWithProgress(
  file: File,
  onProgress: (progress: number) => void
) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/cloudinary/upload", {
    method: "POST",
    body: formData,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to upload file");
  }

  const reader = res.body?.getReader();
  if (!reader) return res.json();

  let loaded = 0;
  const contentLength = +res.headers.get("Content-Length")!;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    loaded += value.length;
    onProgress((loaded / contentLength) * 100);
  }

  return res.json();
}
 
export async function uploadToCloudinaryAction(file: File, filename?: string, folder?: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const publicId = filename ? generateSlug(filename, 3) : uuidv4();

  const result = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: folder??"lms",
        public_id: publicId,
        display_name: filename || publicId,
        use_filename: !filename ? true:false,
      },
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    ).end(buffer);
  });

  return result;
}
 

export async function fetchCloudinaryMedia(folder: string) {
  try {
    const res = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    return res.resources; // Array of assets
  } catch (error) {
    console.error("Cloudinary fetch error:", error);
    return [];
  }
}


// const exampleResponse = {
//     "asset_id": "7822352f39a415ce75079fa4aea089d3",
//     "public_id": "lms/6829e5530013c752d8a4/two-women-rUp",
//     "version": 1748725411,
//     "version_id": "afe3b638243ce9d51f60fa33bf9349e3",
//     "signature": "19d5c3c1cb1d94acf1f8a8121cb458fa60c47bcf",
//     "width": 938,
//     "height": 599,
//     "format": "png",
//     "resource_type": "image",
//     "created_at": "2025-05-31T21:03:31Z",
//     "tags": [],
//     "bytes": 599977,
//     "type": "upload",
//     "etag": "68d2b417a8bc52382f9a923204652fa4",
//     "placeholder": false,
//     "url": "http://res.cloudinary.com/dko7mkf3y/image/upload/v1748725411/lms/6829e5530013c752d8a4/two-women-rUp.png",
//     "secure_url": "https://res.cloudinary.com/dko7mkf3y/image/upload/v1748725411/lms/6829e5530013c752d8a4/two-women-rUp.png",
//     "asset_folder": "lms/6829e5530013c752d8a4",
//     "display_name": "two-women-rUp",
//     "original_filename": "file",
//     "api_key": "843642373677687"
// }
"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import { uploadToCloudinaryAction } from "@/lib/cloudinary";
import { postRequest, putRequest } from "@/utils/api";
import { appwriteConfig } from "@/lib/actions/config";
import { Course, Media } from "@/types";
import { useUserStore } from "@/store/useUserStore";
import { MediaModal } from "./MediaLibrary";
import CardWrapper from "../shared/CardWrapper";
import Image from "next/image";
import { Redo } from "lucide-react";
import { Button } from "../ui/button";
import { generateSlug, getFileCategory } from "@/lib/helper";
import { CloudinaryUploadResult } from "@/types/cloudinary";

type FilePreview = {
  file: File | null;
  url: string;
  type: string;
  name: string;
  mimeType?: string; // Optional, can be used for more specific handling
};

export function FileUploader({ course }: { course: Course }) {
  const { user } = useUserStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const [fileState, setFileState] = useState<FilePreview>({
    file: null,
    url: course.media?.url || "",
    type: course.media?.type || "",
    name: course.media?.fileName || "",
  });

  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFile =  (file: File) => {
    if (fileState.url) {
      URL.revokeObjectURL(fileState.url);
    }

    const mimeType = file.type;
    const objectUrl = URL.createObjectURL(file);

    setFileState({
      file,
      url: objectUrl,
      type: getFileCategory(mimeType),
      name: file.name.replace(/\.[^/.]+$/, ""), // strip extension
      mimeType,
    });
  } 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  };

  const handleUploadClick = async () => {
    if (!fileState.file || !fileState.name.trim()) {
      toast.error("Please select a file and enter a name.");
      return;
    }

    setUploading(true);
    try {
      const res: CloudinaryUploadResult = await uploadToCloudinaryAction(
        fileState.file,
        fileState.name,
        `lms/${user?.id}`
      );

      console.log("Upload response:", res, res.secure_url);
      // Check if upload was successful

        if (!res?.secure_url) {
          toast.error("Upload failed");
          return;
        }

      // Create media entry in Appwrite
      const {data:media, error} = await postRequest({
        body: {
          collectionId: appwriteConfig.mediaCollectionId,
          formData: {
              url: res.secure_url,
              type: "image",
              fileName: fileState.name.slice(0, 20), // Limit to 20 chars
              alias: generateSlug(fileState.name),
              collection: appwriteConfig.coursesCollectionId,
              // Optional fields
              usedFor: "course_cover",
              mimeType: fileState.mimeType,
              createdBy: user?.id,
          },
          fields:['url', 'type', 'fileName', 'alias', 'collection', 'usedFor', 'mimeType'],
        },
      });

      
      if (error || !media) {
        console.error("Media upload failed:", error);
        toast.error("Media upload failed");
        return;
      }

      const {data:courseReturned, error:courseError} = await putRequest({
        body: {
          collectionId: appwriteConfig.coursesCollectionId,
          documentId: course.id,
          formData: {
            media: media.id,
          },
        },
      });

      if (courseError || !courseReturned) {
        console.error("Course update failed:", courseError);
        toast.error("Course update failed");
        return;
      }

      toast.success("File uploaded!");
      // resetState();
    } catch (err) {
      toast.error("Upload error: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setUploading(false);
    }
  };

  const reset = (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.stopPropagation();
    setFileState({
      file: null,
      url: course.media?.url || "",
      type: course.media?.type || "",
      name: course.media?.fileName || "",
    })
  }

  const updateCourseMedia = useCallback(
   async (media: Media) => {
      const {data:courseReturned, error:courseError} = await putRequest({
        body: {
          collectionId: appwriteConfig.coursesCollectionId,
          documentId: course.id,
          formData: {
            media: media.id,
          },
        },
      });

      if (courseError || !courseReturned) {
        console.error("Course update failed:", courseError);
        toast.error("Course update failed");
        return;
      }

      setFileState({
        file: null,
        url: media.url!,
        type: media.type!,
        name: media.fileName!,
        mimeType: media.mimeType!,
      });
      toast.success("Course media updated successfully");

    }, [setFileState]);

  return (
    <CardWrapper className="space-y-4 px-0 w-full">
      <div className="px-4">
        <p className="font-semibold">Cover Image</p>
        <small className="text-gray-500">
          Choose a good image or PDF that represents the course.
        </small>
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDrop={handleDrop}
        className={`relative border-2 my-2 border-dashed rounded-md p-0 text-center cursor-pointer transition-colors ${
          dragActive ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleInputChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={uploading}
        />

        {
            fileState.file && (
            <Button variant={'outline'} className="rounded-full absolute right-4 top-0.5 z-20 border-gray-500 px-1 text-xs h-6"  onClick={(e)=>reset(e)}>
              <Redo size={14} className="text-primeary cursor-pointer"/>
              Redo
            </Button>
          )
        }

        
        {fileState.url && (
          <div className="text-sm text-gray-700">
            <div className="flex gap-2 justify-center items-center pb-1">
              <p className="mb-2">File ready: {(fileState?.file?.name || fileState?.name || "").slice(0, 20)}</p>

            </div>
            {fileState.type.startsWith("image") && (
              <Image
                src={fileState.url}
                alt="Preview"
                className="size-full max-h-60 object-contain rounded-md shadow"
                width={200}
                height={200}
              />
            )}
            {fileState.type === "document" && (
              <p className="italic text-sm text-gray-500">PDF preview ready</p>
            )}
          </div>
        )}

        {!fileState.file && (
          <p className="text-gray-600 text-sm px-4 py-2">
            Drag & drop or click to select (image or PDF)
          </p>
        )}

      </div>

      <div className="px-4 space-y-2">
          {fileState.file && (
            <div>
              <label  className="block mb-1 font-medium text-gray-700" htmlFor="filename-input">
                Enter filename to save as (public ID):
              </label>
              <input
                id="filename-input"
                type="text"
                value={fileState.name}
                onChange={(e) =>
                  setFileState((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Filename without extension"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring-green-200"
                disabled={uploading}
              />
            </div>
          )}

          <div className="flex w-full gap-2">
            {fileState.file && (
              <button
                onClick={handleUploadClick}
                disabled={uploading || !fileState.name.trim()}
                className="w-full rounded-md bg-green-600 py-2 text-white font-semibold hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            )}
            <MediaModal
              updateMedia={updateCourseMedia}
              triger={
                <button
                  disabled={uploading}
                  className="w-full rounded-md border border-slate-700 text-slate-700 py-2 font-medium hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Select from media
                </button>
              }
            />
          </div>
      </div>
    </CardWrapper>
  );
}

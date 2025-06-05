"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import { uploadToCloudinaryAction } from "@/lib/cloudinary";
import { putRequest } from "@/utils/api";
import { appwriteConfig } from "@/lib/actions/config";
import { Course } from "@/types";
import { useUserStore } from "@/store/useUserStore";
import { MediaModal } from "./MediaLibrary";
import CardWrapper from "../shared/CardWrapper";
import Image from "next/image";

type FilePreview = {
  file: File | null;
  url: string;
  type: string;
  name: string;
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

  const resetState = () => {
    setFileState({ file: null, url: "", type: "", name: "" });
  };

  const handleFile = useCallback((file: File) => {
    setFileState({
      file,
      url: URL.createObjectURL(file),
      type: file.type,
      name: file.name.replace(/\.[^/.]+$/, ""), // remove extension
    });
  }, []);

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
      const res = await uploadToCloudinaryAction(
        fileState.file,
        fileState.name,
        `lms/${user?.id}`
      );

      if (!res?.secured_url) {
        toast.error("Upload failed");
        return;
      }

      const dbUpdate = await putRequest({
        body: {
          collectionId: appwriteConfig.coursesCollectionId,
          documentId: course.id,
          formData: {
            media: {
              url: res.secured_url,
              type: res.resource_type === "image" ? fileState.file.type : "application/pdf",
              fileName: fileState.name,
            },
          },
          fields: ["media"],
        },
      });

      toast.success("File uploaded!");
      resetState();
    } catch (err) {
      toast.error("Upload error: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setUploading(false);
    }
  };

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
        className={`relative border-2 my-2 border-dashed rounded-md p-2 text-center cursor-pointer transition-colors ${
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

        
        {fileState.url && (
          <div className="text-sm text-gray-700">
            <p className="mb-2">File ready: {fileState?.file?.name || fileState?.name || ""}</p>
            {fileState.type.startsWith("image") && (
              <Image
                src={fileState.url}
                alt="Preview"
                className="mx-auto max-h-60 object-contain rounded-md shadow"
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

      {fileState.file && (
        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="filename-input">
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
          onSelect={() => {}}
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
    </CardWrapper>
  );
}

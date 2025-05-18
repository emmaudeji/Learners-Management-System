"use client";

import { Button } from "@/components/ui/button";
import { appwriteConfig } from "@/lib/actions/config";
import { Course } from "@/types";
import { putRequest } from "@/utils/api";
import { ImagePlus, Loader2, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

// Assume this uploads and returns the public image URL
async function imageUploader(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url; // Should be string
}

const CoverImageForm = ({ course }: { course: Course }) => {
    const initialImageUrl = course.imageUrl
  const [image, setImage] = useState(initialImageUrl|| "");
  const [preview, setPreview] = useState(initialImageUrl || "");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (file: File) => {
    try {
      setIsLoading(true);
      const url = await imageUploader(file);

      const { error } = await putRequest({
        body: {
          collectionId: appwriteConfig.coursesCollectionId,
          documentId: course.id,
          formData: { image: url },
          fields: ["image"],
        },
      });

      if (error) {
        toast.error("Failed to save image.");
        return;
      }

      setImage(url);
      setPreview(url);
      toast.success("Cover image updated!");
    } catch (err) {
      toast.error("Image upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      await handleFileChange(file);
    }
  };

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      await handleFileChange(file);
    }
  };

  return (
    <div className="space-y-2">
            <div className="">
            <p className="font-semibold">Cover Image</p>
            <small className="text-gray-500">This is the course preview image. Choose a quality image that aligns well with the course title.</small>
        </div>
        <div
        className="relative p-4 bg-white rounded-lg border border-dashed border-gray-300 hover:border-gray-400 transition"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        >
        <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="hidden"
        />

        {preview ? (
            <div className="relative aspect-video rounded-lg overflow-hidden">
            <img src={preview} alt="Course cover" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                <Button type="button" variant="outline" disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                    <>
                    <Upload className="w-4 h-4 mr-2" />
                    Replace Image
                    </>
                )}
                </Button>
            </div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center text-gray-500 space-y-2">
            {isLoading ? (
                <Loader2 className="animate-spin h-6 w-6" />
            ) : (
                <ImagePlus className="h-10 w-10 text-gray-400" />
            )}
            <p className="text-sm">Click or drag & drop to upload a cover image</p>
            </div>
        )}
        </div>
    </div>
  );
};

export default CoverImageForm;

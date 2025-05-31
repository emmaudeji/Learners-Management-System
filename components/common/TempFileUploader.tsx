"use client";

import { uploadToCloudinaryAction } from "@/lib/cloudinary/index";
import { useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { MediaModal } from "./MediaLibrary";
import { useUserStore } from "@/store/useUserStore";
import { putRequest } from "@/utils/api";
import { appwriteConfig } from "@/lib/actions/config";
import { Course } from "@/types";

export function FileUploader({course}:{course:Course} ) {
  const {user} = useUserStore()
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // When a file is dropped or selected
  const handleFile = useCallback(
    (file: File) => {
      setFile(file);
      setPreview(URL.createObjectURL(file));
      setFileName(file.name.replace(/\.[^/.]+$/, "")); // default name without extension
    },
    [setFile, setPreview, setFileName]
  );

  // Handle manual input file change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    handleFile(selectedFile);
  };

  // Drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Keep dragActive true here to maintain highlight
    setDragActive(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      handleFile(droppedFiles[0]);
    }
  };

  // Upload after user enters filename
  const handleUploadClick = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }
    if (!fileName.trim()) {
      toast.error("Please enter a file name to save as.");
      return;
    }

    setUploading(true);
    try {
      const cloudinaryRes = await uploadToCloudinaryAction(file, fileName, `lms/${user?.id}`);
      if (!cloudinaryRes) {
        toast.error("Failed to upload file");
      } else {
          console.log("Upload result:", cloudinaryRes);
           
            const res = await putRequest({
              body:{
                collectionId: appwriteConfig.coursesCollectionId,
                documentId: course.id,
                formData: { image: cloudinaryRes.secured_url },
                fields: ["image"],
              }
            })
            console.log("File uploaded successfully:", res, cloudinaryRes);
           
          toast.success("File uploaded successfully!");
        // Reset state or keep file/preview depending on UX
        setFile(null);
        setPreview("");
        setFileName("");
      }
    } catch (error) {
      toast.error("Upload error: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4 ">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative text-sm border-2 border-dashed rounded-md p-5 text-center cursor-pointer transition-colors
          ${dragActive ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"}
        `}
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleInputChange}
          ref={inputRef}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={uploading}
          multiple={false}
        />

        {!file && (
          <p className="text-gray-600 text-sm">
            Drag & drop a file here, or click to select a file (images & PDFs)
          </p>
        )}

        {file && preview && (
          <>
            <p className="mb-2 tx-sm  text-gray-700">File ready: {file.name}</p>
            {file.type.startsWith("image/") && (
              <img
                src={preview}
                alt="Preview"
                className="mx-auto mb-4 max-h-40 object-contain rounded-md shadow"
              />
            )}
            {file.type === "application/pdf" && (
              <p className="italic text-sm text-gray-500">PDF file ready to upload</p>
            )}
          </>
        )}
      </div>

      {/* Show filename input only after a file is selected */}
      {file && (
        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="filename-input">
            Enter filename to save as (public ID):
          </label>
          <input
            id="filename-input"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Filename without extension"
            className="w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:ring focus:ring-green-200"
            disabled={uploading}
          />
        </div>
      )}

      <div className="flex w-full gap-2">
      {/* Upload button */}
      {file && (
        <button
          onClick={handleUploadClick}
          disabled={uploading || !fileName.trim()}
          className={`w-full rounded-md bg-green-600 py-2 text-white font-semibold
            hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed
          `}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      )}
      <MediaModal 
        onSelect={()=>{}}
        triger={
        <button
            disabled={uploading  }
            className={`w-full rounded-md border border-slate-700 text-slate-700 py-2 font-medium
                hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm
            `}
            >
            Select from media
            </button>
        } />
      </div>
    </div>
  );
}



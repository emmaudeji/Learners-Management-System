"use client";

import { CustomInput } from "@/components/shared/CustomInput";
import { Button } from "@/components/ui/button";
import { fields } from "@/constants";
import { appwriteConfig } from "@/lib/actions/config";
import { Chapter, Course } from "@/types";
import { putRequest } from "@/utils/api";
import { Pen } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MIN_TITLE_LENGTH = 5;

const ChapterTitleForm = ({ chapter }: { chapter: Chapter }) => {
  const initialTitle = chapter.label || "";
  const [title, setTitle] = useState(initialTitle);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(!initialTitle.length);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim().length < MIN_TITLE_LENGTH) {
      setError("Title must be at least 5 characters.");
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await putRequest({
        body: {
          collectionId: appwriteConfig.chaptersCollectionId,
          documentId: chapter.alias,
          formData: { title },
        },
      });

      if (error) {
        toast.error(error || "Failed to update title.");
        setTitle(initialTitle);
        return;
      }

      toast.success("Title updated!");
      setIsEdit(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setTitle(initialTitle);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-slate-100 rounded-md border space-y-4">
      <CustomInput
        label="Course Title"
        description="Make it short, clear, and enticing. This will be the first impression learners get."
        value={title}
        error={error}
        disabled={!isEdit || isLoading}
        onChange={handleChange}
      />

      <div className="flex items-center justify-between">
        {!isEdit && (
          <button
            type="button"
            onClick={() => setIsEdit(true)}
            className="flex items-center gap-1 text-sm text-green-700 hover:underline"
          >
            <Pen size={14} />
            Edit title
          </button>
        )}

        {isEdit && title !== initialTitle && title.length >= MIN_TITLE_LENGTH && (
          <Button type="submit" variant="outline" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        )}
      </div>
    </form>
  );
};

export default ChapterTitleForm;

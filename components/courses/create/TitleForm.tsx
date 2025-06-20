"use client";

import CardWrapper from "@/components/shared/CardWrapper";
import { CustomInput } from "@/components/shared/CustomInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fields } from "@/constants";
import { appwriteConfig } from "@/lib/actions/config";
import { Course } from "@/types";
import { putRequest } from "@/utils/api";
import { Pen, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MIN_TITLE_LENGTH = 5;

const TitleForm = ({ course }: { course: Course }) => {
  const initialTitle = course.title || "";
  const [title, setTitle] = useState(initialTitle);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(!initialTitle.length);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    if (value.length < MIN_TITLE_LENGTH) {
      setError("Title must be at least 5 characters.");
    } else {
      setError("");
    }
  };

  const handleCancel = () => {
    setTitle(initialTitle);
    setError("");
    setIsEdit(false);
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
          collectionId: appwriteConfig.coursesCollectionId,
          documentId: course.id,
          formData: { title },
          fields: fields.courses,
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

  const hasChanged = title !== initialTitle;

  return (
    <CardWrapper >
      <form onSubmit={handleSubmit} className="w-full  space-y-4">
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

          {isEdit && hasChanged && title.length >= MIN_TITLE_LENGTH && (
            <div className="flex gap-3">
              <Button type="submit" variant="outline" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-sm text-red-600 flex items-center gap-1 hover:underline"
              >
                <X size={14} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </CardWrapper>
  );
};

export default TitleForm;

"use client";

import { CustomInput } from "@/components/shared/CustomInput";
import { Button } from "@/components/ui/button";
import { fields } from "@/constants";
import { appwriteConfig } from "@/lib/actions/config";
import { Course } from "@/types";
import { putRequest } from "@/utils/api";
import { Pen } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MIN_DESCRIPTION_LENGTH = 15;

const DescriptionForm = ({ course }: { course: Course }) => {
  const initialDescription = course.description || "";
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(!initialDescription.length);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);
    if (error && value.length >= MIN_DESCRIPTION_LENGTH) {
      setError("");
    } else if (e.target.value.length <= MIN_DESCRIPTION_LENGTH) {
      setError("Description must be at least 15 characters.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (description.trim().length < MIN_DESCRIPTION_LENGTH) {
      setError("Description must be at least 5 characters.");
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await putRequest({
        body: {
          collectionId: appwriteConfig.coursesCollectionId,
          documentId: course.id,
          formData: { description },
          fields: fields.courses,
        },
      });

      if (error) {
        toast.error(error || "Failed to update description.");
        setDescription(initialDescription);
        return;
      }

      toast.success("Description updated!");
      setIsEdit(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setDescription(initialDescription);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 w-full bg-slate-50 rounded-md border space-y-4">
      <CustomInput
        label="Course Description"
        description="Write a structured overview. Use keywords that improve SEO and attract the right audience."
        value={description}
        error={error}
        disabled={!isEdit || isLoading}
        onChange={handleChange}
        isTextArea
      />

      <div className="flex items-center justify-between">
        {!isEdit && (
          <button
            type="button"
            onClick={() => setIsEdit(true)}
            className="flex items-center gap-1 text-sm text-green-700 hover:underline"
          >
            <Pen size={14} />
            Edit description
          </button>
        )}

        {isEdit && description !== initialDescription && description.length >= MIN_DESCRIPTION_LENGTH && (
          <Button type="submit" variant="outline" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        )}
      </div>
    </form>
  );
};

export default DescriptionForm;

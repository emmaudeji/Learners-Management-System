"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { Pen, X } from "lucide-react";

import { Course } from "@/types";
import { courseCategoryOptions } from "@/data/courseCategories";
import CustomSelect from "@/components/shared/CustomSelect";
import { Button } from "@/components/ui/button";
import { putRequest } from "@/utils/api";
import { appwriteConfig } from "@/lib/actions/config";
import { fields } from "@/constants";
import CardWrapper from "@/components/shared/CardWrapper";

const CategorySelectForm = ({ course }: { course: Course }) => {
  const initialCategory = course.category || "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(!initialCategory.length);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value) setError("");
  };

  const handleCancel = () => {
    setSelectedCategory(initialCategory);
    setError("");
    setIsEdit(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) {
      setError("Please select a category.");
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await putRequest({
        body: {
          collectionId: appwriteConfig.coursesCollectionId,
          documentId: course.id,
          formData: { category: selectedCategory },
          fields: fields.courses,
        },
      });

      if (error) {
        toast.error(error || "Failed to update category.");
        setSelectedCategory(initialCategory);
        return;
      }

      toast.success("Category updated!");
      setIsEdit(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setSelectedCategory(initialCategory);
    } finally {
      setIsLoading(false);
    }
  };

  const hasChanged = selectedCategory !== initialCategory;

  return (
    <CardWrapper>
      <form onSubmit={handleSubmit} className=" space-y-4">
      <CustomSelect
        name="category"
        label="Course Category"
        options={courseCategoryOptions}
        value={selectedCategory}
        onChange={handleCategoryChange}
        placeholder="Select a course category"
        error={error}
        required
        className="max-w-md"
        isDisabled={!isEdit || isLoading}
        description="Select a category that best fits your course. This helps learners find your course easily."
        labelStyle="text-lg"
      />

      <div className="flex items-center justify-between">
        {!isEdit && (
          <button
            type="button"
            onClick={() => setIsEdit(true)}
            className="flex items-center gap-1 text-sm text-green-700 hover:underline"
          >
            <Pen size={14} />
            Edit category
          </button>
        )}

        {isEdit && hasChanged && (
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

export default CategorySelectForm;

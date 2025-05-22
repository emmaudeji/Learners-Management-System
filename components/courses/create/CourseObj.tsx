"use client";

import { CustomInput } from "@/components/shared/CustomInput";
import { Button } from "@/components/ui/button";
import { fields } from "@/constants";
import { appwriteConfig } from "@/lib/actions/config";
import { Course } from "@/types";
import { putRequest } from "@/utils/api";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MIN_OBJECTIVE_LENGTH = 5;

// TODO: add item to global validation list: Save changes made in objectives section.

export const CourseObjectivesForm = ({ course }: { course: Course }) => {
  const initialObjectives = course.objectives || [];
  const [objectives, setObjectives] = useState<string[]>(initialObjectives);
  const [newObjective, setNewObjective] = useState("");
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(!initialObjectives.length);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddObjective = () => {
    if (newObjective.trim().length < MIN_OBJECTIVE_LENGTH) {
      setError("Objective must be at least 5 characters.");
      return;
    }

    setObjectives((prev) => [...prev, newObjective.trim()]);
    setNewObjective("");
    setError("");
  };

  const handleRemoveObjective = (index: number) => {
    setObjectives((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveObjectives = async () => {
    if (!objectives.length) {
      toast.error("Please add at least one objective.");
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await putRequest({
        body: {
          collectionId: appwriteConfig.coursesCollectionId,
          documentId: course.id,
          formData: { objectives },
          fields: fields.courses,
        },
      });

      if (error) {
        toast.error(error || "Failed to update objectives.");
        setObjectives(initialObjectives);
        return;
      }

      toast.success("Objectives updated!");
      setIsEdit(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setObjectives(initialObjectives);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-slate-100 rounded-md border space-y-4">
      <CustomInput
        label="Add Course Objective"
        description="Add clear, concise learning outcomes for this course."
        placeholder="e.g., Understand the basics of React."
        value={newObjective}
        error={error}
        disabled={!isEdit || isLoading}
        onChange={(e) => setNewObjective(e.target.value)}
      />

      {isEdit && (
        <Button
          type="button"
          onClick={handleAddObjective}
          variant="outline"
          className="text-sm"
          disabled={isLoading}
        >
          <Plus size={16} className="mr-1" />
          Add Objective
        </Button>
      )}

      {objectives.length > 0 && (
        <ul className="space-y-2 text-sm">
          {objectives.map((obj, index) => (
            <li key={index} className="flex justify-between items-start bg-white p-2 rounded shadow-sm border">
              <span>{obj}</span>
              {isEdit && (
                <button
                  type="button"
                  onClick={() => handleRemoveObjective(index)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove objective"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between pt-2">
        {!isEdit && (
          <button
            type="button"
            onClick={() => setIsEdit(true)}
            className="flex items-center gap-1 text-sm text-green-700 hover:underline"
          >
            <Plus size={14} />
            Edit objectives
          </button>
        )}

        {isEdit && JSON.stringify(objectives) !== JSON.stringify(initialObjectives) && (
          <Button
            type="button"
            onClick={handleSaveObjectives}
            variant="outline"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Objectives"}
          </Button>
        )}
      </div>
    </div>
  );
};

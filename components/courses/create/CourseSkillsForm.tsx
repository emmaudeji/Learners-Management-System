"use client";

import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { MultiValue, ActionMeta } from "react-select";
import { Pen, X } from "lucide-react";
import { toast } from "react-toastify";

import { Course } from "@/types";
import { professionalSkills } from "@/data/skillsets";
import { putRequest } from "@/utils/api";
import { appwriteConfig } from "@/lib/actions/config";
import { fields } from "@/constants";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CardWrapper from "@/components/shared/CardWrapper";

type Option = {
  label: string;
  value: string;
};

// Grouped select options from skillsets
const groupedOptions = Object.entries(professionalSkills).map(([category, skills]) => ({
  label: category.charAt(0).toUpperCase() + category.slice(1),
  options: skills.map(skill => ({ label: skill, value: skill })),
}));

const CourseSkillsForm = ({ course }: { course: Course }) => {
  const initialSkills = course.skills || [];

  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    initialSkills.map(skill => ({ label: skill, value: skill }))
  );
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [isEdit, setIsEdit] = useState(!initialSkills.length);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (newValue: MultiValue<Option>, _actionMeta: ActionMeta<Option>) => {
    const selected = Array.from(newValue);
    setSelectedOptions(selected);
    setSkills(selected.map(option => option.value));
  };

  const handleCancel = () => {
    const reverted = initialSkills.map(skill => ({ label: skill, value: skill }));
    setSelectedOptions(reverted);
    setSkills(initialSkills);
    setIsEdit(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const { data, error } = await putRequest({
        body: {
          collectionId: appwriteConfig.coursesCollectionId,
          documentId: course.id,
          formData: { skills },
          fields: fields.courses,
        },
      });

      if (error) {
        toast.error(error || "Failed to update skills.");
        setSkills(initialSkills);
        return;
      }

      toast.success("Skills updated!");
      setIsEdit(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setSkills(initialSkills);
    } finally {
      setIsLoading(false);
    }
  };

  const hasChanged = JSON.stringify(skills) !== JSON.stringify(initialSkills);

  return (
    <CardWrapper>
      <form onSubmit={handleSubmit} className=" space-y-4">
      <div>
        <Label  className="text-lg">Skills you'll teach</Label >
        <small className="  text-muted-foreground mb-2 block">
          Select the skills that will be covered in this course. You can also create new skills if they are not listed.
        </small>
        <CreatableSelect
          isMulti
          options={groupedOptions}
          value={selectedOptions}
          onChange={handleChange}
          isDisabled={!isEdit || isLoading}
          placeholder="Select or create skills..."
          className="text-sm mt-1"
          classNamePrefix="select"
          styles={{
            control: (base) => ({
              ...base,
              borderRadius: '0.5rem',
              padding: '0.25rem',
              borderColor: '#d1d5db',
              minHeight: '44px',
              backgroundColor: !isEdit ? "#f9fafb" : "white",
            }),
          }}
        />

      </div>

      <div className="flex items-center justify-between">
        {!isEdit && (
          <button
            type="button"
            onClick={() => setIsEdit(true)}
            className="flex items-center gap-1 text-sm text-green-700 hover:underline"
          >
            <Pen size={14} />
            Edit skills
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

export default CourseSkillsForm;

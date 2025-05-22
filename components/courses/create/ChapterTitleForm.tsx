'use client';

import { TextButton } from '@/components/shared/CustomButton';
import { CustomInput } from '@/components/shared/CustomInput';
import { Button } from '@/components/ui/button';
import { appwriteConfig } from '@/lib/actions/config';
import { Chapter } from '@/types';
import { putRequest } from '@/utils/api';
import { Label } from '@radix-ui/react-label';
import { Pen } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const MIN_TITLE_LENGTH = 5;

const ChapterTitleForm = ({
  chapter,
  type,
}: {
  chapter: Chapter;
  type?: string;
}) => {
  const initialTitle = chapter.label || '';
  const [label, setLabel] = useState(initialTitle);
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(!initialTitle.length);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (label.trim().length < MIN_TITLE_LENGTH) {
      setError(`Chapter title must be at least ${MIN_TITLE_LENGTH} characters.`);
      return;
    }

    try {
      setIsLoading(true);

      const { error: updateError } = await putRequest({
        body: {
          collectionId: appwriteConfig.chaptersCollectionId,
          documentId: chapter.alias,
          formData: { label },
        },
      });

      if (updateError) {
        toast.error(updateError || 'Failed to update chapter title.');
        setLabel(initialTitle);
        return;
      }

      toast.success(' Chapter title updated successfully!');
      setIsEdit(false);
    } catch {
      toast.error(' Something went wrong. Please try again.');
      setLabel(initialTitle);
    } finally {
      setIsLoading(false);
    }
  };

  const actionRow = (
    <div className="flex items-center justify-between">
      {!isEdit ? (
        <TextButton
          type="button"
          onClick={() => setIsEdit(true)}
          editType='edit'
        />
      ) : (
        label !== initialTitle &&
        label.length >= MIN_TITLE_LENGTH && (
          <TextButton 
          type="submit" 
          isLoading={isLoading} 
          loadingText='Saving...' 
          editType='save'/>
        )
      )}
    </div>
  );

  const fieldDescription =
    `Keep it short, clear, and engaging. Learners will see this as the chapter’s title.`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === 'chapter' ? (
        <div className=" space-y-2">
          <Label htmlFor="label" className="text-lg font-semibold">
            Chapter Topic
          </Label>
          <p className="text-  text-muted-foreground">{fieldDescription}</p>

          <div className=" flex flex-col sm:flex-row gap-4 sm:items-center ">
            <CustomInput
              id="label"
              name="label"
              value={label}
              onChange={handleChange}
              error={error}
              disabled={!isEdit || isLoading}
              wrapper="max-w-xl"
              placeholder="e.g. Introduction to Algebra"
            />
            {actionRow}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-slate-50 rounded-md border space-y-4">
          <CustomInput
            label="Chapter Topic"
            description={fieldDescription}
            value={label}
            onChange={handleChange}
            error={error}
            disabled={!isEdit || isLoading}
            placeholder="e.g. Getting Started with Calculus"
          />
          {actionRow}
        </div>
      )}
    </form>
  );
};

export default ChapterTitleForm;

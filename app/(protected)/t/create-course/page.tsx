// app/instructor/create/page.tsx

"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
// import { UploadDropzone } from "@/components/media/UploadDropzone";

export default function CreateCoursePage() {
  const [course, setCourse] = useState({
    title: "",
    subtitle: "",
    category: "",
    description: "",
    language: "English",
    price: "",
    level: "Beginner",
    thumbnail: "",
    isFree: false,
    sections: [],
    requirements: "",
    goals: "",
    tags: "",
  
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleToggleFree = (checked: boolean) => {
    setCourse({ ...course, isFree: checked });
  };

  const handleThumbnailUpload = (url: string) => {
    setCourse({ ...course, thumbnail: url });
  };

  const handleCreateCourse = () => {
    // Replace with actual API logic
    // toast
    console.log("Course Data:", course);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Basic Info */}
        <TabsContent value="basic" className="space-y-4">
          <div>
            <Label>Course Title</Label>
            <Input name="title" value={course.title} onChange={handleChange} placeholder="e.g., Learn React from Scratch" />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input name="subtitle" value={course.subtitle} onChange={handleChange} placeholder="A complete guide to modern web development" />
          </div>
          <div>
            <Label>Category</Label>
            <Input name="category" value={course.category} onChange={handleChange} placeholder="e.g., Web Development" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea name="description" value={course.description} onChange={handleChange} rows={6} placeholder="What will students learn in this course?" />
          </div>
          <div>
            <Label>Thumbnail</Label>
            {/* <UploadDropzone onUpload={handleThumbnailUpload} /> */}
          </div>
        </TabsContent>

        {/* Curriculum */}
        <TabsContent value="curriculum" className="space-y-4">
          <p className="text-muted-foreground text-sm">Coming soon: Section and lesson builder with video upload, attachments, and quizzes.</p>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-4">
          <div>
            <Label>Language</Label>
            <Input name="language" value={course.language} onChange={handleChange} />
          </div>
          <div>
            <Label>Level</Label>
            <Input name="level" value={course.level} onChange={handleChange} />
          </div>
          <div>
            <Label>Price</Label>
            <Input name="price" value={course.price} onChange={handleChange} placeholder="e.g., 29.99" type="number" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="isFree">Mark as Free Course</Label>
            <Switch id="isFree" checked={course.isFree} onCheckedChange={handleToggleFree} />
          </div>
          <div>
            <Label>Requirements</Label>
            <Textarea name="requirements" value={course.requirements} onChange={handleChange} placeholder="What should students already know?" />
          </div>
          <div>
            <Label>Learning Goals</Label>
            <Textarea name="goals" value={course.goals} onChange={handleChange} placeholder="What will students achieve?" />
          </div>
          <div>
            <Label>Tags</Label>
            <Input name="tags" value={course.tags} onChange={handleChange} placeholder="e.g., react, javascript, frontend" />
          </div>
          <Button className="mt-4" onClick={handleCreateCourse}>Create Course</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

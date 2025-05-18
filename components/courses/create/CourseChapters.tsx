"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Course, Chapter } from "@/types";
import clsx from "clsx";

const ChapterItem = ({ chapter, index }: { chapter: Chapter; index: number }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        "flex items-center justify-between p-3 bg-white border rounded-md shadow-sm transition",
        isDragging && "bg-slate-100 shadow-lg"
      )}
    >
      <span className="truncate text-sm font-medium">
        {index + 1}. {chapter.label}
      </span>

      <div className="flex items-center gap-2">
        <small className="rounded-full py-1 px-3  border">{chapter.status}</small>
        <Link
            href={`/dashboard/courses/${chapter.id}/chapters/${chapter.id}`}
            className="text-green-600 hover:underline"
        >
            <Pen className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export const CourseChapters = ({ course }: { course: Course }) => {
  const [chapters, setChapters] = useState(course.chapters || []);
  const [hasChanges, setHasChanges] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = chapters.findIndex((ch) => ch.id === active.id);
      const newIndex = chapters.findIndex((ch) => ch.id === over.id);

      const newChapters = arrayMove(chapters, oldIndex, newIndex);
      setChapters(newChapters);
      setHasChanges(true);
    }
  };

  const handleAddChapter = () => {
    if (!newTitle.trim()) return;

    const newChapter: any = {
      id: `temp-${Date.now()}`,
      label: newTitle.trim(),
      course: course.id,
    };

    setChapters([...chapters, newChapter]);
    setNewTitle("");
    setShowInput(false);
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      // Call your backend to update chapter positions
      // Maybe: updateCourseChaptersOrder(course.id, chapters.map((c, i) => ({ id: c.id, position: i })))
      console.log("Saving order...", chapters);
      setHasChanges(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4 bg-slate-50 border rounded-md p-4">
      <h2 className="text-lg font-semibold">Chapters</h2>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={chapters.map((ch) => ch.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {chapters.map((chapter, index) => (
              <ChapterItem key={chapter.id} chapter={chapter} index={index} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {showInput ? (
        <div className="flex items-center gap-2">
          <Input
            placeholder="New chapter title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Button size="sm" onClick={handleAddChapter}>
            Add
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setShowInput(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setShowInput(true)}>
          + Add a chapter
        </Button>
      )}

      {hasChanges && (
        <Button onClick={handleSave} className="mt-2">
          Save Order
        </Button>
      )}
    </div>
  );
};

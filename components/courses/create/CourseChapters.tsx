import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { Chapter, Section } from "@/types";

const ChapterItem = ({ chapter, index }: { chapter: Chapter; index: number }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `chapter-${chapter.id}` });

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
        "flex items-center justify-between p-2 bg-white border rounded shadow-sm",
        isDragging && "bg-slate-100"
      )}
    >
      <span className="text-sm font-medium">{index + 1}. {chapter.label}</span>
    </div>
  );
};

export const CourseChapters = ({ chapters }: { chapters: Chapter[] }) => {
  return (
    <SortableContext
      items={chapters.map((c) => `chapter-${c.id}`)}
      strategy={verticalListSortingStrategy}
    >
      <div className="space-y-2">
        {chapters.map((chapter, index) => (
          <ChapterItem key={chapter.id} chapter={chapter} index={index} />
        ))}
      </div>
    </SortableContext>
  );
};










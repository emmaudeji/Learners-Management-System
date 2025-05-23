import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { Chapter, Course, Section } from "@/types";
import { Grid, LayoutGrid, PenLine } from "lucide-react";
import Link from "next/link";
import { getUrl } from "@/lib/helper";
import { Dispatch, SetStateAction } from "react";
import { TextButton } from "@/components/shared/CustomButton";

const ChapterItem = ({ chapter, index, course , setChapter, setCurrentStepIndex}: { chapter: Chapter; index: number, course:Course,
    setChapter:Dispatch<SetStateAction<Chapter>>
    setCurrentStepIndex:Dispatch<SetStateAction<number>>
 }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `chapter-${chapter.alias}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      
      className={clsx(
        "flex gap-2 items-center justify-between p-2 bg-white border-b mb-2",
        isDragging && "bg-slate-100"
      )}
    >
        <LayoutGrid size={20} {...listeners} className='cursor-grab text-gray-300 hover:text-gray-500'/>

        <span className="text-sm capitalize font- w-full">{index + 1}. {chapter.label}</span>
        <div className="flex">
          <TextButton editType="edit" onClick={()=>{
            setChapter(chapter)
            setCurrentStepIndex(2)
          }}/>
        </div>
    </div>
  );
};

export const CourseChapters = ({ chapters, course, setChapter, setCurrentStepIndex}: { chapters: Chapter[], course:Course,
    setChapter:Dispatch<SetStateAction<Chapter>>
    setCurrentStepIndex:Dispatch<SetStateAction<number>>
    
 }) => {
  return (
    <SortableContext
      items={chapters?.map((c) => `chapter-${c.alias}`)}
      strategy={verticalListSortingStrategy}
    >
      <div className="space-y-2">
        {chapters?.map((chapter, index) => (
          <ChapterItem key={chapter.alias} chapter={chapter} index={index} course={course} setChapter={setChapter} setCurrentStepIndex={setCurrentStepIndex} />
        ))}
      </div>
    </SortableContext>
  );
};









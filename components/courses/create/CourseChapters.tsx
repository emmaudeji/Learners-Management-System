import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { Chapter, Course, Section } from "@/types";
import { Grid, LayoutGrid, PenLine } from "lucide-react";
import Link from "next/link";
import { getUrl } from "@/lib/helper";
import { Dispatch, SetStateAction } from "react";
import { TextButton } from "@/components/shared/CustomButton";
import { useRouter } from "next/navigation";

const ChapterItem = ({ chapter, index, section , setChapter, setCurrentStepIndex}: { 
    chapter: Chapter; 
    section: Section; 
    index: number, course:Course,
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
  const {replace} = useRouter()
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      
      className={clsx(
        "flex pl-4 gap-2 items-center justify-between p-2 bg-white border-b mb-2",
        isDragging && "bg-slate-100"
      )}
    >
        {/* <LayoutGrid size={20} {...listeners} className='cursor-grab text-gray-300 hover:text-gray-500'/> */}

        <span className="text-sm capitalize font- w-full"> <span className="text-gray-500">CH {index + 1}.</span> {chapter.label}</span>
        <div className="flex">
          <TextButton editType="edit" onClick={()=>{
            setChapter(chapter)
            setCurrentStepIndex(2)
            replace(`?step=2&chapter=${chapter.alias}&section=${section.alias}`)
          }}/>
        </div>
    </div>
  );
};

export const CourseChapters = ({ chapters, course, section, setChapter, setCurrentStepIndex}: { chapters: Chapter[], course:Course,
    setChapter:Dispatch<SetStateAction<Chapter>>
    setCurrentStepIndex:Dispatch<SetStateAction<number>>
    section: Section; 
    
 }) => {
  return (
    <SortableContext
      items={chapters?.map((c) => `chapter-${c.alias}`)}
      strategy={verticalListSortingStrategy}
    >
      <div className="space-y-2">
        {chapters?.map((chapter, index) => (
          <ChapterItem key={chapter.alias} 
            section={section}
            chapter={chapter} index={index} course={course} setChapter={setChapter} setCurrentStepIndex={setCurrentStepIndex} />
        ))}
      </div>
    </SortableContext>
  );
};









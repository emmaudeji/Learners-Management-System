import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
 
import { TextButton } from "@/components/shared/CustomButton";
import { useRouter } from "next/navigation";
import { useCreateCourse } from "@/context/CreateCourseContext";
 
import {  Chapter, Section } from "@/types";

const ChapterItem = ({index, chapter, sectionId, sectionIndex }: { 
    chapter:Chapter,
    index: number, 
    sectionId:string,
    sectionIndex:number
 }) => {
  const {
      setCurrentStepIndex,
      setChapter,
    } = useCreateCourse()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `chapter-${chapter?.alias}` });

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

        <span className="text-xs capitalize font- w-full"> <span className="text-gray-500">
          <span className="hidden sm:inline ">Lesson</span> {sectionIndex+1}.{index + 1}.</span> {chapter?.label}</span>

        <div className="flex">
          <TextButton editType="edit" onClick={()=>{
            setChapter(chapter)
            setCurrentStepIndex(2)
            replace(`?step=2&chapter=${chapter?.alias}&section=${sectionId}`)
          }}/>
        </div>
    </div>
  );
};

export const CourseChapters = ( {section, sectionIndex}:{ section: Section, sectionIndex:number} ) => {
  return (
    <SortableContext
      items={section?.chapters?.map((c) => `chapter-${c.alias}`)}
      strategy={verticalListSortingStrategy}
    >
      <div className="space-y-2">
        {section?.chapters?.map((chap, index) => (
          <ChapterItem key={chap?.alias} index={index} chapter={chap} sectionId={section.alias}  sectionIndex={sectionIndex} />
        ))}
      </div>
    </SortableContext>
  );
};









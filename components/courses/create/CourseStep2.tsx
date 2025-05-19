'use client'
// creating new course stage 1 

import { useState } from 'react'
import { CustomInput } from '@/components/shared/CustomInput'
import { toast } from 'react-toastify'
import { CustomButton } from '@/components/shared/CustomButton'
import { postRequest } from '@/utils/api'
import { appwriteConfig } from '@/lib/actions/config'
import { fields } from '@/constants'
import { generateSlug } from '@/lib/helper'
import { Course } from '@/types'
import { Button } from '@/components/ui/button'
import { LayoutGrid, LayoutList, Trash2 } from 'lucide-react'
import DeleteCard from '@/components/common/DeleteCard'
import { Card } from '@/components/ui/card'
import Heading from '@/components/common/Heading'
import TitleForm from './TitleForm'
import DescriptionForm from './DescriptionForm'
import CoverImageForm from './CoverImageForm'
import { CourseChapters } from './CourseChapters'
import PriceForm from './PriceForm'
import { CourseSections } from './CourseSections'

const CourseStep2 = ({course}:{
  course:Course
}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
  })

  const [errors, setErrors] = useState({
    title: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {
      title: form.title.trim() ? '' : 'Course title is required.',
      description: form.description.trim() ? '' : 'Course description is required.',
    }
    setErrors(newErrors)
    return !newErrors.title && !newErrors.description
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      toast.error('Please fix the errors before submitting.')
      return
    }

    try {
      setIsLoading(true)

      // Simulate API request
      const {data,error} = await postRequest({
        body: {
          collectionId: appwriteConfig.coursesCollectionId,
          formData: {
            ...form,
            alias: generateSlug(form.title)
          },
          fields: fields.courses,
        }
      })

      if(error){
        toast.error(error||"Unsuccessful, check network and try again")
        return 
      }

      toast.success('Course details saved! Proceed to next step.')

      // Proceed to next step or reset form
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="padding py-12 w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold pb-3">Setup course </h2>
        <p className="text-sm text-muted-foreground">
          Completed 2/6
        </p>
      </div>

      <div className="flex justify-self-end gap-4">
        <Button className='bg-black'>Publish</Button>
        <DeleteCard onDelete={async ()=>{}} trigger={<Button variant='outline' className='border border-red-400 text-red-400 hover:text-red-700 duration-300 '><Trash2/></Button>}/>
      </div>

      <section className="grid gap-8 md:grid-cols-2">
         <div className="space-y-4">

          <Heading title='Customize your course' icon={<LayoutGrid/>} />
          <TitleForm course={course} />
          <DescriptionForm course={course} />
          <CoverImageForm course={course}  />

         </div>




         <div className="space-y-4">
          <Heading title='Course Sections and Chapters' icon={<LayoutList/>} />

          <CourseSections course={course} />

          <PriceForm course={course}/>

         </div>
      </section>

 
    </section>
  )
}

export default CourseStep2











// "use client";

// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ChevronDown, Pen } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import { Course, Chapter, Section } from "@/types";
// import clsx from "clsx";
// import { CourseChapters } from "./CourseChapters";

// const SectionItem = ({ section, index }: { section: Section; index: number }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: section.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const [dropSection, setDropSection] = useState(false)

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className={clsx(
//         "p-3 bg-white border rounded-md shadow-sm transition",
//         isDragging && "bg-slate-100 shadow-lg"
//       )}
//     >
//       <div className="flex items-center justify-between">
//         <span className="truncate text-sm font-medium">
//           {index + 1}. {section.label}
//         </span>

//         <div className="flex items-center gap-2">
//           <small className="rounded-full py-1 px-3  border">{section.status || "DRAFT"}</small>
//               <Pen className="w-4 h-4" />
              
//               <ChevronDown size={20} className={`${dropSection ? 'rotate-180':''} transform transition-transform duration-300`} onClick={()=>setDropSection(true)} />
//         </div>
//       </div>

//       <div className={`${dropSection ? 'min-h-screen':'min-h-0'} transform transition-transform duration-300`}>
//         <CourseChapters section={section}/>

//       </div>


//     </div>
//   );
// };

// export const CourseSections = ({ course }: { course: Course }) => {
//   const [sections, setSections] = useState(course.section || []);
//   const [hasChanges, setHasChanges] = useState(false);
//   const [newTitle, setNewTitle] = useState("");
//   const [showInput, setShowInput] = useState(false);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   );

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;
//     if (active.id !== over?.id) {
//       const oldIndex = sections.findIndex((ch) => ch.id === active.id);
//       const newIndex = sections.findIndex((ch) => ch.id === over.id);

//       const newChapters = arrayMove(sections, oldIndex, newIndex);
//       setSections(newChapters);
//       setHasChanges(true);
//     }
//   };

//   const handleAddChapter = () => {
//     if (!newTitle.trim()) return;

//     const newChapter: any = {
//       id: `temp-${Date.now()}`,
//       label: newTitle.trim(),
//       course: course.id,
//     };

//     setSections([...sections, newChapter]);
//     setNewTitle("");
//     setShowInput(false);
//     setHasChanges(true);
//   };

//   const handleSave = async () => {
//     try {
//       // Call your backend to update section positions
//       // Maybe: updateCourseSectionsOrder(course.id, sections.map((c, i) => ({ id: c.id, position: i })))
//       console.log("Saving order...", sections);
//       setHasChanges(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="space-y-4 bg-slate-50 border rounded-md p-4">
//       <h2 className="text-lg font-semibold">Chapters</h2>

//       <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <SortableContext items={sections.map((ch) => ch.id)} strategy={verticalListSortingStrategy}>
//           <div className="space-y-3">
//             {sections.map((section, index) => (
//               <SectionItem key={section.id} section={section} index={index} />
//             ))}
//           </div>
//         </SortableContext>
//       </DndContext>

//       {showInput ? (
//         <div className="flex items-center gap-2">
//           <Input
//             placeholder="New section title"
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//           />
//           <Button size="sm" onClick={handleAddChapter}>
//             Add
//           </Button>
//           <Button size="sm" variant="ghost" onClick={() => setShowInput(false)}>
//             Cancel
//           </Button>
//         </div>
//       ) : (
//         <Button variant="outline" size="sm" onClick={() => setShowInput(true)}>
//           + Add a section
//         </Button>
//       )}

//       {hasChanges && (
//         <Button onClick={handleSave} className="mt-2">
//           Save Order
//         </Button>
//       )}
//     </div>
//   );
// };




// "use client";

// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Pen } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import { Course, Chapter, Section } from "@/types";
// import clsx from "clsx";

// const ChapterItem = ({ chapter, index }: { chapter: Chapter; index: number }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: chapter.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className={clsx(
//         "flex items-center justify-between p-3 bg-white border rounded-md shadow-sm transition",
//         isDragging && "bg-slate-100 shadow-lg"
//       )}
//     >
//       <span className="truncate text-sm font-medium">
//         {index + 1}. {chapter.label}
//       </span>

//       <div className="flex items-center gap-2">
//         <small className="rounded-full py-1 px-3  border">{chapter.status}</small>
//         <Link
//             href={`/dashboard/sections/${chapter.id}/chapters/${chapter.id}`}
//             className="text-green-600 hover:underline"
//         >
//             <Pen className="w-4 h-4" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export const CourseChapters = ({ section }: { section: Section }) => {
//   const [chapters, setChapters] = useState(section.chapters || []);
//   const [hasChanges, setHasChanges] = useState(false);
//   const [newTitle, setNewTitle] = useState("");
//   const [showInput, setShowInput] = useState(false);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   );

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;
//     if (active.id !== over?.id) {
//       const oldIndex = chapters.findIndex((ch) => ch.id === active.id);
//       const newIndex = chapters.findIndex((ch) => ch.id === over.id);

//       const newChapters = arrayMove(chapters, oldIndex, newIndex);
//       setChapters(newChapters);
//       setHasChanges(true);
//     }
//   };

//   const handleAddChapter = () => {
//     if (!newTitle.trim()) return;

//     const newChapter: any = {
//       id: `temp-${Date.now()}`,
//       label: newTitle.trim(),
//       section: section.id,
//     };

//     setChapters([...chapters, newChapter]);
//     setNewTitle("");
//     setShowInput(false);
//     setHasChanges(true);
//   };

//   const handleSave = async () => {
//     try {
//       // Call your backend to update chapter positions
//       // Maybe: updateCourseChaptersOrder(section.id, chapters.map((c, i) => ({ id: c.id, position: i })))
//       console.log("Saving order...", chapters);
//       setHasChanges(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="space-y-4 bg-slate-50 border rounded-md p-4">
//       <h2 className="text-lg font-semibold">Chapters</h2>

//       <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <SortableContext items={chapters.map((ch) => ch.id)} strategy={verticalListSortingStrategy}>
//           <div className="space-y-3">
//             {chapters.map((chapter, index) => (
//               <ChapterItem key={chapter.id} chapter={chapter} index={index} />
//             ))}
//           </div>
//         </SortableContext>
//       </DndContext>

//       {showInput ? (
//         <div className="flex items-center gap-2">
//           <Input
//             placeholder="New chapter title"
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//           />
//           <Button size="sm" onClick={handleAddChapter}>
//             Add
//           </Button>
//           <Button size="sm" variant="ghost" onClick={() => setShowInput(false)}>
//             Cancel
//           </Button>
//         </div>
//       ) : (
//         <Button variant="outline" size="sm" onClick={() => setShowInput(true)}>
//           + Add a chapter
//         </Button>
//       )}

//       {hasChanges && (
//         <Button onClick={handleSave} className="mt-2">
//           Save Order
//         </Button>
//       )}
//     </div>
//   );
// };

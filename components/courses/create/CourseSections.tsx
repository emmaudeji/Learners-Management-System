'use client';

import {
  DndContext,
  closestCenter,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Dispatch, SetStateAction, useState } from 'react';
import { Course, Section,  Chapter,   } from '@/types';
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/components/shared/CustomInput';

const MIN_SECTION_LENGTH = 5;
 
async function saveSections(sections: Section[]) {
  const results = await Promise.allSettled(
    sections.map(async (section) => {
      const { id, label, status } = section

      const { data, error } = await putRequest({
        body: {
          collectionId: appwriteConfig.sectionsCollectionId,
          documentId: id,
          formData: { label, status },
        },
      })

      if (error) {
        console.error(`Error updating section ${id}:`, error)
        return { id, success: false, error }
      }

      return { id, success: true, data }
    })
  )

  const successful = results.filter(
    (result): result is PromiseFulfilledResult<{ id: string; success: true; data: any }> =>
      result.status === 'fulfilled' && result.value.success
  )

  const failed = results.filter(
    (result): result is PromiseFulfilledResult<{ id: string; success: false; error: any }> =>
      result.status === 'fulfilled' && !result.value.success
  )

  return {
    successfulUpdates: successful.map((r) => r.value),
    failedUpdates: failed.map((r) => r.value),
  }
}

export const CourseSections = () => {
  const {user} = useUserStore()
  const {
    sections,
    setSections,
    course,
  } = useCreateCourse()

  const [hasChanges, setHasChanges] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const [activeType] = String(active.id).split('-');
    const [overType] = String(over.id).split('-');

    if (activeType === 'section' && overType === 'section') {
      const oldIndex = sections.findIndex((s) => `section-${s.alias}` === active.id);
      const newIndex = sections.findIndex((s) => `section-${s.alias}` === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setSections(arrayMove(sections, oldIndex, newIndex));
        setHasChanges(true);
      }
    }

    if (activeType === 'chapter') {
      let sourceSectionIndex = -1;
      let targetSectionIndex = -1;
      let chapterToMove: Chapter | null = null;

      sections.forEach((section, sIndex) => {
        const cIndex = section?.chapters.findIndex((c) => `chapter-${c.alias}` === active.id);
        if (cIndex > -1) {
          sourceSectionIndex = sIndex;
          chapterToMove = section?.chapters[cIndex];
        }

        if (section?.chapters.some((c) => `chapter-${c.alias}` === over.id)) {
          targetSectionIndex = sIndex;
        }
      });

      if (chapterToMove && sourceSectionIndex !== -1 && targetSectionIndex !== -1) {
        const newSections = [...sections];
        newSections[sourceSectionIndex].chapters = newSections[sourceSectionIndex].chapters.filter(
          (c) => `chapter-${c.alias}` !== active.id
        );

        const targetChapters = [...newSections[targetSectionIndex].chapters];
        const targetIndex = targetChapters.findIndex((c) => `chapter-${c.alias}` === over.id);
        targetChapters.splice(targetIndex, 0, chapterToMove);
        newSections[targetSectionIndex].chapters = targetChapters;

        setSections(newSections);
        setHasChanges(true);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTitle(value);
    setError('')
  };
 

const handleAddSection = async () => {
  const title = newTitle.trim();

  if (title.length < MIN_SECTION_LENGTH) {
    setError('Title must be at least 5 characters.');
    return;
  }

  setLoading(true);
  setError('');

  const formData = {
    alias: generateSlug(title),
    label: title,
    course: course.id,
    status: 'ACTIVE',
    createdBy: user?.id,
    position: sections.length,
    courseId:course.alias
  };

  console.log({formData})
  try {
    const { data, error } = await postRequest({
      body: {
        collectionId: appwriteConfig.sectionsCollectionId,
        formData,
      },
    });
  console.log({data,error})
    if (error) {
      toast.error('Failed to add section?. Please try again.');
      return;
    }

    setSections(prev => [...prev, data]);
    setNewTitle('');
    setShowInput(false);
    toast.success('Section added successfully');
  } catch (err) {
    toast.error('An unexpected error occurred.');
  } finally {
    setLoading(false);
  }
};


  const handleUpdateLabel =  async (id: string, label: string, status?:string) => {
    const initialState = sections
    setLoading(true)

    const updated = sections.map((s) =>
      s.alias === id ? { ...s, label } : s
    );
    setSections(updated);

    const {data,error} = await putRequest({
      body:{
        collectionId:appwriteConfig.sectionsCollectionId,
        documentId:id,
        formData: {label, status}
      }
    })
    if(error){
      // reset setSections
      setSections(initialState)
      toast.error('Your request was not completed, try again.')
      return
    }
    setLoading(false)
    toast.success("The Section update was successfully")

  };

  const handleSave = async () => {
    try {
      setSaving(true)
      console.log('Saving order...', sections);
      const {successfulUpdates,failedUpdates} = await saveSections(sections)
      if(failedUpdates.length){
        toast.error("Your requested update was not completed. Try again")
        return
      }

      toast.success("Requested updated was saved successfully")
      setHasChanges(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false)
    }
  };

// console.log({sections})
  return (
    <section className="flex flex-col items-center pt-8 px-4 pb-20 gap-4">
      <Heading title='Course Modules and Chapters' icon={<LayoutList/>} />
      <section className="  w-full mx-auto max-w-2xl  card  space-y-3">
        <div className="space-y- ">
          <h6 className="font-semibold text">Course Modules</h6>
          <p className="text-gray-700">
            Easily create, edit modules and add new chapters. Drag and drop to reorder the lists
          </p>
        </div>

        {hasChanges && (
          <CustomButton disabled={loading} isLoading={saving} loadingText='Saving...' onClick={handleSave} className="mt-2 flex justify-self-end text-sm h-8 bg-black">
            Save reordering
          </CustomButton>
        )}

        <div className=" space-y-2 ">
          {
            sections.length > 0 ?
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext
                items={sections.map((s) => `section-${s.alias}`)}
                strategy={verticalListSortingStrategy}
              >
                {sections.map((sectionItem, index) => (
                  <SectionItem
                    key={sectionItem?.alias}
                    index={index}
                    onUpdateLabel={handleUpdateLabel}
                    section={sectionItem!}
                  />
                ))}
              </SortableContext>
            </DndContext>
              :
            <p className="flex justify-self-center items-self-center text-center w-80 p-6 text-gray-600 text-sm italic">Empty list. Start adding sections</p>
          }
        </div>

        <section>
          {showInput ? (
            <div className="flex items-center gap-2">
              <CustomInput
                disabled={loading}
                placeholder="New section title"
                value={newTitle}
                onChange={handleChange}
                error={error}
                className='bg-white'
              />
              <CustomButton size="sm" variant="outline" disabled={saving} isLoading={loading} loadingText='Add' onClick={handleAddSection}>
                Add
              </CustomButton>
              <Button disabled={loading||saving} size="sm" variant="ghost" onClick={() => setShowInput(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button disabled={loading||saving}  variant="outline" size="sm" onClick={() => setShowInput(true)}>
              + Add a module
            </Button>
          )}
        </section>
      </section>
    </section>
  );
};




import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronDown, Grid, Layout, LayoutDashboard, LayoutGrid, LayoutList, Pen, PenLine, Trash2, X } from 'lucide-react';
import clsx from 'clsx';
import { CourseChapters } from './CourseChapters';
import { generateSlug } from '@/lib/helper';
import { deleteRequest, postRequest, putRequest } from '@/utils/api';
import { appwriteConfig } from '@/lib/actions/config';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'react-toastify';
import { CustomButton, TextButton } from '@/components/shared/CustomButton';
import Heading from '@/components/common/Heading';
import DeleteCard from '@/components/common/DeleteCard';
import StatusSelect from './StatusSelect';
import { useCreateCourse } from '@/context/CreateCourseContext';

export default function SectionItem({
  index, 
  onUpdateLabel, 
  section,
}: {
  index: number;
  onUpdateLabel: (id: string, label: string, status?:string) => void;
  section: Section;
}) {
  const {user} = useUserStore()
  const {course,sections, setSections} = useCreateCourse()

  // const [chapters, setChapters] = useState<Chapter[]>(section?.chapters||[])
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `section-${section?.alias}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [sectionTitle, setSectionTitle] = useState(section?.label || '');
   

  const [error, setError] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');

  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);


  const handleUpdateSectionTitle = () => {
      if (sectionTitle.trim().length < 5) {
        setError('Title must be at least 5 characters.');
        return;
      }
      try {
        setSaving(true)
        onUpdateLabel(section?.alias!, sectionTitle.trim(), section?.status);
        setEditing(false);
        setError('');
          
      } catch (error) {
        console.log({error})
        toast.error("Unexpected error occured, check your network and try again.")
      } finally {
        setSaving(false)
      }

    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChapterTitle(value);
  };

  const handleAddChapter = async () => {
    const label = chapterTitle.trim();

    if (chapterTitle.length < MIN_SECTION_LENGTH) {
      setError('Title must be at least 5 characters.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = {
      alias: generateSlug(chapterTitle),
      label,
      section: section?.alias,
      course: course.id,
      status: 'ACTIVE',
      createdBy: user?.id,
      position: section?.chapters?.length,
      courseId: course.alias,
      sectionId: section?.alias,
    };

    try {
      const { data, error } = await postRequest({
        body: {
          collectionId: appwriteConfig.chaptersCollectionId,
          formData,
        },
      });

  console.log({data,error})
      if (error) {
        toast.error('Failed to add chapter?. Please try again.');
        return;
      }

      // setChapters(prev => [...prev, data]);
      setSections(prevSections =>
          prevSections.map(sectionItem =>
            sectionItem?.alias === section?.alias
              ? {
                  ...sectionItem,
                  chapters: [...sectionItem?.chapters, data],
                }
              : sectionItem
          )
        );
      setChapterTitle('');
      setShowInput(false);
      toast.success('Section added successfully');
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handledeleteSection = async (documentId: string) => {
    const body = {
          documentId,
          collectionId: appwriteConfig.sectionsCollectionId,
        }
    try {
      const { success } = await deleteRequest({
        body 
      });

      if (success) {
        toast.success('Section deleted successfully');
        setSections((prev) => {
          const filteredList = prev?.filter(({alias})=>alias !== documentId)
          return filteredList
        })
      } else {
        toast.error('Section could not be deleted. Try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Unhandled error. Check your network and try again.');
    }
  };
 
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      
      className={clsx(
        'p-3 bg-white border rounded-md transition',
        isDragging && 'bg-slate-50 shadow-lg'
      )}
    >
      <div className="flex items-center capitalize justify-between gap-2 ">

        <LayoutGrid {...listeners} className='cursor-grab text-gray-300 hover:text-gray-500'/>

        {editing ? (
          <div className="flex items-center gap-2 w-full">
            <CustomInput
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              error={error}
              placeholder="Section title"
              className='bg-white h-8'
            />
            <CustomButton loadingText='Saving...' isLoading={saving} size="sm" onClick={handleUpdateSectionTitle}>
              Save
            </CustomButton>
            <TextButton size="sm" variant="ghost" onClick={() => setEditing(false)}>
              <X/>
            </TextButton>
          </div>
        ) : (
          <>
            <p className="truncate w-full  text-sm">
              <span className='text-gray-500'>MODULE {index + 1}. </span> <span className=' font-semibold'>{section?.label}</span> 
            </p>

            <div className="flex items-center gap-1">
              <StatusSelect
                  currentStatus = {section?.status}
                  documentId={section?.alias!}
                  collectionId={appwriteConfig.sectionsCollectionId}
              />
              <PenLine size={14} className="cursor-pointer text-blue-800" onClick={() => setEditing(true)} />
              
              <DeleteCard
                trigger={<Trash2 size={14} className="text-red-600 cursor-pointer" />}
                onDelete={() => handledeleteSection(section?.alias!)}
                text={`Are you sure you want to delete the section "${section?.label}"? This action will also permanently delete all associated chapters and quizzes.`}
              />
                <ChevronDown
                  size={20}
                  className={`${expanded ? 'rotate-180' : ''} transition-transform cursor-pointer`}
                  onClick={() => setExpanded((prev) => !prev)}
                />
              
            </div>
          </>
        )}
      </div>

      {expanded && !editing && (
        <>
          {section?.chapters &&  section?.chapters?.length > 0 ? (
            <div className="mt-2 border-t pt-2">
              <CourseChapters section={section} sectionIndex={index} />
            </div>
          ) : (
            <div className="border-t my-2 pt-2 text-center text-sm italic text-gray-500">
              Empty list. Start adding chapters
            </div>
          )}
          <div className="flex w-full ">
            {
              showInput ? (
              <div className="flex items-center gap-2 pt-2 w-full">
                <CustomInput
                  disabled={loading}
                  placeholder="New chapter title"
                  value={chapterTitle}
                  // onChange={(e) => setChapterTitle(e.target.value)}
                  onChange={handleChange}
                  error={error}
                  className='bg-white h-'
                />
                <CustomButton size="sm" variant="outline" disabled={saving} isLoading={loading} loadingText='Add' onClick={handleAddChapter}>
                  Add
                </CustomButton>
                <Button disabled={loading||saving} size="sm" variant="ghost" onClick={() => setShowInput(false)}>
                  Cancel
                </Button>
              </div>
              ) : (
              <Button disabled={loading||saving}  variant="outline" size="sm" onClick={() => setShowInput(true)}>
                + Add a chapter
              </Button>
            )
          }
          </div>
        </>
      )}
    </div>
  );
}
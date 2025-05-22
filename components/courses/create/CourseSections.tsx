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
import { useState } from 'react';
import { Course, Section,  Chapter, SectionInput } from '@/types';
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


export const CourseSections = ({ course }: { course: Course }) => {
  const {user} = useUserStore()
console.log({course})

  const [sections, setSections] = useState<Section[]>(course.sections || []);
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
      const oldIndex = sections.findIndex((s) => `section-${s.id}` === active.id);
      const newIndex = sections.findIndex((s) => `section-${s.id}` === over.id);
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
        const cIndex = section.chapters.findIndex((c) => `chapter-${c.id}` === active.id);
        if (cIndex > -1) {
          sourceSectionIndex = sIndex;
          chapterToMove = section.chapters[cIndex];
        }

        if (section.chapters.some((c) => `chapter-${c.id}` === over.id)) {
          targetSectionIndex = sIndex;
        }
      });

      if (chapterToMove && sourceSectionIndex !== -1 && targetSectionIndex !== -1) {
        const newSections = [...sections];
        newSections[sourceSectionIndex].chapters = newSections[sourceSectionIndex].chapters.filter(
          (c) => `chapter-${c.id}` !== active.id
        );

        const targetChapters = [...newSections[targetSectionIndex].chapters];
        const targetIndex = targetChapters.findIndex((c) => `chapter-${c.id}` === over.id);
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
    if (error && value.length >= MIN_SECTION_LENGTH) {
      setError('');
    } else if (value.length < MIN_SECTION_LENGTH) {
      setError('Title must be at least 5 characters.');
    }
  };
// console.log({data,error})

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
  };

  try {
    const { data, error } = await postRequest({
      body: {
        collectionId: appwriteConfig.sectionsCollectionId,
        formData,
      },
    });
console.log({data,error})
    if (error) {
      toast.error('Failed to add section. Please try again.');
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
      s.id === id ? { ...s, label } : s
    );
    setSections(updated);

    const {data,error} = await putRequest({
      body:{
        collectionId:appwriteConfig.coursesCollectionId,
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
    <section className="p-4 bg-slate-100 border rounded-md space-y-3">
      <div className="space-y- ">
        <p className="font-semibold">Sections</p>
        <small className="text-gray-700">
          Easily create new item and drag to reorder the lists
        </small>
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
            items={sections.map((s) => `section-${s.id}`)}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section, index) => (
              <SectionItem
                key={section.alias}
                section={section}
                course={course}
                index={index}
                onUpdateLabel={handleUpdateLabel}
              />
            ))}
          </SortableContext>
        </DndContext>
        :
        <p className="flex justify-self-center items-self-center text-center w-60 p-6 text-gray-600">Empty list. Start adding sections</p>
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
            + Add a section
          </Button>
        )}
      </section>
    </section>
  );
};





import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronDown, Grid, Layout, LayoutDashboard, LayoutGrid, Pen } from 'lucide-react';
import clsx from 'clsx';
import { CourseChapters } from './CourseChapters';
import { generateSlug } from '@/lib/helper';
import { postRequest, putRequest } from '@/utils/api';
import { appwriteConfig } from '@/lib/actions/config';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'react-toastify';
import { CustomButton } from '@/components/shared/CustomButton';
import { Input } from '@/components/ui/input';

export default function SectionItem({
  section,
  course,
  index,
  onUpdateLabel,
}: {
  section: Section;
  index: number;
  course:Course;
  onUpdateLabel: (id: string, label: string, status?:string) => void;
}) {
  const {user} = useUserStore()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `section-${section.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [sectionTitle, setSectionTitle] = useState(section.label || '');
  const [chapters, setChapters] = useState(section?.chapters || [])

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
        onUpdateLabel(section.id, sectionTitle.trim(), section.status);
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
    if (error && value.length >= MIN_SECTION_LENGTH) {
      setError('');
    } else if (value.length < MIN_SECTION_LENGTH) {
      setError('Title must be at least 5 characters.');
    }
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
      section: course.id,
      status: 'ACTIVE',
      createdBy: user?.id,
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
        toast.error('Failed to add chapter. Please try again.');
        return;
      }

      setChapters(prev => [...prev, data]);
      setChapterTitle('');
      setShowInput(false);
      toast.success('Section added successfully');
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      
      className={clsx(
        'p-3 bg-white border rounded-md shadow-sm transition',
        isDragging && 'bg-slate-100 shadow-lg'
      )}
    >
      <div className="flex items-center justify-between gap-2 ">

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
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <>
            <span className="truncate text-sm w-full font-medium">
              {index + 1}. {section.label}
            </span>

            <div className="flex items-center gap-2">
              <small className="rounded-full py- px-3 border">{section.status || 'DRAFT'}</small>
              <Pen className="w-4 h-4 cursor-pointer" onClick={() => setEditing(true)} />
              
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
          {chapters &&  chapters?.length > 0 ? (
            <div className="mt-2 border-t pt-2">
              <CourseChapters course = {course} chapters={chapters} />
            </div>
          ) : (
            <div className="border-t mt-2 pt-2 text-center text-sm text-gray-500">
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
                  onChange={handleChange}
                  error={error}
                  className='bg-white h-8'
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

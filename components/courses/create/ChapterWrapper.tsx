'use client'

import React, { Dispatch, SetStateAction,  useState } from 'react'
import { Chapter, Course, Section } from '@/types'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import ContentEditor from './ContentEditor'
import ChapterTitleForm from './ChapterTitleForm'

import ChapterAttachments from './ChapterAttachments'
import { cn } from '@/lib/utils'
import { ArrowLeft, ChevronDown, ChevronLeftCircle, ChevronRightCircle, Menu, Plus, Trash2 } from 'lucide-react'
import ChapterAccessToggle from './ChapterAccessToggler'
import { appwriteConfig } from '@/lib/actions/config'
import ChapterMediaUpload from './ChapterVideoCoverUpload'
import { deleteRequest } from '@/utils/api'
import { toast } from 'react-toastify'
import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'
import DeleteCard from '@/components/common/DeleteCard'
import { useCreateCourse } from '@/context/CreateCourseContext'
import QuizeSetupWrapper from './QuizeSetupWrapper'

const ChapterContentForm = ( ) => {
  const {user} = useUserStore()
    const {
    setCurrentStepIndex,
    chapter,
    setSections
  } = useCreateCourse()
   
  const [type, setType] = useState<"content"| "media"  | "quizes" | "attachments">('content') // "content" | "quizes" | "attachments"
     const {replace, refresh, push} = useRouter()

    const deleteChapter= async () => {
      const body = {
            documentId:chapter?.alias!,
            collectionId: appwriteConfig.chaptersCollectionId,
          }
      try {
        const { success } = await deleteRequest({
          body 
        });

        if (success) {
          toast.success('Chapter deleted successfully');
          setCurrentStepIndex(1)
          setSections(prevSections =>
            prevSections.map(sectionItem =>
              sectionItem?.alias === chapter?.sectionId
                ? {
                    ...sectionItem,
                    chapters: sectionItem.chapters.filter(chap => chap.alias !== chapter.alias),
                  }
                : sectionItem
            )
          );

          refresh()


          // push(`/t/${user?.id}/my-courses/${course.id}?step=1`)
        } else {
          toast.error('Chapter could not be deleted. Try again.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Unhandled error. Check your network and try again.');
      }
    };

  return (
    <section  className="w-full space-y-8  ">
        <div className=" border-b w-full pb-8 space-y-4">
          <div className="flex px-4 text-xs sm:text-sm justify-end gap-2 items-center w-full flex-wrap mx-auto max-w-6xl">
              <Button type='button' onClick={()=>setType("content")} variant={'ghost'} className={` hover:bg-gray-100 ${type==="content" ? 'bg-green-100':''} `}>Content</Button>
              /
              <Button type='button' onClick={()=>setType("media")} variant={'ghost'} className={` hover:bg-gray-100 ${type==="media" ? 'bg-green-100':''} `}>Media</Button>
              /
              
              <Button type='button' onClick={()=>setType("quizes")} variant={'ghost'} className={` hover:bg-gray-100 ${type==="quizes" ? 'bg-green-100':''} `}>Quizes</Button>
              /
              <Button type='button' onClick={()=>setType("attachments")} variant={'ghost'} className={` hover:bg-gray-100 ${type==="attachments" ? 'bg-green-100':''} `}>Attachments</Button>
          </div>
          <div className="mx-auto px-4 max-w-6xl flex flex-col gap-4 sm:flex-row w-full sm:items-center justify-between ">
              <ChapterAccessToggle collectionId={appwriteConfig.chaptersCollectionId} documentId={chapter?.alias!} initialValue={chapter?.isFree!} />

              <div className="flex justify-end w-full gap-0.5 items-center ">
                <Button 
                  onClick={()=>{
                    setCurrentStepIndex(1)
                    replace('?step=1')
                  }}
                  variant={'ghost'} 
                  className='border-primary hover:bg-primary/5 text-primary'>
                  <Plus/> Add chapter
                </Button>

                <DeleteCard
                  onDelete={deleteChapter}
                  trigger={
                    <Button variant="ghost" className=" p-0 text-red-500 hover:bg-red-50 hover:text-red-700 transition">
                    <Trash2 className="h-4 w-4" /> Delete Chapter
                    </Button>
                  }
                  />
              </div>
          </div>
        </div>

        <div className="space-y-8 px-4 sm:px-6 lg:px-10 mx-auto max-w-4xl">
            <ChapterTitleForm chapter={chapter!} type='chapter' />

             {
              type==="content" ? 
               <ContentEditor chapter={chapter!}/>
              :
              type==="quizes" ? 
              <div className="space-y-2">
                <div className="">
                  <Label htmlFor="content" className="text-lg font-semibold">
                    Chapter Quize
                  </Label>
                  <p className="text-gray-600">Add a new question or update existing one.</p>
                </div>
                  {/* TODO: Add  chapter quize list */}
                 <QuizeSetupWrapper relationship={{chapter:chapter.alias}} quizeList={[]} />
            </div>
              :
              type==="attachments" ? 
              <ChapterAttachments chapter={chapter!}/>
              : 
              type==="media" ? 
              <ChapterMediaUpload chapter={chapter!}/>
              : null
             }
        </div>
      {/* Placeholder for future extensibility */}
      {/* <AttachmentsForm chapterId={chapter?.id} /> */}
      {/* <ChapterResourcesForm /> */}
    </section>
  )
}

export default ChapterContentForm
 

export const ChapterWrapper = ()  => {
  const {
    chapter,
  } = useCreateCourse()
  const [slideOut, setSlideOut] = useState(true);
  const [currentChapter, setCurrentChapter] = useState<Chapter>(chapter!);

  return (
    <section className="md:flex relative">
      {/* Sidebar - Mobile */}
      <ChaptersSideNav
 
        setSlideOut={setSlideOut}
        slideOut={slideOut}
        clasName="absolute top-0 z-10 bg-white md:hidden shadow border-r"
      />

      {/* Sidebar - Desktop */}
      <ChaptersSideNav
 
        setSlideOut={setSlideOut}
        slideOut={slideOut}
        clasName="max-md:hidden"
      />

      {/* Main Content */}
      <article className="relative flex-1 pt-8 pb-20 border-l h-full">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSlideOut((prev) => !prev)}
          className="absolute left-3 top-3 text-gray-500 flex gap-1 items-center"
          aria-label="Toggle Sidebar"
        >
          <ChevronRightCircle
            className={`w-6 h-6 ${slideOut ? "rotate-180" : ""} transition-all duration-500 ease`}
          />
          {!slideOut && <small>Modules</small>}
        </button>

        <ChapterContentForm   />
      </article>
    </section>
  );
};



export const ChaptersSideNav = ({
  slideOut,
  clasName,
  setSlideOut,
 
}: {
  slideOut: boolean;
  clasName: string;
  setSlideOut: Dispatch<SetStateAction<boolean>>;
 
}) => {
    const {
    chapter,
    setChapter,
    course,
  } = useCreateCourse()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (alias: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [alias]: !prev[alias],
    }));
  };

  return (
    <aside
      className={cn(
        "h-full overflow-hidden transition-all duration-500 ease-in-out bg-white border-r",
        slideOut ? "w-64" : "w-0",
        clasName
      )}
    >
      <button
        onClick={() => setSlideOut((prev) => !prev)}
        className="flex justify-self-end pt-3 pr-3   md:hidden"
        aria-label="Toggle Sidebar"
      >
        <ChevronLeftCircle className="w-6 h-6 hover:text-gray-700 text-gray-400" />
      </button>

      <div
        className={cn(
          "transition-opacity duration-300 ease-in-out delay-100 px-6 pb-8 pt-4 md:pt-8 space-y-4",
          slideOut ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <h6 className="text-muted-foreground text-sm font-semibold mb-2">Module Chapters</h6>

        {course.sections?.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No sections available</p>
        ) : (
          course.sections.map((section, index) => {
            const isExpanded = expandedSections[section.alias] ?? true;
            return (
              <div key={section.alias} className="pb-3 w-full border-b">
                <div className="flex items-center gap-2 mb-1">
                  <p className="flex-1 font-semibold text-gray-600 uppercase text-xs truncate">
                    M-{index + 1}. {section.label}
                  </p>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "cursor-pointer transition-transform",
                      !section.chapters.length && "text-gray-300 pointer-events-none",
                      isExpanded && "rotate-180"
                    )}
                    onClick={() => toggleSection(section.alias)}
                  />
                </div>

                {isExpanded && (
                  <ul className="space-y-1 ml-2">
                    {section.chapters.length === 0 ? (
                      <li className="text-xs text-gray-400 italic pl-1">No chapters</li>
                    ) : (
                      section.chapters.map((chap) => (
                        <li
                          key={chap.alias}
                          className={cn(
                            "text-sm cursor-pointer px-2 py-1 rounded hover:bg-gray-100",
                            chapter?.alias === chap.alias
                              ? "text-green-600 font-medium bg-green-50"
                              : "text-gray-700"
                          )}
                          onClick={() => setChapter(chap)}
                        >
                          {chap.label}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

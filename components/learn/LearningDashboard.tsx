'use client';

import React, { Dispatch, SetStateAction, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronDown, ChevronLeftCircle, ChevronRightCircle, NotebookText, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotesEditor } from "./TakeNotes";
import { CourseOverview } from "./CourseOverview";
import { PopoverMenu } from "../shared/PopoverMenu";
import { Button } from "../ui/button";
import CertificationProgress from "./Certification";
import LearnerMessages from "./LearnersAnnouncement";
import CourseResources from "./CourseResources";
import ChapterQuizPage from "./ChapterQuizes";
import CourseContent from "./CourseContent";
import { useLearn } from "@/context/LearningContext";
import { Section } from "@/types";


export default function LearnerDashboard() {
  const { activeTab, setActiveTab, course} = useLearn()
  const modules = course.sections

  // const [selectedChapterId, setSelectedChapterId] = useState<string>("1");
  const [slideOut, setSlideOut] = useState<boolean>(true);

  return (
    <div className="md:flex relative h-full min-h-screen">
      {/* Sidebar - Mobile */}
      <LearnersSidebar
        setSlideOut={setSlideOut}
        slideOut={slideOut}
        className="absolute top-0 z-10 bg-white md:hidden shadow"
      />

      {/* Sidebar - Desktop */}
      <LearnersSidebar
        setSlideOut={setSlideOut}
        slideOut={slideOut}
        className="max-md:hidden"
      />

      {/* Main content */}
      <div className="flex flex-1 relative flex-col w-full pb-20 h-full">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSlideOut((prev) => !prev)}
          className="absolute group left-0 top-8 text-white p-2 bg-primary flex gap-1 items-center z-30"
          aria-label="Toggle content sidebar"
        >
          <ChevronRightCircle
            className={`w-6 h-6 ${slideOut ? "rotate-180" : ""} transition-all duration-500 ease`}
            aria-hidden="true"
          />
          {!slideOut && (
            <small className="group-hover:w-full w-0 transition-all transform duration-300 ease-in-out overflow-hidden">
              Contents
            </small>
          )}
        </button>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList
            className="bg-background h-12 lg:h-14 w-full overflow-auto border-b flex justify-start max-w-5xl mx-auto"
            aria-label="Learning tabs"
          >
            {[
              { value: "overview", label: "Overview" },
              { value: "content", label: "Content" },
              { value: "qna", label: "Q&A" },
              { value: "notes", label: "Notes" },
              // { value: "tools", label: "Learning Tools" },
              { value: "attachments", label: "Resources" },
              // { value: "instructor", label: "Instructor" },
              { value: "messaging", label: "Messaging"},
              { value: "certification", label: "Certification" },
            ].map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                aria-label={`View ${label.toLowerCase()}`}
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none px-4 py-2 transition-colors"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="content" className="p-4 overflow-y-auto flex-1">
             <CourseContent/>

            
          </TabsContent>

          <TabsContent value="qna" className="p-4 overflow-y-auto flex-1">
            <ChapterQuizPage/>
          </TabsContent>

          <TabsContent value="notes" className="p-4 overflow-y-auto flex-1">
             <NotesEditor />
          </TabsContent>

          <TabsContent value="overview" className="p-4 overflow-y-auto flex-1">
            <CourseOverview setActiveTab={setActiveTab} />
          </TabsContent>

          {/* <TabsContent value="tools" className="p-4 overflow-y-auto flex-1">
            <p className="text-muted-foreground italic">Learning tools such as quizzes, flashcards, etc.</p>
          </TabsContent> */}

           <TabsContent value="messaging" className="p-4 overflow-y-auto flex-1">
            <LearnerMessages />
          </TabsContent>
 

          <TabsContent value="certification" className="p-4 overflow-y-auto flex-1">
            <CertificationProgress />
          </TabsContent>

          

          <TabsContent value="attachments" className="p-4 overflow-y-auto flex-1">
             <CourseResources />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const ModuleCard = ({ module,   }: {module: Section;}) => {
   const { setChapter, chapter,sectionAlias, setSectionAlias, setActiveTab,} = useLearn()
  
  const [drop, setDrop] = useState(false);

  return (
    <div className="w-full">
      <div onClick={() => setDrop((p) => !p)} className={`${module.alias===sectionAlias?'bg-primary/5':''} px-4 py-2 cursor-pointer `}>
        <div className="flex justify-between items-center gap-4">
          <h6 className="text-sm text-muted-foreground flex-1">{module.label}</h6>
          <ChevronDown
            size={24}
            className={cn("text-gray-500 shrink-0 transition-transform duration-300", {
              "rotate-180": drop,
            })}
          />
        </div>
        <small className="text-xs text-muted-foreground">4/6 · 37 mins</small>
      </div>

      {drop && (
        <div className="space-y- bg-white">
          {module.chapters.map((chap, i) => (
            <div
              key={chap.alias}
              className={cn(
                "hover:bg-primary/5",
                chapter.alias === chap.alias && "bg-primary/10 text-primary font-medium"
              )}
            >
              <div
                onClick={() => {
                  setChapter(chap)
                  setActiveTab('content')
                  setSectionAlias(module.alias)
                }}
                className="px-4 py-4 flex items-center gap-3 border-b cursor-pointer"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: mark as completed
                  }}
                  className="size-4 border shrink-0 border-primary hover:bg-primary/10"
                  aria-label="Mark as complete"
                />

                <div className="flex-1 flex gap-2 items-start">
                  <small className="pt-0.5 shrink-0">{i + 1}.</small>
                  <div className="flex-1">
                    <p className="font-medium truncate text-sm pb-1">{chap?.label}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1 text-muted-foreground items-center text-xs">
                        {chapter?.videoUrl ? (
                          <Video className="w-4 h-4" aria-hidden="true" />
                        ) : (
                          <NotebookText className="w-4 h-4" aria-hidden="true" />
                        )}
                        <span>15 mins</span>
                      </div>

                      <PopoverMenu
                        className="max-w-60 text-sm divide-y space-y-2 py-2"
                        align="end"
                        trigerBtn={
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            variant="outline"
                            size="sm"
                            className="opacity-70 hover:opacity-90 border-primary h-7 text-sm rounded text-primary hover:text-primary duration-300"
                          >
                            Resources
                            <ChevronDown size={14} />
                          </Button>
                        }
                      >
                        {["Resources one", "Resources two", "Resources three"].map((item, index) => (
                          <div key={index} className="p-3 whitespace-normal break-words">
                            {item}
                          </div>
                        ))}
                      </PopoverMenu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

 interface LearnersSidebarProps {
  slideOut: boolean;
  className: string;
  setSlideOut: Dispatch<SetStateAction<boolean>>;
}
export const LearnersSidebar = ({
  slideOut,
  className,
  setSlideOut,
}: LearnersSidebarProps) => {
 const {course,} = useLearn()
 const modules = course.sections

  return (
    <div
      className={cn(
        `min-h-screen overflow-auto bg-slate-50 border-r transition-all duration-500 ease-in-out`,
        slideOut ? "w-80 lg:w-96" : "w-0",
        className
      )}
    >
      <button
        onClick={() => setSlideOut((prev) => !prev)}
        className="flex justify-self-end pt-3 pr-3 md:hidden"
        aria-label="Close content sidebar"
      >
        <ChevronLeftCircle className="w-6 h-6 hover:text-gray-700 text-gray-400" />
      </button>

      <div
        className={cn(
          "transition-opacity duration-300 ease-in-out delay-100 pb-8 space-y-4",
          slideOut ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="w-full p-4 border-b">
          <h5 className="text-lg font-semibold">Course Name</h5>
        </div>

        <div className="divide-y">
          {modules?.map((module, i) => (
            <ModuleCard
              key={i}
              module={module}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
 
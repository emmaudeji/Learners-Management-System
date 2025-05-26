'use client';

import React, { Dispatch, SetStateAction, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronDown, ChevronLeftCircle, ChevronRightCircle, NotebookText, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotesEditor } from "./TakeNotes";
import { CourseOverview } from "./CourseOverview";
import { PopoverMenu } from "../shared/PopoverMenu";
import { Button } from "../ui/button";

const courseModules = [
  {
    title: "Module 1: Introduction",
    chapters: [
      { id: "1", title: "Welcome to the Course" },
      { id: "2", title: "How to Navigate the Dashboard" },
    ],
  },
  {
    title: "Module 2: Core Concepts",
    chapters: [
      { id: "3", title: "Understanding the Basics" },
      { id: "4", title: "Core Techniques" },
    ],
  },
];

const chapterDetails: Record<
  string,
  {
    videoUrl: string;
    content: string;
    qna: any[];
    notes: string;
    attachments: string[];
  }
> = {
  "1": {
    videoUrl: "/videos/welcome.mp4",
    content: "This is the welcome chapter...",
    qna: [],
    notes: "",
    attachments: ["slides.pdf"],
  },
  "2": {
    videoUrl: " ",
    content: "Here's how to navigate...",
    qna: [],
    notes: "",
    attachments: [],
  },
  // ... add more chapters as needed
};

export default function LearnerDashboard() {
  const [selectedChapterId, setSelectedChapterId] = useState<string>("1");
  const [activeTab, setActiveTab] = useState<string>("content");
  const [slideOut, setSlideOut] = useState<boolean>(true);

  const currentChapter = chapterDetails[selectedChapterId];

  return (
    <div className="md:flex relative h-full min-h-screen">
      {/* Sidebar - Mobile */}
      <LearnersSidebar
        setSlideOut={setSlideOut}
        slideOut={slideOut}
        className="absolute top-0 z-10 bg-white md:hidden shadow"
        selectedChapterId={selectedChapterId}
        setSelectedChapterId={setSelectedChapterId}
      />

      {/* Sidebar - Desktop */}
      <LearnersSidebar
        setSlideOut={setSlideOut}
        slideOut={slideOut}
        className="max-md:hidden"
        selectedChapterId={selectedChapterId}
        setSelectedChapterId={setSelectedChapterId}
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
              { value: "tools", label: "Learning Tools" },
              { value: "attachments", label: "Resources" },
              { value: "announcement", label: "Announcement" },
              { value: "messaging", label: "Messaging" },
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
            <video
              src={currentChapter.videoUrl}
              controls
              className="w-full rounded-lg mb-4"
              aria-label="Chapter video"
            />
            <div className="prose max-w-full">
              <p>{currentChapter.content}</p>
            </div>
          </TabsContent>

          <TabsContent value="qna" className="p-4 overflow-y-auto flex-1">
            <p className="text-muted-foreground italic">No Q&amp;A yet. Be the first to ask a question.</p>
          </TabsContent>

          <TabsContent value="notes" className="p-4 overflow-y-auto flex-1">
             <NotesEditor initialValue="" onSave={()=>{}}/>
          </TabsContent>

          <TabsContent value="overview" className="p-4 overflow-y-auto flex-1">
            <CourseOverview  />
          </TabsContent>

          <TabsContent value="tools" className="p-4 overflow-y-auto flex-1">
            <p className="text-muted-foreground italic">Learning tools such as quizzes, flashcards, etc.</p>
          </TabsContent>

           <TabsContent value="announcement" className="p-4 overflow-y-auto flex-1">
            <p className="text-muted-foreground italic">There are no announcement for now</p>
          </TabsContent>

           <TabsContent value="messaging" className="p-4 overflow-y-auto flex-1">
            <p className="text-muted-foreground italic">Messaging ...</p>
          </TabsContent>

          <TabsContent value="attachments" className="p-4 overflow-y-auto flex-1">
            <ul className="list-disc pl-5">
              {currentChapter.attachments.length ? (
                currentChapter.attachments.map((file, i) => (
                  <li key={i}>
                    <a
                      href={`/${file}`}
                      className="text-primary underline"
                      download
                      aria-label={`Download resource ${file}`}
                    >
                      {file}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground italic">No resources available</li>
              )}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

 

interface Chapter {
  id: string;
  title: string;
  videoUrl?: string;
}

interface Module {
  title: string;
  chapters: Chapter[];
}

interface LearnersSidebarProps {
  slideOut: boolean;
  className: string;
  setSlideOut: Dispatch<SetStateAction<boolean>>;
  selectedChapterId: string;
  setSelectedChapterId: Dispatch<SetStateAction<string>>;
}

interface ModuleCardProps {
  module: Module;
  selectedChapterId: string;
  setSelectedChapterId: Dispatch<SetStateAction<string>>;
}

const ModuleCard = ({ module, selectedChapterId, setSelectedChapterId }: ModuleCardProps) => {
  const [drop, setDrop] = useState(false);

  return (
    <div className="w-full">
      <div onClick={() => setDrop((p) => !p)} className="px-4 py-2 cursor-pointer">
        <div className="flex justify-between items-center gap-4">
          <h6 className="text-sm text-muted-foreground flex-1">{module.title}</h6>
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
          {module.chapters.map((chapter, i) => (
            <div
              key={chapter.id}
              className={cn(
                "hover:bg-primary/5",
                selectedChapterId === chapter.id && "bg-primary/10 text-primary font-medium"
              )}
            >
              <div
                onClick={() => setSelectedChapterId(chapter.id)}
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
                    <p className="font-medium truncate text-sm pb-1">{chapter.title}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1 text-muted-foreground items-center text-xs">
                        {chapter.videoUrl ? (
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

export const LearnersSidebar = ({
  slideOut,
  className,
  setSlideOut,
  selectedChapterId,
  setSelectedChapterId,
}: LearnersSidebarProps) => {
  const courseModules: Module[] = [
    {
      title: "Introduction Module",
      chapters: [
        { id: "1", title: "Getting Started", videoUrl: "video.mp4" },
        { id: "2", title: "Course Overview" },
      ],
    },
    {
      title: "Advanced Concepts",
      chapters: [
        { id: "3", title: "Deep Dive", videoUrl: "video.mp4" },
        { id: "4", title: "Practical Examples" },
      ],
    },
  ];

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
          {courseModules.map((module, i) => (
            <ModuleCard
              key={i}
              module={module}
              selectedChapterId={selectedChapterId}
              setSelectedChapterId={setSelectedChapterId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


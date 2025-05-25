'use client';

import React, { Dispatch, SetStateAction, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeftCircle, ChevronRightCircle, Video } from "lucide-react";
import { cn } from "@/lib/utils";

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
    videoUrl: "/videos/navigation.mp4",
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
            className="bg-background h-12 lg:h-14 w-full overflow-auto border-b flex justify-start"
            aria-label="Learning tabs"
          >
            <TabsTrigger value="content" aria-label="View chapter content">Content</TabsTrigger>
            <TabsTrigger value="qna" aria-label="View Q&A section">Q&amp;A</TabsTrigger>
            <TabsTrigger value="notes" aria-label="View personal notes">Notes</TabsTrigger>
            <TabsTrigger value="overview" aria-label="View chapter overview">Overview</TabsTrigger>
            <TabsTrigger value="tools" aria-label="View learning tools">Learning Tools</TabsTrigger>
            <TabsTrigger value="attachments" aria-label="View resources and attachments">Resources</TabsTrigger>
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
            <p className="text-muted-foreground italic">Note taking section will appear here...</p>
          </TabsContent>

          <TabsContent value="overview" className="p-4 overflow-y-auto flex-1">
            <p className="text-muted-foreground italic">Chapter overview and goals...</p>
          </TabsContent>

          <TabsContent value="tools" className="p-4 overflow-y-auto flex-1">
            <p className="text-muted-foreground italic">Learning tools such as quizzes, flashcards, etc.</p>
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

const LearnersSidebar = ({
  slideOut,
  className,
  setSlideOut,
  setSelectedChapterId,
  selectedChapterId,
}: {
  slideOut: boolean;
  className: string;
  setSlideOut: Dispatch<SetStateAction<boolean>>;
  selectedChapterId: string;
  setSelectedChapterId: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div
      className={cn(
        `h-screen overflow-auto bg-muted border-r transition-all duration-500 ease-in-out`,
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

        <div className="px-4">
          {courseModules.map((module, i) => (
            <div key={i}>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                {module.title}
              </h4>
              <div className="space-y-1">
                {module.chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setSelectedChapterId(chapter.id)}
                    className={cn(
                      "w-full text-left p-2 rounded-lg text-sm hover:bg-primary/10",
                      selectedChapterId === chapter.id &&
                        "bg-primary/10 text-primary font-medium"
                    )}
                    aria-label={`Open ${chapter.title}`}
                  >
                    <Video className="w-4 h-4 inline-block mr-2" aria-hidden="true" />
                    {chapter.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

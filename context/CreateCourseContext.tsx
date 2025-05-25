"use client";

import { findChapterAndSection } from "@/lib/helper";
import { Chapter, Course, Section } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Context interface
interface CreateCourseState {
  course:Course,

  currentStepIndex: number;
  setCurrentStepIndex: Dispatch<SetStateAction<number>>;

  chapter: Chapter;
  setChapter: Dispatch<SetStateAction<Chapter>>;

  sections: Section[];
  setSections: Dispatch<SetStateAction<Section[]>>;
}

// Create context
const CreateCourseContext = createContext<CreateCourseState | undefined>(undefined);

// Provider
export const CreateCourseProvider = ({
  children,
  course,
  step,
  chapterAlias,
  sectionAlias,
}: {
  children: ReactNode;
  course: Course;
  step?: number;
  chapterAlias?: string;
  sectionAlias?: string;
}) => {
  const { section: curSection, chapter: curChapter } = findChapterAndSection(
    course,
    sectionAlias!,
    chapterAlias!
  );

  const [currentStepIndex, setCurrentStepIndex] = useState(step || 0);
  const [sections, setSections] = useState<Section[]>(course.sections || []);
 
  const [chapter, setChapter] = useState<Chapter>(
    curChapter || course.sections?.[0]?.chapters?.[0]
  );

  const contextValue: CreateCourseState = {
    currentStepIndex,
    setCurrentStepIndex,
    chapter,
    setChapter,
    sections,
    setSections,
 
    course,
  };

  return (
    <CreateCourseContext.Provider value={contextValue}>
      {children}
    </CreateCourseContext.Provider>
  );
};

// Hook
export const useCreateCourse = (): CreateCourseState => {
  const context = useContext(CreateCourseContext);
  if (!context) {
    throw new Error("useCreateCourse must be used within a CreateCourseProvider");
  }
  return context;
};

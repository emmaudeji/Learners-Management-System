"use client";

import { appwriteConfig } from "@/lib/actions/config";
import { Chapter, Course, Note, Section } from "@/types";
import { putRequest } from "@/utils/api";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

// Context interface
interface LearningState {
  course:Course,

  // currentStepIndex: number;
  // setCurrentStepIndex: Dispatch<SetStateAction<number>>;

  chapter: Chapter;
  setChapter: Dispatch<SetStateAction<Chapter>>;

  sectionAlias: string;
  setSectionAlias: Dispatch<SetStateAction<string>>;

  activeTab:string, 
  setActiveTab:Dispatch<SetStateAction<string>>;

  initialNote:Note|null, 
  // sections: Section[];
  // setSections: Dispatch<SetStateAction<Section[]>>;
}

// Create context
const CreateCourseContext = createContext<LearningState | undefined>(undefined);

// Provider
export const LearningProvider = ({
  children,
  course,initialNote,
}: {
  children: ReactNode;
  course: Course;
  initialNote:Note|null
}) => {
 
  const [chapter, setChapter] = useState<Chapter>(
      course.sections?.[0]?.chapters?.[0]
  );
  const [sectionAlias, setSectionAlias] = useState<string>(
    course.sections?.[0].alias
  );
  const [activeTab, setActiveTab] = useState<string>("content");

  useEffect(() => {
    // simulate update count
    const update = async () =>{
      const count = Number(course?.count) + 7
      const rating = Number(course?.rating) <= 4.8 ? Number(course?.rating) + 0.1 :course.rating

      const {data,error} = await putRequest({
        body:{
          collectionId:appwriteConfig.coursesCollectionId,
          documentId:course.id,
          formData: {
            count, rating
          }
        }
      })
    }
    update()
  }, [])
  
  
  const contextValue: LearningState = {
    chapter,
    setChapter,
    sectionAlias, setSectionAlias,
    activeTab, setActiveTab,
    course,
    initialNote,
  };

  return (
    <CreateCourseContext.Provider value={contextValue}>
      {children}
    </CreateCourseContext.Provider>
  );
};

// Hook
export const useLearn = (): LearningState => {
  const context = useContext(CreateCourseContext);
  if (!context) {
    throw new Error("useCreateCourse must be used within a CreateCourseProvider");
  }
  return context;
};

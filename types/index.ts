// types.d.ts
export type StatusType = 'DRAFT'|'ACTIVE'|'ARCHIVED'
export type RoleType = "SUPERADMIN" | "ADMIN" | "USER" | "AUTHOR" | "TEACHER";

export type User = {
  $id?: string;
  id: string;
  email: string;
  userId: string;
  fullName: string;
  country: string|null;
  address: string|null

  role: RoleType; 
  phone: string | null;
  avatar: string;
  // bio: string | null;

  status: StatusType;
  createdAt: string;
  updatedAt: string;
};

export interface FetchPayload {
  collectionId: string;
  param?: Record<string, any>;
  fields?: string[];
}
export interface GetOnePayload {
  collectionId: string;
  documentId: string;
  fields?: string[];
}
export interface CreatePayload {
  collectionId: string;
  formData: Record<string, any>;
  fields?: string[];
}

export interface EditPayload {
  collectionId: string;
  documentId: string;
  formData: Record<string, any>;
  fields?: string[];
}

export interface DeletePayload {
  collectionId: string;
  documentId: string;
}

interface CreatedBy {
  id:string, fullName:string
}

export type Course = {
  alias: string;

  title: string;
  description: string;
  sections: Section[];  
  
   
  reviews: string[]; 
  feedbacks: string[];  
  objectives: string[];
  imageUrl: string;  
  user: string;  
  price: Pricing;  
  isFree: boolean; 

  id: string;
  $id?: string;
  status: StatusType;
  createdBy: CreatedBy,
  createdAt: string;
  updatedAt: string;
  permissions: string[];
};

export type Section = {
  alias: string;
  label: string;
  position:number;
  course: string; // ID of the related course
  chapters: Chapter[]; // Array of chapter IDs
  courseId:string;

  $id?: string;
  id: string;
  status: StatusType;
  createdBy?: CreatedBy,
  isFree: boolean; 
  createdAt?: string;
  updatedAt?: string;
  permissions?: string[];
};
 

export type Chapter = {
  alias: string;
  label: string;
  section: string; // ID or object reference to the Section  
  course: string; // ID or object reference to the Course
  content: string;
  videoUrl: string;  
  imageUrl: string; 
  isFree: boolean; 
  feedbacks: string[];  
  courseId:string;
  sectionId:string;
  attachments?: string[];  
  
  $id?: string;
  id: string;
  status: StatusType;
  createdBy: CreatedBy,
  createdAt: string;
  updatedAt: string;
  permissions: string[];
};

export type Pricing = {
  price: number; // double in TypeScript is represented as number
  currency: string;
  course: string; // course ID

  $id?: string;
  id: string;
  createdBy: CreatedBy,
  status: StatusType;
  createdAt: string;
  updatedAt: string;
  permissions: string[];
};


export type QuizQuestion = {
  id: string;
  alias: string;
  chapter: Chapter; // relationship to 'chapters' table
  question: string;
  position: number;
  type: 'multiple-choice' | 'true-false' | 'short-answer'; // enum
  options: string[]; // for MCQs
  explanation: string | null;
  difficulty: 'easy' | 'medium' | 'hard'; // enum
  tags: string[];
  correctAnswer: string[]; // supports multiple correct answers

  $id?: string;
  createdBy?: CreatedBy,  // relationship to 'users' table
  status?: StatusType;
  createdAt?: string;
  $createdAt?: string;
  updatedAt?: string;
  permissions?: string[];
};


export type QuizAnswer = {
  id: string;
  alias: string;
  quiz: QuizQuestion; // relationship to quizes table
  selectedAnswer: string[]; // supports multiple selected options
  isCorrect: boolean;
  timestamp: string; // ISO datetime

  $id?: string;
  createdBy: CreatedBy,  // relationship to 'users' table
  status: StatusType;
  createdAt: string;
  $createdAt: string;
  updatedAt: string;
  permissions: string[];
};
 
export type Attachment = {
  url: string
  alias: string
  type: string
  tableAlias?: string
  name?: string
  security?: string

  id?: string;
  $id?: string;
  createdBy?: CreatedBy,  // relationship to 'users' table
  status?: StatusType;
  createdAt?: string;
  $createdAt?: string;
  updatedAt?: string;
  permissions?: string[];
}

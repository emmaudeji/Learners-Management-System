// types.d.ts
export type StatusType = 'DRAFT'|'ACTIVE'|'ARCHIVED'
export type RoleType = "SUPERADMIN" | "ADMIN" | "USER" | "AUTHOR" | "TEACHER";

export type User = {
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

  id: string;
  status: StatusType;
  createdBy: CreatedBy,
  createdAt: string;
  updatedAt: string;
  permissions: string[];
};

export type Section = {
  alias: string;
  label: string;
  course: string; // ID of the related course
  chapters: Chapter[]; // Array of chapter IDs

  id: string;
  status: StatusType;
  createdBy?: CreatedBy,
  createdAt?: string;
  updatedAt?: string;
  permissions?: string[];
};

export type SectionInput = {
  alias: string;
  label: string;
  course: string; // ID of the related course
  status: StatusType;

  chapters?: Chapter[]; // Array of chapter IDs

  id?: string;
  createdBy?: CreatedBy|string,
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
  feedbacks: string[];  
  
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

  id: string;
  createdBy: CreatedBy,
  status: StatusType;
  createdAt: string;
  updatedAt: string;
  permissions: string[];
};

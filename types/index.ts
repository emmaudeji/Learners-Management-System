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
  section: Section[]; // assuming relationship returns the related document ID
  chapters: Chapter[]; // assuming multiple chapter IDs
   // assuming multiple chapter IDs
  reviews: string[]; // assuming multiple review IDs
  feedbacks: string[]; // assuming multiple feedback IDs
  objectives: string[];
  imageUrl: string; // assuming this is a URL string
  user: string; // user ID
  price: Pricing; // price ID

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
  createdBy: CreatedBy,
  createdAt: string;
  updatedAt: string;
  permissions: string[];
};

export type Chapter = {
  alias: string;
  label: string;
  section: string; // ID or object reference to the Section (depending on your implementation)
  course: string; // ID or object reference to the Course
  content: string;
  videoUrl: string; // Assuming it's a valid URL string
  imageUrl: string; // Assuming it's a valid URL string
  feedbacks: string[]; // Array of IDs or feedback objects
  
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

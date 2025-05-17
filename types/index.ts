// types.d.ts
export type UserStatus = 'DRAFT'|'ACTIVE'|'ARCHIVED'
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

  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};
 
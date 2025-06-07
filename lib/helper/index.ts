import { Chapter, Course, Section } from "@/types";
import { fetchCloudinaryMedia } from "../cloudinary";

export const generateSlug = (name: string, length: number = 6): string => {
  const maxSlugLength = 36 - (length + 1); // Total must not exceed 36 chars

  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')       // Only keep a-z, 0-9, spaces, and hyphens
    .trim()
    .replace(/\s+/g, '-')               // Replace spaces with hyphens
    .replace(/-+/g, '-')                // Collapse multiple hyphens
    .replace(/^-+/, '')                 // Remove leading hyphens
    .replace(/[^a-z0-9\-]/g, '')        // Final cleanup
    .slice(0, maxSlugLength);           // Limit total length

  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let hash = '';
  for (let i = 0; i < length; i++) {
    hash += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  const slug = `${baseSlug}-${hash}`;
  return slug.length <= 36 ? slug : slug.slice(0, 36); // final safeguard
};

export const getUrl = (path:string, id?:string) => {
  // const {user} = useUserStore()
  return `/my-space/${path}`
}

export const getStudentUrl = (path:string, id?:string) => {
  // const {user} = useUserStore()
  return `/my-learning/${path}`
}

export const findChapterAndSection = (
  course: Course,
  sectionAlias?: string,
  chapterAlias?: string
): { section?: Section; chapter?: Chapter } => {
  if (!sectionAlias || !chapterAlias || !course?.sections?.length) {
    return {};
  }

  const section = course.sections.find(sec => sec.alias === sectionAlias);
  if (!section) return {};

  const chapter = section.chapters.find(ch => ch.alias === chapterAlias);
  if (!chapter) return { section };

  return { section, chapter };
};

export async function getMediaFromCloudinary(folder: string) {
  const MEDIA_FOLDER = `lms/${folder}`;
   
  const media = await fetchCloudinaryMedia(MEDIA_FOLDER);
  return media;
}


type FileCategory = "image" | "video" | "audio" | "document" | "archive" | "other";

export const getFileCategory = (mimeType: string): FileCategory => {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  if (
    mimeType === "application/pdf" ||
    mimeType === "application/msword" ||
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mimeType === "application/vnd.ms-excel" ||
    mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    mimeType === "text/plain"
  ) return "document";
  if (
    mimeType === "application/zip" ||
    mimeType === "application/x-rar-compressed" ||
    mimeType === "application/x-7z-compressed"
  ) return "archive";

  return "other";
};
 

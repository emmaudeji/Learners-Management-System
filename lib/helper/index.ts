import { Chapter, Course, Section } from "@/types";

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

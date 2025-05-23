import { useUserStore } from "@/store/useUserStore";

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
  const {user} = useUserStore()
  return `/t/${id || user?.id}/${path}`
}
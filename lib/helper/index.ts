export const generateSlug = (name: string, length: number = 4): string => {
  const maxSlugLength = 50 - (length + 1); // 1 for the hyphen

  const baseSlug = name
    ?.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .slice(0, maxSlugLength); // Limit baseSlug to ensure total <= 50

  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let hash = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    hash += characters.charAt(randomIndex);
  }

  return `${baseSlug}-${hash}`;
};

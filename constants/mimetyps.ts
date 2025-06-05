type FileCategory = "image" | "video" | "audio" | "document" | "archive" | "other";

const mimeTypeToCategory: Record<string, FileCategory> = {
  // 📄 Documents
  "application/pdf": "document",
  "application/msword": "document",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "document",
  "application/vnd.ms-excel": "document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "document",
  "application/vnd.ms-powerpoint": "document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "document",
  "text/plain": "document",
  "text/markdown": "document",
  "text/csv": "document",
  "application/json": "document",

  // 🖼️ Images
  "image/jpeg": "image",
  "image/png": "image",
  "image/gif": "image",
  "image/svg+xml": "image",
  "image/webp": "image",

  // 🎞️ Videos
  "video/mp4": "video",
  "video/webm": "video",
  "video/ogg": "video",

  // 🔈 Audio
  "audio/mpeg": "audio", // MP3
  "audio/wav": "audio",
  "audio/ogg": "audio",

  // 📦 Archives
  "application/zip": "archive",
  "application/vnd.rar": "archive",
  "application/x-7z-compressed": "archive",

  // Fallback
  "*": "other",
};

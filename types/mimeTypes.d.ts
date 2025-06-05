export type MimeType =
  // 📄 Document MIME types
  | "application/pdf"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.ms-powerpoint"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  | "text/plain"
  | "text/markdown"
  | "text/csv"
  | "application/json"

  // 🖼️ Image MIME types
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp"
  | "image/svg+xml"

  // 🎞️ Video MIME types
  | "video/mp4"
  | "video/webm"
  | "video/ogg"

  // 🔈 Audio MIME types
  | "audio/mpeg"
  | "audio/wav"
  | "audio/ogg"

  // 📦 Archive MIME types
  | "application/zip"
  | "application/x-zip-compressed"
  | "application/x-rar-compressed"
  | "application/x-7z-compressed"
  | "application/x-tar"

  // 🧩 Other/Generic
  | "application/octet-stream"
  | "application/x-www-form-urlencoded"
  | "multipart/form-data";


import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import localFont from "next/font/local";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));
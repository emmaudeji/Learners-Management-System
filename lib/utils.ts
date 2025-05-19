import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import localFont from "next/font/local";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const lexendFontFamily = localFont({
  src: [
    {
      path: "./fonts/Lexend-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Lexend-Light.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Lexend-Thin.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Lexend-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Lexend-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Lexend-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Lexend-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Lexend-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Lexend-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-lexend",
});
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatContent(content: string) {
  return content
    .replace(/\\/g, "")
    .replace(/&#x20;/g, "")
    .replace(/^\s*\n/gm, "");
}

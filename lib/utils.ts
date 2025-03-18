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

export function extractParamId(params: Record<string, string>) {
  if (params.id === undefined) return undefined;

  const value = params.id;
  if (value.length === 1) return String(value[0]);
  return String(value.at(-1));
}

export function isNewChat(params: Record<string, string>) {
  if (params.id === undefined) return false;
  const value = params.id;
  return value.length === 2 && value[0] == "new" && value.at(-1)?.length === 36;
}

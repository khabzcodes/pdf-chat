import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isFileNameInString = (fileName: string, str: string) => {
  const normalizedFileName = fileName
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=-_~()\s]/g, "");
  const normalizedStr = str
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=-_~()\s]/g, "");
  return normalizedStr.includes(normalizedFileName);
};

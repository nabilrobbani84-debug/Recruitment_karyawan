import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility function to conditionally join class names together.
 * It uses 'clsx' to handle conditional classes and 'tailwind-merge'
 * to intelligently merge Tailwind CSS classes without style conflicts.
 *
 * @param {...ClassValue[]} inputs - A list of class values to be merged.
 * These can be strings, arrays, or objects.
 * @returns {string} A single string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// src/lib/utils.ts
export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " tahun lalu";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " bulan lalu";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " hari lalu";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " jam lalu";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " menit lalu";
  return "Baru saja";
};
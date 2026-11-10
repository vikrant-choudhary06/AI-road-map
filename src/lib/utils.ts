import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional class names and resolves Tailwind CSS conflicts cleanly.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a phase number into a canonical two-character roadmap code (e.g. "P0" - "P8").
 */
export function formatPhaseCode(phase: number): string {
  return `P${phase}`;
}

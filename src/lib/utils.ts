import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The `cn` helper shadcn-style components expect: clsx for conditionals, then
 * tailwind-merge so a caller's `className` actually overrides the component's
 * defaults instead of both landing in the class list and letting CSS source
 * order decide the winner.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

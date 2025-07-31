import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://studygpt-7gg2.onrender.com";

export async function queryBackend(query: string) {
  const response = await fetch("https://studygpt-7gg2.onrender.com/query", 
    {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: query }),
  });
  if (!response.ok) {
    throw new Error(`Backend error: ${response.status}`);
  }
  return response.json();
}

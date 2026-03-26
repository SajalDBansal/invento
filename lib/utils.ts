import { NavSection, UserRole } from "@/types/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const filterNavByRole = (
  nav: NavSection[],
  role: UserRole
): NavSection[] => {
  return nav
    .filter(section => !section.roles || section.roles.includes(role))
    .map(section => ({
      ...section,
      items: section.items
        .filter(item => !item.roles || item.roles.includes(role))
        .map(item => ({
          ...item,
          children: item.children?.filter(
            child => !child.roles || child.roles.includes(role)
          ),
        })),
    }));
};

export const getUserInitials = (name?: string | null) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const getTimeAgo = (timeStamp: string | Date): string => {
  const now = new Date();
  const time = new Date(timeStamp);

  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} day(s) ago`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks} week(s) ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month(s) ago`;

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year(s) ago`;
};
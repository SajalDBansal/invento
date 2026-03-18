import { NavItems, UserRole } from "@/types/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFilteredFeatures = (item: NavItems[], userRole: UserRole) => {
  return item.filter((child) =>
    child.UserRoles.includes(userRole)
  );
}

export const getUserInitials = (name?: string | null) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};
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

export const formatCurrency = (value: number) => {
  return `₹${value.toLocaleString("en-IN")}`;
};

type FinanceChartPoint = {
  date: string;
  revenue: number;
  expense: number;
};

export const getFinanceChartData = (): FinanceChartPoint[] => {
  const result: FinanceChartPoint[] = [];

  const endDate = new Date(); // today
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 364); // last 365 days inclusive

  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    // Add slight upward trend over time
    const daysFromStart =
      (currentDate.getTime() - startDate.getTime()) /
      (1000 * 60 * 60 * 24);

    const trendFactor = 1 + daysFromStart / 365;

    // Weekend boost for realism
    const day = currentDate.getDay();
    const weekendBoost = day === 0 || day === 6 ? 1.15 : 1;

    const revenue = Math.floor(
      (2000 + Math.random() * 8000) * trendFactor * weekendBoost
    );

    const expense = Math.floor(
      revenue * (0.4 + Math.random() * 0.4)
    );

    result.push({
      date: currentDate.toISOString().split("T")[0], // "YYYY-MM-DD"
      revenue,
      expense,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
};

export const dashboardFinanceData = getFinanceChartData();
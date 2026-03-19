import { LucideIcon } from "lucide-react";

export type UserRole = "Admin" | "Manager" | "Default" | "Cashier";

export type NavSection = {
    title: string;
    items: NavItems[];
};

export type NavItems = {
    title: string;
    link: string;
    UserRoles: UserRole[];
    icon: LucideIcon;
};

export type QuickAction = {
    title: string;
    link: string;
    icon: React.ElementType;
};

type KpiKey =
    | "todaySales"
    | "todayPurchases"
    | "todayExpenses"
    | "lowStockItems"
    | "todayProfit"
    | "pendingPayments";

export type DashbordKpiLayout = {
    key: KpiKey,
    title: string;
    icon: LucideIcon;
    description?: string;
    trendLabel?: string;
    link: string;
};

export type KpiCardProps = {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: number;
    trendLabel?: string;
    link: string;
};
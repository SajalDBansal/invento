import { LucideIcon } from "lucide-react";

export type UserRole = "Admin" | "Manager" | "Default" | "Cashier";

export type NavSection = {
    title: string;
    link?: string; // makes section itself clickable
    roles?: UserRole[]; // optional section-level restriction
    items: NavItem[];
};

export type NavItem = {
    title: string;
    link?: string;
    icon?: LucideIcon;
    roles?: UserRole[];
    children?: NavItem[];
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

export type KpiBackendKey =
    | "todaySales"
    | "todayPurchases"
    | "todayExpenses"
    | "lowStockItems"
    | "todayProfit"
    | "pendingPayments";

export type KpiBackendData = {
    value: string;
    trend?: number;
};

export type InventoryAlertProp = {
    low: InventoryAlertBaseItemProp[];
    fast: InventoryAlertBaseItemProp[];
    out: InventoryAlertBaseItemProp[];
};

export type InventoryAlertBaseItemProp = {
    id: string;
    productName: string;
    company: string;
    code: string;
    icon: string;
    units?: string | number;
};

export type RecentActivitiesProp = {
    id: string;
    link?: string;
    title: string;
    description?: string;
    timeStamp: string;
    type: ActivityType;
}

export type ActivityMetaType = Record<ActivityType, { icon: string, color: string }>;

export type ActivityType = "sales" | "purchases" | "inventory" | "payments";

export type ActivityFilter = ActivityType | "all";
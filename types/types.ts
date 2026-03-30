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
}[]

export type ActivityMetaType = Record<ActivityType, { icon: string, color: string }>;

export type ActivityType = "sales" | "purchases" | "inventory" | "payments";

export type ActivityFilter = ActivityType | "all";

export type DashboardFinanceSectionProp = {
    netRevenue: string;
    netExpenses: string;
    netMargin: string;
    chartData: {
        date: string;
        revenue: number;
        expense: number;
    }[]
}

export type DashboardAnalyticsData = {
    salesTarget: number,
    weeklyRevenueChartData: {
        day: string;
        revenue: number;
    }[],
    salesChartData: {
        month: string;
        sales: number;
    }[]
}

export type DashboardPartiesDataProp = {
    id: string;
    name: string;
    status: string;
    balance: number;
    date: string;
}

export type DashboardPartiesData = {
    top: DashboardPartiesDataProp[];
    new: DashboardPartiesDataProp[];
}

export type DashboardDataType = {
    financeSectiondata: DashboardFinanceSectionProp;
    kpiData: Record<KpiBackendKey, KpiBackendData>;
    analyticsData: DashboardAnalyticsData;
    inventoryAlertData: InventoryAlertProp;
    recentActivitiesData: RecentActivitiesProp;
    customersData: DashboardPartiesData;
    suppliersData: DashboardPartiesData;
}

export type CustomersPageKPIKey =
    | "totalCustomers"
    | "activeCustomers"
    | "totalReceivable"
    | "highRiskCustomers";

export type CustomersPageKPIData = {
    value: string;
    trend?: number;
};

export type CustomersDataType = {
    kpiData: Record<CustomersPageKPIKey, CustomersPageKPIData>;
}

export type CustomersKpiLayout = {
    key: CustomersPageKPIKey,
    title: string;
    icon: LucideIcon;
    description?: string;
    trendLabel?: string;
};

export type CustomersKPICardProp = {
    title: string;
    value: string | number;
    icon: LucideIcon;
}
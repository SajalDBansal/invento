import { DashbordKpiLayout, NavSection, QuickAction } from "@/types/types";

import {
    BarChart3,
    FileText,
    Receipt,
    RotateCcw,
    Tag,
    Users,
    Truck,
    Wallet,
    Percent,
    PlusCircle,
    ShoppingCart,
    Package,
    IndianRupee,
    AlertTriangle,
    TrendingUp,
    CreditCard,
    History,
    BadgeDollarSign,
    Landmark,
} from "lucide-react";


export const NAV_LINKS: NavSection[] = [
    {
        title: "Overview",
        items: [
            {
                title: "Analytics",
                link: "/overview/analytics",
                UserRoles: ["Admin", "Manager"],
                icon: BarChart3,
            },
            {
                title: "Reports",
                link: "/overview/reports",
                UserRoles: ["Admin", "Manager"],
                icon: FileText,
            },
            {
                title: "Activities",
                link: "/overview/activities",
                UserRoles: ["Admin"],
                icon: History,
            },
        ],
    },
    {
        title: "Records",
        items: [
            {
                title: "Invoices",
                link: "/ledger/sales/invoices",
                UserRoles: ["Admin", "Cashier", "Manager"],
                icon: Receipt,
            },
            {
                title: "Returns",
                link: "/ledger/sales/returns",
                UserRoles: ["Admin", "Cashier", "Manager"],
                icon: RotateCcw,
            },
            {
                title: "Discounts",
                link: "/ledger/sales/discounts",
                UserRoles: ["Admin", "Manager"],
                icon: Tag,
            },
        ],
    },
    {
        title: "Ledger",
        items: [
            {
                title: "Bank",
                link: "/ledger/bank",
                UserRoles: ["Admin", "Manager"],
                icon: Landmark,
            },
            {
                title: "Cash",
                link: "/ledger/cash",
                UserRoles: ["Admin", "Manager"],
                icon: Wallet,
            },
            {
                title: "Purchase",
                link: "/ledger/purchases",
                UserRoles: ["Admin"],
                icon: ShoppingCart,
            },
            {
                title: "Sales",
                link: "/ledger/sales",
                UserRoles: ["Admin"],
                icon: BadgeDollarSign,
            },
        ],
    },
    {
        title: "Management",
        items: [
            {
                title: "Customers",
                link: "/management/customers",
                UserRoles: ["Admin", "Cashier", "Manager"],
                icon: Users,
            },
            {
                title: "Suppliers",
                link: "/management/suppliers",
                UserRoles: ["Admin", "Manager"],
                icon: Truck,
            },
            {
                title: "Expenses",
                link: "/management/expenses",
                UserRoles: ["Admin", "Manager"],
                icon: Wallet,
            },
            {
                title: "Taxes",
                link: "/management/taxes",
                UserRoles: ["Admin"],
                icon: Percent,
            },
        ],
    },
];

export const QUICK_ACTIONS: QuickAction[] = [
    {
        title: "Add Product",
        link: "/products/add",
        icon: PlusCircle,
    },
    {
        title: "Create Invoice",
        link: "/ledger/sales/invoices/create",
        icon: Receipt,
    },
    {
        title: "Book Purchase",
        link: "/ledger/purchases/create",
        icon: ShoppingCart,
    },
    {
        title: "View Inventory",
        link: "/inventory",
        icon: Package,
    },
    {
        title: "Record Expense",
        link: "/management/expenses/create",
        icon: Wallet,
    },
    {
        title: "Process Return",
        link: "/ledger/sales/returns",
        icon: RotateCcw,
    },
];

export const KPI_CARDS: DashbordKpiLayout[] = [
    {
        key: "todaySales",
        title: "Today's Sales",
        icon: IndianRupee,
        description: "Total revenue generated today",
        trendLabel: "from yesterday",
        link: "/ledger/sales?filter=today",
    },
    {
        key: "todayPurchases",
        title: "Today's Purchases",
        icon: ShoppingCart,
        description: "Stock purchased today",
        trendLabel: "from yesterday",
        link: "/ledger/purchases?filter=today",
    },
    {
        key: "todayProfit",
        title: "Profit Today",
        icon: TrendingUp,
        description: "Net profit after expenses",
        link: "/overview/analytics",
    },
    {
        key: "todayExpenses",
        title: "Expenses Today",
        icon: Wallet,
        description: "Operational expenses",
        trendLabel: "vs yesterday",
        link: "/management/expenses",
    },
    {
        key: "lowStockItems",
        title: "Low Stock Items",
        icon: AlertTriangle,
        description: "Items below threshold",
        link: "/inventory?filter=low-stock",
    },
    {
        key: "pendingPayments",
        title: "Pending Payments",
        icon: CreditCard,
        description: "Unpaid invoices",
        link: "/ledger/sales/invoices?filter=pending",
    },
];
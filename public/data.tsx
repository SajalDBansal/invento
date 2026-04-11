import { ActivityMetaType, ContactsKpiLayout, CustomerStatus, CustomerType, DashbordKpiLayout, InventoryAlertProp, InvoiceStatus, NavSection, QuickAction } from "@/types/types";

import {
    BarChart3,
    FileText,
    Receipt,
    RotateCcw,
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
    Activity,
    Boxes,
    UserCog,
    Book,
    UserCheck,
    LucideIcon,
    Ban, Check, Store, X,
    BadgePercent,
    Tag,
    Calculator,
    AlertCircle,
    Clock,
    Loader,
    CheckCircle
} from "lucide-react";

export const NAVIGATION: NavSection[] = [
    {
        title: "Dashboard",
        link: "/dashboard",
        roles: ["Admin", "Manager", "Default", "Cashier"],
        items: [],
    },
    {
        title: "Operations",
        roles: ["Admin", "Manager", "Cashier"],
        items: [
            {
                title: "Sales",
                icon: ShoppingCart,
                children: [
                    {
                        title: "Invoices",
                        link: "/sales/invoices",
                    },
                    {
                        title: "Returns",
                        link: "/sales/returns",
                    },
                    {
                        title: "Discounts",
                        link: "/sales/discounts",
                        roles: ["Admin", "Manager"],
                    },
                ],
            },
            {
                title: "Purchases",
                icon: Truck,
                roles: ["Admin", "Manager"],
                link: "/purchases",
            },
        ],
    },
    {
        title: "Catalog",
        roles: ["Admin", "Manager"],
        items: [
            {
                title: "Products",
                icon: Package,
                link: "/products",
            },
            {
                title: "Inventory",
                icon: Boxes,
                link: "/inventory",
            },
        ],
    },
    {
        title: "Contacts",
        roles: ["Admin", "Manager"],
        items: [
            {
                title: "Customers",
                icon: Users,
                link: "/customers",
            },
            {
                title: "Suppliers",
                icon: UserCog,
                link: "/suppliers",
            },
        ],
    },
    {
        title: "Reports",
        roles: ["Admin", "Manager", "Default", "Cashier"],
        items: [
            {
                title: "Analytics",
                link: "/dashboard/analytics",
                icon: BarChart3,
            },
            {
                title: "Reports",
                link: "/dashboard/reports",
                icon: FileText,
                roles: ["Admin", "Manager"],
            },
            {
                title: "Activities",
                link: "/dashboard/activities",
                icon: Activity,
            },
        ],
    },
    {
        title: "Finance",
        roles: ["Admin", "Manager"],
        items: [
            {
                title: "Ledger",
                icon: Book,
                children: [
                    {
                        title: "Overview",
                        link: "/ledger",
                    },
                    {
                        title: "Cash",
                        link: "/ledger/cash",
                    },
                    {
                        title: "Bank",
                        link: "/ledger/bank",
                    },
                ],
            },
            {
                title: "Expenses",
                icon: Receipt,
                link: "/expenses",
            },
            {
                title: "Taxes",
                link: "/taxes",
                icon: Percent,
            },
        ],
    }
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
        link: "/sales?filter=today",
    },
    {
        key: "todayPurchases",
        title: "Today's Purchases",
        icon: ShoppingCart,
        description: "Stock purchased today",
        trendLabel: "from yesterday",
        link: "/purchases?filter=today",
    },
    {
        key: "todayProfit",
        title: "Profit Today",
        icon: TrendingUp,
        description: "Net profit after expenses",
        link: "/dashboard/analytics",
    },
    {
        key: "todayExpenses",
        title: "Expenses Today",
        icon: Wallet,
        description: "Operational expenses",
        trendLabel: "vs yesterday",
        link: "/expenses",
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
        link: "/sales/invoices?filter=pending",
    },
];

export const ACTIVITY_META: ActivityMetaType = {
    sales: {
        icon: "ShoppingCart",
        color: "text-green-500",
    },
    purchases: {
        icon: "Truck",
        color: "text-blue-500",
    },
    inventory: {
        icon: "Boxes",
        color: "text-yellow-500",
    },
    payments: {
        icon: "CreditCard",
        color: "text-purple-500",
    },
} as const;

export const KPI_CARDS_CUSTOMERS_PAGE: ContactsKpiLayout[] = [
    {
        key: "totalCustomers",
        title: "Total Customers",
        icon: Users,
        description: "Total registered customers",
    },
    {
        key: "activeCustomers",
        title: "Active Customers",
        icon: UserCheck,
        description: "Customers with recent activity",
        trendLabel: "vs last period",
    },
    {
        key: "totalReceivable",
        title: "Total Receivables",
        icon: IndianRupee,
        description: "Outstanding payments from customers",
        trendLabel: "vs last period",
    },
    {
        key: "highRiskCustomers",
        title: "High Risk Customers",
        icon: AlertTriangle,
        description: "Customers with overdue or credit risk",
    },
];

export const KPI_CARDS_SUPPLIERS_PAGE: ContactsKpiLayout[] = [
    {
        key: "totalSuppliers",
        title: "Total Suppliers",
        icon: Users,
        description: "Total registered suppliers",
    },
    {
        key: "activeSuppliers",
        title: "Active Suppliers",
        icon: UserCheck,
        description: "Suppliers with recent activity",
        trendLabel: "vs last period",
    },
    {
        key: "totalPayable",
        title: "Total Payables",
        icon: IndianRupee,
        description: "Outstanding payments to suppliers",
        trendLabel: "vs last period",
    },
    {
        key: "overdueSuppliers",
        title: "Overdue Suppliers",
        icon: AlertTriangle,
        description: "Suppliers with overdue payments",
    },
];

export const customerStatusConfig: Record<
    CustomerStatus,
    {
        label: string
        icon: LucideIcon
        className: string
    }
> = {
    active: {
        icon: Check,
        label: "Active",
        className: "text-green-500",
    },
    inactive: {
        label: "Inactive",
        icon: X,
        className: "text-yellow-500",
    },
    blocked: {
        label: "Blocked",
        icon: Ban,
        className: "text-red-500",
    },
} as const

export const invoiceStatusConfig: Record<
    InvoiceStatus,
    {
        label: string;
        icon: LucideIcon;
        className: string;
    }
> = {
    pending: {
        label: "Pending",
        icon: Clock,
        className: "text-gray-500",
    },
    partiallyPaid: {
        label: "Partially Paid",
        icon: Loader,
        className: "text-blue-500",
    },
    paid: {
        label: "Paid",
        icon: CheckCircle,
        className: "text-green-500",
    },
    overdue: {
        label: "Overdue",
        icon: AlertCircle,
        className: "text-red-500",
    },
} as const;

export const customerTypeConfig: Record<
    CustomerType,
    {
        label: string
        icon: LucideIcon
        className: string
    }
> = {
    wholesale: {
        label: "Wholesale",
        icon: Store,
        className: "text-blue-500",
    },
    retail: {
        label: "Retail",
        icon: Users,
        className: "text-purple-500",
    },
    cash: {
        label: "Cash",
        icon: Wallet,
        className: "text-orange-500",
    },
}

export const KPI_CARDS_DISCOUNT_PAGE: ContactsKpiLayout[] = [
    {
        key: "totalDiscountGiven",
        title: "Total Discount Given",
        icon: BadgePercent, // Lucide icon
    },
    {
        key: "averageDiscountPercentage",
        title: "Average Discount %",
        icon: Percent,
    },
    {
        key: "mostDiscounted",
        title: "Most Discounted Item",
        icon: Tag,
    },
];

export const KPI_CARDS_SALES_PAGE: ContactsKpiLayout[] = [
    {
        key: "totalRevenue",
        title: "Total Revenue",
        icon: IndianRupee, // or "dollar-sign" if multi-currency
    },
    {
        key: "totalOrders",
        title: "Total Orders",
        icon: ShoppingCart,
    },
    {
        key: "averageOrderValue",
        title: "Average Order Value",
        icon: Calculator,
    },
    {
        key: "totalOutstanding",
        title: "Total Outstanding",
        icon: Wallet, // represents pending money
    },
    {
        key: "totalOverdue",
        title: "Total Overdue",
        icon: AlertCircle, // indicates urgency / overdue state
    },
];
import { NavSection } from "@/types/types";

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
} from "lucide-react";

export const NAV_LINKS: NavSection[] = [
    {
        title: "Overview",
        items: [
            {
                title: "Analytics",
                link: "/analytics",
                UserRoles: ["Admin", "Manager"],
                icon: BarChart3,
            },
            {
                title: "Reports",
                link: "/reports",
                UserRoles: ["Admin", "Manager"],
                icon: FileText,
            },
        ],
    },
    {
        title: "Sales",
        items: [
            {
                title: "Invoices",
                link: "/invoices",
                UserRoles: ["Admin", "Cashier", "Manager"],
                icon: Receipt,
            },
            {
                title: "Returns",
                link: "/returns",
                UserRoles: ["Admin", "Cashier", "Manager"],
                icon: RotateCcw,
            },
            {
                title: "Discounts",
                link: "/discounts",
                UserRoles: ["Admin", "Manager"],
                icon: Tag,
            },
        ],
    },
    {
        title: "Management",
        items: [
            {
                title: "Customers",
                link: "/customers",
                UserRoles: ["Admin", "Cashier", "Manager"],
                icon: Users,
            },
            {
                title: "Suppliers",
                link: "/suppliers",
                UserRoles: ["Admin", "Manager"],
                icon: Truck,
            },
            {
                title: "Expenses",
                link: "/expenses",
                UserRoles: ["Admin", "Manager"],
                icon: Wallet,
            },
            {
                title: "Taxes",
                link: "/taxes",
                UserRoles: ["Admin"],
                icon: Percent,
            },
        ],
    },
];
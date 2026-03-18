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
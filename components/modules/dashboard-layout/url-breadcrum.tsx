"use client";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { Fragment } from "react";

export default function UrlBreadcrumbs() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean)

    const routeNames: Record<string, string> = {
        dashboard: "Dashboard",
        habits: "Habits",
        "create-habit": "Create Habit",
    }


    const breadcrumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        // const label = decodeURIComponent(segment)
        const label = routeNames[segment] ?? segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())

        return { href, label }
    })

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">
                            <Home className="size-4" />
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {breadcrumbs.map((crumb, index) => (
                    <Fragment key={crumb.href}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {index === breadcrumbs.length - 1 ? (
                                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link href={crumb.href}>{crumb.label}</Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
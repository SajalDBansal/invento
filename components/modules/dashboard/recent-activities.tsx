"use client";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ActivityFilter, RecentActivitiesProp } from "@/types/types";
import { OctagonAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ACTIVITY_META } from "@/public/data";
import { cn, getTimeAgo } from "@/lib/utils";
import { RenderIcon } from "@/components/render-icon";

const now = Date.now();

export const RECENT_ACTIVITIES: RecentActivitiesProp[] = [
    {
        id: "sale-1",
        title: "Invoice #INV-001 created",
        description: "Customer John Doe - ₹12,500",
        timeStamp: new Date(now - 30 * 1000).toISOString(), // 30 sec ago
        type: "sales",
        link: "/sales/invoices/INV-001",
    },
    {
        id: "payment-1",
        title: "Payment received",
        description: "₹12,500 via UPI",
        timeStamp: new Date(now - 2 * 60 * 1000).toISOString(), // 2 min ago
        type: "payments",
    },
    {
        id: "inventory-2",
        title: "Low stock alert",
        description: "Product B below threshold",
        timeStamp: new Date(now - 10 * 60 * 1000).toISOString(), // 10 min ago
        type: "inventory",
    },
    {
        id: "sale-3",
        title: "Invoice #INV-003 updated",
        description: "Discount applied",
        timeStamp: new Date(now - 45 * 60 * 1000).toISOString(), // 45 min ago
        type: "sales",
        link: "/sales/invoices/INV-003",
    },
    {
        id: "purchase-2",
        title: "Stock purchased",
        description: "₹15,000 inventory added",
        timeStamp: new Date(now - 2 * 60 * 60 * 1000).toISOString(), // 2 hr ago
        type: "purchases",
    },
    {
        id: "payment-3",
        title: "Invoice payment completed",
        description: "#INV-002",
        timeStamp: new Date(now - 5 * 60 * 60 * 1000).toISOString(), // 5 hr ago
        type: "payments",
    },
    {
        id: "inventory-1",
        title: "Stock updated",
        description: "Product A quantity increased",
        timeStamp: new Date(now - 8 * 60 * 60 * 1000).toISOString(), // 8 hr ago
        type: "inventory",
    },
    {
        id: "sale-4",
        title: "Invoice #INV-004 paid",
        description: "Paid via UPI",
        timeStamp: new Date(now - 12 * 60 * 60 * 1000).toISOString(), // 12 hr ago
        type: "sales",
        link: "/sales/invoices/INV-004",
    },
    {
        id: "purchase-1",
        title: "Purchase order #PO-001 created",
        description: "Supplier ABC Traders",
        timeStamp: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        type: "purchases",
        link: "/purchases/PO-001",
    },
    {
        id: "payment-4",
        title: "Partial payment received",
        description: "₹5,000",
        timeStamp: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        type: "payments",
    },
    {
        id: "inventory-4",
        title: "Stock adjustment",
        description: "Manual correction",
        timeStamp: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        type: "inventory",
    },
    {
        id: "sale-6",
        title: "Invoice #INV-005 created",
        description: "Customer Aman Gupta",
        timeStamp: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        type: "sales",
        link: "/sales/invoices/INV-005",
    },
    {
        id: "purchase-5",
        title: "Supplier invoice received",
        description: "₹7,800",
        timeStamp: new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
        type: "purchases",
    },
    {
        id: "payment-5",
        title: "Refund issued",
        description: "₹1,200 returned",
        timeStamp: new Date(now - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
        type: "payments",
    },
    {
        id: "inventory-8",
        title: "Inventory audit completed",
        description: "No discrepancies",
        timeStamp: new Date(now - 40 * 24 * 60 * 60 * 1000).toISOString(), // ~1 month ago
        type: "inventory",
    },
    {
        id: "sale-8",
        title: "Invoice #INV-006 cancelled",
        description: "Customer request",
        timeStamp: new Date(now - 75 * 24 * 60 * 60 * 1000).toISOString(), // ~2.5 months ago
        type: "sales",
        link: "/sales/invoices/INV-006",
    },
    {
        id: "purchase-8",
        title: "Purchase cancelled",
        description: "Supplier issue",
        timeStamp: new Date(now - 150 * 24 * 60 * 60 * 1000).toISOString(), // ~5 months ago
        type: "purchases",
    },
    {
        id: "payment-8",
        title: "Bank transfer completed",
        description: "₹10,000",
        timeStamp: new Date(now - 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year ago
        type: "payments",
    },
];

export default function RecentActivitiesCard() {
    const [filter, setFilter] = useState<ActivityFilter>("all");

    const filteredActivities = useMemo(() => {
        if (filter === "all") return RECENT_ACTIVITIES.slice(0, 6);
        return RECENT_ACTIVITIES.filter((act) => act.type === filter).slice(0, 6);
    }, [RECENT_ACTIVITIES, filter]);

    return (
        <Card className="@container/card p-4 gap-2 space-y-2">
            <CardHeader className="p-0">
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Track recent system and business activities
                    </span>
                    <span className="@[540px]/card:hidden">Recent updates</span>
                </CardDescription>

                <CardAction>
                    <Select value={filter}
                        onValueChange={(value) => setFilter(value as ActivityFilter)}>
                        <SelectTrigger
                            className="w-40 flex "
                            size="sm"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Filter activities" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="all" className="rounded-lg">
                                All
                            </SelectItem>
                            <SelectItem value="sales" className="rounded-lg">
                                Sales
                            </SelectItem>
                            <SelectItem value="purchases" className="rounded-lg">
                                Purchases
                            </SelectItem>
                            <SelectItem value="payments" className="rounded-lg">
                                Payments
                            </SelectItem>
                            <SelectItem value="inventory" className="rounded-lg">
                                Inventory
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>

            <CardContent className="px-1 grid gap-2 sm:grid-cols-2 flex-1 overflow-y-auto">
                {
                    filteredActivities.length != 0 ?
                        filteredActivities.map((card) => (
                            <Link href={`/${card.type}?id=${card.id}`} key={card.id}>
                                <div
                                    className={'flex justify-between border p-2 rounded-lg h-full'}
                                >
                                    <div className="flex items-center gap-4 pl-1">
                                        {/* <card.icon /> */}
                                        <RenderIcon name={ACTIVITY_META[card.type].icon} size={28} className={ACTIVITY_META[card.type].color} />
                                        <div className='flex flex-col'>

                                            <span className="font-semibold">
                                                {card.title}

                                            </span>
                                            <span className="text-xs pl-1 py-1 dark:text-muted-foreground">
                                                {card.description}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Badge variant={"secondary"}>
                                            {
                                                getTimeAgo(card.timeStamp) || "Just Now"
                                            }
                                        </Badge>
                                    </div>
                                </div>
                            </Link>
                        )) :
                        <div className="col-span-full mx-auto flex flex-col items-center justify-center gap-3 py-12 text-center text-muted-foreground">
                            <div className="p-3 rounded-full bg-muted">
                                <OctagonAlert className="w-6 h-6 opacity-80" />
                            </div>

                            <p className="text-sm font-medium">No {filter !== "all" ? filter : ""} activities found</p>

                            <p className="text-xs opacity-70 max-w-xs">
                                {filter === "all"
                                    ? "There are no recent activities yet."
                                    : `There are no recent ${filter} activities. Try a different filter or check back later.`}
                            </p>
                        </div>
                }
            </CardContent>

            <CardFooter className="px-0">
                <Link href={`/dashboard/activities`} className="w-full">
                    <Button className="w-full" variant="outline">
                        More...
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
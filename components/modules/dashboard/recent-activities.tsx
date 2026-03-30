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


export default function RecentActivitiesCard({ data }: { data: RecentActivitiesProp }) {
    const [filter, setFilter] = useState<ActivityFilter>("all");

    const filteredActivities = useMemo(() => {
        if (filter === "all") return data.slice(0, 6);
        return data.filter((act) => act.type === filter).slice(0, 6);
    }, [data, filter]);

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
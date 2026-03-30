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
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { OctagonAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { DashboardPartiesData } from "@/types/types";


export default function CustomerCard({ data }: { data: DashboardPartiesData }) {
    const router = useRouter();
    const [filter, setFilter] = useState<"top" | "new">("top");

    return (
        <Card className="@container/card p-4 gap-2 space-y-2">
            <CardHeader className="p-0">
                <CardTitle>Customers</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        View and manage your top and newly added customers
                    </span>
                    <span className="@[540px]/card:hidden">Customer insights</span>
                </CardDescription>

                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={filter}
                        onValueChange={(value) => setFilter(value as "top" | "new")}
                        variant="outline"
                    >
                        <ToggleGroupItem value="top">Top</ToggleGroupItem>
                        <ToggleGroupItem value="new">New</ToggleGroupItem>
                    </ToggleGroup>
                </CardAction>
            </CardHeader>

            <CardContent className="px-1 gap-2 flex-1 overflow-y-auto">
                {
                    data[filter].length != 0 ?
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden md:table-cell">ID</TableHead>
                                    <TableHead className="">Name</TableHead>
                                    <TableHead >Status</TableHead>
                                    <TableHead className="hidden md:table-cell">Last Billed</TableHead>
                                    <TableHead className="text-right">Balance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data[filter].map((customer) => (
                                    <TableRow
                                        className="cursor-pointer"
                                        key={customer.id}
                                        onClick={() => router.push(`/customers/${customer.id}`)}>
                                        <TableCell className="hidden md:table-cell">{customer.id}</TableCell>
                                        <TableCell className="font-medium underline">{customer.name}</TableCell>
                                        <TableCell >
                                            <Badge variant={"outline"}>
                                                {customer.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {customer.date}
                                        </TableCell>
                                        <TableCell className="text-right">{customer.balance}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        :
                        <div className="col-span-full mx-auto flex flex-col items-center justify-center gap-3 py-12 text-center text-muted-foreground h-full">
                            <div className="p-3 rounded-full bg-muted">
                                <OctagonAlert className="w-6 h-6 opacity-80" />
                            </div>

                            <p className="text-sm font-medium"> No customers found</p>

                            <p className="text-xs opacity-70 max-w-xs">
                                {filter === "top"
                                    ? "No top customers available yet. Start adding transactions to identify high-value customers."
                                    : "No new customers added recently. Add customers to see them appear here."}
                            </p>
                        </div>
                }

            </CardContent>

            <CardFooter className="px-0">
                <Link href={`/customers`} className="w-full">
                    <Button className="w-full" variant="outline">
                        More...
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
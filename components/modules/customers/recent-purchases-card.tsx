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
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
    OctagonAlert,
    XCircle,
} from "lucide-react";
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CuntomersLastInvoiceData, InventoryAlertProp } from "@/types/types";
import { RenderIcon } from "@/components/render-icon";


export default function RecentPurchasesCard({ data }: { data: CuntomersLastInvoiceData }) {
    const [filteredData, setFilteredData] = useState(data.products);

    useEffect(() => {
        setFilteredData(data.products);
    }, [data]);

    const onClearButtonClick = (dataId: string) => {
        setFilteredData((prev) => prev.filter((item) => item.id !== dataId));
    };

    return (
        <Card className="@container/card p-4 gap-2 space-y-2">
            <CardHeader className="p-0">
                <CardTitle>Recent Purchases</CardTitle>
                <CardDescription>
                    <span className="hidden sm:inline">
                        An overview of recent purchases made by customers, including product details and purchase dates.
                    </span>
                    <span className="sm:hidden">Recent purchases</span>
                </CardDescription>

            </CardHeader>

            <CardContent className="p-0 gap-1 flex flex-col">
                {
                    filteredData.length != 0 ?
                        filteredData.map((card) => (
                            <Link href={`/products/${card.code}`} key={card.id}>
                                <div
                                    className='flex justify-between border p-2 rounded-lg h-full hover:bg-muted transition-colors'
                                >
                                    <div className="flex items-center gap-3 pl-1">
                                        {/* <card.icon /> */}
                                        <RenderIcon name={card.icon} size={28} />
                                        <div className='flex flex-col'>
                                            <div>
                                                <span className="font-semibold">
                                                    {card.company}

                                                </span>
                                                <span className="text-xs pl-1 py-1">
                                                    &nbsp;- {card.productName}
                                                </span>
                                            </div>


                                            <span className='text-black/70 dark:text-muted-foreground pl-1 text-xs'>
                                                {card.code}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Badge variant={"outline"}
                                        >
                                            {card.quantity} {card.unit}

                                        </Badge>
                                    </div>
                                </div>
                            </Link>
                        )) :
                        <div className="col-span-full mx-auto flex flex-col items-center justify-center gap-3 py-12 text-center text-muted-foreground">
                            <div className="p-3 rounded-full bg-muted">
                                <OctagonAlert className="w-6 h-6 opacity-80" />
                            </div>

                            <p className="text-sm font-medium">Nothing to show here right now</p>

                            <p className="text-xs opacity-70 max-w-xs">
                                There are no items in this category at the moment. Once inventory matches this view, it will appear here automatically.
                            </p>
                        </div>
                }
            </CardContent>

            <CardFooter className="px-0">
                <Link href={`/sales/invoices/${data.invoiceId}`} className="w-full">
                    <Button className="w-full" variant="outline">
                        More...
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
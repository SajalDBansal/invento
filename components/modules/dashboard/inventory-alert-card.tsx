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
    LucideIcon, Wrench,
    Hammer,
    Drill,
    Package,
    Settings,
    Cog,
} from "lucide-react";
import { useState } from "react"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type DataType = {
    low: {
        id: string,
        productName: string;
        company: string;
        code: string;
        units: string;
        icon: LucideIcon;
    }[];
    fast: {
        id: string,
        productName: string;
        company: string;
        code: string;
        units: string;
        icon: LucideIcon;
    }[];
    out: {
        id: string,
        productName: string;
        company: string;
        code: string;
        icon: LucideIcon;
        units?: number
    }[];
}

export const INVENTORY_DATA: DataType = {
    low: [
        {
            id: "low-1",
            productName: "Adjustable Wrench",
            company: "Taparia",
            code: "HW-AW-101",
            units: "5 pcs",
            icon: Wrench,
        },
        {
            id: "low-2",
            productName: "Claw Hammer",
            company: "Stanley",
            code: "HW-CH-202",
            units: "3 pcs",
            icon: Hammer,
        },
        {
            id: "low-3",
            productName: "Electric Drill Machine",
            company: "Bosch",
            code: "HW-DR-303",
            units: "2 pcs",
            icon: Drill,
        },
        {
            id: "low-4",
            productName: "PVC Pipe (1 inch)",
            company: "Supreme",
            code: "HW-PVC-404",
            units: "10 pcs",
            icon: Package,
        },
        {
            id: "low-5",
            productName: "Hex Key Set",
            company: "Ingco",
            code: "HW-HK-505",
            units: "4 pcs",
            icon: Settings,
        },
        {
            id: "low-6",
            productName: "Bearing Set",
            company: "SKF",
            code: "HW-BR-606",
            units: "6 pcs",
            icon: Cog,
        },
    ],

    fast: [
        {
            id: "fast-1",
            productName: "Nails Pack (2 inch)",
            company: "Generic",
            code: "HW-NL-111",
            units: "120 pcs",
            icon: Hammer,
        },
        {
            id: "fast-2",
            productName: "Screws Pack",
            company: "Hilti",
            code: "HW-SC-222",
            units: "95 pcs",
            icon: Settings,
        },
        {
            id: "fast-3",
            productName: "Measuring Tape",
            company: "Freemans",
            code: "HW-MT-333",
            units: "40 pcs",
            icon: Wrench,
        },
        {
            id: "fast-4",
            productName: "Drill Bits Set",
            company: "Bosch",
            code: "HW-DB-444",
            units: "30 pcs",
            icon: Drill,
        },
        {
            id: "fast-5",
            productName: "Wall Plugs",
            company: "Fischer",
            code: "HW-WP-555",
            units: "80 pcs/day",
            icon: Package,
        },
        {
            id: "fast-6",
            productName: "Cutting Blade",
            company: "Makita",
            code: "HW-CB-666",
            units: "25 pcs/day",
            icon: Cog,
        },
    ],

    out: [
        {
            id: "out-1",
            productName: "Angle Grinder",
            company: "Makita",
            code: "HW-AG-777",
            icon: Drill,
        },
        {
            id: "out-2",
            productName: "Pipe Cutter",
            company: "Taparia",
            code: "HW-PC-888",
            icon: Wrench,
        },
        {
            id: "out-3",
            productName: "Paint Roller Set",
            company: "Asian Paints",
            code: "HW-PR-999",
            icon: Package,
        },
        {
            id: "out-4",
            productName: "Spirit Level Tool",
            company: "Stanley",
            code: "HW-SL-112",
            icon: Settings,
        },
        {
            id: "out-5",
            productName: "Hand Saw",
            company: "Bosch",
            code: "HW-HS-223",
            icon: Hammer,
        },
        {
            id: "out-6",
            productName: "Grease Gun",
            company: "Groz",
            code: "HW-GG-334",
            icon: Cog,
        },
    ],
};

export default function InventoryAlertCard() {
    type StockCategory = keyof DataType;
    const [stockCategory, setStockCategory] = useState<StockCategory>("out");

    const filteredData = INVENTORY_DATA[stockCategory];

    return (
        <Card className="@container/card p-4 gap-2 space-y-2">
            <CardHeader className="p-0">
                <CardTitle>Inventory</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Track stock levels and movements
                    </span>
                    <span className="@[540px]/card:hidden">Inventory overview</span>
                </CardDescription>

                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={stockCategory}
                        onValueChange={(value) => setStockCategory(value as keyof DataType)}
                        variant="outline"
                        className="hidden lg:flex"
                    >
                        <ToggleGroupItem value="out">Out Of Stock</ToggleGroupItem>
                        <ToggleGroupItem value="fast">Fast Moving</ToggleGroupItem>
                        <ToggleGroupItem value="low">Low Stock</ToggleGroupItem>
                    </ToggleGroup>

                    <Select value={stockCategory}
                        onValueChange={(value) => setStockCategory(value as keyof DataType)}>
                        <SelectTrigger
                            className="w-40 flex lg:hidden"
                            size="sm"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="out" className="rounded-lg">
                                Out Of Stock
                            </SelectItem>
                            <SelectItem value="fast" className="rounded-lg">
                                Fast Moving
                            </SelectItem>
                            <SelectItem value="low" className="rounded-lg">
                                Low Stock
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>

            <CardContent className="px-1 grid gap-2 sm:grid-cols-2">
                {
                    filteredData.map((card) => (
                        <Link href={`/products/${card.code}`} key={card.id}>
                            <div
                                className={cn('flex justify-between border p-2 rounded-lg ',
                                    stockCategory == "low" && "border-orange-600 bg-orange-500/30 dark:bg-orange-500/10",
                                    stockCategory == "out" && "border-red-600 bg-red-500/30 dark:bg-red-500/10",
                                    stockCategory == "fast" && "border-green-600 bg-green-500/30 dark:bg-green-500/10",
                                )}
                            >
                                <div className="flex items-center gap-3 pl-1">
                                    <card.icon />
                                    <div className='flex flex-col'>

                                        <span className="font-semibold">
                                            {card.company}

                                        </span>
                                        <span className="text-xs pl-1 py-1">
                                            {card.productName}
                                        </span>

                                        <span className='text-black/70 dark:text-muted-foreground pl-1 text-xs'>
                                            {card.code}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <Badge variant={stockCategory == "out" ? "destructive" : "default"}
                                        className={cn(
                                            stockCategory == "low" && "bg-orange-400/50 text-orange-800 dark:text-orange-200",
                                            stockCategory == "fast" && "bg-green-400/50 text-green-800 dark:text-green-200",
                                        )}
                                    >
                                        {
                                            stockCategory === "out" ? "OUT" : (card.units)
                                        }

                                    </Badge>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </CardContent>

            <CardFooter className="px-0">
                <Link href={`/products?filter=${stockCategory}-stock`} className="w-full">
                    <Button className="w-full" variant="outline">
                        More...
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
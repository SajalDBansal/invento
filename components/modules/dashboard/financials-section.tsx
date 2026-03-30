"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";
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
import { IndianRupee, LucideIcon, Percent, Wallet } from "lucide-react";
import { DashboardFinanceSectionProp } from "@/types/types";
import { formatCurrency } from "@/lib/utils";

type netDataType = {
    netExpenses: string,
    netRevenue: string,
    netMargin: string,
}

const calculateNetData = (
    data: DashboardFinanceSectionProp["chartData"]
): netDataType => {
    let totalRevenue = 0;
    let totalExpenses = 0;

    for (const item of data) {
        totalRevenue += item.revenue;
        totalExpenses += item.expense;
    }

    const netMarginValue = totalRevenue - totalExpenses;
    const marginPercent = totalRevenue === 0 ? 0 : (netMarginValue / totalRevenue) * 100;

    return {
        netRevenue: formatCurrency(totalRevenue),
        netExpenses: formatCurrency(totalExpenses),
        netMargin: `${marginPercent.toFixed(2)}%`,
    };
};

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "var(--chart-1)",
    },
    expense: {
        label: "Expenses",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig


export default function FinancialSection({ data }: { data: DashboardFinanceSectionProp }) {
    const [timeRange, setTimeRange] = useState("30d");

    const filteredData = useMemo(() => {
        const endDate = new Date();
        const startDate = new Date();

        let daysToSubtract = 365;

        if (timeRange === "90d") daysToSubtract = 90;
        else if (timeRange === "30d") daysToSubtract = 30;
        else if (timeRange === "7d") daysToSubtract = 7;

        startDate.setDate(endDate.getDate() - daysToSubtract + 1);

        return data.chartData.filter((item) => {
            const date = new Date(item.date);
            return date >= startDate && date <= endDate;
        });
    }, [timeRange, data.chartData]);

    const netData = useMemo(() => {
        return calculateNetData(filteredData);
    }, [filteredData]);

    return (
        <Card className="@container/card p-4 gap-2 space-y-2 col-span-full">

            <CardHeader className="p-0">
                <CardTitle>

                    <span className="hidden @[540px]/card:block">
                        Financial Performance
                    </span>
                    <span className="@[540px]/card:hidden">Financials</span>
                </CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Daily summary and tax calculation
                    </span>
                    <span className="@[540px]/card:hidden">Daily summary</span>
                </CardDescription>

                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange} onValueChange={setTimeRange}
                        variant="outline"
                        className="hidden lg:flex"
                    >
                        <ToggleGroupItem value="365d">Last 1 year</ToggleGroupItem>
                        <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
                        <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
                        <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
                    </ToggleGroup>

                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="w-40 flex lg:hidden"
                            size="sm"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="365d" className="rounded-lg">
                                Last 1 year
                            </SelectItem>
                            <SelectItem value="90d" className="rounded-lg">
                                Last 3 months
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                Last 30 days
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Last 7 days
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="px-1">
                <div className=" grid grid-cols-2 gap-4 lg:grid-cols-3">

                    <div className='col-span-full xl:col-span-2 *:data-[slot=card-content]:space-y-6' >
                        {/* <div className="bg-white/10 rounded h-full"> */}
                        <ChartContainer
                            config={chartConfig}
                            className="aspect-auto h-[300px] w-full"
                        >
                            <AreaChart data={filteredData}>
                                <defs>
                                    <linearGradient id="fillrevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-revenue)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-revenue)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                    <linearGradient id="fillexpense" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-expense)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-expense)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    minTickGap={32}
                                    tickFormatter={(value) => {
                                        const date = new Date(value)
                                        return date.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            className="gap-4 w-[150px]"
                                            labelFormatter={(value) => {
                                                return new Date(value).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                            }}
                                            indicator="dot"
                                        />
                                    }
                                />
                                <Area
                                    dataKey="expense"
                                    type="natural"
                                    fill="url(#fillexpense)"
                                    stroke="var(--color-expense)"
                                    stackId="a"
                                />
                                <Area
                                    dataKey="revenue"
                                    type="natural"
                                    fill="url(#fillrevenue)"
                                    stroke="var(--color-revenue)"
                                    stackId="a"
                                />
                            </AreaChart>
                        </ChartContainer>
                        {/* </div> */}
                    </div>

                    <div className='gap-4 col-span-full xl:col-span-1 grid-cols-2'>
                        <div className='justify-between *:data-[slot=card-content]:space-y-5 h-full' >
                            <div className='grid gap-4 grid-cols-2 h-full'>
                                <FinancialsCard
                                    title="Net Revenue"
                                    value={netData.netRevenue}
                                    icon={IndianRupee}
                                    description={"Total income generated after returns and discounts (YoY comparison)"}

                                />
                                <FinancialsCard
                                    title="Net Expenses"
                                    value={netData.netExpenses}
                                    icon={Wallet}
                                    description={"Total operational and miscellaneous expenditures for the period"}

                                />
                                <div className="col-span-full self-end">
                                    <FinancialsCard
                                        title="Net Margin"
                                        value={netData.netMargin}
                                        icon={Percent}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function FinancialsCard({
    title,
    value,
    icon: Icon,
    description,
}: {
    title: string,
    value: string | number,
    icon: LucideIcon,
    description?: string
}) {
    return (
        <Card className="@container/card p-2 md:p-4 gap-2">
            <CardHeader className="p-0">
                <div className="flex flex-col space-y-1">
                    <CardDescription >
                        {title}
                    </CardDescription>
                    <CardTitle className="text-md md:text-lg font-semibold tabular-nums">
                        {value}
                    </CardTitle>
                </div>
                <CardAction className="hidden sm:flex flex-col items-center space-y-2">
                    <div className="border p-2 rounded-lg">
                        <Icon />
                    </div>
                </CardAction>
            </CardHeader>
            {
                description &&
                <CardFooter className=" text-sm p-0 items-end h-full text-muted-foreground hidden md:flex">
                    <div className="font-medium">
                        {description}
                    </div>
                </CardFooter>
            }

        </Card>
    );
}
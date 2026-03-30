"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, ReferenceLine } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { DashboardAnalyticsData } from "@/types/types"

export default function AnalyticsSection({ data }: { data: DashboardAnalyticsData }) {
    return (
        <div className="col-span-full grid grid-cols-2 gap-4 lg:grid-cols-3">

            <div className='col-span-full xl:col-span-1 justify-between gap-3 *:data-[slot=card-content]:space-y-5' >
                <WeeklyRevenueChart weeklyData={data.weeklyRevenueChartData} />
            </div>

            <div className='col-span-full xl:col-span-2 *:data-[slot=card-content]:space-y-6' >
                <SalesChart salesData={data.salesChartData} target={data.salesTarget} />
            </div>
        </div>
    )
}

const salesChartConfig = {
    sales: {
        label: "Sales",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

function SalesChart({ salesData, target }: {
    salesData: {
        month: string;
        sales: number;
    }[]
    ,
    target: number
}) {
    return (
        <Card className="@container/card p-4 gap-2 space-y-2 col-span-full h-full">
            <CardHeader className="p-0">
                <CardTitle>
                    <span className="hidden @[540px]/card:block">
                        Monthly Sales vs Target
                    </span>
                    <span className="@[540px]/card:hidden">Sales</span>
                </CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Track monthly sales performance against your set targets                    </span>
                    <span className="@[540px]/card:hidden">Target progress</span>
                </CardDescription>
            </CardHeader>

            <CardContent className="px-1">
                <ChartContainer
                    config={salesChartConfig}
                    className="aspect-auto h-[320px] w-full"
                >
                    <AreaChart
                        accessibilityLayer
                        data={salesData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <ReferenceLine
                            y={target}
                            stroke="var(--color-primary)"
                            strokeDasharray="4 5"
                            label={`TARGET : ${target}`}
                        />
                        <Area
                            dataKey="sales"
                            type="natural"
                            fill="var(--color-sales)"
                            fillOpacity={0.4}
                            stroke="var(--color-sales)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

const weeklyRevenueChartConfig = {
    revenue: {
        label: "Revenue",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

function WeeklyRevenueChart({ weeklyData }: {
    weeklyData: {
        day: string;
        revenue: number;
    }[]
}) {
    return (
        <Card className="@container/card p-4 gap-2 space-y-2 col-span-full h-full justify-between">
            <CardHeader className="p-0">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Weekly Revenue Chart</CardTitle>
                    <CardDescription>Weekly revenue trends over the selected period</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-1">
                <ChartContainer config={weeklyRevenueChartConfig}>
                    <BarChart accessibilityLayer data={weeklyData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={6} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

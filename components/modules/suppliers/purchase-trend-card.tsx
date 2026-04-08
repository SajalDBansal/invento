"use client";
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

const weeklyRevenueChartConfig = {
    revenue: {
        label: "Revenue",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export default function PurchaseTrendCard({ monthlyData }: {
    monthlyData: {
        month: string;
        revenue: number;
    }[]
}) {
    return (
        <Card className="@container/card p-4 gap-2 space-y-2 col-span-full md:col-span-1 justify-between w-full">
            <CardHeader className="p-0">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Monthly Revenue Chart</CardTitle>
                    <CardDescription
                        className="hidden md:flex lg:hidden"
                    >
                        The Weekly Purchase card provides a consolidated view of a customer’s spending behavior over the most recent seven-day period. It is designed to give both users and system operators a quick, data-rich snapshot of transaction activity, enabling faster insights into purchasing patterns, category distribution, and short-term financial trends.<br />
                        Overall, this component serves as a critical touchpoint in the customer dashboard, bridging raw financial data with actionable insights through clear visualization, intelligent aggregation, and responsive design.
                    </CardDescription>

                    <CardDescription
                        className="flex md:hidden lg:flex"
                    >Monthly revenue trends for 6 months
                    </CardDescription>

                </div>
            </CardHeader>
            <CardContent className="px-1">
                <ChartContainer config={weeklyRevenueChartConfig}>
                    <BarChart accessibilityLayer data={monthlyData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
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

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { KPI_CARDS } from "@/public/data";
import { KpiCardProps } from "@/types/types";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import Link from "next/link";

type KpiKey =
    | "todaySales"
    | "todayPurchases"
    | "todayExpenses"
    | "lowStockItems"
    | "todayProfit"
    | "pendingPayments";

type KpiData = {
    value: string;
    trend?: number;
};

const data: Record<KpiKey, KpiData> = {
    todaySales: {
        value: "₹12,400",
        trend: 8,
    },
    todayPurchases: {
        value: "₹7,200",
        trend: 3,
    },
    todayExpenses: {
        value: "₹2,100",
    },
    lowStockItems: {
        value: "23",
    },
    todayProfit: {
        value: "₹3,100",
        trend: 6,
    },
    pendingPayments: {
        value: "₹5,800",
    },

}

export default function KPISection() {
    return (
        <div className='col-span-full grid gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {
                KPI_CARDS.map((card, index) => (
                    <KpiCard
                        key={index}
                        title={card.title}
                        value={data[card.key].value}
                        icon={card.icon}
                        trend={data[card.key].trend}
                        trendLabel={card.trendLabel}
                        description={card.description}
                        link={card.link}
                    />
                ))
            }
        </div>
    )
}

function KpiCard({
    title,
    value,
    icon: Icon,
    trend,
    trendLabel = "vs yesterday",
    description,
    link
}: KpiCardProps) {
    const isPositive = trend !== undefined && trend >= 0;

    return (
        <Link href={link}>
            <Card className="@container/card p-4 gap-2">
                <CardHeader className="p-0">
                    <CardDescription>
                        {title}
                    </CardDescription>
                    <CardTitle className="text-xl lg:text-2xl font-semibold tabular-nums pl-2">
                        {value}
                    </CardTitle>
                    <CardAction className="flex flex-col items-center space-y-2">
                        <div className="border p-2 rounded-lg">
                            <Icon />
                        </div>
                    </CardAction>
                </CardHeader>

                <CardFooter className="flex-col items-start gap-1.5 text-sm p-0">
                    <div className="flex gap-2 font-medium">
                        {
                            trend && (trend > 0 ?
                                <Badge variant="outline" className="bg-[#00c130]/20 text-[#00c130] border-none">
                                    <TrendingUp />
                                    {trend}%
                                </Badge>
                                :
                                <Badge variant="destructive">
                                    <TrendingDown />
                                    {trend}%
                                </Badge>)
                        }
                        {trend ? (trendLabel) : (description)}
                    </div>
                    {/* <div className="text-muted-foreground text-sm">
                    description
                </div> */}
                </CardFooter>
            </Card>
        </Link>
    );
}
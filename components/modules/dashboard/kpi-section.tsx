import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { KPI_CARDS } from "@/public/data";
import { KpiBackendData, KpiBackendKey, KpiCardProps } from "@/types/types";
import { TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";



export default function KPISection({ data }: { data: Record<KpiBackendKey, KpiBackendData> }) {
    return (
        <div className='col-span-full grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
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
            <Card className="@container/card p-4 gap-2 h-full">
                <CardHeader className="p-0">
                    <div className="flex flex-col space-y-1">
                        <CardDescription className="truncate">
                            {title}
                        </CardDescription>
                        <CardTitle className="text-xl lg:text-2xl font-semibold tabular-nums pl-2">
                            {value}
                        </CardTitle>
                    </div>
                    <CardAction className="hidden sm:flex flex-col items-center space-y-2">
                        <div className="border p-2 rounded-lg">
                            <Icon />
                        </div>
                    </CardAction>
                </CardHeader>

                <CardFooter className="gap-1.5 text-sm p-0 flex items-end h-full">
                    <div className="flex flex-col sm:flex-row gap-2 font-medium">
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
                        {trend && (trendLabel)}
                    </div>
                    {!trend && (description)}

                </CardFooter>
            </Card>
        </Link>
    );
}
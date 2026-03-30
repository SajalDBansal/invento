import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { KPI_CARDS_CUSTOMERS_PAGE } from "@/public/data";
import { CustomersKPICardProp, CustomersPageKPIData, CustomersPageKPIKey } from "@/types/types";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function CustomersKPISection({ data }: { data: Record<CustomersPageKPIKey, CustomersPageKPIData> }) {
    return (
        <div className='col-span-full grid gap-4 grid-cols-2 lg:grid-cols-4'>
            {
                KPI_CARDS_CUSTOMERS_PAGE.map((card, index) => (
                    <KpiCard
                        key={index}
                        title={card.title}
                        value={data[card.key].value}
                        icon={card.icon}
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
}: CustomersKPICardProp) {

    return (
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
        </Card>
    );
}
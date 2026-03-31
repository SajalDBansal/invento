import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KPI_CARDS_CUSTOMERS_PAGE } from "@/public/data";
import { CustomersKPICardProp, CustomersPageKPIData } from "@/types/types";

export default function CustomersKPISection({ data }: { data: Record<string, CustomersPageKPIData> }) {
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

export function KpiCard({
    title,
    value,
    icon: Icon,
    className
}: CustomersKPICardProp) {

    return (
        <Card className={`@container/card p-4 gap-2 h-full ${className || ""}`}>
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
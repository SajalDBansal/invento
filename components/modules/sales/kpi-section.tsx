import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { KPI_CARDS_DISCOUNT_PAGE } from "@/public/data";
import { ContactsKPICardProp, ContactsKpiLayout, SalesPageKPIData } from "@/types/types";

export default function SalesKPISection({ data, kpiDetails }: { data: SalesPageKPIData, kpiDetails: ContactsKpiLayout[] }) {
    return (
        <div className={cn(`col-span-full grid gap-4 grid-cols-2 `,
            `lg:grid-cols-${kpiDetails.length}`
        )}>
            {
                kpiDetails.map((card, index) => (
                    <KpiCard
                        key={index}
                        title={card.title}
                        value={data[card.key].value}
                        icon={card.icon}
                        className={`${index == 2 && "col-span-full lg:col-span-1"}`}
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
}: ContactsKPICardProp) {

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
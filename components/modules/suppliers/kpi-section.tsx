import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KPI_CARDS_SUPPLIERS_PAGE } from "@/public/data";
import { ContactsKPICardProp, suppliersPageKPIData, SuppliersPageKPIKey } from "@/types/types";

export default function SuppliersKPISection({ data }: { data: suppliersPageKPIData }) {
    return (
        <div className='col-span-full grid gap-4 grid-cols-2 lg:grid-cols-4'>
            {
                KPI_CARDS_SUPPLIERS_PAGE.map((card, index) => (
                    <KpiCard
                        key={index}
                        title={card.title}
                        value={data[card.key as SuppliersPageKPIKey].value}
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
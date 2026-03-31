import { CustomersKpiLayout, CustomersPageKPIData } from "@/types/types";
import { KpiCard } from "./kpi-section";
import { AlertCircle, CalendarDays, IndianRupee, ShoppingCart, User } from "lucide-react";

export const KPI_CARDS_CUSTOMER_ID_PAGE: CustomersKpiLayout[] = [
    {
        key: "totalOrders",
        title: "Total Orders",
        icon: ShoppingCart,
        description: "Total number of orders placed",
    },
    {
        key: "totalRevenue",
        title: "Total Revenue",
        icon: IndianRupee,
        description: "Total amount spent by customer",
        trendLabel: "vs last period",
    },
    {
        key: "outstandingBalance",
        title: "Outstanding Balance",
        icon: AlertCircle,
        description: "Pending dues to be collected",
        trendLabel: "vs last period",
    },
    {
        key: "lastOrder",
        title: "Last Order",
        icon: CalendarDays,
        description: "Most recent order date",
    },
    {
        key: "assignedTo",
        title: "Assigned To",
        icon: User,
        description: "Responsible person for this customer",
    },
];

export default function CustomerIdKPISection({ data }: { data: Record<string, string> }) {
    return (
        <div className='col-span-full grid gap-4 grid-cols-2 lg:grid-cols-5'>
            {
                KPI_CARDS_CUSTOMER_ID_PAGE.map((card, index) => (
                    <KpiCard
                        key={index}
                        title={card.title}
                        value={data[card.key] || "N/A"}
                        icon={card.icon}
                        className={`${index === 4 ? "col-span-2 lg:col-span-1" : ""}`}
                    />
                ))
            }
        </div>
    )
}
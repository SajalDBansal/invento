import { ContactsKpiLayout, CustomersPageKPIData } from "@/types/types";
import { KpiCard } from "./kpi-section";
import { AlertCircle, CalendarDays, IndianRupee, ShoppingCart, User } from "lucide-react";

export const KPI_CARDS_SUPPLIER_ID_PAGE: ContactsKpiLayout[] = [
    {
        key: "totalOrders",
        title: "Total Orders",
        icon: ShoppingCart,
        description: "Total purchase orders placed",
    },
    {
        key: "totalPurchased",
        title: "Total Purchased",
        icon: IndianRupee,
        description: "Total amount spent on this supplier",
        trendLabel: "vs last period",
    },
    {
        key: "outstandingPayable",
        title: "Outstanding Payable",
        icon: AlertCircle,
        description: "Pending payments to supplier",
        trendLabel: "vs last period",
    },
    {
        key: "lastOrderDate",
        title: "Last Order",
        icon: CalendarDays,
        description: "Most recent purchase order date",
    },
    {
        key: "lastPayment",
        title: "Last Payment Amount",
        icon: IndianRupee,
        description: "Amount of most recent payment",
    },
    {
        key: "lastPaymentDate",
        title: "Last Payment",
        icon: User,
        description: "Most recent payment made to supplier",
    },
];

export default function SupplierIdKPISection({ data }: { data: Record<string, string> }) {
    return (
        <div className='col-span-full grid gap-4 grid-cols-2 lg:grid-cols-6'>
            {
                KPI_CARDS_SUPPLIER_ID_PAGE.map((card, index) => (
                    <KpiCard
                        key={index}
                        title={card.title}
                        value={data[card.key] || "N/A"}
                        icon={card.icon}
                    />
                ))
            }
        </div>
    )
}
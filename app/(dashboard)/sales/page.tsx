import QuickActions from "@/components/modules/dashboard-layout/quick-action-dialog";
import SalesKPISection from "@/components/modules/sales/kpi-section";
import { SalesTable } from "@/components/modules/sales/sales-table";
import { Button } from "@/components/ui/button";
import { KPI_CARDS_SALES_PAGE } from "@/public/data";
import { SalesPageKPIData } from "@/types/types";
import { Plus } from "lucide-react";
import Link from "next/link";

const kpiData: SalesPageKPIData = {
    totalRevenue: {
        value: "₹1,25,000",
    },
    totalOrders: {
        value: "320", // example count
    },
    averageOrderValue: {
        value: "₹390", // example AOV
    },
    totalOutstanding: {
        value: "₹25,000",
    },
    totalOverdue: {
        value: "₹25,000",
    }
};

export default function SalesPage() {
    return (
        <div className="space-y-6">

            {/* Heading */}
            <div className='grid sm:grid-cols-4 gap-4'>
                <div className="space-y-2 col-span-full sm:col-span-3">
                    <div className="text-2xl sm:text-4xl font-bold">
                        Sales
                    </div>
                    <div className="text-sm md:text-lg  text-muted-foreground">
                        Manage and track your outgoing shipments and customer revenue.
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <Link href={"/sales/invoices/create"}>
                        <Button>
                            <Plus />
                            Create New Sale
                        </Button>
                    </Link>
                    <QuickActions />
                </div>
            </div>

            {/* Replacable */}
            <div className='space-y-6'>
                <SalesKPISection data={kpiData} kpiDetails={KPI_CARDS_SALES_PAGE} />

                <SalesTable />
            </div>
        </div >
    )
}
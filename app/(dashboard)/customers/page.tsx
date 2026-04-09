
import { CustomersTable } from "@/components/modules/customers/customers-table";
import CustomersKPISection from "@/components/modules/customers/kpi-section";
import QuickActions from "@/components/modules/dashboard-layout/quick-action-dialog";
import { Button } from "@/components/ui/button";
import { CustomersPageKPIData } from "@/types/types";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function CustomersPage() {

    const kpiData: CustomersPageKPIData = {
        totalCustomers: {
            value: "1,240",
            trend: 8,
        },
        activeCustomers: {
            value: "1,180",
            trend: 3,
        },
        totalReceivable: {
            value: "₹24,78,100",
        },
        highRiskCustomers: {
            value: "23",
        }
    }

    return (
        <div className="space-y-6">

            {/* Heading */}
            <div className='grid sm:grid-cols-4 gap-4'>
                <div className="space-y-2 col-span-full sm:col-span-3">
                    <div className="text-2xl sm:text-4xl font-bold">
                        Customers
                    </div>
                    <div className="text-sm md:text-lg  text-muted-foreground">
                        Manage your relationship and financial status across clients.
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <Link href={"/customers/add"}>
                        <Button>
                            <Plus />
                            Create Customer
                        </Button>
                    </Link>
                    <QuickActions />
                </div>
            </div>

            {/* Replacable */}
            <div className='space-y-6'>
                <CustomersKPISection data={kpiData} />

                <CustomersTable />
            </div>
        </div >
    )
}
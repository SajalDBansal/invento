import QuickActions from "@/components/modules/dashboard-layout/quick-action-dialog";
import SuppliersKPISection from "@/components/modules/suppliers/kpi-section";
import { SuppliersTable } from "@/components/modules/suppliers/suppliers-table";
import { Button } from "@/components/ui/button";
import { suppliersPageKPIData } from "@/types/types";
import { Plus } from "lucide-react";
import Link from "next/link";

const kpiData: suppliersPageKPIData = {
    totalSuppliers: {
        value: "1,240",
        trend: 8,
    },
    activeSuppliers: {
        value: "1,180",
        trend: 3,
    },
    totalPayable: {
        value: "₹24,78,100",
    },
    overdueSuppliers: {
        value: "23",
    }
}

export default function SuppliersPage() {
    return (
        <div className="space-y-6">

            {/* Heading */}
            <div className='grid sm:grid-cols-4 gap-4'>
                <div className="space-y-2 col-span-full sm:col-span-3">
                    <div className="text-2xl sm:text-4xl font-bold">
                        Suppliers
                    </div>
                    <div className="text-sm md:text-lg  text-muted-foreground">
                        Manage your relationship and financial status across clients.
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <Link href={"#"}>
                        <Button>
                            <Plus />
                            Create Supplier
                        </Button>
                    </Link>
                    <QuickActions />
                </div>
            </div>

            {/* Replacable */}
            <div className='space-y-6'>
                <SuppliersKPISection data={kpiData} />

                <SuppliersTable />
            </div>
        </div >
    )
}
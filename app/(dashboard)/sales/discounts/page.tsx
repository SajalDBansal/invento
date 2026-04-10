import QuickActions from "@/components/modules/dashboard-layout/quick-action-dialog";
import { DiscountsTable } from "@/components/modules/sales/discounts/dicounts-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DiscountPage() {
    return (
        <div className="space-y-6">

            {/* Heading */}
            <div className='grid sm:grid-cols-4 gap-4'>
                <div className="space-y-2 col-span-full sm:col-span-3">
                    <div className="text-2xl sm:text-4xl font-bold">
                        Discounts
                    </div>
                    <div className="text-sm md:text-lg  text-muted-foreground">
                        Detailed history of commercial concessions and price adjustments.
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
                {/* <CustomersKPISection data={kpiData} /> */}

                <DiscountsTable />
            </div>
        </div >
    )
}
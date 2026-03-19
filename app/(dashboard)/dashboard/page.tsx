import QuickActions from "@/components/modules/dashboard/quick-action-dialog";
import KPISection from "@/components/modules/dashboard/kpi-section";
import AnalyticsSection from "@/components/modules/dashboard/anayltics-section";
import InventoryAlertCard from "@/components/modules/dashboard/inventory-alert-card";
import RecentActivitiesCard from "@/components/modules/dashboard/recent-activities";
import FinancialSection from "@/components/modules/dashboard/financials-section";
import SupplierCard from "@/components/modules/dashboard/supplier-card";
import CustomerCard from "@/components/modules/dashboard/customer-card";

export default function DashboardPage() {
    return (
        <div className="space-y-6">

            {/* Heading */}
            <div className='grid sm:grid-cols-2 gap-4 lg:gap-6'>
                <div className="text-2xl sm:text-4xl font-bold">
                    Dashboard
                </div>
                <QuickActions />
            </div>

            {/* Replacable */}
            <div className='grid grid-cols-2 gap-4 lg:gap-6 lg:grid-cols-3'>

                <KPISection />
                <AnalyticsSection />

                <div className='col-span-full grid gap-4 lg:gap-6 lg:grid-cols-2'>
                    <InventoryAlertCard />
                    <RecentActivitiesCard />
                </div>

                {/* Financials section */}
                <FinancialSection />

                <div className='col-span-full grid gap-4 lg:gap-6 lg:grid-cols-2'>
                    <CustomerCard />
                    <SupplierCard />
                </div>
            </div>
        </div >
    )
}
import QuickActions from "@/components/modules/dashboard-layout/quick-action-dialog";
import KPISection from "@/components/modules/dashboard/kpi-section";
import AnalyticsSection from "@/components/modules/dashboard/anayltics-section";
import InventoryAlertCard from "@/components/modules/dashboard/inventory-alert-card";
import RecentActivitiesCard from "@/components/modules/dashboard/recent-activities";
import FinancialSection from "@/components/modules/dashboard/financials-section";
import SupplierCard from "@/components/modules/dashboard/supplier-card";
import CustomerCard from "@/components/modules/dashboard/customer-card";
import { DashboardDataType } from "@/types/types";
import { dashboardFinanceData } from "@/lib/utils";

export default function DashboardPage() {
    const now = Date.now();

    const data: DashboardDataType = {
        financeSectiondata: {
            netExpenses: "Rs. 56,200",
            netRevenue: "Rs. 24,67,000",
            netMargin: "33%",
            chartData: dashboardFinanceData
        },
        kpiData: {
            todaySales: {
                value: "₹12,400",
                trend: 8,
            },
            todayPurchases: {
                value: "₹7,200",
                trend: 3,
            },
            todayExpenses: {
                value: "₹2,100",
            },
            lowStockItems: {
                value: "23",
            },
            todayProfit: {
                value: "₹3,100",
                trend: 6,
            },
            pendingPayments: {
                value: "₹5,800",
            },
        },
        analyticsData: {
            salesTarget: 200,
            weeklyRevenueChartData: [
                { day: "Monday", revenue: 186 },
                { day: "Tuesday", revenue: 305 },
                { day: "Wednesday", revenue: 237 },
                { day: "Thursday", revenue: 73 },
                { day: "Friday", revenue: 209 },
                { day: "Saturday", revenue: 214 },
                { day: "Sunday", revenue: 214 },
            ],
            salesChartData: [
                { month: "January", sales: 186 },
                { month: "February", sales: 305 },
                { month: "March", sales: 237 },
                { month: "April", sales: 73 },
                { month: "May", sales: 209 },
                { month: "June", sales: 214 },
            ]
        },
        inventoryAlertData: {
            low: [
                {
                    id: "low-1",
                    productName: "Adjustable Wrench",
                    company: "Taparia",
                    code: "HW-AW-101",
                    units: "5 pcs",
                    icon: "Wrench",
                },
                {
                    id: "low-2",
                    productName: "Claw Hammer",
                    company: "Stanley",
                    code: "HW-CH-202",
                    units: "3 pcs",
                    icon: "Hammer",
                },
                {
                    id: "low-3",
                    productName: "Electric Drill Machine",
                    company: "Bosch",
                    code: "HW-DR-303",
                    units: "2 pcs",
                    icon: "Drill",
                },
                {
                    id: "low-4",
                    productName: "PVC Pipe (1 inch)",
                    company: "Supreme",
                    code: "HW-PVC-404",
                    units: "10 pcs",
                    icon: "Package",
                },
                {
                    id: "low-5",
                    productName: "Hex Key Set",
                    company: "Ingco",
                    code: "HW-HK-505",
                    units: "4 pcs",
                    icon: "Settings",
                },
                {
                    id: "low-6",
                    productName: "Bearing Set",
                    company: "SKF",
                    code: "HW-BR-606",
                    units: "6 pcs",
                    icon: "Cog",
                },
            ],

            fast: [
                // {
                //     id: "fast-1",
                //     productName: "Nails Pack (2 inch)",
                //     company: "Generic",
                //     code: "HW-NL-111",
                //     units: "120 pcs",
                //     icon: "Hammer",
                // },
                // {
                //     id: "fast-2",
                //     productName: "Screws Pack",
                //     company: "Hilti",
                //     code: "HW-SC-222",
                //     units: "95 pcs",
                //     icon: "Settings",
                // },
                // {
                //     id: "fast-3",
                //     productName: "Measuring Tape",
                //     company: "Freemans",
                //     code: "HW-MT-333",
                //     units: "40 pcs",
                //     icon: "Wrench",
                // },
                // {
                //     id: "fast-4",
                //     productName: "Drill Bits Set",
                //     company: "Bosch",
                //     code: "HW-DB-444",
                //     units: "30 pcs",
                //     icon: "Drill",
                // },
                // {
                //     id: "fast-5",
                //     productName: "Wall Plugs",
                //     company: "Fischer",
                //     code: "HW-WP-555",
                //     units: "80 pcs/day",
                //     icon: "Package",
                // },
                // {
                //     id: "fast-6",
                //     productName: "Cutting Blade",
                //     company: "Makita",
                //     code: "HW-CB-666",
                //     units: "25 pcs/day",
                //     icon: "Cog",
                // },
            ],

            out: [
                {
                    id: "out-1",
                    productName: "Angle Grinder",
                    company: "Makita",
                    code: "HW-AG-777",
                    icon: "Drill",
                },
                {
                    id: "out-2",
                    productName: "Pipe Cutter",
                    company: "Taparia",
                    code: "HW-PC-888",
                    icon: "Wrench",
                },
                {
                    id: "out-3",
                    productName: "Paint Roller Set",
                    company: "Asian Paints",
                    code: "HW-PR-999",
                    icon: "Package",
                },
                {
                    id: "out-4",
                    productName: "Spirit Level Tool",
                    company: "Stanley",
                    code: "HW-SL-112",
                    icon: "Settings",
                },
                {
                    id: "out-5",
                    productName: "Hand Saw",
                    company: "Bosch",
                    code: "HW-HS-223",
                    icon: "Hammer",
                },
                {
                    id: "out-6",
                    productName: "Grease Gun",
                    company: "Groz",
                    code: "HW-GG-334",
                    icon: "Cog",
                },
            ],
        },
        recentActivitiesData: [
            {
                id: "sale-1",
                title: "Invoice #INV-001 created",
                description: "Customer John Doe - ₹12,500",
                timeStamp: new Date(now - 30 * 1000).toISOString(), // 30 sec ago
                type: "sales",
                link: "/sales/invoices/INV-001",
            },
            {
                id: "payment-1",
                title: "Payment received",
                description: "₹12,500 via UPI",
                timeStamp: new Date(now - 2 * 60 * 1000).toISOString(), // 2 min ago
                type: "payments",
            },
            {
                id: "inventory-2",
                title: "Low stock alert",
                description: "Product B below threshold",
                timeStamp: new Date(now - 10 * 60 * 1000).toISOString(), // 10 min ago
                type: "inventory",
            },
            {
                id: "sale-3",
                title: "Invoice #INV-003 updated",
                description: "Discount applied",
                timeStamp: new Date(now - 45 * 60 * 1000).toISOString(), // 45 min ago
                type: "sales",
                link: "/sales/invoices/INV-003",
            },
            {
                id: "purchase-2",
                title: "Stock purchased",
                description: "₹15,000 inventory added",
                timeStamp: new Date(now - 2 * 60 * 60 * 1000).toISOString(), // 2 hr ago
                type: "purchases",
            },
            {
                id: "payment-3",
                title: "Invoice payment completed",
                description: "#INV-002",
                timeStamp: new Date(now - 5 * 60 * 60 * 1000).toISOString(), // 5 hr ago
                type: "payments",
            },
            {
                id: "inventory-1",
                title: "Stock updated",
                description: "Product A quantity increased",
                timeStamp: new Date(now - 8 * 60 * 60 * 1000).toISOString(), // 8 hr ago
                type: "inventory",
            },
            {
                id: "sale-4",
                title: "Invoice #INV-004 paid",
                description: "Paid via UPI",
                timeStamp: new Date(now - 12 * 60 * 60 * 1000).toISOString(), // 12 hr ago
                type: "sales",
                link: "/sales/invoices/INV-004",
            },
            {
                id: "purchase-1",
                title: "Purchase order #PO-001 created",
                description: "Supplier ABC Traders",
                timeStamp: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
                type: "purchases",
                link: "/purchases/PO-001",
            },
            {
                id: "payment-4",
                title: "Partial payment received",
                description: "₹5,000",
                timeStamp: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
                type: "payments",
            },
            {
                id: "inventory-4",
                title: "Stock adjustment",
                description: "Manual correction",
                timeStamp: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
                type: "inventory",
            },
            {
                id: "sale-6",
                title: "Invoice #INV-005 created",
                description: "Customer Aman Gupta",
                timeStamp: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
                type: "sales",
                link: "/sales/invoices/INV-005",
            },
            {
                id: "purchase-5",
                title: "Supplier invoice received",
                description: "₹7,800",
                timeStamp: new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
                type: "purchases",
            },
            {
                id: "payment-5",
                title: "Refund issued",
                description: "₹1,200 returned",
                timeStamp: new Date(now - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
                type: "payments",
            },
            {
                id: "inventory-8",
                title: "Inventory audit completed",
                description: "No discrepancies",
                timeStamp: new Date(now - 40 * 24 * 60 * 60 * 1000).toISOString(), // ~1 month ago
                type: "inventory",
            },
            {
                id: "sale-8",
                title: "Invoice #INV-006 cancelled",
                description: "Customer request",
                timeStamp: new Date(now - 75 * 24 * 60 * 60 * 1000).toISOString(), // ~2.5 months ago
                type: "sales",
                link: "/sales/invoices/INV-006",
            },
            {
                id: "purchase-8",
                title: "Purchase cancelled",
                description: "Supplier issue",
                timeStamp: new Date(now - 150 * 24 * 60 * 60 * 1000).toISOString(), // ~5 months ago
                type: "purchases",
            },
            {
                id: "payment-8",
                title: "Bank transfer completed",
                description: "₹10,000",
                timeStamp: new Date(now - 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year ago
                type: "payments",
            },
        ],
        customersData: {
            top: [
                { id: "1", name: "Alice", status: "active", balance: 12000, date: "2026-03-30" },
                { id: "2", name: "Bob", status: "active", balance: 9800, date: "2026-03-29" },
                { id: "3", name: "Charlie", status: "inactive", balance: 7600, date: "2026-03-28" },
                { id: "4", name: "David", status: "active", balance: 15000, date: "2026-03-27" },
                { id: "5", name: "Eva", status: "pending", balance: 4300, date: "2026-03-26" },
                { id: "6", name: "Frank", status: "active", balance: 8700, date: "2026-03-25" },
                { id: "7", name: "Grace", status: "inactive", balance: 6200, date: "2026-03-24" },
                { id: "8", name: "Hank", status: "active", balance: 11000, date: "2026-03-23" },
            ],
            new: [
                // { id: "9", name: "Ivy", status: "pending", balance: 2100 },
                // { id: "10", name: "Jack", status: "active", balance: 3400 },
                // { id: "11", name: "Kiran", status: "active", balance: 5600 },
                // { id: "12", name: "Liam", status: "inactive", balance: 2900 },
                // { id: "13", name: "Maya", status: "pending", balance: 4100 },
                // { id: "14", name: "Nina", status: "active", balance: 7200 },
                // { id: "15", name: "Omar", status: "inactive", balance: 1800 },
                // { id: "16", name: "Paul", status: "active", balance: 6600 },
            ],
        },
        suppliersData: {
            top: [
                { id: "1", name: "Alice", status: "active", balance: 12000, date: "2026-03-30" },
                { id: "2", name: "Bob", status: "active", balance: 9800, date: "2026-03-29" },
                { id: "3", name: "Charlie", status: "inactive", balance: 7600, date: "2026-03-28" },
                { id: "4", name: "David", status: "active", balance: 15000, date: "2026-03-27" },
                { id: "5", name: "Eva", status: "pending", balance: 4300, date: "2026-03-26" },
                { id: "6", name: "Frank", status: "active", balance: 8700, date: "2026-03-25" },
                { id: "7", name: "Grace", status: "inactive", balance: 6200, date: "2026-03-24" },
                { id: "8", name: "Hank", status: "active", balance: 11000, date: "2026-03-23" },
            ],
            new: [
                // { id: "9", name: "Ivy", status: "pending", balance: 2100 },
                // { id: "10", name: "Jack", status: "active", balance: 3400 },
                // { id: "11", name: "Kiran", status: "active", balance: 5600 },
                // { id: "12", name: "Liam", status: "inactive", balance: 2900 },
                // { id: "13", name: "Maya", status: "pending", balance: 4100 },
                // { id: "14", name: "Nina", status: "active", balance: 7200 },
                // { id: "15", name: "Omar", status: "inactive", balance: 1800 },
                // { id: "16", name: "Paul", status: "active", balance: 6600 },
            ],
        }
    }

    return (
        <div className="space-y-6">

            {/* Heading */}
            <div className='grid sm:grid-cols-2 gap-4'>
                <div className="text-2xl sm:text-4xl font-bold">
                    Dashboard
                </div>
                <QuickActions />
            </div>

            {/* Replacable */}
            <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>

                <KPISection data={data.kpiData} />
                <AnalyticsSection data={data.analyticsData} />

                <div className='col-span-full grid gap-4 lg:grid-cols-2'>
                    <InventoryAlertCard data={data.inventoryAlertData} />
                    <RecentActivitiesCard data={data.recentActivitiesData} />
                </div>

                {/* Financials section */}
                <FinancialSection data={data.financeSectiondata} />

                <div className='col-span-full grid gap-4 lg:grid-cols-2'>
                    <CustomerCard data={data.customersData} />
                    <SupplierCard data={data.suppliersData} />
                </div>
            </div>
        </div >
    )
}
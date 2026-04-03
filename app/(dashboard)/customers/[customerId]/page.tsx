import CustomerIdKPISection from "@/components/modules/customers/customer-cards";
import CustomerDetails from "@/components/modules/customers/customer-details";
import CustomersInsights from "@/components/modules/customers/customer-insights";
import PurchaseTrendCard from "@/components/modules/customers/purchase-trend-card";
import RecentPurchasesCard from "@/components/modules/customers/recent-purchases-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CuntomersLastInvoiceData, customerDataType } from "@/types/types";
import { FileText, IndianRupee, Mail, MapPin, Pencil, Phone, ShoppingCart } from "lucide-react";
import Link from "next/link";

type CustomerIdDataType = {
    customerData: customerDataType
    carpenters: { id: string; name: string }[]
}

export default async function CustomerIDPage({ params }: { params: Promise<{ customerId: string }> }) {
    const { customerId } = await params;
    console.log(customerId);

    const data: CustomerIdDataType = {
        customerData: {
            id: "c1",
            name: "Rajesh Traders",
            contact: "9876543210",
            email: "rajesh@traders.com",
            address: "Harduaganj",
            city: "Delhi",
            type: "wholesale",
            status: "active",
            balance: 12000,
            creditLimit: 50000,
            totalOrders: 45,
            totalSpent: 250000,
            lastOrderDate: "2026-03-20",
            lastPaymentDate: "2026-03-22",
            GSTIN: "07ABCDE1234F1Z5",
            assignedTo: "Rajesh Kumar",
            createdAt: "2025-12-01",
            updatedAt: "2026-03-22",
            tags: ["vip", "bulk"],
        },
        carpenters: [
            { id: "c1", name: "Rajesh Kumar" },
            { id: "c2", name: "Amit Sharma" },
            { id: "c3", name: "Suresh Patel" },
            { id: "c4", name: "Vikram Singh" },
            { id: "c5", name: "Ramesh Yadav" },
        ],
    };

    const kpiData = {
        totalOrders: "48",
        totalRevenue: "₹3,45,000",
        outstandingBalance: "₹42,500",
        lastOrder: "Feb 12, 26",
        assignedTo: "Rajesh Kumar"
    }

    const monthlyRevenueChartData = [
        { month: "Jan", revenue: 4200 },
        { month: "Feb", revenue: 3800 },
        { month: "Mar", revenue: 5100 },
        { month: "Apr", revenue: 4600 },
        { month: "May", revenue: 5900 },
        { month: "Jun", revenue: 6300 },
    ];

    const inventoryAlertData: CuntomersLastInvoiceData = {
        invoiceId: "INV-001",
        products: [
            {
                id: "low-1",
                productName: "Adjustable Wrench",
                company: "Taparia",
                code: "HW-AW-101",
                quantity: 5,
                unit: "pcs",
                icon: "Wrench",
            },
            {
                id: "low-2",
                productName: "Claw Hammer",
                company: "Stanley",
                code: "HW-CH-202",
                quantity: 3,
                unit: "pcs",
                icon: "Hammer",
            },
            {
                id: "low-3",
                productName: "Electric Drill Machine",
                company: "Bosch",
                code: "HW-DR-303",
                quantity: 2,
                unit: "pcs",
                icon: "Drill",
            },
            {
                id: "low-4",
                productName: "PVC Pipe (1 inch)",
                company: "Supreme",
                code: "HW-PVC-404",
                quantity: 10,
                unit: "pcs",
                icon: "Package",
            },
            {
                id: "low-5",
                productName: "Hex Key Set",
                company: "Ingco",
                code: "HW-HK-505",
                quantity: 4,
                unit: "pcs",
                icon: "Settings",
            },
            {
                id: "low-6",
                productName: "Bearing Set",
                company: "SKF",
                code: "HW-BR-606",
                quantity: 6,
                unit: "pcs",
                icon: "Cog",
            },
        ]
    }

    return (
        <div className="space-y-6 min-h-screen flex flex-col">
            {/* Heading */}
            <div className='grid md:grid-cols-4 gap-4'>
                <div className="space-y-2 col-span-full sm:col-span-3">
                    <div className="text-2xl sm:text-4xl font-bold flex items-center gap-4">
                        {data.customerData.name}
                        <Badge
                            className={`capitalize ${data.customerData.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
                        >
                            {data.customerData.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex flex-col md:flex-row md:items-center gap-3 pl-2">
                        <Link className="flex items-center gap-1 hover:underline" href={data.customerData.email ? `mailto:${data.customerData.email}` : "#"}>
                            <Mail className="size-4" />
                            {data.customerData.email == "" ? "No Email" : data.customerData.email}
                        </Link>
                        <Link className="flex items-center gap-1 hover:underline" href={data.customerData.contact ? `tel:${data.customerData.contact}` : "#"}>
                            <Phone className="size-4" />
                            {data.customerData.contact == "" ? "No Contact" : data.customerData.contact}
                        </Link>
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            {data.customerData.address == "" ? "No Address" :
                                <>
                                    <span>{data.customerData.address}</span>
                                    {data.customerData.city && <span>, {data.customerData.city}</span>}
                                </>
                            }

                        </div>
                    </div>
                </div>
                <div className="flex justify-start md:justify-end flex-wrap gap-2">
                    <Link href={"#"}>
                        <Button>
                            <FileText className="hidden md:flex" />
                            Generate Invoice
                        </Button>
                    </Link>
                    {/* <Link href={"#"}>
                        <Button>
                            <ShoppingCart className="hidden md:flex" />
                            Create Order
                        </Button>
                    </Link> */}
                    <Link href={"#"} >
                        <Button>
                            <IndianRupee />
                            Send Payment Reminder
                        </Button>
                    </Link>

                </div>
            </div>

            {/* Replacable */}
            <div className='space-y-4'>
                <CustomerIdKPISection data={kpiData} />

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
                    <div className="w-full col-span-full lg:col-span-3 flex flex-col gap-4 h-full">
                        {/* user details */}
                        <CustomerDetails data={data.customerData} carpenters={data.carpenters} />

                        <CustomersInsights />
                    </div>
                    <div className="col-span-full lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                        {/* purchase trends */}
                        <PurchaseTrendCard monthlyData={monthlyRevenueChartData} />

                        {/* recently purchased */}
                        <RecentPurchasesCard data={inventoryAlertData} />

                    </div>


                </div>
            </div>
        </div >
    )
}


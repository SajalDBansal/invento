import PurchaseTrendCard from "@/components/modules/suppliers/purchase-trend-card";
import RecentPurchasesCard from "@/components/modules/suppliers/recent-purchases-card";
import SupplierIdKPISection from "@/components/modules/suppliers/supplier-cards";
import SupplierDetails from "@/components/modules/suppliers/supplier-details";
import SuppliersInsights from "@/components/modules/suppliers/suppliers-insights";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { SupplierIdPageDataType } from "@/types/types";
import { FileText, IndianRupee, Mail, MapPin, Pencil, Phone } from "lucide-react";
import Link from "next/link";

export default async function SuppliersIDPage({ params }: { params: Promise<{ supplierId: string }> }) {
    const { supplierId } = await params;
    console.log(supplierId);

    const data: SupplierIdPageDataType = {
        supplierData: {
            id: "c1",
            name: "Rajesh Traders",
            contact: "9876543210",
            email: "rajesh@traders.com",
            address: "Harduaganj",
            city: "Delhi",
            type: "wholesale",
            status: "active",
            payableBalance: 12000,
            creditLimit: 50000,
            totalOrders: 45,
            totalPurchased: 250000,
            lastOrderDate: "2026-03-20",
            lastPaymentDate: "2026-03-22",
            GSTIN: "07ABCDE1234F1Z5",
            company: "Tesla",
            createdAt: "2025-12-01",
            updatedAt: "2026-03-22",
            tags: ["vip", "bulk"],
        },
        kpiData: {
            totalOrders: "48",
            totalPurchased: formatCurrency(345000),
            outstandingPayable: formatCurrency(42500),
            lastOrderDate: "Feb 12, 26",
            lastPayment: formatCurrency(12400),
            lastPaymentDate: "Feb 12, 26"
        },
        monthlyRevenueChartData: [
            { month: "Jan", revenue: 4200 },
            { month: "Feb", revenue: 3800 },
            { month: "Mar", revenue: 5100 },
            { month: "Apr", revenue: 4600 },
            { month: "May", revenue: 5900 },
            { month: "Jun", revenue: 6300 },
        ],
        inventoryAlertData: {
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
    };

    return (
        <div className="space-y-6 min-h-screen flex flex-col">
            {/* Heading */}
            <div className='grid md:grid-cols-4 gap-4'>
                <div className="space-y-2 col-span-full sm:col-span-3">
                    <div className="text-2xl sm:text-4xl font-bold flex items-center gap-4">
                        {data.supplierData.name}
                        <Badge
                            className={`capitalize ${data.supplierData.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
                        >
                            {data.supplierData.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex flex-col md:flex-row md:items-center gap-3 pl-2">
                        <Link className="flex items-center gap-1 hover:underline" href={data.supplierData.email ? `mailto:${data.supplierData.email}` : "#"}>
                            <Mail className="size-4" />
                            {data.supplierData.email == "" ? "No Email" : data.supplierData.email}
                        </Link>
                        <Link className="flex items-center gap-1 hover:underline" href={data.supplierData.contact ? `tel:${data.supplierData.contact}` : "#"}>
                            <Phone className="size-4" />
                            {data.supplierData.contact == "" ? "No Contact" : data.supplierData.contact}
                        </Link>
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            {data.supplierData.address == "" ? "No Address" :
                                <>
                                    <span>{data.supplierData.address}</span>
                                    {data.supplierData.city && <span>, {data.supplierData.city}</span>}
                                </>
                            }

                        </div>
                    </div>
                </div>
                <div className="flex justify-start md:justify-end flex-wrap gap-2">
                    <Link href={"#"}>
                        <Button>
                            <FileText className="hidden md:flex" />
                            Generate Order
                        </Button>
                    </Link>
                    <Link href={"#"} >
                        <Button>
                            <IndianRupee />
                            Request Statement
                        </Button>
                    </Link>

                </div>
            </div>

            {/* Replacable */}
            <div className='space-y-4'>
                <SupplierIdKPISection data={data.kpiData} />

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
                    <div className="w-full col-span-full lg:col-span-3 flex flex-col gap-4 h-full">
                        {/* user details */}
                        <SupplierDetails data={data.supplierData} />

                        <SuppliersInsights />
                    </div>
                    <div className="col-span-full lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                        {/* purchase trends */}
                        <PurchaseTrendCard monthlyData={data.monthlyRevenueChartData} />

                        {/* recently purchased */}
                        <RecentPurchasesCard data={data.inventoryAlertData} />

                    </div>


                </div>
            </div>
        </div >
    )
}


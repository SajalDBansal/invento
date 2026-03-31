import CustomerIdKPISection from "@/components/modules/customers/customer-cards";
import CustomersInsights from "@/components/modules/customers/customer-insights";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { customerTableType } from "@/types/types";
import { FileText, Mail, MapPin, Pencil, Phone, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default async function CustomerIDPage({ params }: { params: Promise<{ customerId: string }> }) {
    const { customerId } = await params;
    console.log(customerId);

    const data: customerTableType = {
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
        assignedTo: "Rajesh Kumar",
        createdAt: "2025-12-01",
        updatedAt: "2026-03-22",
        tags: ["vip", "bulk"],
    }

    const kpiData = {
        totalOrders: "48",
        totalRevenue: "₹3,45,000",
        outstandingBalance: "₹42,500",
        lastOrder: "Feb 12, 26",
        assignedTo: "Rajesh Kumar"
    }


    return (
        <div className="space-y-6">
            {/* Heading */}
            <div className='grid md:grid-cols-4 gap-4'>
                <div className="space-y-2 col-span-full sm:col-span-3">
                    <div className="text-2xl sm:text-4xl font-bold flex items-center gap-4">
                        {data.name}
                        <Badge
                            className={`capitalize ${data.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
                        >
                            {data.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex flex-col md:flex-row md:items-center gap-3 pl-2">
                        <Link className="flex items-center gap-1 hover:underline" href={data.email ? `mailto:${data.email}` : "#"}>
                            <Mail className="size-4" />
                            {data.email == "" ? "No Email" : data.email}
                        </Link>
                        <Link className="flex items-center gap-1 hover:underline" href={data.contact ? `tel:${data.contact}` : "#"}>
                            <Phone className="size-4" />
                            {data.contact == "" ? "No Contact" : data.contact}
                        </Link>
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            {data.address == "" ? "No Address" :
                                <>
                                    <span>{data.address}</span>
                                    {data.city && <span>, {data.city}</span>}
                                </>
                            }

                        </div>
                    </div>
                </div>
                <div className="flex justify-start md:justify-end space-x-2">
                    <Button>
                        <Pencil className="hidden md:flex" />
                        Edit
                    </Button>
                    <Link href={"#"}>
                        <Button>
                            <FileText className="hidden md:flex" />
                            Generate Invoice
                        </Button>
                    </Link>
                    <Link href={"#"}>
                        <Button>
                            <ShoppingCart className="hidden md:flex" />
                            Create Order
                        </Button>
                    </Link>

                </div>
            </div>

            {/* Replacable */}
            <div className='space-y-6'>
                <CustomerIdKPISection data={kpiData} />

                {/* <CustomersTable data={data.tableData} carpenters={data.carpenters} /> */}
                <CustomersInsights />
            </div>
        </div >
    )
}
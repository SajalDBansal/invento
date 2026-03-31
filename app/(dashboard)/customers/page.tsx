
import { CustomersTable } from "@/components/modules/customers/customers-table";
import CustomersKPISection from "@/components/modules/customers/kpi-section";
import QuickActions from "@/components/modules/dashboard-layout/quick-action-dialog";
import { Button } from "@/components/ui/button";
import { customerPageDataType } from "@/types/types";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function CustomersPage() {

    const data: customerPageDataType = {
        kpiData: {
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
        },
        carpenters: [
            { id: "c1", name: "Rajesh Kumar" },
            { id: "c2", name: "Amit Sharma" },
            { id: "c3", name: "Suresh Patel" },
            { id: "c4", name: "Vikram Singh" },
            { id: "c5", name: "Ramesh Yadav" },
        ],
        tableData: [
            {
                id: "c1",
                name: "Rajesh Traders",
                contact: "9876543210",
                email: "rajesh@traders.com",
                address: "Delhi",
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
            },
            {
                id: "c2",
                name: "Amit Hardware",
                contact: "9123456780",
                address: "Mumbai",
                type: "retail",
                status: "active",
                balance: 3000,
                totalOrders: 20,
                totalSpent: 80000,
                lastOrderDate: "2026-03-18",
                lastPaymentDate: "2026-03-19",
                assignedTo: "Amit Sharma",
            },
            {
                id: "c3",
                name: "Suresh Interiors",
                contact: "9988776655",
                address: "Ahmedabad",
                type: "wholesale",
                status: "inactive",
                balance: 15000,
                creditLimit: 40000,
                totalOrders: 30,
                totalSpent: 180000,
                lastOrderDate: "2026-02-10",
                assignedTo: "Suresh Patel",
            },
            {
                id: "c4",
                name: "Vikram Furnitures",
                contact: "9090909090",
                address: "Jaipur",
                type: "retail",
                status: "blocked",
                balance: 25000,
                totalOrders: 12,
                totalSpent: 60000,
                lastOrderDate: "2026-01-15",
                assignedTo: "Vikram Singh",
            },
            {
                id: "c5",
                name: "Ramesh Wood Works",
                contact: "9812345678",
                address: "Lucknow",
                type: "cash",
                status: "active",
                balance: 0,
                totalOrders: 10,
                totalSpent: 30000,
                lastOrderDate: "2026-03-25",
                lastPaymentDate: "2026-03-25",
                assignedTo: "Ramesh Yadav",
            },
            {
                id: "c6",
                name: "Modern Designs",
                contact: "9001122334",
                address: "Pune",
                type: "retail",
                status: "active",
                balance: 5000,
                totalOrders: 22,
                totalSpent: 95000,
                lastOrderDate: "2026-03-10",
            },
            {
                id: "c7",
                name: "Elite Interiors",
                contact: "9334455667",
                address: "Bangalore",
                type: "wholesale",
                status: "active",
                balance: 20000,
                creditLimit: 60000,
                totalOrders: 55,
                totalSpent: 320000,
                lastOrderDate: "2026-03-21",
            },
            {
                id: "c8",
                name: "Quick Fix Carpentry",
                contact: "9556677889",
                address: "Chennai",
                type: "cash",
                status: "inactive",
                balance: 0,
                totalOrders: 8,
                totalSpent: 20000,
                lastOrderDate: "2026-01-30",
            },
            {
                id: "c9",
                name: "Urban Homes",
                contact: "9887766554",
                address: "Hyderabad",
                type: "retail",
                status: "active",
                balance: 7000,
                totalOrders: 18,
                totalSpent: 70000,
                lastOrderDate: "2026-03-14",
            },
            {
                id: "c10",
                name: "WoodCraft Hub",
                contact: "9776655443",
                address: "Kolkata",
                type: "wholesale",
                status: "blocked",
                balance: 18000,
                totalOrders: 28,
                totalSpent: 140000,
                lastOrderDate: "2026-02-05",
            },
            {
                id: "c11",
                name: "HomeStyle Decor",
                contact: "9665544332",
                address: "Surat",
                type: "retail",
                status: "active",
                balance: 2500,
                totalOrders: 14,
                totalSpent: 45000,
                lastOrderDate: "2026-03-11",
            },
            {
                id: "c12",
                name: "Prime Furnishings",
                contact: "9554433221",
                address: "Indore",
                type: "wholesale",
                status: "inactive",
                balance: 22000,
                totalOrders: 35,
                totalSpent: 210000,
                lastOrderDate: "2026-01-20",
            },
            {
                id: "c13",
                name: "Budget Interiors",
                contact: "9443322110",
                address: "Bhopal",
                type: "cash",
                status: "active",
                balance: 0,
                totalOrders: 9,
                totalSpent: 15000,
                lastOrderDate: "2026-03-26",
            },
            {
                id: "c14",
                name: "Classic Wood",
                contact: "9332211009",
                address: "Nagpur",
                type: "retail",
                status: "blocked",
                balance: 12000,
                totalOrders: 16,
                totalSpent: 60000,
                lastOrderDate: "2026-02-12",
            },
            {
                id: "c15",
                name: "Royal Interiors",
                contact: "9221100998",
                address: "Chandigarh",
                type: "wholesale",
                status: "active",
                balance: 30000,
                creditLimit: 70000,
                totalOrders: 60,
                totalSpent: 400000,
                lastOrderDate: "2026-03-23",
            },
        ]
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
                    <Link href={"#"}>
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
                <CustomersKPISection data={data.kpiData} />

                <CustomersTable data={data.tableData} carpenters={data.carpenters} />
            </div>
        </div >
    )
}
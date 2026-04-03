"use client";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, LoaderCircleIcon, OctagonAlert, RotateCw, SearchIcon } from "lucide-react"
import { useEffect, useId, useState } from "react"
import { CustomersInvoiceTable } from "./invoice-table";
import { CustomersLedgerTable } from "./ledger-table";
import { CustomersActivityTable } from "./activity-table";
import { CustomersProductsTable } from "./products-table";
import { customerIdInsightsDataType } from "@/types/types";

type TabValue = "invoices" | "ledger" | "activity" | "products";

// set this data to be loaded inside components
const data: customerIdInsightsDataType = {
    invoices: [
        {
            id: "INV-001",
            date: "2024-06-01",
            amount: 100,
            recievedAmount: 100,
            status: "paid",
            dueDate: "2024-06-15",
            assignedTo: "John Doe",
        },
        {
            id: "INV-002",
            date: "2024-06-02",
            amount: 250,
            recievedAmount: 0,
            status: "pending",
            dueDate: "2024-06-16",
        },
        {
            id: "INV-003",
            date: "2024-06-03",
            amount: 175,
            recievedAmount: 0,
            status: "overdue",
            dueDate: "2024-06-17",
            assignedTo: "Jane Smith",
        },
        {
            id: "INV-004",
            date: "2024-06-04",
            amount: 300,
            recievedAmount: 300,
            status: "paid",
            dueDate: "2024-06-18",
        },
        {
            id: "INV-005",
            date: "2024-06-05",
            amount: 120,
            recievedAmount: 0,
            status: "pending",
            dueDate: "2024-06-19",
            assignedTo: "Alice Brown",
        },
        {
            id: "INV-006",
            date: "2024-06-06",
            amount: 90,
            recievedAmount: 90,
            status: "paid",
            dueDate: "2024-06-20",
        },
        {
            id: "INV-007",
            date: "2024-06-07",
            amount: 450,
            recievedAmount: 0,
            status: "overdue",
            dueDate: "2024-06-21",
            assignedTo: "Michael Lee",
        },
        {
            id: "INV-008",
            date: "2024-06-08",
            amount: 220,
            recievedAmount: 0,
            status: "pending",
            dueDate: "2024-06-22",
        },
        {
            id: "INV-009",
            date: "2024-06-09",
            amount: 310,
            recievedAmount: 310,
            status: "paid",
            dueDate: "2024-06-23",
            assignedTo: "Chris Evans",
        },
        {
            id: "INV-010",
            date: "2024-06-10",
            amount: 180,
            recievedAmount: 0,
            status: "overdue",
            dueDate: "2024-06-24",
        },
        {
            id: "INV-011",
            date: "2024-06-11",
            amount: 275,
            recievedAmount: 0,
            status: "pending",
            dueDate: "2024-06-25",
            assignedTo: "Emma Watson",
        },
        {
            id: "INV-012",
            date: "2024-06-12",
            amount: 130,
            recievedAmount: 130,
            status: "paid",
            dueDate: "2024-06-26",
        },
        {
            id: "INV-013",
            date: "2024-06-13",
            amount: 360,
            recievedAmount: 0,
            status: "overdue",
            dueDate: "2024-06-27",
            assignedTo: "David Miller",
        },
        {
            id: "INV-014",
            date: "2024-06-14",
            amount: 210,
            recievedAmount: 0,
            status: "pending",
            dueDate: "2024-06-28",
        },
        {
            id: "INV-015",
            date: "2024-06-15",
            amount: 500,
            recievedAmount: 500,
            status: "paid",
            dueDate: "2024-06-29",
            assignedTo: "Sophia Taylor",
        },
    ],
    ledger: [
        {
            id: "1",
            accountId: "user-123",
            date: "2024-06-01",
            createdAt: "2024-06-01T10:00:00Z",
            amount: 500,
            direction: "debit",
            referenceId: "INV-001",
            referenceType: "invoice",
            description: "Invoice generated",
            balance: 500,
            status: "posted",
        },
        {
            id: "2",
            accountId: "user-123",
            date: "2024-06-02",
            createdAt: "2024-06-02T12:30:00Z",
            amount: 300,
            direction: "credit",
            referenceId: "PAY-001",
            referenceType: "payment",
            description: "Payment received",
            paymentMethod: "cash",
            balance: 200,
            status: "posted",
        },
        {
            id: "3",
            accountId: "user-123",
            date: "2024-06-03",
            createdAt: "2024-06-03T09:15:00Z",
            amount: 200,
            direction: "debit",
            referenceId: "INV-002",
            referenceType: "invoice",
            description: "Invoice generated",
            balance: 400,
            status: "posted",
        },
        {
            id: "4",
            accountId: "user-123",
            date: "2024-06-04",
            createdAt: "2024-06-04T11:45:00Z",
            amount: 100,
            direction: "credit",
            referenceId: "PAY-002",
            referenceType: "payment",
            description: "Partial payment received",
            paymentMethod: "bank",
            balance: 300,
            status: "posted",
        },
        {
            id: "5",
            accountId: "user-123",
            date: "2024-06-05",
            createdAt: "2024-06-05T14:10:00Z",
            amount: 150,
            direction: "debit",
            referenceId: "INV-003",
            referenceType: "invoice",
            description: "Invoice generated",
            balance: 450,
            status: "posted",
        },
        {
            id: "6",
            accountId: "user-123",
            date: "2024-06-06",
            createdAt: "2024-06-06T16:00:00Z",
            amount: 450,
            direction: "credit",
            referenceId: "PAY-003",
            referenceType: "payment",
            description: "Full payment received",
            paymentMethod: "bank",
            balance: 0,
            status: "posted",
        },
        {
            id: "7",
            accountId: "user-123",
            date: "2024-06-07",
            createdAt: "2024-06-07T10:20:00Z",
            amount: 300,
            direction: "debit",
            referenceId: "INV-004",
            referenceType: "invoice",
            description: "Invoice generated",
            balance: 300,
            status: "posted",
        },
        {
            id: "8",
            accountId: "user-123",
            date: "2024-06-08",
            createdAt: "2024-06-08T13:50:00Z",
            amount: 50,
            direction: "credit",
            referenceId: "ADJ-001",
            referenceType: "adjustment",
            adjustmentType: "discount", // ✅ added here only
            description: "Discount applied",
            note: "Loyalty discount",
            paymentMethod: "cash",
            balance: 250,
            status: "posted",
        },
        {
            id: "9",
            accountId: "user-123",
            date: "2024-06-09",
            createdAt: "2024-06-09T15:30:00Z",
            amount: 100,
            direction: "credit",
            referenceId: "PAY-004",
            referenceType: "payment",
            description: "Payment received",
            paymentMethod: "cash",
            balance: 150,
            status: "posted",
        },
        {
            id: "10",
            accountId: "user-123",
            date: "2024-06-10",
            createdAt: "2024-06-10T17:00:00Z",
            amount: 150,
            direction: "credit",
            referenceId: "PAY-005",
            referenceType: "payment",
            description: "Final payment received",
            paymentMethod: "bank",
            balance: 0,
            status: "posted",
        },
    ],
    activity: [
        {
            id: "10",
            date: "2024-06-10",
            referenceType: "payment",
            title: "Final payment received",
            amount: 150,
            direction: "credit",
            status: "posted",
            referenceId: "PAY-005",
            paymentMethod: "bank",
        },
        {
            id: "9",
            date: "2024-06-09",
            referenceType: "payment",
            title: "Payment received",
            amount: 100,
            direction: "credit",
            status: "posted",
            referenceId: "PAY-004",
            paymentMethod: "cash",
        },
        {
            id: "8",
            date: "2024-06-08",
            referenceType: "adjustment",
            title: "Discount applied",
            amount: 50,
            direction: "credit",
            status: "posted",
            referenceId: "ADJ-001",
            adjustmentType: "discount",
        },
        {
            id: "7",
            date: "2024-06-07",
            referenceType: "invoice",
            title: "Invoice generated",
            amount: 300,
            direction: "debit",
            status: "posted",
            referenceId: "INV-004",
        },
        {
            id: "6",
            date: "2024-06-06",
            referenceType: "payment",
            title: "Full payment received",
            amount: 450,
            direction: "credit",
            status: "posted",
            referenceId: "PAY-003",
            paymentMethod: "bank",
        },
        {
            id: "5",
            date: "2024-06-05",
            referenceType: "invoice",
            title: "Invoice generated",
            amount: 150,
            direction: "debit",
            status: "posted",
            referenceId: "INV-003",
        },
        {
            id: "4",
            date: "2024-06-04",
            referenceType: "payment",
            title: "Partial payment received",
            amount: 100,
            direction: "credit",
            status: "posted",
            referenceId: "PAY-002",
            paymentMethod: "bank",
        },
        {
            id: "3",
            date: "2024-06-03",
            referenceType: "invoice",
            title: "Invoice generated",
            amount: 200,
            direction: "debit",
            status: "posted",
            referenceId: "INV-002",
        },
        {
            id: "2",
            date: "2024-06-02",
            referenceType: "payment",
            title: "Payment received",
            amount: 300,
            direction: "credit",
            status: "posted",
            referenceId: "PAY-001",
            paymentMethod: "cash",
        },
        {
            id: "1",
            date: "2024-06-01",
            referenceType: "invoice",
            title: "Invoice generated",
            amount: 500,
            direction: "debit",
            status: "posted",
            referenceId: "INV-001",
        },
    ],
    products: [
        {
            id: "1",
            productId: "HW-001",
            productName: "Cement Bag (50kg)",
            date: "2024-06-01",
            invoiceId: "INV-001",
            quantity: 10,
            unitPrice: 350,
            totalPrice: 3500,
            category: "Construction",
            subCategory: "Cement",
            company: "UltraTech",
        },
        {
            id: "2",
            productId: "HW-002",
            productName: "TMT Steel Rod (12mm)",
            date: "2024-06-02",
            invoiceId: "INV-002",
            quantity: 20,
            unitPrice: 600,
            totalPrice: 12000,
            category: "Construction",
            subCategory: "Steel",
            company: "Tata Steel",
        },
        {
            id: "3",
            productId: "HW-003",
            productName: "PVC Pipe (1 inch)",
            date: "2024-06-03",
            invoiceId: "INV-003",
            quantity: 15,
            unitPrice: 120,
            totalPrice: 1800,
            category: "Plumbing",
            subCategory: "Pipes",
            company: "Astral",
        },
        {
            id: "4",
            productId: "HW-004",
            productName: "Wall Putty (20kg)",
            date: "2024-06-04",
            invoiceId: "INV-004",
            quantity: 5,
            unitPrice: 700,
            totalPrice: 3500,
            category: "Construction",
            subCategory: "Finishing",
            company: "Birla White",
        },
        {
            id: "5",
            productId: "HW-005",
            productName: "Electric Drill Machine",
            date: "2024-06-05",
            invoiceId: "INV-005",
            quantity: 2,
            unitPrice: 2500,
            totalPrice: 5000,
            category: "Tools",
            subCategory: "Power Tools",
            company: "Bosch",
        },
        {
            id: "6",
            productId: "HW-006",
            productName: "Paint Bucket (20L)",
            date: "2024-06-06",
            invoiceId: "INV-006",
            quantity: 3,
            unitPrice: 1800,
            totalPrice: 5400,
            category: "Paint",
            subCategory: "Interior Paint",
            company: "Asian Paints",
        },
        {
            id: "7",
            productId: "HW-007",
            productName: "Switch Board (6 Module)",
            date: "2024-06-07",
            invoiceId: "INV-007",
            quantity: 8,
            unitPrice: 250,
            totalPrice: 2000,
            category: "Electrical",
            subCategory: "Switches",
            company: "Anchor",
        },
        {
            id: "8",
            productId: "HW-008",
            productName: "LED Bulb (12W)",
            date: "2024-06-08",
            invoiceId: "INV-008",
            quantity: 12,
            unitPrice: 120,
            totalPrice: 1440,
            category: "Electrical",
            subCategory: "Lighting",
            company: "Philips",
        },
        {
            id: "9",
            productId: "HW-009",
            productName: "Ceramic Tiles (2x2 ft)",
            date: "2024-06-09",
            invoiceId: "INV-009",
            quantity: 25,
            unitPrice: 90,
            totalPrice: 2250,
            category: "Construction",
            subCategory: "Tiles",
            company: "Kajaria",
        },
        {
            id: "10",
            productId: "HW-010",
            productName: "Water Tap (Stainless Steel)",
            date: "2024-06-10",
            invoiceId: "INV-010",
            quantity: 6,
            unitPrice: 450,
            totalPrice: 2700,
            category: "Plumbing",
            subCategory: "Fittings",
            company: "Jaquar",
        },
    ]
}

export default function CustomersInsights() {
    const [activeTab, setActiveTab] = useState<TabValue>("invoices");
    const [searchFilter, setSearchFilter] = useState("");

    useEffect(() => {
        setSearchFilter("");
    }, [activeTab])


    return (
        <Card className="@container/card p-2 gap-2 flex flex-col h-full flex-1">
            <Tabs
                defaultValue={activeTab}
                onValueChange={(val) => setActiveTab(val as TabValue)}
                className="w-full flex-col justify-start gap-2 h-full"
            >
                {/* View */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">

                    <TabsList className="gap-1 sm:gap-2 bg-transparent">
                        <TabsTrigger value="invoices" className="p-2 py-4 sm:p-4">Invoices</TabsTrigger>
                        <TabsTrigger value="ledger" className="p-2 py-4 sm:p-4">Ledger</TabsTrigger>
                        <TabsTrigger value="activity" className="p-2 py-4 sm:p-4">Activity</TabsTrigger>
                        <TabsTrigger value="products" className="p-2 py-4 sm:p-4">Products</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center justify-between md:justify-center gap-2">
                        <SeacrhInput value={searchFilter} setValue={setSearchFilter} />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Download />
                                    <span className="hidden md:inline">Export</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <FileText />
                                        Export as CSV
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <FileText />
                                        Export as Excel
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <FileText />
                                        Export as JSON
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <TabsContent value="invoices" className="flex flex-col gap-2 h-full pt-2">
                    <CustomersInvoiceTable orderData={data.invoices} searchFilter={searchFilter} />
                </TabsContent>

                <TabsContent value="ledger" className="flex flex-col gap-2 h-full pt-2">
                    <CustomersLedgerTable ledgerData={data.ledger} searchFilter={searchFilter} />
                </TabsContent>

                <TabsContent value="activity" className="flex flex-col gap-2 h-full pt-2">
                    <CustomersActivityTable activityData={data.activity} searchFilter={searchFilter} />
                </TabsContent>

                <TabsContent value="products" className="flex flex-col gap-2 h-full pt-2">
                    <CustomersProductsTable productData={data.products} searchFilter={searchFilter} />
                </TabsContent>

            </Tabs>
        </Card>

    )
}

function SeacrhInput({ value, setValue }: { value: string, setValue: React.Dispatch<React.SetStateAction<string>> }) {
    const [isLoading, setIsLoading] = useState(false)

    const id = useId()

    useEffect(() => {
        if (value) {
            setIsLoading(true)

            const timer = setTimeout(() => {
                setIsLoading(false)
            }, 500)

            return () => clearTimeout(timer)
        }

        setIsLoading(false)
    }, [value])

    return (
        <div className='space-y-2'>
            <div className='relative'>
                <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                    <SearchIcon className='size-4' />
                    <span className='sr-only'>Search</span>
                </div>
                <Input
                    id={id}
                    type='search'
                    placeholder='Search...'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    className='peer px-9 '
                />
                {isLoading && (
                    <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50'>
                        <LoaderCircleIcon className='size-4 animate-spin' />
                        <span className='sr-only'>Loading...</span>
                    </div>
                )}
            </div>
        </div>
    )
}
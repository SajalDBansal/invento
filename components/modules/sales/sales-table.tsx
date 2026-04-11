"use client"

import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    DropdownMenuGroup,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Archive, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Columns2, Download, FileText, Funnel, OctagonAlert, RotateCw, CirclePlus, ChevronsUpDown, CalendarIcon, UserSquare } from "lucide-react"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { useId, useState } from 'react'
import { LoaderCircleIcon, SearchIcon } from 'lucide-react'
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { invoicesDataType, CustomerType, customerDataType, InvoiceStatus } from "@/types/types"
import { customerTypeConfig, invoiceStatusConfig } from "@/public/data"
import { DateRange } from "react-day-picker"
import { format, subDays } from "date-fns"
import { Calendar } from "@/components/ui/calendar"


const invoicesData: invoicesDataType[] = [
    {
        id: "INV-001",
        date: "2026-04-01",
        customerName: "Rajesh Hardware",
        customerId: "CUST-001",
        amount: 15000,
        paidAmount: 15000,
        outStandingAmount: 0,
        dueDate: "2026-04-15",
        status: "paid",
        type: "retail",
    },
    {
        id: "INV-002",
        date: "2026-04-02",
        customerName: "Sharma Constructions",
        customerId: "CUST-002",
        amount: 42000,
        paidAmount: 20000,
        outStandingAmount: 22000,
        dueDate: "2026-04-16",
        status: "partiallyPaid",
        type: "wholesale",
        assignedTo: "Ramesh Carpenter",
    },
    {
        id: "INV-003",
        date: "2026-04-03",
        customerName: "Gupta Traders",
        customerId: "CUST-003",
        amount: 9800,
        paidAmount: 0,
        outStandingAmount: 9800,
        dueDate: "2026-04-12",
        status: "overdue",
        type: "retail",
    },
    {
        id: "INV-004",
        date: "2026-04-04",
        customerName: "Amit Builders",
        customerId: "CUST-004",
        amount: 27500,
        paidAmount: 10000,
        outStandingAmount: 17500,
        dueDate: "2026-04-17",
        status: "partiallyPaid",
        type: "wholesale",
        assignedTo: "Suresh Carpenter",
    },
    {
        id: "INV-005",
        date: "2026-04-05",
        customerName: "Verma Paint House",
        customerId: "CUST-005",
        amount: 12300,
        paidAmount: 12300,
        outStandingAmount: 0,
        dueDate: "2026-04-18",
        status: "paid",
        type: "retail",
    },
    {
        id: "INV-006",
        date: "2026-04-06",
        customerName: "Kumar Interiors",
        customerId: "CUST-006",
        amount: 36000,
        paidAmount: 0,
        outStandingAmount: 36000,
        dueDate: "2026-04-13",
        status: "overdue",
        type: "wholesale",
    },
    {
        id: "INV-007",
        date: "2026-04-07",
        customerName: "Singh Hardware",
        customerId: "CUST-007",
        amount: 8700,
        paidAmount: 4000,
        outStandingAmount: 4700,
        dueDate: "2026-04-19",
        status: "partiallyPaid",
        type: "retail",
    },
    {
        id: "INV-008",
        date: "2026-04-08",
        customerName: "Modern Builders",
        customerId: "CUST-008",
        amount: 51000,
        paidAmount: 51000,
        outStandingAmount: 0,
        dueDate: "2026-04-20",
        status: "paid",
        type: "wholesale",
        assignedTo: "Naresh Carpenter",
    },
    {
        id: "INV-009",
        date: "2026-04-09",
        customerName: "Jain Electricals",
        customerId: "CUST-009",
        amount: 14200,
        paidAmount: 0,
        outStandingAmount: 14200,
        dueDate: "2026-04-15",
        status: "overdue",
        type: "retail",
    },
    {
        id: "INV-010",
        date: "2026-04-10",
        customerName: "Om Sai Constructions",
        customerId: "CUST-010",
        amount: 63000,
        paidAmount: 30000,
        outStandingAmount: 33000,
        dueDate: "2026-04-21",
        status: "partiallyPaid",
        type: "wholesale",
    },
    {
        id: "INV-011",
        date: "2026-04-11",
        customerName: "Aggarwal Traders",
        customerId: "CUST-011",
        amount: 11900,
        paidAmount: 11900,
        outStandingAmount: 0,
        dueDate: "2026-04-22",
        status: "paid",
        type: "retail",
    },
    {
        id: "INV-012",
        date: "2026-04-12",
        customerName: "RK Builders",
        customerId: "CUST-012",
        amount: 45500,
        paidAmount: 10000,
        outStandingAmount: 35500,
        dueDate: "2026-04-16",
        status: "overdue",
        type: "wholesale",
        assignedTo: "Mahesh Carpenter",
    },
    {
        id: "INV-013",
        date: "2026-04-13",
        customerName: "Bansal Hardware",
        customerId: "CUST-013",
        amount: 7600,
        paidAmount: 0,
        outStandingAmount: 7600,
        dueDate: "2026-04-23",
        status: "pending",
        type: "retail",
    },
    {
        id: "INV-014",
        date: "2026-04-14",
        customerName: "Elite Interiors",
        customerId: "CUST-014",
        amount: 28900,
        paidAmount: 15000,
        outStandingAmount: 13900,
        dueDate: "2026-04-24",
        status: "partiallyPaid",
        type: "wholesale",
    },
    {
        id: "INV-015",
        date: "2026-04-15",
        customerName: "Gupta Steel Works",
        customerId: "CUST-015",
        amount: 52000,
        paidAmount: 0,
        outStandingAmount: 52000,
        dueDate: "2026-04-12",
        status: "overdue",
        type: "wholesale",
    },
];

const customerData: customerDataType = {
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
}

const carpentersData = [
    { id: "c1", name: "Rajesh Kumar" },
    { id: "c2", name: "Amit Sharma" },
    { id: "c3", name: "Suresh Patel" },
    { id: "c4", name: "Vikram Singh" },
    { id: "c5", name: "Ramesh Yadav" },
]

const statusOptions = [
    { label: "Paid", value: "paid" },
    { label: "Partial", value: "partiallyPaid" },
    { label: "Pending", value: "pending" },
    { label: "Overdue", value: "overdue" },
]

const typeOptions = [
    { label: "Wholesale", value: "wholesale" },
    { label: "Retail", value: "retail" },
    { label: "Cash", value: "cash" },
]

export function SalesTable() {
    const [data, setData] = useState<invoicesDataType[]>([])
    const [carpenterData, setCarpenterData] = useState<{ id: string, name: string }[]>([]);
    const [rowSelection, setRowSelection] = useState({})
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    // filters
    const [statusFilter, setStatusFilter] = React.useState<string[]>([]);
    const [typeFilter, setTypeFilter] = React.useState<string[]>([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 1),
        to: new Date(),
    })

    function useMediaQuery(query: string) {
        const [matches, setMatches] = React.useState(false)

        React.useEffect(() => {
            const media = window.matchMedia(query)
            setMatches(media.matches)

            const listener = () => setMatches(media.matches)
            media.addEventListener("change", listener)

            return () => media.removeEventListener("change", listener)
        }, [query])

        return matches
    }

    const isMobile = useMediaQuery("(max-width: 768px)");

    const mobileVisibility = {
        id: false,
        outstanding: false,
        type: false,
        status: false,
        paidAmount: false,
        carpenter: false
    }

    const desktopVisibility = {
        id: true,
        outstanding: true,
        type: true,
        status: true,
        paidAmount: true,
        carpenter: true
    }

    React.useEffect(() => {

        setColumnVisibility(isMobile ? mobileVisibility : desktopVisibility)
    }, [isMobile])

    React.useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setData(invoicesData);
            setCarpenterData(carpenterData);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [date, searchFilter]);

    const filteredCustomers = React.useMemo(() => {
        return data.filter((customer) => {
            // 🔍 Search filter
            const matchesSearch =
                !searchFilter ||
                customer.customerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                customer.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
                customer.customerId.toLowerCase().includes(searchFilter.toLowerCase()) ||
                customer.date.toLowerCase().includes(searchFilter.toLowerCase());

            // 📊 Status filter
            const matchesStatus =
                statusFilter.length === 0 || statusFilter.includes(customer.status)

            // 🏷 Type filter
            const matchesType =
                typeFilter.length === 0 || typeFilter.includes(customer.type)

            return (
                matchesSearch &&
                matchesStatus &&
                matchesType
            )
        })
    }, [data, searchFilter, statusFilter, typeFilter, date])

    const resetFilters = () => {
        setStatusFilter([]);
        setTypeFilter([]);
        setSearchFilter("");
        setDate({
            from: subDays(new Date(), 1),
            to: new Date(),
        })

        setSorting([])                 // 🔁 reset sorting
        setColumnFilters([])          // 🔁 reset column filters
        setColumnVisibility({})       // 🔁 reset column visibility (default all visible)
        setRowSelection({})           // 🔁 clear selection
        setPagination({
            pageIndex: 0,
            pageSize: 10, // or your default
        })
    }

    const columns: ColumnDef<invoicesDataType>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => {
                return <Link href={`/sales/invoices/${row.original.id}`} className="hover:underline">
                    {row.original.id}
                </Link>
            },
            enableHiding: true,
        },
        {
            accessorKey: "date",
            header: ({ column }) => (
                <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="p-0 mr-2 cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Date</span>
                        <ChevronsUpDown className="ml-2 opacity-50 size-5" />
                    </Button>

                </div>
            ),
            cell: ({ row }) => {
                return <div>
                    {row.original.date}
                </div>
            },
            enableHiding: false,
            enableSorting: true,
        },
        {
            accessorKey: "customerName",
            header: ({ column }) => (
                <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="p-0 mr-2 cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Customer</span>
                        <ChevronsUpDown className="ml-2 opacity-50 size-5" />
                    </Button>

                </div>
            ),
            cell: ({ row }) => {
                return <TableCellViewer
                    customerId={row.original.customerId}
                    customerName={row.original.customerName}
                    isMobile={isMobile} />
            },
            enableHiding: false,
            enableSorting: true,
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: ({ row }) => {
                return <div className="text-muted-foreground">
                    {formatCurrency(row.original.amount)}
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                const type = customerTypeConfig[row.original.type as CustomerType];

                return (
                    <Badge variant="outline" className="px-1.5 text-muted-foreground flex items-center gap-1">
                        <type.icon className={type.className} />
                        {type.label}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = invoiceStatusConfig[row.original.status as InvoiceStatus];

                return (
                    <Badge variant="outline" className="px-1.5 text-muted-foreground flex items-center gap-1">
                        <status.icon className={status.className} />
                        {status.label}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "paidAmount",
            header: "Paid",
            cell: ({ row }) => {
                return <div className="">
                    {formatCurrency(row.original.paidAmount)}
                </div>
            },
            enableHiding: false,
            enableSorting: true,
        },
        {
            accessorKey: "outstanding",
            header: ({ column }) => (
                <Button variant="ghost" size="sm" className="p-0 mr-2 cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span>Outstanding</span>
                    <ChevronsUpDown className="ml-2 opacity-50 size-5" />
                </Button>
            ),
            cell: ({ row }) => {
                return <div className="flex items-center justify-center sm:justify-start">
                    {row.original.outStandingAmount === 0 ? <span>-</span> :
                        <span className="text-red-500">{formatCurrency(row.original.outStandingAmount)}</span>
                    }
                </div>
            },
            enableHiding: false,
            enableSorting: true,
        },
        {
            accessorKey: "carpenter",
            header: "Carpenter",
            cell: ({ row }) => {
                const worker = row.original.assignedTo || "";
                const isAssigned = worker.length > 0;

                if (isAssigned) {
                    return worker;
                }

                return (
                    <>
                        <Label htmlFor={`${row.original.id}-worker`} className="sr-only">
                            Carpenter
                        </Label>
                        <Select
                            onValueChange={() => {
                                toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
                                    loading: `Saving ${row.original.id}`,
                                    success: "Done",
                                    error: "Error",
                                })
                            }}
                        >
                            <SelectTrigger
                                className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
                                size="sm"
                                id={`${row.original.id}-worker`}
                            >
                                <SelectValue placeholder="Assign carpenter" />
                            </SelectTrigger>
                            <SelectContent align="end">
                                {carpentersData.map((carp) => (
                                    <SelectItem value={carp.id} key={carp.id}>{carp.name}</SelectItem>
                                )
                                )}
                            </SelectContent>
                        </Select>
                    </>
                )
            },
        }
    ]

    const table = useReactTable({
        data: filteredCustomers,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        enableRowSelection: true,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    const [loading, setLoading] = useState(false);

    return (
        <div
            defaultValue="outline"
            className="w-full flex-col justify-start space-y-4"
        >

            {/* filter */}
            <Card className="@container/card p-4 gap-2 space-y-2">
                <CardHeader className="p-0">
                    <CardTitle>Filters</CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            Refine the customer list using criteria like name, status, or activity
                        </span>
                        <span className="@[540px]/card:hidden">Filter customers</span>
                    </CardDescription>
                    <CardAction className="space-x-2 flex">

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Columns2 />
                                    <span >View</span>
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                {table
                                    .getAllColumns()
                                    .filter(
                                        (column) =>
                                            typeof column.accessorFn !== "undefined" &&
                                            column.getCanHide()
                                    )
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button variant="outline" size="sm" onClick={() => resetFilters()}>
                            <Funnel />
                            <span className="hidden lg:inline">Reset Filters</span>
                        </Button>

                        {Object.keys(rowSelection).length != 0 &&
                            <Dialog>
                                <form>
                                    <DialogTrigger asChild>
                                        <Button variant="destructive" size="sm" disabled={Object.keys(rowSelection).length === 0}>
                                            <Archive />
                                            <span className="hidden md:flex">Suspend</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-sm">
                                        <DialogHeader>
                                            <DialogTitle>Archive Customer</DialogTitle>
                                            <DialogDescription>
                                                Make changes to your profile here. Click save when you&apos;re
                                                done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <FieldGroup>
                                            <Field>
                                                <Label htmlFor="name-1">Name</Label>
                                                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                                            </Field>
                                            <Field>
                                                <Label htmlFor="username-1">Username</Label>
                                                <Input id="username-1" name="username" defaultValue="@peduarte" />
                                            </Field>
                                        </FieldGroup>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DialogClose>
                                            <Button type="submit">Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </form>
                            </Dialog>
                        }

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

                    </CardAction>
                </CardHeader>

                <CardContent className="px-1 flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-5 gap-2 md:gap-4 py-1">
                    <div className="col-span-full lg:col-span-1">
                        <SeacrhInput value={searchFilter} setValue={setSearchFilter} isLoading={loading} />
                    </div>

                    <div className="col-span-full lg:col-span-2 space-x-2 space-y-2">

                        <MultiSelectDropdown
                            name={"Status"}
                            options={statusOptions}
                            selected={statusFilter}
                            setSelected={setStatusFilter}
                        />
                        <MultiSelectDropdown
                            name={"Type"}
                            options={typeOptions}
                            selected={typeFilter}
                            setSelected={setTypeFilter}
                        />

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date-picker-range"
                                    className="justify-between md:justify-start px-2.5 font-normal w-full md:w-fit"
                                >
                                    <CalendarIcon />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={1}
                                    disabled={(date) => {
                                        const today = new Date()
                                        today.setHours(0, 0, 0, 0) // normalize to start of today
                                        return date > today // disable future dates
                                    }}
                                />
                            </PopoverContent>
                        </Popover>

                    </div>

                    <div className="-col-end-1 col-span-2 justify-self-end hidden lg:flex">
                        <div className="flex w-full items-center gap-4">
                            <div className="hidden items-center gap-2 lg:flex">
                                <Select
                                    value={`${table.getState().pagination.pageSize}`}
                                    onValueChange={(value) => {
                                        table.setPageSize(Number(value))
                                    }}
                                >
                                    <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                                        <SelectValue
                                            placeholder={table.getState().pagination.pageSize}
                                        />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {[10, 20, 30, 40, 50].map((pageSize) => (
                                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                                {pageSize}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex w-fit items-center justify-center text-sm font-medium">
                                Page {table.getState().pagination.pageIndex + 1} of{" "}
                                {table.getPageCount()}
                            </div>
                            <div className="ml-auto flex items-center gap-2 lg:ml-0">
                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <span className="sr-only">Go to first page</span>
                                    <ChevronsLeft />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="size-8"
                                    size="icon"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <span className="sr-only">Go to previous page</span>
                                    <ChevronLeft />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="size-8"
                                    size="icon"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <span className="sr-only">Go to next page</span>
                                    <ChevronRight />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="hidden size-8 lg:flex"
                                    size="icon"
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <span className="sr-only">Go to last page</span>
                                    <ChevronsRight />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="relative flex flex-col gap-4 overflow-auto"
            >
                <div className="overflow-hidden rounded-lg border bg-white dark:bg-black">
                    {loading && (
                        <div className="flex flex-col gap-4 h-full">
                            <div className="w-full flex-1 rounded-lg border border-dashed bg-white dark:bg-black">
                                <div className="col-span-full mx-auto flex flex-col items-center justify-center gap-3 py-12 text-center text-muted-foreground h-full">
                                    <RotateCw className="w-6 h-6 animate-spin" />
                                    <p className="text-sm font-medium">Loading insights...</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {!loading && (table.getRowModel().rows?.length > 0 ? (
                        <Table>
                            <TableHeader className="sticky top-0 z-10 bg-muted">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id} colSpan={header.colSpan}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody className="**:data-[slot=table-cell]:first:w-8">
                                {table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))

                                }
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="col-span-full mx-auto flex flex-col items-center justify-center gap-3 py-12 text-center text-muted-foreground h-full">
                            <div className="p-3 rounded-full bg-muted">
                                <OctagonAlert className="w-6 h-6 opacity-80" />
                            </div>

                            <p className="text-sm font-medium"> No records available</p>

                            <p className="text-xs opacity-70 max-w-xs">
                                No customer's data available yet. Start adding customers to see the list.
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between px-4">
                    <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="flex w-full items-center gap-8 lg:w-fit lg:hidden">
                        <div className="hidden items-center gap-2 lg:flex">
                            <Label htmlFor="rows-per-page" className="text-sm font-medium">
                                Rows per page
                            </Label>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value))
                                }}
                            >
                                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                                    <SelectValue
                                        placeholder={table.getState().pagination.pageSize}
                                    />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-fit items-center justify-center text-sm font-medium">
                            Page {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </div>
                        <div className="ml-auto flex items-center gap-2 lg:ml-0">
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to first page</span>
                                <ChevronsLeft />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to previous page</span>
                                <ChevronLeft />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to next page</span>
                                <ChevronRight />
                            </Button>
                            <Button
                                variant="outline"
                                className="hidden size-8 lg:flex"
                                size="icon"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to last page</span>
                                <ChevronsRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

function TableCellViewer({ customerId, isMobile, customerName }: { customerId: string, customerName: string, isMobile: boolean }) {
    const [customer, setCustomer] = useState<customerDataType>();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
        if (open) {
            // --- DO SOMETHING ON OPEN HERE ---
            console.log("fetching customer by id")
            setLoading(true);
            const timer = setTimeout(() => {
                setCustomer(customerData);
                setLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
            // Example: Fetch data, reset forms, etc.
        }
    }


    return (
        <Drawer direction={isMobile ? "bottom" : "right"} open={isOpen} onOpenChange={handleOpenChange}>
            <DrawerTrigger asChild>
                <Button variant="link" className="w-fit px-0 text-left">
                    {customerName}
                </Button>
            </DrawerTrigger>

            {customer &&

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{customer.name}</DrawerTitle>
                        <DrawerDescription>
                            Customer details overview
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                        <Separator />

                        <form className="flex flex-col gap-4">

                            {/* Basic Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-3">
                                    <Label>Name</Label>
                                    <Input value={customer.name} disabled />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Contact</Label>
                                    <Input value={customer.contact} disabled />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Label>Email</Label>
                                <Input value={customer.email ?? "-"} disabled />
                            </div>

                            <div className="flex flex-col gap-3">
                                <Label>Address</Label>
                                <Input value={customer.address} disabled />
                            </div>

                            {/* Type & Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-3">
                                    <Label>Type</Label>
                                    <Input value={customer.type} disabled />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Status</Label>
                                    <Input value={customer.status} disabled />
                                </div>
                            </div>

                            {/* Financials */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-3">
                                    <Label>Balance</Label>
                                    <Input value={customer.balance} disabled />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Credit Limit</Label>
                                    <Input value={customer.creditLimit ?? "-"} disabled />
                                </div>
                            </div>

                            {/* Orders */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-3">
                                    <Label>Total Orders</Label>
                                    <Input value={customer.totalOrders ?? "-"} disabled />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Total Spent</Label>
                                    <Input value={customer.totalSpent ?? "-"} disabled />
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-3">
                                    <Label>Last Order</Label>
                                    <Input value={customer.lastOrderDate ?? "-"} disabled />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Last Payment</Label>
                                    <Input value={customer.lastPaymentDate ?? "-"} disabled />
                                </div>
                            </div>

                            {/* Assignment */}
                            <div className="flex flex-col gap-3">
                                <Label>Assigned To</Label>
                                <Input value={customer.assignedTo ?? "-"} disabled />
                            </div>

                            {/* Metadata */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-3">
                                    <Label>Created At</Label>
                                    <Input value={customer.createdAt ?? "-"} disabled />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label>Updated At</Label>
                                    <Input value={customer.updatedAt ?? "-"} disabled />
                                </div>
                            </div>

                        </form>
                    </div>

                    <DrawerFooter>
                        <Link href={`/customers/${customer.id}`}>
                            <Button variant="default" className="w-full">Get more Details</Button>
                        </Link>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            }
        </Drawer>
    )
}

function SeacrhInput({ value, setValue, isLoading = false }: {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
    isLoading: boolean
}) {
    const id = useId()

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

type MultiSelectDropdownType = {
    name: string,
    options: { label: string, value: string }[],
    selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>
};
;

function MultiSelectDropdown({ name, options, selected, setSelected }: MultiSelectDropdownType) {
    const [open, setOpen] = React.useState(false)

    const toggleValue = (value: string) => {
        setSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        )
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="border-dashed"

                >
                    <CirclePlus className="hidden sm:flex" />
                    <span>
                        {name}
                    </span>
                    {selected.length > 0
                        &&
                        <Badge>{selected.length}</Badge>
                    }
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-50 p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search..." />

                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup>
                        {options.map((option) => (
                            <CommandItem
                                key={option.value}
                                onSelect={() => toggleValue(option.value)}
                                className="flex items-center gap-2"
                            >
                                <Checkbox
                                    checked={selected.includes(option.value)}
                                    onCheckedChange={() => toggleValue(option.value)}
                                />
                                <span>{option.label}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
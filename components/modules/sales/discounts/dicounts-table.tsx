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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Columns2, Download, FileText, Funnel, OctagonAlert, RotateCw, ChevronsUpDown, CalendarIcon } from "lucide-react"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useId, useState } from 'react'
import { LoaderCircleIcon, SearchIcon } from 'lucide-react'
import { cn, formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { DateRange } from "react-day-picker"
import { format, subDays } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { invoiceDicountTableDataType } from "@/types/types"
import { useRouter } from "next/navigation"

export const INVOICE_DISCOUNT_TABLE_DATA: invoiceDicountTableDataType[] = [
    {
        id: "1",
        invoiceId: "INV-1001",
        customerName: "Sharma Hardware Supplies",
        customerId: "C-001",
        type: "percentage",
        percentage: 10,
        value: 1000,
        invoiceStatus: "paid",
        date: "2024-06-10",
        assignedTo: "sajal",
    },
    {
        id: "2",
        invoiceId: "INV-1002",
        customerName: "Verma Paints & Tools",
        customerId: "C-002",
        type: "flatRate",
        value: 500,
        percentage: 5,
        invoiceStatus: "pending",
        date: "2024-06-11",
        assignedTo: "sajal",
    },
    {
        id: "3",
        invoiceId: "INV-1003",
        customerName: "Singh Construction Mart",
        customerId: "C-003",
        type: "percentage",
        percentage: 5,
        value: 750,
        invoiceStatus: "partiallyPaid",
        date: "2024-06-12",
        assignedTo: "sajal",
    },
    {
        id: "4",
        invoiceId: "INV-1004",
        customerName: "Gupta Electricals",
        customerId: "C-004",
        type: "flatRate",
        value: 1200,
        percentage: 8,
        invoiceStatus: "overdue",
        date: "2024-06-13",
        assignedTo: "sajal",
    },
    {
        id: "5",
        invoiceId: "INV-1005",
        customerName: "Patel Cement Store",
        customerId: "C-005",
        type: "percentage",
        percentage: 15,
        value: 1800,
        invoiceStatus: "paid",
        date: "2024-06-14",
        assignedTo: "sajal",
    },
    {
        id: "6",
        invoiceId: "INV-1006",
        customerName: "Nair Industrial Tools",
        customerId: "C-006",
        type: "flatRate",
        value: 800,
        percentage: 6,
        invoiceStatus: "pending",
        date: "2024-06-15",
        assignedTo: "sajal",
    },
    {
        id: "7",
        invoiceId: "INV-1007",
        customerName: "Mehta Hardware Hub",
        customerId: "C-007",
        type: "percentage",
        percentage: 20,
        value: 2200,
        invoiceStatus: "overdue",
        date: "2024-06-16",
    },
    {
        id: "8",
        invoiceId: "INV-1008",
        customerName: "Kapoor Sanitary & Pipes",
        customerId: "C-008",
        type: "flatRate",
        value: 300,
        percentage: 4,
        invoiceStatus: "paid",
        date: "2024-06-17",
    },
    {
        id: "9",
        invoiceId: "INV-1009",
        customerName: "Malhotra Steel Traders",
        customerId: "C-009",
        type: "percentage",
        percentage: 8,
        value: 950,
        invoiceStatus: "partiallyPaid",
        date: "2024-06-18",
    },
    {
        id: "10",
        invoiceId: "INV-1010",
        customerName: "Joshi Fasteners",
        customerId: "C-010",
        type: "flatRate",
        value: 650,
        percentage: 5,
        invoiceStatus: "pending",
        date: "2024-06-19",
    },
    {
        id: "11",
        invoiceId: "INV-1011",
        customerName: "Reddy Hardware & Tools",
        customerId: "C-011",
        type: "percentage",
        percentage: 12,
        value: 1400,
        invoiceStatus: "paid",
        date: "2024-06-20",
    },
    {
        id: "12",
        invoiceId: "INV-1012",
        customerName: "Iyer Electrical Supplies",
        customerId: "C-012",
        type: "flatRate",
        value: 900,
        percentage: 7,
        invoiceStatus: "overdue",
        date: "2024-06-21",
    },
    {
        id: "13",
        invoiceId: "INV-1013",
        customerName: "Kumar Building Materials",
        customerId: "C-013",
        type: "percentage",
        percentage: 7,
        value: 880,
        invoiceStatus: "partiallyPaid",
        date: "2024-06-22",
    },
    {
        id: "14",
        invoiceId: "INV-1014",
        customerName: "Agarwal Paint House",
        customerId: "C-014",
        type: "flatRate",
        value: 400,
        percentage: 5,
        invoiceStatus: "pending",
        date: "2024-06-23",
    },
    {
        id: "15",
        invoiceId: "INV-1015",
        customerName: "Jain Tools & Hardware",
        customerId: "C-015",
        type: "percentage",
        percentage: 18,
        value: 2000,
        invoiceStatus: "paid",
        date: "2024-06-24",
        assignedTo: "sajal",
    },
];

export function DiscountsTable() {
    const [data, setData] = useState<invoiceDicountTableDataType[]>([])
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
    const router = useRouter();

    // filters
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 1),
        to: new Date(),
    })
    const [searchFilter, setSearchFilter] = useState("");

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
        select: false,
        type: false,
        invoiceId: false,
        status: false,
        carpenter: false
    }

    const desktopVisibility = {
        id: true,
        select: true,
        type: true,
        invoiceId: true,
        status: true,
        carpenter: true
    }

    React.useEffect(() => {

        setColumnVisibility(isMobile ? mobileVisibility : desktopVisibility)
    }, [isMobile])

    React.useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setData(INVOICE_DISCOUNT_TABLE_DATA);
            setCarpenterData(carpenterData);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [date]);

    const filteredCustomers = React.useMemo(() => {
        return data.filter((customer) => {
            // 🔍 Search filter
            const matchesSearch =
                !searchFilter ||
                customer.customerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                customer.invoiceId.includes(searchFilter)


            return (
                matchesSearch
            )
        })
    }, [data, searchFilter, date])

    const resetFilters = () => {
        setDate({
            from: subDays(new Date(), 1),
            to: new Date(),
        })
        setSearchFilter("");

        setSorting([])                 // 🔁 reset sorting
        setColumnFilters([])          // 🔁 reset column filters
        setColumnVisibility({})       // 🔁 reset column visibility (default all visible)
        setRowSelection({})           // 🔁 clear selection
        setPagination({
            pageIndex: 0,
            pageSize: 10, // or your default
        })
    }

    const columns: ColumnDef<invoiceDicountTableDataType>[] = [
        {
            accessorKey: "select",
            id: "select",
            header: ({ table }) => (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                </div>
            ),
            enableSorting: false,
            enableHiding: true,
        },
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => {
                return <div>
                    {row.original.id}
                </div>
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
                return <div className="text-muted-foreground">
                    <div className="hidden md:flex">
                        {row.original.date}
                    </div>
                    <div className="flex md:hidden">
                        {row.original.date.slice(2)}
                    </div>

                </div>
            },
            enableHiding: false,
            enableSorting: true,
        },
        {
            accessorKey: "invoiceId",
            header: ({ column }) => (
                <div className="flex items-center">
                    <span className="hidden lg:flex">Invoice Id</span>
                    <span className="flex lg:hidden">Id</span>

                </div>
            ),
            cell: ({ row }) => {
                return <div>
                    {row.original.invoiceId}
                </div>
            },
            enableHiding: true,
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
                return <div>
                    {row.original.customerName}
                </div>
            },
            enableHiding: false,
            enableSorting: true,
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                // const type = customerTypeConfig[row.original.type as CustomerType];

                return (
                    <Badge variant="outline" className={cn(`px-1.5 flex items-center gap-1`,
                        row.original.type == "flatRate" ? "text-green-600 bg-green-700/10" : "text-blue-600 bg-blue-700/10"
                    )}>

                        {row.original.type == "flatRate" ? "FLAT RATE" : "PERCENTAGE"}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {


                return (
                    <Badge variant={row.original.invoiceStatus === "overdue" ? "destructive" : "outline"}
                        className={cn(`px-1.5 flex items-center gap-1`,
                            row.original.invoiceStatus === "paid" && "bg-green-400/10 text-green-400",
                            row.original.invoiceStatus === "pending" && "bg-yellow-400/10 text-yellow-400",
                            row.original.invoiceStatus === "partiallyPaid" && "bg-orange-400/10 text-orange-400",
                        )}>
                        {row.original.invoiceStatus}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "percentage",
            header: ({ column }) => (
                <div className="">
                    <Button variant="ghost" size="sm" className="p-0 mr-2 cursor-pointer justify-start"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Percentage</span>
                        <ChevronsUpDown className="ml-2 opacity-50 size-5 hidden lg:flex" />
                    </Button>

                </div>
            ),
            cell: ({ row }) => {
                return <div className="">
                    {(row.original.percentage)}%
                </div>
            },
            enableHiding: false,
            enableSorting: true,
        },
        {
            accessorKey: "value",
            header: ({ column }) => (
                <div className="">
                    <Button variant="ghost" size="sm" className="p-0 mr-2 cursor-pointer justify-start"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Value</span>
                        <ChevronsUpDown className="ml-2 opacity-50 size-5 hidden lg:flex" />
                    </Button>

                </div>
            ),
            cell: ({ row }) => {
                return <div className="">
                    {formatCurrency(row.original.value)}
                </div>
            },
            enableHiding: false,
            enableSorting: true,
        },
        {
            accessorKey: "carpenter",
            header: "Carpenter",
            cell: ({ row }) => {
                return <div>
                    {row.original.assignedTo ?? "-"}
                </div>
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

    const openInvoicePage = (invoiceId: string) => {
        // Implement navigation to invoice details page
        console.log("");

        router.push(`/sales/invoices/${invoiceId}`)
    }

    return (
        <div className="w-full flex-col justify-start space-y-4">

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
                        <SeacrhInput value={searchFilter} setValue={setSearchFilter} />
                    </div>

                    <div className="col-span-full lg:col-span-2 space-x-2">

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
                                        onClick={() => openInvoicePage(row.original.invoiceId)}
                                        className="cursor-pointer"
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
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
    type Row,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, OctagonAlert, ChevronsUpDown, RotateCw } from "lucide-react"
import { useState } from 'react'
import { cn, formatCurrency } from "@/lib/utils"
import { ContactsActivityDataType } from "@/types/types"
import { useRouter } from "next/navigation"

const activitiesData: ContactsActivityDataType[] = [
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
]

export function ActivityTable({ searchFilter }: { searchFilter: string }) {
    const router = useRouter();
    const [data, setData] = useState<ContactsActivityDataType[]>([])
    const [filteredData, setFilteredData] = useState<ContactsActivityDataType[]>([])
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

    React.useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setData(activitiesData);
            setFilteredData(activitiesData);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

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

    const isMobile = useMediaQuery("(max-width: 768px)")

    const mobileVisibility = {
        direction: false,
        title: false,
    }

    const desktopVisibility = {
        direction: true,
        title: true,

    }

    React.useEffect(() => {

        setColumnVisibility(isMobile ? mobileVisibility : desktopVisibility)
    }, [isMobile])

    React.useEffect(() => {
        setFilteredData(data);
        if (searchFilter) {
            const lowercasedFilter = searchFilter.toLowerCase();
            setFilteredData(() => filteredData.filter(item =>
                item.id.toLowerCase().includes(lowercasedFilter) ||
                item.date.toLowerCase().includes(lowercasedFilter) ||
                item.referenceType.toLowerCase().includes(lowercasedFilter) ||
                item.amount.toString().toLowerCase().includes(lowercasedFilter) ||
                item.direction.toLowerCase().includes(lowercasedFilter) ||
                item.referenceId.toLowerCase().includes(lowercasedFilter) ||
                item.status.toLowerCase().includes(lowercasedFilter)
            ))
        }
    }, [searchFilter]);

    const [loading, setLoading] = useState(false);



    const columns: ColumnDef<ContactsActivityDataType>[] = [
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
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => {
                return <div className="flex gap-1">
                    <div>
                        {row.original.title ? row.original.title : "-"}
                    </div>
                    {(row.original.referenceType === "payment" ||
                        row.original.referenceType === "adjustment") && (
                            <Badge variant="secondary" className="hidden md:flex">
                                {row.original.referenceType === "payment"
                                    ? row.original.paymentMethod ?? "-"
                                    : row.original.adjustmentType ?? "-"}
                            </Badge>
                        )}
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                return <div className="flex items-center gap-1 ">
                    <Badge variant={"outline"}
                        className="px-1.5 flex items-center gap-1">
                        {row.original.referenceType}
                    </Badge>
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "direction",
            header: "Direction",
            cell: ({ row }) => {
                return <div className="flex items-center gap-1 ">
                    <Badge variant={"outline"}
                        className="px-1.5 flex items-center gap-1">
                        {row.original.direction}
                    </Badge>
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "reference",
            header: "Reference",
            cell: ({ row }) => {
                return <div className="flex items-center gap-1 ">
                    <Badge variant={"outline"}
                        className="px-1.5 flex items-center gap-1">
                        {row.original.referenceId}
                    </Badge>
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: ({ row }) => {
                return <div className="text-muted-foreground">
                    {row.original.amount ? formatCurrency(row.original.amount) : "-"}
                </div>
            },
            enableHiding: true,
        },
    ]

    const table = useReactTable({
        data: filteredData,
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

    const openInvoicePage = (activityId: string) => {
        // Implement navigation to invoice details page
        console.log("");

        router.push(`/dashboard/activities?filter=${activityId}`)


    }

    return (
        <>
            <div className="w-full flex-1 rounded-lg border border-dashed bg-white dark:bg-black overflow-hidden ">
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

                {!loading && table.getRowModel().rows?.length > 0 ? (
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-muted ">
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
                            {
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        onClick={() => openInvoicePage(row.original.id)}
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

                        <p className="text-sm font-medium"> No invoices data available</p>

                        <p className="text-xs opacity-70 max-w-xs">
                            No invoice insights available yet. Start adding transactions to see trends and patterns in customer invoices.
                        </p>
                    </div>
                )}

            </div>
            <div className="flex items-center justify-end px-4">
                <div className="flex w-full items-center gap-8 lg:w-fit justify-end px-4">
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
                    <div className="flex w-fit items-center justify-center text-sm font-medium text-muted-foreground">
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
        </>
    )
}
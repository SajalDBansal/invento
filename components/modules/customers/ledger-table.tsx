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
import { Checkbox } from "@/components/ui/checkbox"
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
import Link from "next/link"
import { customerInsightsLedgerDataType } from "@/types/types"
import { useRouter } from "next/navigation"

export function CustomersLedgerTable({ ledgerData, searchFilter }: { ledgerData: customerInsightsLedgerDataType[], searchFilter: string }) {
    const router = useRouter();
    const [data, setData] = useState(() => ledgerData)
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
        method: false,
        description: false,
    }

    const desktopVisibility = {
        method: true,
        description: true,

    }

    React.useEffect(() => {

        setColumnVisibility(isMobile ? mobileVisibility : desktopVisibility)
    }, [isMobile])

    React.useEffect(() => {
        let filteredData = ledgerData;
        if (searchFilter) {
            const lowercasedFilter = searchFilter.toLowerCase();
            filteredData = ledgerData.filter(item =>
                item.id.toLowerCase().includes(lowercasedFilter) ||
                item.date.toLowerCase().includes(lowercasedFilter) ||
                item.direction.toLowerCase().includes(lowercasedFilter) ||
                item.referenceType.toLowerCase().includes(lowercasedFilter) ||
                item.status.toLowerCase().includes(lowercasedFilter)
            );
        }
        setData(filteredData);
    }, [searchFilter]);

    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const columns: ColumnDef<customerInsightsLedgerDataType>[] = [
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
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => {
                return <div>
                    {row.original.description ? row.original.description : "-"}
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "method",
            header: "Method",
            cell: ({ row }) => {
                return <div className="text-muted-foreground">
                    {row.original.referenceType === "payment" ? (row.original.paymentMethod ? row.original.paymentMethod : "-")
                        :
                        row.original.referenceType === "adjustment" ? (row.original.adjustmentType ? row.original.adjustmentType : "-")
                            : "-"
                    }

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
                        {row.original.referenceType}
                    </Badge>
                    <Badge variant={"outline"}
                        className="px-1.5 hidden md:flex items-center gap-1">
                        {row.original.referenceId}
                    </Badge>
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "debit",
            header: "Debit",
            cell: ({ row }) => {
                return <div className="text-muted-foreground">
                    {row.original.direction === "debit" ? formatCurrency(row.original.amount) : "-"}
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "credit",
            header: "Credit",
            cell: ({ row }) => {
                return <div className="text-muted-foreground">
                    {row.original.direction === "credit" ? formatCurrency(row.original.amount) : "-"}
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "balance",
            header: "Balance",
            cell: ({ row }) => {
                return <div className="text-muted-foreground">
                    {row.original.balance ? formatCurrency(row.original.balance) : "-"}
                </div>
            },
            enableHiding: true,
        },
    ]

    const table = useReactTable({
        data,
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

    const openInvoicePage = (row: customerInsightsLedgerDataType) => {
        // Implement navigation to invoice details page
        console.log("");

        switch (row.referenceType) {
            case "invoice":
                router.push(`/sales/invoices/${row.referenceId}`)
                break;
            case "payment":
                if (row.paymentMethod == "bank") {
                    router.push(`/ledger/bank?filter=${row.referenceId}`)
                } else {
                    router.push(`/ledger/cash?filter=${row.referenceId}`)
                }
                break;
            case "adjustment":
                if (row.adjustmentType == "discount") {
                    router.push(`/sales/discounts?filter={row.referenceId}`)
                    break;
                } else {
                    router.push(`/sales/returnss?filter={row.referenceId}`)
                    break;
                }
                break;
            default:
                break;
        }


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
                                        onClick={() => openInvoicePage(row.original)}
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
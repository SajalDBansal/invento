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
import { ContactsProductDataType } from "@/types/types"
import { useRouter } from "next/navigation"

const productsData: ContactsProductDataType[] = [
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

export function ProductsTable({ searchFilter }: { searchFilter: string }) {
    const router = useRouter();
    const [data, setData] = useState<ContactsProductDataType[]>([])
    const [filteredData, setFilteredData] = useState<ContactsProductDataType[]>([])
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
            setData(productsData);
            setFilteredData(productsData);
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
        id: false,
        company: false,
        category: false,
        date: false,
        invoiceId: false
    }

    const desktopVisibility = {
        id: true,
        company: true,
        category: true,
        date: true,
        invoiceId: true
    }

    React.useEffect(() => {

        setColumnVisibility(isMobile ? mobileVisibility : desktopVisibility)
    }, [isMobile])

    React.useEffect(() => {
        setFilteredData(data);
        if (searchFilter) {
            const lowercasedFilter = searchFilter.toLowerCase();
            setFilteredData(() =>
                filteredData.filter(item =>
                    item.id.toLowerCase().includes(lowercasedFilter) ||
                    item.date.toLowerCase().includes(lowercasedFilter) ||
                    item.productId.toLowerCase().includes(lowercasedFilter) ||
                    item.productName.toLowerCase().includes(lowercasedFilter) ||
                    item.invoiceId.toLowerCase().includes(lowercasedFilter) ||
                    item.category.toLowerCase().includes(lowercasedFilter) ||
                    item.subCategory.toLowerCase().includes(lowercasedFilter) ||
                    item.company.toString().toLowerCase().includes(lowercasedFilter)
                ))
        }
    }, [searchFilter]);

    const [loading, setLoading] = useState(false);

    const columns: ColumnDef<ContactsProductDataType>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => {
                return <div className="text-muted-foreground">
                    {row.original.productId ? row.original.productId : "-"}
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                return <div>
                    {row.original.productName ? row.original.productName : "-"}
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "company",
            header: "Company",
            cell: ({ row }) => {
                return <div className="text-muted-foreground">
                    {row.original.company ? row.original.company : "-"}
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => {
                return <div className="flex items-center gap-1 ">
                    <Badge variant={"outline"}
                        className="px-1.5 flex items-center gap-1">
                        {row.original.category}
                    </Badge>
                    <Badge variant={"outline"}
                        className="px-1.5 hidden md:flex items-center gap-1">
                        {row.original.subCategory}
                    </Badge>
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
                    {row.original.date.slice(2)}
                </div>
            },
            enableHiding: false,
            enableSorting: true,
        },
        {
            accessorKey: "invoiceId",
            header: "InvoiceId",
            cell: ({ row }) => {
                return <div className="flex items-center gap-1 ">
                    <Badge variant={"outline"}
                        className="px-1.5 flex items-center gap-1">
                        {row.original.invoiceId}
                    </Badge>
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "quantity",
            header: "Qty.",
            cell: ({ row }) => {
                return <div className="text-muted-foreground">
                    {row.original.quantity}
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => {
                return <div className="text-muted-foreground">
                    {row.original.unitPrice}
                </div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "amount",
            header: "Total",
            cell: ({ row }) => {
                return <div className="text-muted-foreground">
                    {row.original.totalPrice}
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

        router.push(`/products/${activityId}`)


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
                                        onClick={() => openInvoicePage(row.original.productId)}
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
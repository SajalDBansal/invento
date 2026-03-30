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
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import { z } from "zod"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
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
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CircleCheck, Columns2, EllipsisVertical, Funnel, Loader, OctagonAlert, Plus, RotateCw, TrendingUp } from "lucide-react"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup } from "radix-ui"
import Link from "next/link"
import { Field, FieldLabel } from "@/components/ui/field"
import { useEffect, useId, useState } from 'react'
import { LoaderCircleIcon, SearchIcon } from 'lucide-react'

export const schema = z.object({
    id: z.number(),
    header: z.string(),
    type: z.string(),
    status: z.string(),
    target: z.string(),
    limit: z.string(),
    reviewer: z.string(),
})

const columns: ColumnDef<z.infer<typeof schema>>[] = [
    {
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
        enableHiding: false,
    },
    {
        accessorKey: "header",
        header: "Header",
        cell: ({ row }) => {
            return <TableCellViewer item={row.original} />
        },
        enableHiding: false,
    },
    {
        accessorKey: "type",
        header: "Section Type",
        cell: ({ row }) => (
            <div className="w-32">
                <Badge variant="outline" className="px-1.5 text-muted-foreground">
                    {row.original.type}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant="outline" className="px-1.5 text-muted-foreground">
                {row.original.status === "Done" ? (
                    <CircleCheck className="fill-green-500 dark:fill-green-400" />
                ) : (
                    <Loader />
                )}
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: "target",
        header: () => <div className="w-full text-right">Target</div>,
        cell: ({ row }) => (
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
                        loading: `Saving ${row.original.header}`,
                        success: "Done",
                        error: "Error",
                    })
                }}
            >
                <Label htmlFor={`${row.original.id}-target`} className="sr-only">
                    Target
                </Label>
                <Input
                    className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
                    defaultValue={row.original.target}
                    id={`${row.original.id}-target`}
                />
            </form>
        ),
    },
    {
        accessorKey: "limit",
        header: () => <div className="w-full text-right">Limit</div>,
        cell: ({ row }) => (
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
                        loading: `Saving ${row.original.header}`,
                        success: "Done",
                        error: "Error",
                    })
                }}
            >
                <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
                    Limit
                </Label>
                <Input
                    className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
                    defaultValue={row.original.limit}
                    id={`${row.original.id}-limit`}
                />
            </form>
        ),
    },
    {
        accessorKey: "reviewer",
        header: "Reviewer",
        cell: ({ row }) => {
            const isAssigned = row.original.reviewer !== "Assign reviewer"

            if (isAssigned) {
                return row.original.reviewer
            }

            return (
                <>
                    <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
                        Reviewer
                    </Label>
                    <Select>
                        <SelectTrigger
                            className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
                            size="sm"
                            id={`${row.original.id}-reviewer`}
                        >
                            <SelectValue placeholder="Assign reviewer" />
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                            <SelectItem value="Jamik Tashpulatov">
                                Jamik Tashpulatov
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </>
            )
        },
    },
    {
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                        size="icon"
                    >
                        <EllipsisVertical />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Make a copy</DropdownMenuItem>
                    <DropdownMenuItem>Favorite</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]

export function CustomersTable({
    data: initialData,
}: {
    data: z.infer<typeof schema>[]
}) {
    const [data, setData] = React.useState(() => initialData)
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        // getRowId: (row) => row.id.toString(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (
        <Tabs
            defaultValue="outline"
            className="w-full flex-col justify-start gap-6"
        >
            {/* View */}
            <div className="flex items-center justify-between">

                <div className="flex md:hidden">
                    <Label htmlFor="view-selector" className="sr-only">
                        View
                    </Label>
                    <Select defaultValue="outline">
                        <SelectTrigger
                            className="flex w-fit @4xl/main:hidden"
                            size="sm"
                            id="view-selector"
                        >
                            <SelectValue placeholder="Select a view" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="outline">Outline</SelectItem>
                            <SelectItem value="past-performance">Past Performance</SelectItem>
                            <SelectItem value="key-personnel">Key Personnel</SelectItem>
                            <SelectItem value="focus-documents">Focus Documents</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <TabsList className="hidden md:flex **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
                    <TabsTrigger value="outline">Outline</TabsTrigger>
                    <TabsTrigger value="card">
                        Card
                    </TabsTrigger>
                    <TabsTrigger value="key-personnel">
                        Key Personnel
                    </TabsTrigger>
                    <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <RotateCw />
                        <span className="hidden lg:inline">Refresh Data</span>
                    </Button>
                </div>
            </div>

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
                    <CardAction className="space-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Columns2 />
                                    <span className="hidden lg:inline">Customize Columns</span>
                                    <span className="lg:hidden">Columns</span>
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
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
                        <Button variant="outline" size="sm">
                            <Funnel />
                            <span className="hidden lg:inline">Reset Filters</span>
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent className="px-1 flex-1 overflow-y-auto grid grid-cols-2 gap-8 md:gap-4">
                    <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            {/* Balance */}
                            <Field className="gap-2">
                                <FieldLabel htmlFor="form-login-email">
                                    Email*
                                </FieldLabel>
                                <Input
                                    id="form-login-email"
                                    placeholder="Enter your Email Address"
                                    autoComplete="email"
                                    type="email"
                                />
                            </Field>
                        </div>

                        {/* Status */}
                        <div>
                            <Field className="gap-2">
                                <FieldLabel htmlFor="form-login-email">
                                    Email*
                                </FieldLabel>
                                <Input
                                    id="form-login-email"
                                    placeholder="Enter your Email Address"
                                    autoComplete="email"
                                    type="email"
                                />
                            </Field>
                        </div>

                        {/* Type */}
                        <div className="col-span-full lg:col-span-1">
                            <Field className="gap-2">
                                <FieldLabel htmlFor="form-login-email">
                                    Email*
                                </FieldLabel>
                                <Input
                                    id="form-login-email"
                                    placeholder="Enter your Email Address"
                                    autoComplete="email"
                                    type="email"
                                />
                            </Field>
                        </div>
                    </div>
                    <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SeacrhInput />
                        <div className="space-x-2 flex justify-start sm:justify-end">

                            {/* Dropdown */}
                            <Button variant="outline" size="sm">
                                <Funnel className="hidden md:inline" />
                                <span >Export</span>
                            </Button>


                            <Button variant="outline" size="sm">
                                <Funnel className="hidden md:inline" />
                                <span >Reset Filters</span>
                            </Button>


                            <Button variant="outline" size="sm">
                                <Funnel className="hidden md:inline" />
                                <span >Reset Filters</span>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto"
            >
                <div className="overflow-hidden rounded-lg border bg-white dark:bg-black">
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
                            {table.getRowModel().rows?.length ?
                                table.getRowModel().rows.map((row) => (
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

                                : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                        >
                                            <div className="col-span-full mx-auto flex flex-col items-center justify-center gap-3 py-12 text-center text-muted-foreground h-full">
                                                <div className="p-3 rounded-full bg-muted">
                                                    <OctagonAlert className="w-6 h-6 opacity-80" />
                                                </div>

                                                <p className="text-sm font-medium"> No customers found</p>

                                                <p className="text-xs opacity-70 max-w-xs">
                                                    Start adding transactions to identify high-value customers.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between px-4">
                    <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="flex w-full items-center gap-8 lg:w-fit">
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
            </TabsContent>

            <TabsContent value="card" className="flex flex-col">
                <div className="w-full flex-1 rounded-lg border border-dashed bg-white dark:bg-black">
                    <div className="col-span-full mx-auto flex flex-col items-center justify-center gap-3 py-12 text-center text-muted-foreground h-full">
                        <div className="p-3 rounded-full bg-muted">
                            <OctagonAlert className="w-6 h-6 opacity-80" />
                        </div>

                        <p className="text-sm font-medium"> No customers found</p>

                        <p className="text-xs opacity-70 max-w-xs">
                            No top customers available yet. Start adding transactions to identify high-value customers.
                        </p>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="key-personnel" className="flex flex-col">
                <div className="w-full flex-1 rounded-lg border border-dashed bg-white dark:bg-black">
                    <div className="col-span-full mx-auto flex flex-col items-center justify-center gap-3 py-12 text-center text-muted-foreground h-full">
                        <div className="p-3 rounded-full bg-muted">
                            <OctagonAlert className="w-6 h-6 opacity-80" />
                        </div>

                        <p className="text-sm font-medium"> No customers found</p>

                        <p className="text-xs opacity-70 max-w-xs">
                            No top customers available yet. Start adding transactions to identify high-value customers.
                        </p>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="focus-documents" className="flex flex-col">
                <div className="w-full flex-1 rounded-lg border border-dashed bg-white dark:bg-black">
                    <div className="col-span-full mx-auto flex flex-col items-center justify-center gap-3 py-12 text-center text-muted-foreground h-full">
                        <div className="p-3 rounded-full bg-muted">
                            <OctagonAlert className="w-6 h-6 opacity-80" />
                        </div>

                        <p className="text-sm font-medium"> No customers found</p>

                        <p className="text-xs opacity-70 max-w-xs">
                            No top customers available yet. Start adding transactions to identify high-value customers.
                        </p>
                    </div>
                </div>
            </TabsContent>

        </Tabs>
    )
}

// const chartData = [
//     { month: "January", desktop: 186, mobile: 80 },
//     { month: "February", desktop: 305, mobile: 200 },
//     { month: "March", desktop: 237, mobile: 120 },
//     { month: "April", desktop: 73, mobile: 190 },
//     { month: "May", desktop: 209, mobile: 130 },
//     { month: "June", desktop: 214, mobile: 140 },
// ]

// const chartConfig = {
//     desktop: {
//         label: "Desktop",
//         color: "var(--primary)",
//     },
//     mobile: {
//         label: "Mobile",
//         color: "var(--primary)",
//     },
// } satisfies ChartConfig



function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
    function useResponsiveDirection() {
        const [direction, setDirection] = React.useState<"right" | "bottom">("right")

        React.useEffect(() => {
            const media = window.matchMedia("(max-width: 768px)")

            const handleChange = () => {
                setDirection(media.matches ? "bottom" : "right")
            }

            handleChange() // initial
            media.addEventListener("change", handleChange)

            return () => media.removeEventListener("change", handleChange)
        }, [])

        return direction
    }

    const direction = useResponsiveDirection()

    return (
        <Drawer direction={direction}>
            <DrawerTrigger asChild>
                <Button variant="link" className="w-fit px-0 text-left text-foreground">
                    {item.header}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="gap-1">
                    <DrawerTitle>{item.header}</DrawerTitle>
                    <DrawerDescription>
                        Showing total visitors for the last 6 months
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">

                    {/* <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 0,
                                right: 10,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                                hide
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Area
                                dataKey="mobile"
                                type="natural"
                                fill="var(--color-mobile)"
                                fillOpacity={0.6}
                                stroke="var(--color-mobile)"
                                stackId="a"
                            />
                            <Area
                                dataKey="desktop"
                                type="natural"
                                fill="var(--color-desktop)"
                                fillOpacity={0.4}
                                stroke="var(--color-desktop)"
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                    <Separator />
                    <div className="grid gap-2">
                        <div className="flex gap-2 leading-none font-medium">
                            Trending up by 5.2% this month{" "}
                            <TrendingUp className="size-4" />
                        </div>
                        <div className="text-muted-foreground">
                            Showing total visitors for the last 6 months. This is just
                            some random text to test the layout. It spans multiple lines
                            and should wrap around.
                        </div>
                    </div> */}
                    <Separator />

                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="header">Header</Label>
                            <Input id="header" defaultValue={item.header} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="type">Type</Label>
                                <Select defaultValue={item.type}>
                                    <SelectTrigger id="type" className="w-full">
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Table of Contents">
                                            Table of Contents
                                        </SelectItem>
                                        <SelectItem value="Executive Summary">
                                            Executive Summary
                                        </SelectItem>
                                        <SelectItem value="Technical Approach">
                                            Technical Approach
                                        </SelectItem>
                                        <SelectItem value="Design">Design</SelectItem>
                                        <SelectItem value="Capabilities">Capabilities</SelectItem>
                                        <SelectItem value="Focus Documents">
                                            Focus Documents
                                        </SelectItem>
                                        <SelectItem value="Narrative">Narrative</SelectItem>
                                        <SelectItem value="Cover Page">Cover Page</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="status">Status</Label>
                                <Select defaultValue={item.status}>
                                    <SelectTrigger id="status" className="w-full">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Done">Done</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Not Started">Not Started</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="target">Target</Label>
                                <Input id="target" defaultValue={item.target} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="limit">Limit</Label>
                                <Input id="limit" defaultValue={item.limit} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="reviewer">Reviewer</Label>
                            <Select defaultValue={item.reviewer}>
                                <SelectTrigger id="reviewer" className="w-full">
                                    <SelectValue placeholder="Select a reviewer" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                                    <SelectItem value="Jamik Tashpulatov">
                                        Jamik Tashpulatov
                                    </SelectItem>
                                    <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </form>
                </div>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Done</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function SeacrhInput() {
    const [value, setValue] = useState('')
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
        <div className='w-full space-y-2'>
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
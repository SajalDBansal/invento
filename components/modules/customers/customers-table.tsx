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
    DropdownMenuLabel,
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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Archive, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CircleCheck, Columns2, Download, EllipsisVertical, FileText, Funnel, Loader, OctagonAlert, RotateCw, CirclePlus, Ban, LucideIcon, Check, X, Users, Store, Wallet, ChevronsUpDown } from "lucide-react"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { useEffect, useId, useState } from 'react'
import { LoaderCircleIcon, SearchIcon } from 'lucide-react'
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { CustomerBalance, CustomerStatus, customerTableProps, customerDataType, CustomerType } from "@/types/types"
import { customerStatusConfig, customerTypeConfig } from "@/public/data"


const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Blocked", value: "blocked" },
]

const typeOptions = [
    { label: "Wholesale", value: "wholesale" },
    { label: "Retail", value: "retail" },
    { label: "Cash", value: "cash" },
]

const balanceOptions = [
    { label: "No Dues", value: "noDues" },
    { label: "Low Dues", value: "lowDues" },
    { label: "High Dues", value: "highDues" },
]

export function CustomersTable({
    data: initialData,
    carpenters,
}: customerTableProps) {
    const [data, setData] = useState(() => initialData)
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
    const [balanceFilter, setBalanceFilter] = React.useState<string[]>([]);
    const [typeFilter, setTypeFilter] = React.useState<string[]>([]);
    const [searchFilter, setSearchFilter] = useState("");

    const getBalanceCategory = (balance: number): CustomerBalance => {
        if (balance === 0) return "noDues"
        if (balance <= 10000) return "lowDues"
        return "highDues"
    }

    const filteredCustomers = React.useMemo(() => {
        return data.filter((customer) => {
            // 🔍 Search filter
            const matchesSearch =
                !searchFilter ||
                customer.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                customer.contact.includes(searchFilter)

            // 📊 Status filter
            const matchesStatus =
                statusFilter.length === 0 || statusFilter.includes(customer.status)

            // 🏷 Type filter
            const matchesType =
                typeFilter.length === 0 || typeFilter.includes(customer.type)

            // 💰 Balance filter
            const balanceCategory = getBalanceCategory(customer.balance)
            const matchesBalance =
                balanceFilter.length === 0 || balanceFilter.includes(balanceCategory)

            return (
                matchesSearch &&
                matchesStatus &&
                matchesType &&
                matchesBalance
            )
        })
    }, [data, searchFilter, statusFilter, typeFilter, balanceFilter])

    const resetFilters = () => {
        setStatusFilter([]);
        setBalanceFilter([]);
        setTypeFilter([]);
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

    const columns: ColumnDef<customerDataType>[] = [
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
            accessorKey: "name",
            header: ({ column }) => (
                <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="p-0 mr-2 cursor-pointer"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Name</span>
                        <ChevronsUpDown className="ml-2 opacity-50 size-5" />
                    </Button>

                </div>
            ),
            cell: ({ row }) => {
                return <TableCellViewer item={row.original} />
            },
            enableHiding: false,
            enableSorting: true,
        },
        {
            accessorKey: "contact",
            header: "Contact",
            cell: ({ row }) => {
                return <div className="text-muted-foreground">
                    <Link href={`tel:+91${row.original.contact}`} className="hover:underline">
                        {row.original.contact}
                    </Link>
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
                const status = customerStatusConfig[row.original.status as CustomerStatus];

                return (
                    <Badge variant="outline" className="px-1.5 text-muted-foreground flex items-center gap-1">
                        <status.icon className={status.className} />
                        {status.label}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "balance",
            header: ({ column }) => (
                <div className="">
                    <Button variant="ghost" size="sm" className="p-0 mr-2 cursor-pointer justify-start"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Balance</span>
                        <ChevronsUpDown className="ml-2 opacity-50 size-5" />
                    </Button>

                </div>
            ),
            cell: ({ row }) => {
                return <div className="">
                    {formatCurrency(row.original.balance)}
                </div>
            },
            enableHiding: false,
            enableSorting: true,
        },
        {
            accessorKey: "limit",
            header: "Limit",
            cell: ({ row }) => (
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
                            loading: `Saving ${row.original.name}`,
                            success: "Done",
                            error: "Error",
                        })
                    }}
                >
                    <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
                        Limit
                    </Label>
                    <Input
                        className="h-8 w-24 border-transparent bg-transparent shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30 px-1 text-start"
                        defaultValue={row.original.creditLimit ? formatCurrency(row.original.creditLimit) : "-"}
                        id={`${row.original.id}-limit`}
                    />
                </form>
            ),
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
                                    loading: `Saving ${row.original.name}`,
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
                                {carpenters.map((carp) => (
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

    return (
        <Tabs
            defaultValue="outline"
            className="w-full flex-col justify-start gap-4"
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
                    </CardAction>
                </CardHeader>

                <CardContent className="px-1 flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-5 gap-2 md:gap-4 py-1">
                    <div className="col-span-full lg:col-span-1">
                        <SeacrhInput value={searchFilter} setValue={setSearchFilter} />
                    </div>

                    <div className="col-span-full lg:col-span-2 space-x-2">

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
                        <MultiSelectDropdown
                            name={"Balance"}
                            options={balanceOptions}
                            selected={balanceFilter}
                            setSelected={setBalanceFilter}
                        />

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

function TableCellViewer({ item }: { item: customerDataType }) {
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
                <Button variant="link" className="w-fit px-0 text-left">
                    {item.name}
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{item.name}</DrawerTitle>
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
                                <Input value={item.name} disabled />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label>Contact</Label>
                                <Input value={item.contact} disabled />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Email</Label>
                            <Input value={item.email ?? "-"} disabled />
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Address</Label>
                            <Input value={item.address} disabled />
                        </div>

                        {/* Type & Status */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label>Type</Label>
                                <Input value={item.type} disabled />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label>Status</Label>
                                <Input value={item.status} disabled />
                            </div>
                        </div>

                        {/* Financials */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label>Balance</Label>
                                <Input value={item.balance} disabled />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label>Credit Limit</Label>
                                <Input value={item.creditLimit ?? "-"} disabled />
                            </div>
                        </div>

                        {/* Orders */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label>Total Orders</Label>
                                <Input value={item.totalOrders ?? "-"} disabled />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label>Total Spent</Label>
                                <Input value={item.totalSpent ?? "-"} disabled />
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label>Last Order</Label>
                                <Input value={item.lastOrderDate ?? "-"} disabled />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label>Last Payment</Label>
                                <Input value={item.lastPaymentDate ?? "-"} disabled />
                            </div>
                        </div>

                        {/* Assignment */}
                        <div className="flex flex-col gap-3">
                            <Label>Assigned To</Label>
                            <Input value={item.assignedTo ?? "-"} disabled />
                        </div>

                        {/* Metadata */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label>Created At</Label>
                                <Input value={item.createdAt ?? "-"} disabled />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label>Updated At</Label>
                                <Input value={item.updatedAt ?? "-"} disabled />
                            </div>
                        </div>

                    </form>
                </div>

                <DrawerFooter>
                    <Link href={`/customers/${item.id}`}>
                        <Button variant="default" className="w-full">Get more Details</Button>
                    </Link>
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
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

            <PopoverContent className="w-[200px] p-0" align="start">
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
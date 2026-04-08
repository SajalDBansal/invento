"use client";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, LoaderCircleIcon, SearchIcon } from "lucide-react"
import { useEffect, useId, useState } from "react"
import { ActivityTable } from "../contacts-ables/activity-table";
import { InvoiceTable } from "../contacts-ables/invoice-table";
import { LedgerTable } from "../contacts-ables/ledger-table";
import { ProductsTable } from "../contacts-ables/products-table";

type TabValue = "invoices" | "ledger" | "activity" | "products";

export default function SuppliersInsights() {
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
                    <InvoiceTable searchFilter={searchFilter} />
                </TabsContent>

                <TabsContent value="ledger" className="flex flex-col gap-2 h-full pt-2">
                    <LedgerTable searchFilter={searchFilter} />
                </TabsContent>

                <TabsContent value="activity" className="flex flex-col gap-2 h-full pt-2">
                    <ActivityTable searchFilter={searchFilter} />
                </TabsContent>

                <TabsContent value="products" className="flex flex-col gap-2 h-full pt-2">
                    <ProductsTable searchFilter={searchFilter} />
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
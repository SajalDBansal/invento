import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, OctagonAlert, RotateCw } from "lucide-react"

export default function CustomersInsights() {
    return (
        <Card className="@container/card p-2 gap-2 space-y-2">
            <Tabs
                defaultValue="order"
                className="w-full flex-col justify-start gap-2"
            >
                {/* View */}
                <div className="flex items-center justify-between">

                    <TabsList className="gap-1 sm:gap-2 bg-transparent">
                        <TabsTrigger value="order" className="p-2 py-4 sm:p-4">Order</TabsTrigger>
                        <TabsTrigger value="ledger" className="p-2 py-4 sm:p-4">Ledger</TabsTrigger>
                        <TabsTrigger value="details" className="p-2 py-4 sm:p-4">Details</TabsTrigger>
                        <TabsTrigger value="activity" className="p-2 py-4 sm:p-4">Activity</TabsTrigger>
                    </TabsList>

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

                <TabsContent value="order" className="flex flex-col gap-4 overflow-auto">
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

                <TabsContent value="ledger" className="flex flex-col">
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

                <TabsContent value="details" className="flex flex-col">
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

                <TabsContent value="activity" className="flex flex-col">
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
        </Card>

    )
}
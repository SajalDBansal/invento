import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ToggleGroup } from "radix-ui";

export default function RecentActivitiesCard() {
    return (
        <Card className="@container/card p-4 gap-2 space-y-2">
            <CardHeader className="p-0">
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Track stock levels and movements
                    </span>
                    <span className="@[540px]/card:hidden">Inventory overview</span>
                </CardDescription>

                {/* <CardAction>
                    <ToggleGroup
                        type="single"
                        value={stockCategory}
                        onValueChange={(value) => setStockCategory(value as keyof DataType)}
                        variant="outline"
                        className="hidden lg:flex"
                    >
                        <ToggleGroupItem value="out">Out Of Stock</ToggleGroupItem>
                        <ToggleGroupItem value="fast">Fast Moving</ToggleGroupItem>
                        <ToggleGroupItem value="low">Low Stock</ToggleGroupItem>
                    </ToggleGroup>

                    <Select value={stockCategory}
                        onValueChange={(value) => setStockCategory(value as keyof DataType)}>
                        <SelectTrigger
                            className="w-40 flex lg:hidden"
                            size="sm"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="out" className="rounded-lg">
                                Out Of Stock
                            </SelectItem>
                            <SelectItem value="fast" className="rounded-lg">
                                Fast Moving
                            </SelectItem>
                            <SelectItem value="low" className="rounded-lg">
                                Low Stock
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction> */}
            </CardHeader>

            <CardContent className="px-1 grid gap-2 sm:grid-cols-2 flex-1 overflow-y-auto">

            </CardContent>

            <CardFooter className="px-0">
                <Link href={`/overview/activities`} className="w-full">
                    <Button className="w-full" variant="outline">
                        More...
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
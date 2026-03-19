import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, Package } from "lucide-react";
import { NAV_LINKS } from "@/public/data";
import { getFilteredFeatures } from "@/lib/utils";
import { Session } from "next-auth";

export default function MenuNavigation({ session }: { session: Session | null }) {

    const userRole = session?.user.role ?? "Default";

    return (
        <NavigationMenu className="hidden lg:flex" viewport={false}>
            <NavigationMenuList className="space-x-2">
                <NavigationMenuItem >
                    <NavigationMenuLink asChild>
                        <Button asChild variant="ghost">
                            <Link
                                href={"/dashboard"}
                                className="flex items-center gap-2 px-4 py-2 dark:bg-black"
                            >
                                <LayoutDashboard className='text-foreground size-5' />
                                <div className="hidden xl:flex">
                                    Dashboard
                                </div>
                            </Link>
                        </Button>

                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Button asChild variant="ghost">
                            <Link
                                href={"/inventory"}
                                className="flex items-center gap-2 px-4 py-2 dark:bg-black"
                            >
                                <Package className='text-foreground size-5' />
                                <div className="hidden xl:flex">
                                    Inventory
                                </div>
                            </Link>

                        </Button>

                    </NavigationMenuLink>
                </NavigationMenuItem>

                {
                    NAV_LINKS.map((section, index) => {
                        const links = getFilteredFeatures(section.items, userRole);

                        return (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuTrigger className="dark:bg-black">
                                    {section.title}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="w-[150px]">
                                        {links.map((feature, idx) => (
                                            <li key={idx}>
                                                <NavigationMenuLink asChild>
                                                    <Link href={feature.link}>
                                                        <feature.icon className='text-foreground size-5' />
                                                        <span>{feature.title}</span>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))
                                        }
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        )
                    })
                }
            </NavigationMenuList>
        </NavigationMenu>
    )
}
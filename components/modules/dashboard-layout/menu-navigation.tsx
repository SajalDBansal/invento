"use client";
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
import { NAVIGATION } from "@/public/data";
import { filterNavByRole } from "@/lib/utils";
import { Session } from "next-auth";
import { Separator } from "@/components/ui/separator";

export default function MenuNavigation({ session }: { session: Session | null }) {

    const userRole = session?.user.role ?? "Default";
    const filteredNav = filterNavByRole(NAVIGATION, userRole);

    return (
        <NavigationMenu className="hidden lg:flex" viewport={false}>
            <NavigationMenuList className="space-x-2">
                {filteredNav.map((section, index) => (
                    <NavigationMenuItem key={index}>
                        {/* If section has NO items → direct link */}
                        {!section.items?.length ? (
                            <NavigationMenuLink asChild>
                                <Button asChild variant="ghost">
                                    <Link
                                        href={section.link || "#"}
                                        className="flex items-center gap-2 px-4 py-2 dark:bg-black"
                                    >
                                        <LayoutDashboard className='text-foreground size-5' />
                                        {section.title}
                                    </Link>
                                </Button>
                            </NavigationMenuLink>
                        ) : (
                            <>
                                {/* Section Trigger */}
                                <NavigationMenuTrigger className={`dark:bg-black ${section.link && "cursor-pointer"}`}>
                                    {section.link ? (
                                        <Link href={section.link}>
                                            {section.title}
                                        </Link>
                                    ) : (
                                        section.title
                                    )}
                                </NavigationMenuTrigger>

                                {/* Dropdown */}
                                <NavigationMenuContent>
                                    <ul className="w-[150px] space-y-1">
                                        {section.items.map((item, idx) => (
                                            <li key={idx}>
                                                {/* If item has children */}
                                                {item.children?.length ? (
                                                    <div className="space-y-1">
                                                        <div className="text-sm font-medium py-1 text-muted-foreground flex items-center gap-1">
                                                            {item.icon && <item.icon className="size-3.5" />}
                                                            {item.title}
                                                        </div>

                                                        {item.children.map((child, cIdx) => (
                                                            <NavigationMenuLink asChild key={cIdx}>
                                                                <Link
                                                                    href={child.link || "#"}
                                                                    className="flex items-center gap-2 rounded-md hover:bg-muted pl-3"
                                                                >
                                                                    <span>{child.title}</span>
                                                                </Link>
                                                            </NavigationMenuLink>

                                                        ))}
                                                        <Separator />

                                                    </div>
                                                ) : (
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            href={item.link || "#"}
                                                            className="flex items-center rounded-md hover:bg-muted gap-2"
                                                        >
                                                            {item.icon && (
                                                                <item.icon className="size-5" />
                                                            )}
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </>
                        )}
                    </NavigationMenuItem>
                ))}



            </NavigationMenuList>
        </NavigationMenu>
    )
}
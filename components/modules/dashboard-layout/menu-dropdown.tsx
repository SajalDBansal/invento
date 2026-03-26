import {
    LayoutDashboard,
    Menu,
    Package
} from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { NAVIGATION } from '@/public/data';
import { filterNavByRole } from '@/lib/utils';
import Link from 'next/link';
import { Session } from 'next-auth';
import { Button } from '@/components/ui/button';

type Props = {
    defaultOpen?: boolean
    align?: 'start' | 'center' | 'end',
    session: Session | null
}

export default function MenuDropdown({ defaultOpen, align = 'start', session }: Props) {

    const userRole = session?.user.role ?? "Default";
    const filteredNav = filterNavByRole(NAVIGATION, userRole);

    return (
        <DropdownMenu defaultOpen={defaultOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' className='size-9.5 flex lg:hidden'>
                    <Menu className="size-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-80' align={align || 'start'}>

                {filteredNav.map((section, index) => (
                    <div key={index}>
                        <DropdownMenuGroup>
                            {/* Section Title (clickable if link exists) */}
                            {section.link ?
                                <DropdownMenuItem
                                    className="px-4 py-2.5 text-base cursor-pointer"
                                    asChild
                                >
                                    <Link href={section.link || "#"}>
                                        <LayoutDashboard className='text-foreground size-5' />
                                        {section.title}
                                    </Link>
                                </DropdownMenuItem>
                                :
                                <DropdownMenuLabel>
                                    {section.title}
                                </DropdownMenuLabel>
                            }

                            {/* Section Items */}
                            {section.items.map((item, idx) => {
                                // If item has children → render group
                                if (item.children?.length) {
                                    return (
                                        <div key={idx} className="pl-2">
                                            <DropdownMenuLabel className="text-xs text-muted-foreground">
                                                {item.title}
                                            </DropdownMenuLabel>

                                            {item.children.map((child, cIdx) => (
                                                <DropdownMenuItem
                                                    key={cIdx}
                                                    className="px-4 py-2.5 text-base cursor-pointer"
                                                    asChild
                                                >
                                                    <Link href={child.link || "#"}>
                                                        <span>{child.title}</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </div>
                                    );
                                }

                                // Normal item
                                return (
                                    <DropdownMenuItem
                                        key={idx}
                                        className="px-4 py-2.5 text-base cursor-pointer"
                                        asChild
                                    >
                                        <Link href={item.link || "#"}>
                                            {item.icon && (
                                                <item.icon className="size-5 text-foreground" />
                                            )}
                                            <span>{item.title}</span>
                                        </Link>
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuGroup>

                        {/* Divider between sections */}
                        {index !== filteredNav.length - 1 && (
                            <DropdownMenuSeparator />
                        )}
                    </div>
                ))}

                {/* <DropdownMenuGroup>
                    <DropdownMenuItem className='px-4 py-2.5 text-base cursor-pointer' asChild>
                        <Link href={"/dashboard"}>
                            <LayoutDashboard className='text-foreground size-5' />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='px-4 py-2.5 text-base cursor-pointer' asChild>
                        <Link href={"/inventory"}>
                            <Package className='text-foreground size-5' />
                            <span>Inventory</span>
                        </Link>
                    </DropdownMenuItem>

                </DropdownMenuGroup>

                <DropdownMenuSeparator /> */}

                {/* {
                    NAV_LINKS.map((section, index) => {
                        const links = getFilteredFeatures(section.items, userRole);

                        return (
                            <DropdownMenuGroup key={index}>
                                <DropdownMenuLabel >{section.title}</DropdownMenuLabel>
                                {links.map((feature, idx) => (
                                    <li key={idx}>
                                        <DropdownMenuItem className='px-4 py-2.5 text-base cursor-pointer' asChild>
                                            <Link href={feature.link}>
                                                <feature.icon className='text-foreground size-5' />
                                                <span>{feature.title}</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </li>
                                ))
                                }
                            </DropdownMenuGroup>
                        )
                    })
                } */}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



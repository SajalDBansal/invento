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
import { NAV_LINKS } from '@/public/data';
import { getFilteredFeatures } from '@/lib/utils';
import Link from 'next/link';
import { Session } from 'next-auth';
import { Button } from '../ui/button';

type Props = {
    defaultOpen?: boolean
    align?: 'start' | 'center' | 'end',
    session: Session | null
}

export default function MenuDropdown({ defaultOpen, align = 'start', session }: Props) {

    const userRole = session?.user.role ?? "Default";

    return (
        <DropdownMenu defaultOpen={defaultOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' className='size-9.5 flex lg:hidden'>
                    <Menu className="size-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-80' align={align || 'start'}>

                <DropdownMenuGroup>
                    <DropdownMenuItem className='px-4 py-2.5 text-base cursor-pointer' asChild>
                        <Link href={"/dashboard"}>
                            <LayoutDashboard className='text-foreground size-5' />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='px-4 py-2.5 text-base cursor-pointer' asChild>
                        <Link href={"/invertory"}>
                            <Package className='text-foreground size-5' />
                            <span>Inventory</span>
                        </Link>
                    </DropdownMenuItem>

                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {
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
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



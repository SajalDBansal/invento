import {
    UserIcon,
    SettingsIcon,
    UsersIcon,
    CirclePlusIcon,
    Sun,
    Moon,
} from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Session } from 'next-auth'
import Link from 'next/link'
import { getUserInitials } from '@/lib/utils'
import { ModeToggle } from './mode-toggler'
import { Button } from '@/components/ui/button'
import SignOutButton from '@/components/signOut'

type Props = {
    defaultOpen?: boolean
    align?: 'start' | 'center' | 'end',
    session: Session | null,
}

export default function ProfileDropdown({ defaultOpen, align = 'end', session }: Props) {

    const avatarSrc =
        session?.user.image ||
        "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png";

    return (
        <DropdownMenu defaultOpen={defaultOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='size-9.5'>
                    <Avatar className='size-9.5 rounded-md'>
                        <AvatarImage
                            src={avatarSrc}
                            alt={session?.user.name || "User"}
                        />
                        <AvatarFallback>{getUserInitials(session?.user.name)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-80' align={align || 'end'}>
                <DropdownMenuLabel className='items-center px-4 py-2.5 font-normal'>
                    <Link href={"/profile"} className=' flex items-center gap-4'>
                        <div className='relative'>
                            <Avatar className='size-10'>
                                <AvatarImage
                                    src={session?.user.image || 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'}
                                    alt={session?.user.name || "User"}
                                />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span className='ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2' />
                        </div>
                        <div className='flex flex-1 flex-col items-start'>
                            <span className='text-foreground text-lg font-semibold'>
                                {session?.user.name || "User"}
                            </span>
                            <span className='text-muted-foreground text-base'>
                                {session?.user.email || "user@example.com"}
                            </span>
                        </div>
                    </Link>

                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem className='px-4 py-2.5 text-base cursor-pointer' asChild>
                        <Link href={"/profile"}>
                            <UserIcon className='text-foreground size-5' />
                            <span>My Account</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='px-4 py-2.5 text-base cursor-pointer' asChild>
                        <Link href={"/settings"}>
                            <SettingsIcon className='text-foreground size-5' />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                {session?.user.role == "Admin" &&
                    <>
                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuItem className='px-4 py-2.5 text-base cursor-pointer' asChild>
                                <Link href={"/users"}>
                                    <UsersIcon className='text-foreground size-5' />
                                    <span>Manage User</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='px-4 py-2.5 text-base cursor-pointer'>
                                <CirclePlusIcon className='text-foreground size-5' />
                                <span>Sessions</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                    </>
                }

                <DropdownMenuSeparator />
                <ModeToggle
                    trigger={
                        <DropdownMenuItem className='px-4 py-2.5 text-base cursor-pointer flex sm:hidden'>
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span>Toggle theme</span>
                        </DropdownMenuItem>
                    }
                />

                <DropdownMenuSeparator className='flex sm:hidden' />

                <DropdownMenuItem
                    variant='destructive'
                    className='px-4 py-2.5 text-base'
                    asChild
                >
                    <SignOutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

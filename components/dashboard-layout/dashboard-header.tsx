import Link from "next/link";
import { Blocks } from "lucide-react";
import { ModeToggle } from "./mode-toggler";
import ProfileDropdown from "./profile-dropdown";
import MenuDropdown from "./menu-dropdown";
import MenuNavigation from "./menu-navigation";
import { auth } from "@/auth/auth";
import NotificationPopover from "./notification-popover";
import UrlBreadcrumbs from "./url-breadcrum";

export default async function DashboardHeader() {
    const session = await auth();

    return (
        <header className="sticky top-0 z-50">
            {/* TOP BAR */}
            <div className="border-b bg-card">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                        <MenuDropdown session={session} />

                        <Link href="/" className="flex items-center gap-2 mr-6">
                            <Blocks className="size-8" />
                            <span className="hidden text-2xl font-semibold sm:block">
                                Invento
                            </span>
                        </Link>

                        <MenuNavigation session={session} />
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-x-2">
                        <ModeToggle />

                        <NotificationPopover />

                        <ProfileDropdown session={session} />
                    </div>
                </div>
            </div>

            < div className="mx-auto max-w-7xl gap-2 px-4 py-2 sm:px-6" >
                {/* BREADCRUMB */}
                <UrlBreadcrumbs />
            </div >
        </header>
    )
}
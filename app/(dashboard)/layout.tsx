import { auth } from "@/auth/auth";
import DashboardFooter from "@/components/modules/dashboard-layout/dashboard-footer";
import DashboardHeader from "@/components/modules/dashboard-layout/dashboard-header";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Dashboard | Invento",
};

export default async function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="w-full min-h-screen flex flex-col mx-auto bg-gray-200 dark:bg-black">
            {/* header */}
            <DashboardHeader />

            {/* main */}
            <main className="flex flex-1 flex-col">
                <div className="flex flex-1 flex-col gap-2 mx-auto size-full max-w-8xl px-4 py-2 sm:py-6 sm:px-6">
                    {children}
                </div>
            </main>

            {/* footer*/}
            <DashboardFooter />

        </div>
    )
}

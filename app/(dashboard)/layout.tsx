import { auth } from "@/auth/auth";
import DashboardHeader from "@/components/dashboard-layout/dashboard-header";
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
    console.log(session);


    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="w-full min-h-screen flex flex-col mx-auto">
            {/* header */}
            <DashboardHeader />

            {/* main */}
            <main>
                {children}
            </main>

            {/* footer*/}

        </div>
    )
}

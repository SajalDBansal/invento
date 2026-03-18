import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Authentication",
};

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    if (session?.user) {
        redirect("/");
    }

    return children
}

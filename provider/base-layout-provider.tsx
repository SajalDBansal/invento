"use client";
import { SessionProvider } from "next-auth/react";
import * as React from "react"
import { ThemeProvider } from "./theme-provider";

export function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem={false}
                disableTransitionOnChange
                storageKey="invento-theme"
            >
                {children}
            </ThemeProvider>
        </SessionProvider>
    )
}
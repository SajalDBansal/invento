"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

export default function SignOutButton() {
    const handleSignout = async () => {
        await signOut();
    }

    return (
        <Button onClick={handleSignout} className="w-full cursor-pointer" variant={"destructive"}>
            <LogOutIcon className='size-5' />
            <span>Logout</span>
        </Button>
    )

}
import NextAuth, { DefaultSession } from "next-auth"
import { UserRole } from "./types";

declare module "next-auth" {
    // Extend the base User interface
    interface User {
        role?: UserRole | null;
        id: string;
        image?: string | null;
    }

    // Extend the Session interface to include the custom User properties
    interface Session {
        user: {
            role?: UserRole | null;
            image?: string | null;
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    // Extend the JWT interface to store custom data in the token
    interface JWT {
        id: string;
        role?: UserRole | null;
        image?: string | null;
    }
}

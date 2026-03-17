import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    // Extend the base User interface
    interface User {
        role?: string;
        id: string;
        image?: string | null;
    }

    // Extend the Session interface to include the custom User properties
    interface Session {
        user: {
            role?: string;
            image?: string | null;
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    // Extend the JWT interface to store custom data in the token
    interface JWT {
        id: string;
        role?: string;
        image?: string | null;
    }
}

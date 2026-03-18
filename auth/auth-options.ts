import "server-only"

import { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt";
import { getUserByEmail, updateGoogleUserWhileSignin } from "@/prisma/operations/user";
import prisma from "@/lib/prisma";
import { signinZodSchema } from "@/types/zod";
import { UserRole } from "@/types/types"

export const authOptions: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {

                const paresedAuthCredentials = signinZodSchema.safeParse(credentials);

                if (!paresedAuthCredentials.success) return null

                const { email, password } = paresedAuthCredentials.data;

                const user = await getUserByEmail(email);

                if (!user || !user.passwordHash) return null;

                const isValid = await bcrypt.compare(password, user.passwordHash);
                if (!isValid) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role?.name as UserRole,
                    image: user.image
                };
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id as string;
                token.name = user.name as string;
                token.email = user.email as string;
                token.role = user.role as string
                token.image = user.image as string;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user.id = token.id as string;
            session.user.name = token.name as string;
            session.user.email = token.email as string;
            session.user.image = token.image as string;
            session.user.role = token.role as UserRole;
            return session;
        },
        signIn: async ({ account, profile }) => {
            if (account?.provider === "google") {
                return !!profile?.email_verified
            }
            return true
        },
    },
    events: {
        createUser: async ({ user }) => {
            await updateGoogleUserWhileSignin(user.id);
        },
    },
    // pages: {
    //     signIn: "/login",
    // },
}
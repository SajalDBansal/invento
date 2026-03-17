import prisma from "@/lib/prisma";
import { UserRole } from "@/types/types";
import { prismaWrapper } from "@/utils/prisma-wrapper";
import { Select } from "radix-ui";

export const getUserByEmail = async (email: string) => {
    const user = await prismaWrapper(() => prisma.user.findUnique({
        where: { email: email },
        select: { id: true, name: true, email: true, passwordHash: true, role: { select: { name: true } }, image: true }
    }));

    return user;
}

export const createNewUser = async ({ name, email, passwordHash, roleId }:
    { name: string, email: string, passwordHash: string, roleId: string }) => {

    const user = await prismaWrapper(() => prisma.user.create({
        data: {
            name, email, passwordHash, roleId
        }
    }))

    return user;
}
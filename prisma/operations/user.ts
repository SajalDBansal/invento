import prisma from "@/lib/prisma";
import { prismaWrapper } from "@/utils/prisma-wrapper";
import { Select } from "radix-ui";

export const getUserByEmail = async (email: string) => {
    const user = await prismaWrapper(() => prisma.user.findUnique({
        where: { email: email },
        select: {
            id: true,
            name: true,
            email: true,
            passwordHash: true,
            role: { select: { name: true } },
            image: true,
            isActive: true
        }
    }));

    return user;
}

export const createNewUser = async ({ name, email, passwordHash }:
    { name: string, email: string, passwordHash: string }) => {

    const roles = await prismaWrapper(() => prisma.role.findMany({}));

    const role = roles.find((role) => role.name == "Default");

    const user = await prismaWrapper(() => prisma.user.create({
        data: {
            name, email, passwordHash, isActive: false, roleId: role?.id
        }
    }))

    return user;
}

export const updateGoogleUserWhileSignin = async (userId: string) => {
    const roles = await prismaWrapper(() => prisma.role.findMany({}));

    const role = roles.find((role) => role.name == "Default");

    const user = await prismaWrapper(() => prisma.user.update({
        where: { id: userId },
        data: {
            isActive: false, roleId: role?.id
        }
    }))

    return user;
}
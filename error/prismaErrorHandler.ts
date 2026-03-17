// src/errors/prismaErrorHandler.ts

import { Prisma } from "@/lib/generated/prisma/client";
import { AppError } from "./AppError";

export function handlePrismaError(error: unknown): AppError {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002": {
                const fields = (error.meta?.target as string[])?.join(", ");
                return new AppError(
                    409,
                    `${fields || "Field"} already exists`,
                    error.code,
                    error.meta
                );
            }

            case "P2025":
                return new AppError(404, "Record not found", error.code);

            case "P2003":
                return new AppError(400, "Foreign key constraint failed");

            default:
                return new AppError(
                    400,
                    "Database error",
                    error.code,
                    error.meta
                );
        }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        return new AppError(400, "Invalid query");
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
        return new AppError(500, "Database connection failed");
    }

    return new AppError(500, "Internal server error");
}
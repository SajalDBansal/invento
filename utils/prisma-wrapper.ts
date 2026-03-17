// src/utils/prismaWrapper.ts

import { handlePrismaError } from "@/error/prismaErrorHandler";


export async function prismaWrapper<T>(
    operation: () => Promise<T>
): Promise<T> {
    try {
        return await operation();
    } catch (error) {
        throw handlePrismaError(error);
    }
}
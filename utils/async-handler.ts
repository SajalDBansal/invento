// src/utils/asyncHandler.ts

import { AppError } from "@/error/AppError";
import { NextResponse } from "next/server";

export function asyncHandler(
    fn: (req: Request) => Promise<Response>
) {
    return async (req: Request): Promise<Response> => {
        try {
            return await fn(req);
        } catch (error: any) {
            const err = error as AppError;

            return NextResponse.json(
                {
                    success: false,
                    message: err.message || "Internal server error",
                    code: err.code || "ERROR",
                    details: err.details || null,
                },
                { status: err.statusCode || 500 }
            );
        }
    };
}
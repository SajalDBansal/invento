import { AppError } from "@/error/AppError";
import formatZodErrors from "@/error/formatZodError";
import { getUserByEmail } from "@/prisma/operations/user";
import { signinZodSchema } from "@/types/zod";
import { asyncHandler } from "@/utils/async-handler";
import bcrypt from "bcrypt";
import { success } from "zod";

export const POST = asyncHandler(async (req: Request) => {
    const body = await req.json();

    const paresedAuthCredentials = signinZodSchema.safeParse(body);

    if (!paresedAuthCredentials.success) {
        const errors = formatZodErrors(paresedAuthCredentials.error);
        throw new AppError(400, "Validation failed", "VALIDATION_ERROR", errors);
    }

    const { email, password } = paresedAuthCredentials.data;

    const user = await getUserByEmail(email);

    if (!user) throw new AppError(404, "User not exists", "USER_NOT_EXISTS");
    if (!user.passwordHash) throw new AppError(
        400,
        "This account does not support password login",
        "NOT_A_CREDENTIAL_USER"
    );

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new AppError(
        401,
        "Invalid email or password",
        "INVALID_CREDENTIALS"
    );

    return Response.json({
        success: true,
        data: user
    });
})
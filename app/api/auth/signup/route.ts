import bcrypt from "bcrypt";
import config from "@/lib/config";
import { createNewUser, getUserByEmail } from "@/prisma/operations/user";
import { asyncHandler } from "@/utils/async-handler";
import { AppError } from "@/error/AppError";
import formatZodErrors from "@/error/formatZodError";
import { signupZodSchema } from "@/types/zod";

export const POST = asyncHandler(async (req: Request) => {
    const body = await req.json();

    const parsedSignupData = signupZodSchema.safeParse(body);

    if (!parsedSignupData.success) {
        const errors = formatZodErrors(parsedSignupData.error);
        throw new AppError(400, "Validation failed", "VALIDATION_ERROR", errors);
    }

    const { name, email, password, roleId } = parsedSignupData.data;

    const isUserExist = await getUserByEmail(email);
    if (isUserExist) {
        throw new AppError(409, "User already exists", "USER_EXISTS");
    }

    const passwordHash = await bcrypt.hash(password, config.BCRYPT_HASH_SALT);

    const user = await createNewUser({ name, email, passwordHash, roleId });

    return Response.json({
        success: true,
        data: user
    })

})
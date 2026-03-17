import z from "zod";

export const signupZodSchema = z.object({
    name: z.string({ error: "Name field required" }),
    email: z.string({ error: "Email field required" }).email({ error: "Email should be in valid format" }),
    password: z.string({ error: "Password field required" }).min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string({ error: "ConfirmPassword field required" }).min(8),
    roleId: z.string({ error: "Role field required" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Sets the error path to confirmPassword
})

export const signinZodSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});
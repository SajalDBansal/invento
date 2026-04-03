import z from "zod";

export const signupZodSchema = z.object({
    name: z.string({ error: "Name field required" }).min(4, { error: "Atleast 4 letters long" }),
    email: z.string({ error: "Email field required" }).email({ error: "Email should be in valid format" }),
    password: z.string({ error: "Password field required" }).min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string({ error: "ConfirmPassword field required" }).min(8),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Sets the error path to confirmPassword
})

export const signinZodSchema = z.object({
    email: z.string({ error: "Email field required" }).email({ error: "Email should be in valid format" }),
    password: z.string({ error: "Password field required" }).min(8, "Password must be at least 8 characters"),
});

export const resetPasswordZodSchema = z.object({
    email: z.string({ error: "Email field required" }).email({ error: "Email should be in valid format" }),
})

export const editCustomerZodSchema = z.object({
    name: z.string({ error: "Name field required" }).min(4, { error: "Atleast 4 letters long" }),
    email: z.string({ error: "Email field required" }).email({ error: "Email should be in valid format" }),
    contact: z.string({ error: "Contact field required" }).min(10, { error: "Contact should be at least 10 digits" }),
    address: z.string({ error: "Address field required" }).min(10, { error: "Address should be at least 10 characters long" }),
    city: z.string().optional(),
    type: z.enum(["wholesale", "retail", "cash"], { error: "Invalid customer type" }),
    status: z.enum(["active", "inactive", "blocked"], { error: "Invalid customer status" }),
    balance: z.number({ error: "Balance field required" }).min(0, { error: "Balance cannot be negative" }),
    creditLimit: z.number().min(0, { error: "Credit limit cannot be negative" }).optional(),
    GSTN: z.string().optional(),
    assignedTo: z.string().optional(),
});
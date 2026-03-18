'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '../ui/spinner'
import { Controller, useForm } from "react-hook-form"
import z from "zod";
import { resetPasswordZodSchema } from '@/types/zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { toast } from 'sonner'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function ForgotPasswordForm() {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof resetPasswordZodSchema>>({
        resolver: zodResolver(resetPasswordZodSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof resetPasswordZodSchema>) => {
        try {
            setLoading(true);



            toast("If this email exists, a reset link has been sent.");

        } catch (err) {
            toast("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className={`space-y-4  ${loading ? "pointer-events-none opacity-70" : ""}`} onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                {/* Email */}
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-forgot-email">
                                Email*
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-forgot-email"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your Email Address"
                                autoComplete="email"
                                type="email"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Field>
                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading && <Spinner />}
                        {loading ? "Sending Link..." : "Send Reset Link"}
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        asChild
                    >
                        <Link href={"/login"}>
                            <ChevronLeft />
                            Back to Login
                        </Link>
                    </Button>
                </Field>

            </FieldGroup>
        </form>
    )
}

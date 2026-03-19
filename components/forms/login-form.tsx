'use client'

import { useState } from 'react'

import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { signIn } from 'next-auth/react'
import { Spinner } from '@/components/ui/spinner'
import { Controller, useForm } from "react-hook-form"
import z from "zod";
import { signinZodSchema } from '@/types/zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { toast } from 'sonner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof signinZodSchema>>({
        resolver: zodResolver(signinZodSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof signinZodSchema>) => {
        try {
            setLoading(true);

            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const val = await res.json();

            if (!val.success && val.code == "NOT_A_ACTIVE_USER") {
                router.push("/account-inactive");
                return;
            }

            if (!val.success) {
                toast(`${val.message}`);
                return;
            }

            await signIn("credentials", { email: data.email, password: data.password, redirect: true, redirectTo: "/dashboard" });

            toast("Logged in successfully. Redirecting...");

        } catch (err) {
            toast("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const handleGoogleSignIn = async () => {
        setLoadingGoogle(true);
        await signIn("google", { redirectTo: "/" })
        setLoadingGoogle(false);
    }

    return (
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                {/* Email */}
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-login-email">
                                Email*
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-login-email"
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

                {/* Password */}
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <div className='relative'>
                                <FieldLabel htmlFor="form-login-password">
                                    Password*
                                </FieldLabel>
                                <Link href={"/forgot-password"}
                                    className='text-muted-foreground hover:underline absolute inset-y-0 right-0'
                                >
                                    forget password?
                                </Link>

                            </div>

                            <div className="relative">
                                <Input
                                    {...field}
                                    id="form-login-password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="••••••••••••••••"
                                    autoComplete="password"
                                    type={isPasswordVisible ? 'text' : 'password'}
                                />
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    type={"button"}
                                    onClick={() => setIsPasswordVisible(prevState => !prevState)}
                                    className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                                >
                                    {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                                    <span className='sr-only'>{isPasswordVisible ? 'Hide password' : 'Show password'}</span>
                                </Button>

                            </div>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* buttons */}
                <Field>
                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading && <Spinner />}
                        {loading ? "Logging in..." : "Login to Invento"}
                    </Button>

                    <p className='text-muted-foreground text-center'>
                        Don't have an account?{' '}
                        <Link href='/signup' className='text-card-foreground hover:underline'>
                            Sign up instead
                        </Link>
                    </p>

                    <div className='flex items-center gap-4'>
                        <Separator className='flex-1' />
                        <p>or</p>
                        <Separator className='flex-1' />
                    </div>

                    <Button
                        type="button"
                        disabled={loadingGoogle}
                        variant="outline"
                        onClick={handleGoogleSignIn}
                    >
                        {loadingGoogle && <Spinner />}
                        {loadingGoogle ? "Signing In..." : "Sign in with google"}
                    </Button>
                </Field>

            </FieldGroup>
        </form>
    )
}

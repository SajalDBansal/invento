'use client'

import { useState } from 'react'

import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '../ui/separator'
import { signIn } from 'next-auth/react'
import { Spinner } from '../ui/spinner'
import { Controller, useForm } from "react-hook-form"
import z from "zod";
import { signupZodSchema } from '@/types/zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


export default function SignupForm() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof signupZodSchema>>({
        resolver: zodResolver(signupZodSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof signupZodSchema>) => {
        try {
            setLoading(true);

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const val = await res.json();

            if (!val.success) {
                toast(`${val.message}`);
                return;
            }

            toast("User Created Successfully - Heading to Login...");
            router.replace("/login");

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
                {/* Name */}
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-register-name">
                                Name*
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-register-name"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your full name"
                                autoComplete="off"
                                type="text"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Email */}
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-register-email">
                                Email*
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-register-email"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your Email Address"
                                autoComplete="off"
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
                            <FieldLabel htmlFor="form-register-password">
                                Password*
                            </FieldLabel>
                            <div className="relative">
                                <Input
                                    {...field}
                                    id="form-register-password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="••••••••••••••••"
                                    autoComplete="new-password"
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

                {/* Conform Password */}
                <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-register-confirmPassword">
                                Confirm Password*
                            </FieldLabel>
                            <div className='relative'>
                                <Input
                                    {...field}
                                    id="form-register-confirmPassword"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="••••••••••••••••"
                                    autoComplete="new-password"
                                    type={isConfirmPasswordVisible ? 'text' : 'password'}

                                />
                                <Button
                                    variant='ghost'
                                    type={"button"}
                                    size='icon'
                                    onClick={() => setIsConfirmPasswordVisible(prevState => !prevState)}
                                    className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                                >
                                    {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                                    <span className='sr-only'>{isConfirmPasswordVisible ? 'Hide password' : 'Show password'}</span>
                                </Button>

                            </div>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Privacy policy */}
                <div className='flex items-center gap-3'>
                    <Checkbox className='size-6' id='policy'
                        onCheckedChange={(val) => setIsPolicyAccepted(!!val)} />
                    <Label htmlFor='policy'>
                        <span className='text-muted-foreground'>I agree to</span> <a href='#'>privacy policy & terms</a>
                    </Label>
                </div>

                {/* Buttons */}
                <Field>
                    <Button
                        type="submit"
                        disabled={loading || !isPolicyAccepted}
                    >
                        {loading && <Spinner />}
                        {loading ? "Creating account..." : "Create Account"}
                    </Button>

                    <p className='text-muted-foreground text-center'>
                        Already have an account?{' '}
                        <a href='/login' className='text-card-foreground hover:underline'>
                            Sign in instead
                        </a>
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

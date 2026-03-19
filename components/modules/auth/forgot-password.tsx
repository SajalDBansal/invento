import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AuthBackgroundShape from './auth-background'
import Logo from '@/components/logo'
import ForgotPasswordForm from "@/components/forms/forgot-password-form"

export default function ForgetPassword() {

    return (
        <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
            <div className='absolute'>
                <AuthBackgroundShape />
            </div>

            <Card className='z-1 w-full border-none shadow-md sm:max-w-lg'>
                <CardHeader className='gap-6'>
                    <Logo className='gap-3' />

                    <div>
                        <CardTitle className='mb-1.5 text-2xl'>Forgot Password?</CardTitle>
                        <CardDescription className='text-base'>Enter your email and we'll send you instructions to reset your password.</CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Forget Password Form */}
                    <div className='space-y-4'>
                        <ForgotPasswordForm />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

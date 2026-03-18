import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Logo from '../logo'
import AuthBackgroundShape from './auth-background'
import LoginForm from '../forms/login-form'

export default function Login() {

    return (
        <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
            <div className='absolute'>
                <AuthBackgroundShape />
            </div>

            <Card className='z-1 w-full border-none shadow-md sm:max-w-lg'>
                <CardHeader className='gap-6'>
                    <Logo className='gap-3' />

                    <div>
                        <CardTitle className='mb-1.5 text-2xl'>Login to Invento</CardTitle>
                        <CardDescription className='text-base'>Manage your business in style.</CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Login Form */}
                    <div className='space-y-4'>
                        <LoginForm />


                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

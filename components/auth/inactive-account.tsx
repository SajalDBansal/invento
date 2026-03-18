import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Logo from '../logo'
import AuthBackgroundShape from './auth-background'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function InactiveAccount() {

    return (
        <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
            <div className='absolute'>
                <AuthBackgroundShape />
            </div>

            <Card className='z-1 w-full border-none shadow-md sm:max-w-lg'>
                <CardHeader className='gap-6'>
                    <Logo className='gap-3' />

                    <div>
                        <CardTitle className='mb-1.5 text-2xl'>Account Not Active</CardTitle>
                        <CardDescription className='text-base'>Your account hasn’t been activated yet. Please contact your administrator to enable access.</CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className='space-y-4'>
                        <Button asChild className='w-full'>
                            <Link href={"/login"}>
                                <ChevronLeft />
                                Back to Login
                            </Link>
                        </Button>


                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

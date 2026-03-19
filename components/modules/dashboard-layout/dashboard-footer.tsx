import { FacebookIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

export default function DashboardFooter() {

    return (
        <footer>
            <div className='text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6'>
                <p className='text-sm text-balance max-sm:text-center'>
                    {`©${new Date().getFullYear()}`}{' '}
                    <Link href='https://me.sajaldbansal.com' target="_blank" className='text-primary'>
                        SajaDBansal
                    </Link>
                    , Made for better web understanding
                </p>
                <div className='flex items-center gap-5'>
                    <Link href='https://github.com/sajaldbansal'>
                        <GithubIcon className='size-4' />
                    </Link>
                    <Link href='https://www.linkedin.com/in/sajalduttbansal/'>
                        <LinkedinIcon className='size-4' />
                    </Link>
                    <Link href='https://x.com/SAJALDUTTBANSAL'>
                        <TwitterIcon className='size-4' />
                    </Link>
                </div>
            </div>
        </footer>

    )
}
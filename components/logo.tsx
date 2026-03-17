// Util Imports
import { cn } from '@/lib/utils'
import { Blocks } from "lucide-react"

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center gap-2.5', className)}>
            <Blocks className='size-8.5' />
            <span className='text-xl font-semibold'>Invento</span>
        </div>
    )
}

export default Logo

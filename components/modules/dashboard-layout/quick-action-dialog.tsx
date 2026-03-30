import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { QUICK_ACTIONS } from "@/public/data";
import Link from "next/link"

export default function QuickActions() {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <div className="flex justify-center sm:justify-end">
                    <Button variant="default" className="w-full sm:w-auto">
                        Quick Actions
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Quick Actions</DialogTitle>
                    <DialogDescription>Jump quickly to important sections of the app.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                    {QUICK_ACTIONS.map((action) => (
                        <Link key={action.title} href={action.link}>
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <action.icon className="size-4" />
                                {action.title}
                            </Button>
                        </Link>
                    )
                    )}
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}
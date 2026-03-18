import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";

export default function NotificationPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 hover:text-primary transition-all duration-300 group mr-4">
                    <Bell className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs animate-pulse-glow">
                        3
                    </Badge>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="center">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">Notifications</h4>
                        <p className="text-muted-foreground text-sm">
                            Get notified when a new problem is posted
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className=" items-center gap-4">
                            No notifications for now
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
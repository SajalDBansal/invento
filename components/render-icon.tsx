import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

type IconProps = {
    name: string;
    size?: number;
    className?: string;
};

export function RenderIcon({ name, size = 18, className = "" }: IconProps) {
    if (!(name in Icons)) return null;

    const Icon = Icons[name as keyof typeof Icons] as LucideIcon;

    return <Icon size={size} className={className} />;
}
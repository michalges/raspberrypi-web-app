import { Button } from "./ui/button";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export function SidebarButton({
    label,
    pathname,
    currentPath,
    icon: Icon,
    toggle,
}: {
    label: string;
    pathname: string;
    currentPath: string;
    icon: LucideIcon;
    toggle: () => void;
}) {
    return (
        <Button
            asChild
            className="w-full justify-start gap-2"
            variant={pathname === currentPath ? "secondary" : "ghost"}
            onClick={() => {
                if (window.innerWidth < 1024) {
                    toggle();
                }
            }}
        >
            <Link href={currentPath}>
                <Icon className="h-4 w-4" />
                {label}
            </Link>
        </Button>
    );
}

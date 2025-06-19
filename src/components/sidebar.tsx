"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="bg-background w-full space-y-2 border-b p-2 lg:h-full lg:w-72 lg:border-r">
            <Button
                asChild
                className="w-full justify-start"
                variant={pathname === "/" ? "secondary" : "ghost"}
            >
                <Link href="/">Dashboard</Link>
            </Button>
            <Button
                asChild
                className="w-full justify-start"
                variant={pathname === "/cpu" ? "secondary" : "ghost"}
            >
                <Link href="/cpu">CPU</Link>
            </Button>
            <Button
                asChild
                className="w-full justify-start"
                variant={pathname === "/temp" ? "secondary" : "ghost"}
            >
                <Link href="/temp">Temperature</Link>
            </Button>
        </div>
    );
}

"use client";

import { Button } from "./ui/button";
import { useSidebarContext } from "@/contexts/sidebar-context";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const { isOpen } = useSidebarContext();
    const pathname = usePathname();

    return (
        <aside
            className={`bg-background absolute z-50 h-full w-72 origin-left transform space-y-2 overflow-hidden border-r p-2 transition-[translate,width,padding] duration-300 lg:relative lg:translate-x-0 ${
                isOpen
                    ? "translate-x-0 px-2 lg:w-72 lg:opacity-100"
                    : "-translate-x-full px-0 lg:w-0 lg:opacity-100"
            }`}
        >
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
        </aside>
    );
}

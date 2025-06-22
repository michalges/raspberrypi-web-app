"use client";

import { Button } from "./ui/button";
import { useSidebarContext } from "@/contexts/sidebar-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Sidebar() {
    const { isOpen, toggle } = useSidebarContext();
    const pathname = usePathname();
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        function checkScreen() {
            setIsSmallScreen(window.innerWidth < 1024);
        }
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        let prevWidth = window.innerWidth;
        function handleResize() {
            const currWidth = window.innerWidth;
            if (prevWidth >= 1024 && currWidth < 1024 && isOpen) {
                toggle();
            }
            prevWidth = currWidth;
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isOpen, toggle]);

    return (
        <>
            {isOpen && isSmallScreen && (
                <div className="fixed inset-0 z-10" onClick={toggle} aria-label="Close sidebar" />
            )}
            <aside
                className={`bg-background absolute z-50 h-full w-72 origin-left transform space-y-2 overflow-hidden border-r p-2 transition-[translate,width,padding] duration-300 lg:relative lg:translate-x-0 ${
                    isOpen
                        ? "translate-x-0 px-2 lg:w-72 lg:opacity-100"
                        : "-translate-x-full px-0 lg:w-0 lg:opacity-100"
                }`}
            >
                <SidebarButton
                    label="Dashboard"
                    pathname={pathname}
                    currentPath="/"
                    toggle={toggle}
                />
                <SidebarButton label="CPU" pathname={pathname} currentPath="/cpu" toggle={toggle} />
                <SidebarButton
                    label="Temperature"
                    pathname={pathname}
                    currentPath="/temp"
                    toggle={toggle}
                />
            </aside>
        </>
    );
}

function SidebarButton({
    label,
    pathname,
    currentPath,
    toggle,
}: {
    label: string;
    pathname: string;
    currentPath: string;
    toggle: () => void;
}) {
    return (
        <Button
            asChild
            className="w-full justify-start"
            variant={pathname === currentPath ? "secondary" : "ghost"}
            onClick={() => {
                if (window.innerWidth < 1024) {
                    toggle();
                }
            }}
        >
            <Link href={currentPath}>{label}</Link>
        </Button>
    );
}

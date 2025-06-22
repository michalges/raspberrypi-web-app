"use client";

import { Button } from "./ui/button";
import { useSidebarContext } from "@/contexts/sidebar-context";
import { API_URL } from "@/lib/constants";
import { Cpu, HardDrive, MemoryStick, Thermometer, LayoutGrid } from "lucide-react";
import { LucideIcon } from "lucide-react";
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
                className={`bg-background absolute z-50 flex h-full w-72 origin-left transform flex-col space-y-2 overflow-hidden p-2 transition-[translate,width,padding,border] duration-300 lg:relative lg:translate-x-0 ${
                    isOpen
                        ? "translate-x-0 border-r px-2 lg:w-72 lg:opacity-100"
                        : "-translate-x-full border-none px-0 lg:w-0 lg:opacity-100"
                }`}
            >
                <SidebarButton
                    label="Dashboard"
                    pathname={pathname}
                    currentPath="/"
                    icon={LayoutGrid}
                    toggle={toggle}
                />
                <SidebarButton
                    label="CPU"
                    pathname={pathname}
                    currentPath="/cpu"
                    icon={Cpu}
                    toggle={toggle}
                />
                <SidebarButton
                    label="Temperature"
                    pathname={pathname}
                    currentPath="/temp"
                    icon={Thermometer}
                    toggle={toggle}
                />
                <SidebarButton
                    label="Ram"
                    pathname={pathname}
                    currentPath="/ram"
                    icon={MemoryStick}
                    toggle={toggle}
                />
                <SidebarButton
                    label="Storage"
                    pathname={pathname}
                    currentPath="/storage"
                    icon={HardDrive}
                    toggle={toggle}
                />
                <div className="flex-grow"></div>
                <div className="w-full p-2">
                    <span className="text-muted-foreground text-xs whitespace-nowrap">
                        Using data from: {API_URL}
                    </span>
                </div>
            </aside>
        </>
    );
}

function SidebarButton({
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

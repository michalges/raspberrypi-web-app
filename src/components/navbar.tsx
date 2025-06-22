"use client";

import { ThemeSelect } from "./theme-select";
import { Button } from "./ui/button";
import Logo from "@/../public/logo.png";
import { useSidebarContext } from "@/contexts/sidebar-context";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
    const { toggle } = useSidebarContext();
    return (
        <nav className="z-50 flex w-full flex-row justify-between border-b p-4">
            <Link href="/" passHref>
                <div className="flex flex-row items-center space-x-1.5">
                    <Image src={Logo} alt={"Raspberrypi logo"} className="h-6 w-6" />
                    <h1 className="text-xl font-semibold">Raspberry Pi</h1>
                </div>
            </Link>

            <div className="space-x-4">
                <ThemeSelect></ThemeSelect>
                <Button variant="outline" size="icon" onClick={toggle}>
                    <Menu className="h-2 w-2" />
                </Button>
            </div>
        </nav>
    );
}

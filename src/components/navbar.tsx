"use client";

import { ThemeSelect } from "./theme-select";
import { Button } from "./ui/button";
import { useSidebarContext } from "@/contexts/sidebar-context";
import { Menu } from "lucide-react";
import Image from "next/image";

export function Navbar() {
    const { toggle } = useSidebarContext();
    return (
        <nav className="flex w-full flex-row justify-between border-b p-2 lg:p-4">
            <div className="flex flex-row items-center justify-center space-x-1.5">
                <Image
                    width={64}
                    height={64}
                    alt={"logo"}
                    src={"/logo.png"}
                    className="h-6 w-6"
                ></Image>
                <h1 className="text-xl font-semibold">Raspberry Pi</h1>
            </div>

            <div className="space-x-2 lg:space-x-4">
                <ThemeSelect></ThemeSelect>
                <Button variant="outline" size="icon" onClick={toggle}>
                    <Menu className="h-2 w-2" />
                </Button>
            </div>
        </nav>
    );
}

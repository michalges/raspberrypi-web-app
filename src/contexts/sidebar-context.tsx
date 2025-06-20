"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext<{ isOpen: boolean; toggle: () => void }>({
    isOpen: true,
    toggle: () => {},
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        setIsOpen(mediaQuery.matches);
    }, []);

    const toggle = () => setIsOpen((prev) => !prev);

    return <SidebarContext.Provider value={{ isOpen, toggle }}>{children}</SidebarContext.Provider>;
};

export const useSidebarContext = () => useContext(SidebarContext);

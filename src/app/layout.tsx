import "./globals.css";
import { AppThemeProvider } from "./theme-provider";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/contexts/sidebar-context";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Raspberry Pi",
    description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <AppThemeProvider>
                    <SidebarProvider>
                        <div className="flex h-screen w-full flex-col">
                            <Navbar />
                            <div className="relative flex flex-grow flex-row overflow-hidden">
                                <Sidebar />
                                <div className="flex flex-1 flex-col overflow-y-auto">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </SidebarProvider>
                </AppThemeProvider>
            </body>
        </html>
    );
}

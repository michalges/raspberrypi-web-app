"use client";

import { CpuCoresChart } from "@/components/cpu-cores-chart";
import { StatCard } from "@/components/stat-card";
import { Progress } from "@/components/ui/progress";
import type { CpuStats } from "@/lib/types";
import { Cpu, HardDrive, MemoryStick, Thermometer, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
    const [cpuStats, setCpuStats] = useState<CpuStats | null>(null);

    useEffect(() => {
        async function fetchCpuStats() {
            try {
                const res = await fetch("/api/cpu-stats");
                const data = await res.json();
                setCpuStats(data);
            } catch {
                setCpuStats(null);
            }
        }

        fetchCpuStats();
        const interval = setInterval(fetchCpuStats, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex h-full w-full flex-col space-y-2 p-2">
            <StatCard
                icon={Cpu}
                label="CPU usage (total)"
                value={cpuStats ? +cpuStats.cpu_load : 0}
                unit="%"
            />
            <div className="flex w-full flex-grow flex-col rounded-md border p-2 shadow-sm">
                <h3 className="mb-4 p-4 text-xl font-semibold">CPU Cores</h3>
                <div className="h-[500px] w-[1000px]">
                    {cpuStats ? <CpuCoresChart stats={cpuStats} /> : <span>loading</span>}
                </div>
            </div>
        </div>
    );
}

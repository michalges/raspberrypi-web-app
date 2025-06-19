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
            <div className="w-[1000px] flex-grow rounded-md border p-2 shadow-sm">
                {cpuStats ? <CpuCoresChart stats={cpuStats} /> : <span>loading</span>}
            </div>
        </div>
    );
}

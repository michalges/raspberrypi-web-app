"use client";

import { StatCard } from "@/components/stat-card";
import type { SystemStats } from "@/lib/types";
import { Cpu, HardDrive, MemoryStick, Thermometer } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
    const [systemStats, setSystemStats] = useState<SystemStats | null>(null);

    useEffect(() => {
        async function fetchSystemStats() {
            try {
                const res = await fetch("/api/system-stats");
                const data = await res.json();
                setSystemStats(data);
            } catch {
                setSystemStats(null);
            }
        }

        fetchSystemStats();
        const interval = setInterval(fetchSystemStats, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex h-full w-full flex-col space-y-2 p-2">
            <StatCard
                icon={Cpu}
                label="CPU usage"
                value={systemStats ? +systemStats.cpu_load.toFixed(2) : 0}
                unit="%"
            />
            <StatCard
                icon={Thermometer}
                label="Temperature"
                value={systemStats ? +systemStats.temperature.toFixed(2) : 0}
                unit="°C"
            />
            <StatCard
                icon={MemoryStick}
                label="RAM"
                value={systemStats ? +systemStats.ram_used.toFixed(2) : 0}
                maxValue={systemStats ? +systemStats.ram_total.toFixed(2) : 0}
                unit=" MB"
            />
            <StatCard
                icon={HardDrive}
                label="Storage"
                value={systemStats ? +systemStats.storage_used.toFixed(2) : 0}
                maxValue={systemStats ? +systemStats.storage_total.toFixed(2) : 0}
                unit=" GB"
            />
        </div>
    );
}

"use client";

import { StatCard } from "@/components/stat-card";
import type { SystemStats } from "@/lib/types";
import { Cpu, HardDrive, MemoryStick, Thermometer } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
    const [hostname, setHostname] = useState<string | null>(null);
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

    useEffect(() => {
        async function fetchHostname() {
            try {
                const res = await fetch("/api/hostname");
                const data = await res.json();
                setHostname(data);
            } catch {
                setHostname(null);
            }
        }

        fetchHostname();
    }, []);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-2 p-2">
            <div className="w-full space-y-18 p-4 lg:-mt-32 lg:w-auto">
                {hostname ? (
                    <div className="flex flex-col space-y-2">
                        <span className="text-muted-foreground text-sm">
                            Pomyślnie nawiązano połączenie
                        </span>
                        <h2 className="text-2xl font-semibold lg:text-6xl">{hostname}</h2>
                    </div>
                ) : (
                    <span className="text-muted-foreground text-sm">IP nieznane</span>
                )}
                <div className="grid w-full grid-cols-1 gap-4 lg:w-max lg:grid-cols-2">
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
            </div>
        </div>
    );
}

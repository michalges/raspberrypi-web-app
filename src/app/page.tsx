"use client";

import { StatCard } from "@/components/stat-card";
import type { SystemStats } from "@/lib/types";
import { Cpu, HardDrive, MemoryStick, Thermometer } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
    const [deviceTreeModel, setDeviceTreeModel] = useState<string | null>(null);
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
        async function fetchDeviceTreeModel() {
            try {
                const res = await fetch("/api/device-tree-model");
                const data = await res.json();
                setDeviceTreeModel(data.model ?? null);
            } catch {
                setDeviceTreeModel(null);
            }
        }

        fetchDeviceTreeModel();
    }, []);

    return (
        <div className="flex h-full w-full flex-col space-y-2 p-2 lg:items-center lg:justify-center">
            <div className="mt-12 w-full space-y-18 p-4 lg:-mt-32 lg:w-auto">
                <div className="flex flex-col space-y-2">
                    <span className="text-muted-foreground text-xs">
                        {deviceTreeModel
                            ? "Pomyślnie nawiązano połączenie"
                            : "Nie udało się odczytać modelu urządzenia"}
                    </span>
                    <h2 className="text-3xl font-semibold lg:text-6xl">
                        {deviceTreeModel ? deviceTreeModel : "Nieznany model"}
                    </h2>
                </div>

                <div className="grid w-full grid-cols-1 gap-4 lg:w-max lg:grid-cols-2">
                    <StatCard
                        icon={Cpu}
                        label="CPU usage"
                        value={systemStats ? +systemStats.cpuLoad.toFixed(2) : 0}
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
                        value={systemStats ? +systemStats.ramUsed.toFixed(2) : 0}
                        maxValue={systemStats ? +systemStats.ramTotal.toFixed(2) : 0}
                        unit=" MB"
                    />
                    <StatCard
                        icon={HardDrive}
                        label="Storage"
                        value={systemStats ? +systemStats.storageUsed.toFixed(2) : 0}
                        maxValue={systemStats ? +systemStats.storageTotal.toFixed(2) : 0}
                        unit=" GB"
                    />
                </div>
            </div>
        </div>
    );
}

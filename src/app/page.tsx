"use client";

import { StatCard } from "@/components/stat-card";
import { API_URL, FETCH_INTERVAL } from "@/lib/constants";
import type { DeviceInfo, SystemStats } from "@/lib/types";
import { Cpu, HardDrive, MemoryStick, Thermometer } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>({
        model: "Loading...",
        revision: null,
    });
    const [systemStats, setSystemStats] = useState<SystemStats | null>(null);

    useEffect(() => {
        async function fetchSystemStats() {
            try {
                const res = await fetch(`${API_URL}/system-stats`);
                const data: SystemStats = await res.json();
                setSystemStats(data);
            } catch {
                setSystemStats(null);
            }
        }

        fetchSystemStats();
        const interval = setInterval(fetchSystemStats, FETCH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        async function fetchDeviceInfo() {
            try {
                const res = await fetch(`${API_URL}/device`);
                const data = await res.json();
                setDeviceInfo({
                    revision: data.revision ?? null,
                    model: data.model ?? "Unknown model",
                });
            } catch {
                setDeviceInfo(null);
            }
        }

        fetchDeviceInfo();
    }, []);

    return (
        <div className="flex h-full w-full flex-col space-y-2 p-2 lg:items-center lg:justify-center">
            <div className="mt-12 w-full space-y-18 p-4 pb-12 lg:-mt-32 lg:w-auto lg:pb-4">
                <div className="flex flex-col space-y-2">
                    <span className="text-muted-foreground text-xs">
                        {deviceInfo?.revision
                            ? "Successfully connected"
                            : "Unknown or unsupported model / no successful connection"}
                    </span>
                    <h2 className="text-3xl font-semibold lg:text-5xl">
                        {deviceInfo?.model ?? "Unknown model"}
                    </h2>
                </div>

                <div className="grid w-full grid-cols-1 gap-4 lg:w-max lg:grid-cols-2">
                    <StatCard
                        className="lg:order-1"
                        icon={Cpu}
                        label="CPU usage"
                        href="/cpu"
                        value={systemStats ? +systemStats.cpuUsage : 0}
                        unit="%"
                    />
                    <StatCard
                        className="lg:order-3"
                        icon={Thermometer}
                        label="Temperature"
                        href="/temp"
                        value={systemStats ? +systemStats.temp : 0}
                        unit="°C"
                    />
                    <StatCard
                        className="lg:order-2"
                        icon={MemoryStick}
                        label="RAM"
                        href="/ram"
                        value={systemStats ? +systemStats.ramUsed : 0}
                        maxValue={systemStats ? +systemStats.ramTotal : 0}
                        unit="MB"
                    />
                    <StatCard
                        className="lg:order-4"
                        icon={HardDrive}
                        label="Storage"
                        href="/storage"
                        value={systemStats ? +systemStats.storageUsed : 0}
                        maxValue={systemStats ? +systemStats.storageTotal : 0}
                        unit="GB"
                    />
                </div>
            </div>
        </div>
    );
}

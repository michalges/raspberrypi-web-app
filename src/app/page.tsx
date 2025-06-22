"use client";

import { StatCard } from "@/components/stat-card";
import { API_URL, FETCH_INTERVAL } from "@/lib/constants";
import type { SystemStats } from "@/lib/types";
import { Cpu, HardDrive, MemoryStick, Thermometer } from "lucide-react";
import { useEffect, useState } from "react";

export interface DeviceInfo {
    revision: string | null;
    model: string;
}

export default function Page() {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
    const [systemStats, setSystemStats] = useState<SystemStats | null>(null);

    useEffect(() => {
        async function fetchSystemStats() {
            try {
                const [cpuRes, tempRes, ramRes, storageRes] = await Promise.all([
                    fetch(`${API_URL}/cpu`),
                    fetch(`${API_URL}/temp`),
                    fetch(`${API_URL}/ram`),
                    fetch(`${API_URL}/storage`),
                ]);
                const [cpuData, tempData, ramData, storageData] = await Promise.all([
                    cpuRes.json(),
                    tempRes.json(),
                    ramRes.json(),
                    storageRes.json(),
                ]);
                setSystemStats({
                    cpuUsage: cpuData.cpu_usage ?? 0,
                    temperature: tempData.temperature ?? 0,
                    ramUsed: ramData.ram_used ?? 0,
                    ramTotal: ramData.ram_total ?? 0,
                    storageUsed: storageData.storage_used ?? 0,
                    storageTotal: storageData.storage_total ?? 0,
                });
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
                    model: data.model ?? "Nieznany model",
                });
            } catch {
                setDeviceInfo(null);
            }
        }

        fetchDeviceInfo();
    }, []);

    return (
        <div className="flex h-full w-full flex-col space-y-2 p-2 lg:items-center lg:justify-center">
            <div className="mt-12 w-full space-y-18 p-4 lg:-mt-32 lg:w-auto">
                <div className="flex flex-col space-y-2">
                    <span className="text-muted-foreground text-xs">
                        {deviceInfo?.revision
                            ? "Successfully connected"
                            : "Unknown or unsupported model / no successful connection"}
                    </span>
                    <h2 className="text-3xl font-semibold lg:text-6xl">
                        {deviceInfo?.model ?? "Unknown model"}
                    </h2>
                </div>

                <div className="grid w-full grid-cols-1 gap-4 lg:w-max lg:grid-cols-2">
                    <StatCard
                        icon={Cpu}
                        label="CPU usage"
                        value={systemStats ? +systemStats.cpuUsage.toFixed(2) : 0}
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

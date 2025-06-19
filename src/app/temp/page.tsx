"use client";

import { StatCard } from "@/components/stat-card";
import { TemperatureChart } from "@/components/temperature-chart";
import type { TempStats } from "@/lib/types";
import { Thermometer } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
    const [tempHistory, setTempHistory] = useState<TempStats[]>([]);

    useEffect(() => {
        async function fetchTempStats() {
            try {
                const res = await fetch("/api/temp-stats");
                const data: TempStats = await res.json();
                setTempHistory((prev) => {
                    const updated = [...prev, data];
                    return updated.length > 100 ? updated.slice(-100) : updated;
                });
            } catch {
                console.warn("Failed to fetch temperature stats");
            }
        }

        fetchTempStats();
        const interval = setInterval(fetchTempStats, 1000);
        return () => clearInterval(interval);
    }, []);

    const latest = tempHistory.at(-1);

    return (
        <div className="flex h-full w-full flex-col space-y-2 p-2">
            <StatCard
                icon={Thermometer}
                label="Temperature (current)"
                value={latest ? +latest.temperature.toFixed(2) : 0}
                unit="°C"
            />
            <div className="flex h-full w-full flex-col rounded-md border p-2 shadow-sm lg:h-min lg:w-min">
                <h3 className="mb-4 p-4 text-xl font-semibold">Temperature</h3>
                <div className="h-full w-full lg:h-[300px] lg:w-[750px]">
                    <TemperatureChart data={tempHistory} />
                </div>
            </div>
        </div>
    );
}

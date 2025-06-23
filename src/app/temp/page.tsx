"use client";

import { Chart } from "@/components/chart";
import { StatCard } from "@/components/stat-card";
import { API_URL, FETCH_INTERVAL } from "@/lib/constants";
import type { ChartData, TempStats } from "@/lib/types";
import { Thermometer } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
    const [tempStats, setTempStats] = useState<TempStats[] | null>(null);

    useEffect(() => {
        async function fetchTempStats() {
            try {
                const res = await fetch(`${API_URL}/temp/history`);
                const data: TempStats[] = await res.json();
                setTempStats(data);
            } catch {
                setTempStats(null);
            }
        }

        fetchTempStats();
        const interval = setInterval(fetchTempStats, FETCH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    const chartData: ChartData[] =
        tempStats?.map((dataPoint) => ({
            timestamp: dataPoint.timestamp,
            value: dataPoint.temp,
        })) || [];

    return (
        <div className="flex h-full w-full flex-col space-y-2 overflow-hidden p-2">
            <StatCard
                icon={Thermometer}
                label="Temperature"
                value={tempStats && tempStats.length > 0 ? tempStats[tempStats.length - 1].temp : 0}
                unit="°C"
            />
            <div className="flex w-full flex-1 flex-col overflow-hidden rounded-md border shadow-sm">
                <h3 className="flex-shrink-0 p-4 text-xl font-semibold">Temperature history</h3>
                <div className="min-h-0 w-full flex-1 p-2">
                    {chartData && chartData.length > 0 ? (
                        <Chart data={chartData} />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <p className="text-muted-foreground/50 text-center">
                                No data available
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

"use client";

import { Chart } from "@/components/chart";
import { StatCard } from "@/components/stat-card";
import { API_URL } from "@/lib/constants";
import type { ChartData, TempStats } from "@/lib/types";
import { Thermometer } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
    const [tempStats, setTempStats] = useState<TempStats[] | null>(null);

    useEffect(() => {
        async function fetchTempStats() {
            try {
                const res = await fetch(`${API_URL}/temp/history`);
                const data = await res.json();
                const mappedData: TempStats[] = data.map(
                    (item: { timestamp: string; temp: number }) => ({
                        timestamp: item.timestamp,
                        tempUsage: item.temp,
                    }),
                );
                setTempStats(mappedData);
            } catch {
                setTempStats(null);
            }
        }

        fetchTempStats();
        const interval = setInterval(fetchTempStats, 3000);
        return () => clearInterval(interval);
    }, []);

    const chartData: ChartData[] =
        tempStats?.map((dataPoint) => ({
            timestamp: dataPoint.timestamp,
            value: dataPoint.temp,
        })) || [];

    return (
        <div className="flex h-full w-full flex-col space-y-2 p-2">
            <StatCard
                icon={Thermometer}
                label="Temperature (current)"
                value={tempStats && tempStats.length > 0 ? tempStats[tempStats.length - 1].temp : 0}
                unit="%"
            />
            <div className="flex h-full w-full flex-col rounded-md border p-2 shadow-sm lg:h-min lg:w-min">
                <h3 className="mb-4 p-4 text-xl font-semibold">Temperature history</h3>
                <div className="h-full w-full lg:h-[300px] lg:w-[750px]">
                    {chartData && chartData.length > 0 ? (
                        <Chart data={chartData} />
                    ) : (
                        <p className="text-muted-foreground/50 h-full w-full text-center">
                            No data available
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

"use client";

import { Chart } from "@/components/chart";
import { StatCard } from "@/components/stat-card";
import { API_URL, FETCH_INTERVAL } from "@/lib/constants";
import type { ChartData, RamStats } from "@/lib/types";
import { MemoryStick } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
    const [ramStats, setRamStats] = useState<RamStats[] | null>(null);

    useEffect(() => {
        async function fetchRamStats() {
            try {
                const res = await fetch(`${API_URL}/ram/history`);
                const data: RamStats[] = await res.json();
                setRamStats(data);
            } catch {
                setRamStats(null);
            }
        }

        fetchRamStats();
        const interval = setInterval(fetchRamStats, FETCH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    const chartData: ChartData[] =
        ramStats?.map((dataPoint) => ({
            timestamp: dataPoint.timestamp,
            value: dataPoint.ramUsed,
        })) || [];

    return (
        <div className="flex h-full w-full flex-col space-y-2 overflow-hidden p-2">
            <StatCard
                icon={MemoryStick}
                label="RAM"
                value={ramStats ? ramStats[ramStats.length - 1].ramUsed : 0}
                maxValue={ramStats ? ramStats[ramStats.length - 1].ramTotal : 0}
                unit={ramStats ? ramStats[ramStats.length - 1].ramUnit : "MB"}
            />
            <div className="flex w-full flex-1 flex-col overflow-hidden rounded-md border shadow-sm">
                <h3 className="flex-shrink-0 p-4 text-xl font-semibold">RAM usage</h3>
                <div className="min-h-0 w-full flex-1 p-2">
                    {chartData && chartData.length > 0 ? (
                        <Chart
                            data={chartData}
                            maxValue={ramStats ? ramStats[ramStats.length - 1].ramTotal : 0}
                        />
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

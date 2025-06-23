"use client";

import { Chart } from "@/components/chart";
import { StatCard } from "@/components/stat-card";
import { API_URL, FETCH_INTERVAL } from "@/lib/constants";
import type { ChartData, CpuStats } from "@/lib/types";
import { Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
    const [cpuStats, setCpuStats] = useState<CpuStats[] | null>(null);

    useEffect(() => {
        async function fetchCpuStats() {
            try {
                const res = await fetch(`${API_URL}/cpu/history`);
                const data: CpuStats[] = await res.json();
                setCpuStats(data);
            } catch {
                setCpuStats(null);
            }
        }

        fetchCpuStats();
        const interval = setInterval(fetchCpuStats, FETCH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    const chartData: ChartData[] =
        cpuStats?.map((dataPoint) => ({
            timestamp: dataPoint.timestamp,
            value: dataPoint.cpuUsage,
        })) || [];

    return (
        <div className="flex h-full w-full flex-col space-y-2 overflow-hidden p-2">
            <StatCard
                icon={Cpu}
                label="CPU usage"
                value={cpuStats ? cpuStats[cpuStats.length - 1].cpuUsage : 0}
                unit="%"
            />
            <div className="flex w-full flex-1 flex-col overflow-hidden rounded-md border shadow-sm">
                <h3 className="flex-shrink-0 p-4 text-xl font-semibold">CPU usage history</h3>
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

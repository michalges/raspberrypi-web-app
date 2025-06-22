"use client";

import { Chart } from "@/components/chart";
import { StatCard } from "@/components/stat-card";
import { API_URL } from "@/lib/constants";
import type { ChartData, CpuStats } from "@/lib/types";
import { Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
    const [cpuStats, setCpuStats] = useState<CpuStats[] | null>(null);

    useEffect(() => {
        async function fetchCpuStats() {
            try {
                const res = await fetch(`${API_URL}/cpu/history`);
                const data = await res.json();
                const mappedData: CpuStats[] = data.map(
                    (item: { timestamp: string; cpu_usage: number }) => ({
                        timestamp: item.timestamp,
                        cpuUsage: item.cpu_usage,
                    }),
                );
                setCpuStats(mappedData);
            } catch {
                setCpuStats(null);
            }
        }

        fetchCpuStats();
        const interval = setInterval(fetchCpuStats, 3000);
        return () => clearInterval(interval);
    }, []);

    const chartData: ChartData[] =
        cpuStats?.map((dataPoint) => ({
            timestamp: dataPoint.timestamp,
            value: dataPoint.cpuUsage,
        })) || [];

    return (
        <div className="flex h-full w-full flex-col space-y-2 p-2">
            <StatCard
                icon={Cpu}
                label="CPU usage (total)"
                value={cpuStats ? cpuStats[cpuStats.length - 1].cpuUsage : 0}
                unit="%"
            />
            <div className="flex h-full w-full flex-col rounded-md border p-2 shadow-sm lg:h-min lg:w-min">
                <h3 className="mb-4 p-4 text-xl font-semibold">CPU usage history</h3>
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

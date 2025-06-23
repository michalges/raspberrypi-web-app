"use client";

import { Chart } from "@/components/chart";
import { StatCard } from "@/components/stat-card";
import { API_URL, FETCH_INTERVAL } from "@/lib/constants";
import type { ChartData, StorageStats } from "@/lib/types";
import { HardDrive } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
    const [storageStats, setStorageStats] = useState<StorageStats[] | null>(null);

    useEffect(() => {
        async function fetchStorageStats() {
            try {
                const res = await fetch(`${API_URL}/storage/history`);
                const data: StorageStats[] = await res.json();
                setStorageStats(data);
            } catch {
                setStorageStats(null);
            }
        }

        fetchStorageStats();
        const interval = setInterval(fetchStorageStats, FETCH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    const chartData: ChartData[] =
        storageStats?.map((dataPoint) => ({
            timestamp: dataPoint.timestamp,
            value: dataPoint.storageUsed,
        })) || [];

    return (
        <div className="flex h-full w-full flex-col space-y-2 overflow-hidden p-2">
            <StatCard
                icon={HardDrive}
                label="Storage"
                value={storageStats ? storageStats[storageStats.length - 1].storageUsed : 0}
                maxValue={storageStats ? storageStats[storageStats.length - 1].storageTotal : 0}
                unit={storageStats ? storageStats[storageStats.length - 1].storageUnit : "GB"}
            />
            <div className="flex w-full flex-1 flex-col overflow-hidden rounded-md border shadow-sm">
                <h3 className="flex-shrink-0 p-4 text-xl font-semibold">Storage usage</h3>
                <div className="min-h-0 w-full flex-1 p-2">
                    {chartData && chartData.length > 0 ? (
                        <Chart
                            data={chartData}
                            maxValue={
                                storageStats
                                    ? storageStats[storageStats.length - 1].storageTotal
                                    : 0
                            }
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

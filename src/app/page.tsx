"use client";

import { Progress } from "@/components/ui/progress";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { SystemStats } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
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

    return (
        <div className="flex h-full w-full justify-center p-2">
            <div className="mt-8 w-96 space-y-4 md:mt-32">
                <h1 className="w-full text-center text-2xl font-semibold">Raspberry Pi</h1>
                <div className="space-y-2">
                    <StatsListItem
                        label="CPU usage"
                        value={systemStats ? +(systemStats.cpu_load * 100).toFixed(2) : 0}
                    />
                    <StatsListItem
                        label="Temperature"
                        value={systemStats ? +systemStats.temperature.toFixed(2) : 0}
                    />
                </div>
            </div>
        </div>
    );
}

function StatsListItem({ label, value }: { label: string; value: number }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row items-center space-x-2">
                    <Progress value={value} />
                    <span>{value}</span>
                </div>
            </CardContent>
        </Card>
    );
}

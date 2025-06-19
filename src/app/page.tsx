"use client";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SystemStats } from "@/lib/types";
import { Cpu, HardDrive, MemoryStick, Thermometer, type LucideIcon } from "lucide-react";
import Image from "next/image";
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
        <div className="flex h-full w-full justify-center">
            <div className="w-96 space-y-4 p-2 md:mt-8">
                <div className="flex w-full flex-row items-center justify-center space-x-1.5 py-4">
                    <Image
                        width={64}
                        height={64}
                        alt={"logo"}
                        src={"/logo.png"}
                        className="h-10 w-10"
                    ></Image>
                    <h1 className="text-3xl font-semibold">Raspberry Pi</h1>
                </div>
                <div className="space-y-2">
                    <StatsListItem
                        icon={Cpu}
                        label="CPU usage"
                        value={systemStats ? +(systemStats.cpu_load * 100).toFixed(2) : 0}
                        unit="%"
                    />
                    <StatsListItem
                        icon={Thermometer}
                        label="Temperature"
                        value={systemStats ? +systemStats.temperature.toFixed(2) : 0}
                        unit="°C"
                    />
                    <StatsListItem
                        icon={MemoryStick}
                        label="RAM"
                        value={systemStats ? +systemStats.ram_used.toFixed(2) : 0}
                        maxValue={systemStats ? +systemStats.ram_total.toFixed(2) : 0}
                        unit=" MB"
                    />
                    <StatsListItem
                        icon={HardDrive}
                        label="Storage"
                        value={systemStats ? +systemStats.storage_used.toFixed(2) : 0}
                        maxValue={systemStats ? +systemStats.storage_total.toFixed(2) : 0}
                        unit=" GB"
                    />
                </div>
            </div>
        </div>
    );
}

function StatsListItem({
    icon,
    label,
    value,
    maxValue,
    unit,
}: {
    icon: LucideIcon;
    label: string;
    value: number;
    maxValue?: number;
    unit?: string;
}) {
    const progressValue = maxValue ? (value / maxValue) * 100 : value;
    const valueString = maxValue ? `${value}${unit} / ${maxValue}${unit}` : `${value}${unit}`;
    const Icon = icon;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex flex-row items-center gap-x-1">
                    <Icon className="w-4" />
                    {label}
                </CardTitle>
                <CardDescription>
                    <span>{valueString}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={progressValue} />
            </CardContent>
        </Card>
    );
}

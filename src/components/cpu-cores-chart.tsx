"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import type { CpuStats } from "@/lib/types";
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ResponsiveContainer } from "recharts";

const chartConfig = {
    usage: {
        label: "CPU Usage (%)",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

export function CpuCoresChart({ stats, className }: { stats: CpuStats; className?: string }) {
    const chartData = stats.cpu_cores.map((core) => ({
        core: `Core ${core.core_id}`,
        usage: core.usage,
    }));

    return (
        <ChartContainer
            config={chartConfig}
            className={`h-full w-full ${className ? ` ${className}` : ""}`}
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="core" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="usage" fill="var(--primary)" radius={4} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}

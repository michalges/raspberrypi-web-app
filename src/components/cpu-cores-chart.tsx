"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import type { CpuStats } from "@/lib/types";
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";

const chartConfig = {
    usage: {
        label: "CPU Usage (%)",
        color: "var(--primary)", // Use CSS variable for primary color
    },
} satisfies ChartConfig;

export function CpuCoresChart({ stats }: { stats: CpuStats }) {
    const chartData = stats.cpu_cores.map((core) => ({
        core: `Core ${core.core_id}`,
        usage: core.usage,
    }));

    return (
        <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart data={chartData}>
                <XAxis dataKey="core" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="usage" fill="var(--primary)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}

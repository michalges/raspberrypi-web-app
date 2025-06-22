"use client";

import { ChartTooltip } from "./chart-tooltip";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import type { ChartData } from "@/lib/types";
import {
    Line,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const chartConfig = {
    value: {
        label: "Value",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

export function Chart({
    data,
    minValue = 0,
    maxValue = 100,
    className,
}: {
    data: ChartData[];
    minValue?: number;
    maxValue?: number;
    className?: string;
}) {
    const chartData = data.map((dataPoint) => ({
        time: new Date(dataPoint.timestamp * 1000).toLocaleTimeString(),
        value: dataPoint.value,
    }));

    return (
        <ChartContainer config={chartConfig} className={`h-full w-full ${className}`}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis
                        domain={[minValue, maxValue]}
                        ticks={
                            minValue === 0 && maxValue === 100
                                ? Array.from({ length: 11 }, (_, i) => i * 10)
                                : undefined
                        }
                    />

                    <Tooltip content={<ChartTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}

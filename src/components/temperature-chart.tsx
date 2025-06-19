"use client";

import { ChartContainer, ChartConfig } from "@/components/ui/chart";
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
    temperature: {
        label: "Temperature (°C)",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

export function TemperatureChart({
    data,
    className,
}: {
    data: { time: number; temperature: number }[];
    className?: string;
}) {
    const chartData = data.map((d) => ({
        time: new Date(d.time * 1000).toLocaleTimeString(),
        temperature: +d.temperature.toFixed(2),
    }));

    return (
        <ChartContainer
            config={chartConfig}
            className={`h-full w-full ${className ? ` ${className}` : ""}`}
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}

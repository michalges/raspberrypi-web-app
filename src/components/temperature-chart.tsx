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

function movingAverage(data: number[], windowSize: number) {
    const averages = [];
    for (let i = 0; i < data.length; i++) {
        const start = Math.max(0, i - windowSize + 1);
        const windowData = data.slice(start, i + 1);
        const avg = windowData.reduce((sum, val) => sum + val, 0) / windowData.length;
        averages.push(avg);
    }
    return averages;
}

export function TemperatureChart({
    data,
    className,
}: {
    data: { time: number; temperature: number }[];
    className?: string;
}) {
    const temperatures = data.map((d) => d.temperature);
    const maTemperatures = movingAverage(temperatures, 5);

    const chartData = data.map((d, i) => ({
        time: new Date(d.time * 1000).toLocaleTimeString(),
        temperature: +maTemperatures[i].toFixed(2),
    }));

    return (
        <ChartContainer
            config={chartConfig}
            className={`h-full w-full${className ? ` ${className}` : ""}`}
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

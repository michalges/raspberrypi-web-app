import { NextResponse } from "next/server";
import { execSync } from "child_process";
import type { SystemStats } from "@/lib/types";

export async function GET() {
    try {
        let cpu_load = 0;
        let temperature = 0;

        try {
            const uptimeOutput = execSync("uptime").toString();
            const loadMatch = uptimeOutput.match(/load average: ([0-9.]+),/);
            cpu_load = loadMatch ? parseFloat(loadMatch[1]) : 0;
        } catch (error) {
            console.warn("Failed to get CPU load:", error);
        }

        try {
            const tempRaw = execSync("cat /sys/class/thermal/thermal_zone0/temp").toString().trim();
            temperature = parseInt(tempRaw, 10) / 1000;
        } catch (error) {
            console.warn("Failed to get temperature (not a Raspberry Pi?):", error);
        }

        const data: SystemStats = {
            cpu_load: Number(cpu_load.toFixed(2)),
            temperature: Number(temperature.toFixed(2)),
        };
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to read system metrics" }, { status: 500 });
    }
}

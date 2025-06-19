import { NextResponse } from "next/server";
import { execSync } from "child_process";
import type { SystemData } from "@/lib/types";

export async function GET() {
    try {
        const uptimeOutput = execSync("uptime").toString();
        const loadMatch = uptimeOutput.match(/load average: ([0-9.]+),/);
        const cpu_load = loadMatch ? parseFloat(loadMatch[1]) : 0;

        const tempRaw = execSync("cat /sys/class/thermal/thermal_zone0/temp")
            .toString()
            .trim();
        const temperature = parseInt(tempRaw, 10) / 1000;

        const data: SystemData = { temperature, cpu_load };
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to read system metrics" },
            { status: 500 },
        );
    }
}

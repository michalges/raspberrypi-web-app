import type { SystemStats } from "@/lib/types";
import { execSync } from "child_process";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        let cpu_load = 0;
        let temperature = 0;
        let ram_used = 0;
        let ram_total = 0;
        let storage_used = 0;
        let storage_total = 0;

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

        try {
            const meminfo = execSync("cat /proc/meminfo").toString();
            const availMatch = meminfo.match(/^MemAvailable:\s+(\d+)/m);
            const totalMatch = meminfo.match(/^MemTotal:\s+(\d+)/m);
            const available = availMatch ? parseInt(availMatch[1], 10) : 0;
            const total = totalMatch ? parseInt(totalMatch[1], 10) : 0;
            ram_used = Math.round((total - available) / 1024);
            ram_total = Math.round(total / 1024);
        } catch (error) {
            console.warn("Failed to get RAM info:", error);
        }

        try {
            const dfOutput = execSync("df -k /").toString();
            const lines = dfOutput.trim().split("\n");
            const parts = lines[1].split(/\s+/);
            const used = parseInt(parts[2], 10);
            const total = parseInt(parts[1], 10);
            storage_used = parseFloat((used / 1024 / 1024).toFixed(2));
            storage_total = parseFloat((total / 1024 / 1024).toFixed(2));
        } catch (error) {
            console.warn("Failed to get storage info:", error);
        }

        const data: SystemStats = {
            cpu_load: Number(cpu_load.toFixed(2)),
            temperature: Number(temperature.toFixed(2)),
            ram_used,
            ram_total,
            storage_used,
            storage_total,
        };

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to read system metrics" }, { status: 500 });
    }
}

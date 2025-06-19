import { getCpuStats } from "@/lib/cpu-stats";
import type { SystemStats } from "@/lib/types";
import { execSync } from "child_process";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const stats: SystemStats = {
            cpu_load: 0,
            temperature: 0,
            ram_used: 0,
            ram_total: 0,
            storage_used: 0,
            storage_total: 0,
        };

        stats.cpu_load = getCpuStats().cpu_load;

        try {
            const tempRaw = execSync("cat /sys/class/thermal/thermal_zone0/temp").toString().trim();
            stats.temperature = parseInt(tempRaw, 10) / 1000;
        } catch (error) {
            console.warn("Failed to get temperature:", error);
        }

        try {
            const meminfo = execSync("cat /proc/meminfo").toString();
            const availMatch = meminfo.match(/^MemAvailable:\s+(\d+)/m);
            const totalMatch = meminfo.match(/^MemTotal:\s+(\d+)/m);
            const available = availMatch ? parseInt(availMatch[1], 10) : 0;
            const total = totalMatch ? parseInt(totalMatch[1], 10) : 0;
            stats.ram_used = Math.round((total - available) / 1024);
            stats.ram_total = Math.round(total / 1024);
        } catch (error) {
            console.warn("Failed to get RAM info:", error);
        }

        try {
            const dfOutput = execSync("df -k /").toString();
            const lines = dfOutput.trim().split("\n");
            const parts = lines[1].split(/\s+/);
            const used = parseInt(parts[2], 10);
            const total = parseInt(parts[1], 10);
            stats.storage_used = parseFloat((used / 1024 / 1024).toFixed(2));
            stats.storage_total = parseInt((total / 1024 / 1024).toFixed(0));
        } catch (error) {
            console.warn("Failed to get storage info:", error);
        }

        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json({ error: "Failed to read system metrics" }, { status: 500 });
    }
}

import type { SystemStats } from "@/lib/types";
import { getCpuStats, getTempStats, getRamStats, getStorageStats } from "@/lib/utils/get-stats";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const stats: SystemStats = {
            cpuLoad: 0,
            temperature: 0,
            ramUsed: 0,
            ramTotal: 0,
            storageUsed: 0,
            storageTotal: 0,
        };

        stats.cpuLoad = getCpuStats().cpuLoad;

        stats.temperature = getTempStats().temperature;

        const ramStats = getRamStats();
        stats.ramUsed = ramStats.ramUsed;
        stats.ramTotal = ramStats.ramTotal;

        const storageStats = getStorageStats();
        stats.storageUsed = storageStats.storageUsed;
        stats.storageTotal = storageStats.storageTotal;

        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json({ error: "Failed to read system metrics" }, { status: 500 });
    }
}

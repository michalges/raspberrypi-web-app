import type { CpuStats, RamStats, StorageStats, TempStats } from "@/lib/types";
import { execSync } from "child_process";

export function getCpuStats(): CpuStats {
    const stats: CpuStats = {
        cpuLoad: 0,
        cpuCores: [],
        time: Date.now(),
    };

    try {
        const output = execSync("mpstat -P ALL").toString();
        const lines = output
            .trim()
            .split("\n")
            .filter((l) => l.includes("all") || /^\s*\d+/.test(l));

        for (let i = 1; i < lines.length; i++) {
            const parts = lines[i].trim().split(/\s+/);
            const coreId = parts[1] === "all" ? -1 : parseInt(parts[1]);
            const idle = parseFloat(parts[parts.length - 1]);
            const usage = parseFloat((100 - idle).toFixed(2));
            if (coreId >= 0) {
                stats.cpuCores.push({ coreId, usage });
            }
        }

        const totalUsage = stats.cpuCores.reduce((sum, core) => sum + core.usage, 0);
        stats.cpuLoad =
            stats.cpuCores.length > 0
                ? parseFloat((totalUsage / stats.cpuCores.length).toFixed(2))
                : 0;
    } catch (error) {
        console.warn("Failed to get CPU stats");
    }

    return stats;
}

export function getTempStats() {
    const stats: TempStats = {
        temperature: 0,
        time: Date.now(),
    };

    try {
        const tempRaw = execSync("cat /sys/class/thermal/thermal_zone0/temp").toString().trim();
        stats.temperature = parseInt(tempRaw, 10) / 1000;
    } catch (error) {
        console.warn("Failed to get temperature");
    }

    return stats;
}

export function getRamStats() {
    const stats: RamStats = {
        ramUsed: 0,
        ramTotal: 0,
        time: Date.now(),
    };

    try {
        const meminfo = execSync("cat /proc/meminfo").toString();
        const availMatch = meminfo.match(/^MemAvailable:\s+(\d+)/m);
        const totalMatch = meminfo.match(/^MemTotal:\s+(\d+)/m);
        const available = availMatch ? parseInt(availMatch[1], 10) : 0;
        const total = totalMatch ? parseInt(totalMatch[1], 10) : 0;
        stats.ramUsed = Math.round((total - available) / 1024);
        stats.ramTotal = Math.round(total / 1024);
    } catch (error) {
        console.warn("Failed to get RAM info");
    }

    return stats;
}

export function getStorageStats() {
    const stats: StorageStats = {
        storageUsed: 0,
        storageTotal: 0,
        time: Date.now(),
    };

    try {
        const dfOutput = execSync("df -k /").toString();
        const lines = dfOutput.trim().split("\n");
        const parts = lines[1].split(/\s+/);
        const used = parseInt(parts[2], 10);
        const total = parseInt(parts[1], 10);
        stats.storageUsed = parseFloat((used / 1024 / 1024).toFixed(2));
        stats.storageTotal = parseInt((total / 1024 / 1024).toFixed(0));
    } catch (error) {
        console.warn("Failed to get storage info");
    }

    return stats;
}

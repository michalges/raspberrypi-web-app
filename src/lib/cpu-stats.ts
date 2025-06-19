import type { CpuStats } from "@/lib/types";
import { execSync } from "child_process";

export function getCpuStats(): CpuStats {
    const stats: CpuStats = {
        cpu_load: 0,
        cpu_cores: [],
    };

    try {
        const output = execSync("mpstat -P ALL").toString();
        const lines = output
            .trim()
            .split("\n")
            .filter((l) => l.includes("all") || /^\s*\d+/.test(l));

        for (let i = 1; i < lines.length; i++) {
            const parts = lines[i].trim().split(/\s+/);
            const core_id = parts[1] === "all" ? -1 : parseInt(parts[1]);
            const idle = parseFloat(parts[parts.length - 1]);
            const usage = parseFloat((100 - idle).toFixed(2));
            if (core_id >= 0) stats.cpu_cores.push({ core_id, usage });
        }

        const totalUsage = stats.cpu_cores.reduce((sum, core) => sum + core.usage, 0);
        stats.cpu_load =
            stats.cpu_cores.length > 0
                ? parseFloat((totalUsage / stats.cpu_cores.length).toFixed(2))
                : 0;
    } catch (error) {
        console.warn("Failed to get CPU stats");
    }

    return stats;
}

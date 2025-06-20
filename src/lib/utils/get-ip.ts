import { execSync } from "child_process";

export function getIp() {
    try {
        const output = execSync("ip -4 -o addr show scope global | awk '{print $4}' | cut -d/ -f1")
            .toString()
            .trim()
            .split("\n");

        const is192 = (ip: string) => ip.startsWith("192.");
        const is172 = (ip: string) => {
            const parts = ip.split(".");
            const first = parseInt(parts[0], 10);
            const second = parseInt(parts[1], 10);
            return first === 172 && second >= 16 && second <= 31;
        };
        const is10 = (ip: string) => ip.startsWith("10.");

        for (const ip of output) {
            if (is192(ip)) return ip;
        }
        for (const ip of output) {
            if (is172(ip)) return ip;
        }
        for (const ip of output) {
            if (is10(ip)) return ip;
        }

        return output[0] || "000.000.0.000";
    } catch {
        return "000.000.0.000";
    }
}

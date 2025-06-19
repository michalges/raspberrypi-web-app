import { execSync } from "child_process";
import { NextResponse } from "next/server";

export async function GET() {
    let ip = "";

    try {
        try {
            const output = execSync(
                "ip -4 -o addr show scope global | awk '{print $4}' | cut -d/ -f1",
            )
                .toString()
                .trim()
                .split("\n")[0];
            const parts = output.split(".");
            parts[0] = "xxx";
            parts[1] = "xxx";
            parts[2] = "x";
            ip = parts.join(".");
        } catch (error) {
            console.warn("Failed to get hostname");
        }

        return NextResponse.json(ip);
    } catch {
        return NextResponse.json({ error: "Failed to read system metrics" }, { status: 500 });
    }
}

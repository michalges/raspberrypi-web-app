import { getCpuStats } from "@/lib/cpu-stats";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const stats = getCpuStats();
        return NextResponse.json(stats);
    } catch {
        return NextResponse.json({ error: "Failed to read system metrics" }, { status: 500 });
    }
}

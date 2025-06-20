import { getCpuStats } from "@/lib/utils/get-stats";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const stats = getCpuStats();
        return NextResponse.json(stats);
    } catch {
        return NextResponse.json({ error: "Failed to read cpu stats" }, { status: 500 });
    }
}

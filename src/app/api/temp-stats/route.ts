import { getTempStats } from "@/lib/utils/get-stats";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const stats = getTempStats();
        return NextResponse.json(stats);
    } catch {
        return NextResponse.json({ error: "Failed to read temp stats" }, { status: 500 });
    }
}

import { getHostname } from "@/lib/utils/get-hostname";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const hostname = getHostname();
        return NextResponse.json({ hostname });
    } catch {
        return NextResponse.json({ error: "Failed to get hostname" }, { status: 500 });
    }
}

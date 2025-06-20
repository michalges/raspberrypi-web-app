import { getDeviceTreeModel } from "@/lib/utils/get-device-tree-model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const deviceTreeModel = getDeviceTreeModel();
        return NextResponse.json(deviceTreeModel);
    } catch {
        return NextResponse.json({ error: "Failed to read device tree model" }, { status: 500 });
    }
}

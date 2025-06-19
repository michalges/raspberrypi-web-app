import { execSync } from "child_process";
import { NextResponse } from "next/server";

export async function GET() {
    let ip = "";

    try {
        try {
            const output = execSync("hostname -I").toString();
            console.log("test", output);
            ip = output.trim().split(" ")[0];
        } catch (error) {
            console.warn("Failed to get hostname");
        }

        return NextResponse.json(ip);
    } catch {
        return NextResponse.json({ error: "Failed to read system metrics" }, { status: 500 });
    }
}

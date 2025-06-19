import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function GET() {
    try {
        const tempRaw = execSync('cat /sys/class/thermal/thermal_zone0/temp').toString().trim();
        const tempC = parseInt(tempRaw, 10) / 1000;
        return NextResponse.json({ temperature: tempC });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read CPU temperature' }, { status: 500 });
    }
}

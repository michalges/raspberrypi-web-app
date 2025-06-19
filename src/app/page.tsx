"use client";

import type { SystemData } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
    const [systemData, setSystemData] = useState<SystemData | null>(null);

    useEffect(() => {
        async function fetchSystemData() {
            try {
                const res = await fetch("/api/system-stats");
                const data = await res.json();
                setSystemData(data);
            } catch {
                setSystemData(null);
            }
        }

        fetchSystemData();
        const interval = setInterval(fetchSystemData, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main>
            <h1>Raspberry Pi CPU Temperature</h1>
            {systemData ? (
                <p>{JSON.stringify(systemData, null, 2)}</p>
            ) : (
                <p>null? </p>
            )}
        </main>
    );
}

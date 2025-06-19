'use client';

import { useEffect, useState } from 'react';

export default function Home() {
    const [temp, setTemp] = useState<number | null>(null);

    useEffect(() => {
        async function fetchTemp() {
            try {
                const res = await fetch('/api/system-stats');
                const data = await res.json();
                setTemp(data.temperature);
            } catch {
                setTemp(null);
            }
        }

        fetchTemp();

        const interval = setInterval(fetchTemp, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main>
            <h1>Raspberry Pi CPU Temperature</h1>
            {temp !== null ? <p>{temp} °C</p> : <p>Loading...</p>}
        </main>
    );
}

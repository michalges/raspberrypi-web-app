import { Button } from "./ui/button";
import Link from "next/link";

export function Sidebar() {
    return (
        <div className="h-full w-72 space-y-2 border-r p-2">
            <Button asChild className="w-full justify-start" variant="ghost">
                <Link href="/">Dashboard</Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="ghost">
                <Link href="/cpu">CPU</Link>
            </Button>
        </div>
    );
}

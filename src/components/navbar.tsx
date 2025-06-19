import { ThemeSelect } from "./theme-select";
import Image from "next/image";

export function Navbar() {
    return (
        <nav className="flex w-full flex-row justify-between border-b p-2 md:p-4">
            <div className="flex flex-row items-center justify-center space-x-1.5">
                <Image
                    width={64}
                    height={64}
                    alt={"logo"}
                    src={"/logo.png"}
                    className="h-6 w-6"
                ></Image>
                <h1 className="text-xl font-semibold">Raspberry Pi Stats</h1>
            </div>
            <ThemeSelect></ThemeSelect>
        </nav>
    );
}

import { ThemeSelect } from "./theme-select";

export function Navbar() {
    return (
        <nav className="flex w-full flex-row justify-end p-2 md:p-4">
            <ThemeSelect></ThemeSelect>
        </nav>
    );
}

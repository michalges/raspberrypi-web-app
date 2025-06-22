import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Progress } from "./ui/progress";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export function StatCard({
    icon,
    label,
    value,
    maxValue,
    unit,
    href,
    className = "",
}: {
    icon: LucideIcon;
    label: string;
    value: number;
    maxValue?: number;
    unit?: string;
    href?: string;
    className?: string;
}) {
    const progressValue = maxValue ? (value / maxValue) * 100 : value;
    const Icon = icon;

    const cardContent = (
        <Card
            className={`w-full lg:w-96 ${href ? "hover:bg-muted/25 cursor-pointer transition hover:shadow-md" : ""}`}
        >
            <CardHeader className="flex flex-col">
                <CardTitle className="flex flex-row items-center gap-x-2">
                    <Icon className="w-4" />
                    {label}
                </CardTitle>
                <CardDescription className="py-2">
                    <span className="text-2xl">
                        {value} {unit}
                    </span>
                    {maxValue && (
                        <span className="text-muted-foreground/50 text-sm">
                            {" / "}
                            {maxValue} {unit}
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={progressValue} />
            </CardContent>
        </Card>
    );

    if (href) {
        return (
            <Link href={href} className={`${className}`} passHref>
                {cardContent}
            </Link>
        );
    }

    return cardContent;
}

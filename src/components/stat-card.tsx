import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Progress } from "./ui/progress";
import type { LucideIcon } from "lucide-react";

export function StatCard({
    icon,
    label,
    value,
    maxValue,
    unit,
}: {
    icon: LucideIcon;
    label: string;
    value: number;
    maxValue?: number;
    unit?: string;
}) {
    const progressValue = maxValue ? (value / maxValue) * 100 : value;
    const Icon = icon;

    return (
        <Card className="w-full lg:w-96">
            <CardHeader className="flex flex-col">
                <CardTitle className="flex flex-row items-center gap-x-2">
                    <Icon className="w-4" />
                    {label}
                </CardTitle>
                <CardDescription className="py-2">
                    <span className="text-2xl">
                        {value}
                        {unit}
                    </span>
                    {maxValue && (
                        <span className="text-muted-foreground/50 text-sm">
                            {" / "}
                            {maxValue}
                            {unit}
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={progressValue} />
            </CardContent>
        </Card>
    );
}

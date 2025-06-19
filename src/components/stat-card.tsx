import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
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
    const valueString = maxValue ? `${value}${unit} / ${maxValue}${unit}` : `${value}${unit}`;
    const Icon = icon;

    return (
        <Card className="w-96">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex flex-row items-center gap-x-1">
                    <Icon className="w-4" />
                    {label}
                </CardTitle>
                <CardDescription>
                    <span>{valueString}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={progressValue} />
            </CardContent>
        </Card>
    );
}

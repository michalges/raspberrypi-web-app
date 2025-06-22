import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

export function ChartTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
    if (!active || !payload || !payload.length) return null;

    return (
        <div className="bg-background grid grid-cols-[auto_1fr] grid-rows-2 gap-2 rounded-md border p-2 shadow">
            <div className="font-semibold">Time:</div>
            <div>{label}</div>
            <div className="font-semibold">Value:</div>
            <div>{payload[0].value}</div>
        </div>
    );
}

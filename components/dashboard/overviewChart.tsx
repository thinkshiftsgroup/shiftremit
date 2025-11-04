"use client";

import { RadialBar, RadialBarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radial chart";

const chartData = [
  { browser: "send-money", count: 0, fill: "var(--color-main)" },
  { browser: "request-money", count: 0, fill: "var(--color-main-dark)" },
  { browser: "deposit", count: 0, fill: "var(--color-main-dark-II)" },
  { browser: "withdraw", count: 0, fill: "var(--color-primary)" },
  
];

const chartConfig = {

  chrome: {
    label: "Send Money",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Request Money",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Deposit",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Withdraw",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function ChartRadialSimple() {
  return (
    
      <div className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="visitors" background />
          </RadialBarChart>
        </ChartContainer>
      </div>
    
  );
}

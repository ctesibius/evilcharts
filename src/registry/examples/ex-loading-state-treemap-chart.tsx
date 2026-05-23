"use client";

import { EvilTreemapChart, Tiles, Tooltip, Legend } from "@/registry/charts/treemap-chart";
import { type ChartConfig } from "@/registry/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    colors: { light: ["#3b82f6"], dark: ["#60a5fa"] },
  },
  mobile: {
    label: "Mobile",
    colors: { light: ["#10b981"], dark: ["#34d399"] },
  },
} satisfies ChartConfig;

export function EvilExampleTreemapChart() {
  return (
    <EvilTreemapChart config={chartConfig} data={[]} isLoading className="h-full w-full p-4">
      <Tiles />
      <Legend />
      <Tooltip />
    </EvilTreemapChart>
  );
}

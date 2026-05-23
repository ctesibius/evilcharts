"use client";

import { EvilTreemapChart, Tiles, Tooltip, Legend } from "@/registry/charts/treemap-chart";
import { type ChartConfig } from "@/registry/ui/chart";

const data = [
  { name: "engineering", size: 380 },
  { name: "marketing", size: 260 },
  { name: "sales", size: 220 },
  { name: "support", size: 140 },
];

const chartConfig = {
  engineering: {
    label: "Engineering",
    colors: { light: ["#047857", "#10b981"], dark: ["#10b981", "#34d399"] },
  },
  marketing: {
    label: "Marketing",
    colors: { light: ["#be123c", "#f43f5e"], dark: ["#f43f5e", "#fb7185"] },
  },
  sales: {
    label: "Sales",
    colors: { light: ["#1d4ed8", "#3b82f6"], dark: ["#3b82f6", "#60a5fa"] },
  },
  support: {
    label: "Support",
    colors: { light: ["#7c3aed", "#8b5cf6"], dark: ["#8b5cf6", "#a78bfa"] },
  },
} satisfies ChartConfig;

export function EvilExampleTreemapChart() {
  return (
    <EvilTreemapChart config={chartConfig} data={data} className="h-full w-full p-4">
      <Tiles glowingTiles={["engineering", "sales"]} />
      <Legend />
      <Tooltip variant="frosted-glass" />
    </EvilTreemapChart>
  );
}

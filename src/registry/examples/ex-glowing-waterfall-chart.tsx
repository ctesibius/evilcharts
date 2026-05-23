"use client";

import {
  EvilWaterfallChart,
  Bars,
  Grid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "@/registry/charts/waterfall-chart";
import { type ChartConfig } from "@/registry/ui/chart";

const data = [
  { name: "q1", value: 80, type: "start" },
  { name: "expansion", value: 35, type: "increase" },
  { name: "churn", value: -12, type: "decrease" },
  { name: "upsell", value: 28, type: "increase" },
  { name: "q2", value: 131, type: "total" },
];

const chartConfig = {
  q1: {
    label: "Q1",
    colors: { light: ["#64748b"], dark: ["#94a3b8"] },
  },
  expansion: {
    label: "Expansion",
    colors: { light: ["#047857", "#10b981"], dark: ["#10b981", "#34d399"] },
  },
  churn: {
    label: "Churn",
    colors: { light: ["#be123c", "#f43f5e"], dark: ["#f43f5e", "#fb7185"] },
  },
  upsell: {
    label: "Upsell",
    colors: { light: ["#1d4ed8", "#3b82f6"], dark: ["#3b82f6", "#60a5fa"] },
  },
  q2: {
    label: "Q2",
    colors: { light: ["#7c3aed", "#8b5cf6"], dark: ["#8b5cf6", "#a78bfa"] },
  },
} satisfies ChartConfig;

export function EvilExampleWaterfallChart() {
  return (
    <EvilWaterfallChart
      config={chartConfig}
      data={data}
      nameKey="name"
      valueKey="value"
      className="h-full w-full p-4"
    >
      <Grid />
      <XAxis />
      <YAxis />
      <Bars glowingBars={["expansion", "upsell"]} />
      <Legend />
      <Tooltip variant="frosted-glass" />
    </EvilWaterfallChart>
  );
}

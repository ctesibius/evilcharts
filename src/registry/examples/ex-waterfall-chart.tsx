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
  { name: "opening", value: 120, type: "start" },
  { name: "product-a", value: 45, type: "increase" },
  { name: "returns", value: -15, type: "decrease" },
  { name: "marketing", value: 20, type: "increase" },
  { name: "closing", value: 170, type: "total" },
];

const chartConfig = {
  opening: {
    label: "Opening",
    colors: { light: ["#64748b"], dark: ["#94a3b8"] },
  },
  "product-a": {
    label: "Product A",
    colors: { light: ["#10b981"], dark: ["#34d399"] },
  },
  returns: {
    label: "Returns",
    colors: { light: ["#f43f5e"], dark: ["#fb7185"] },
  },
  marketing: {
    label: "Marketing",
    colors: { light: ["#3b82f6"], dark: ["#60a5fa"] },
  },
  closing: {
    label: "Closing",
    colors: { light: ["#8b5cf6"], dark: ["#a78bfa"] },
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
      <Bars isClickable />
      <Legend isClickable />
      <Tooltip />
    </EvilWaterfallChart>
  );
}

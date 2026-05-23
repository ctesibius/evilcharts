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

const chartConfig = {
  opening: {
    label: "Opening",
    colors: { light: ["#64748b"], dark: ["#94a3b8"] },
  },
  revenue: {
    label: "Revenue",
    colors: { light: ["#10b981"], dark: ["#34d399"] },
  },
} satisfies ChartConfig;

export function EvilExampleWaterfallChart() {
  return (
    <EvilWaterfallChart
      config={chartConfig}
      data={[]}
      nameKey="name"
      valueKey="value"
      isLoading
      className="h-full w-full p-4"
    >
      <Grid />
      <XAxis />
      <YAxis />
      <Bars />
      <Legend />
      <Tooltip />
    </EvilWaterfallChart>
  );
}

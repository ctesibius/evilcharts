"use client";

import {
  EvilScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Grid,
  Tooltip,
  Legend,
} from "@/registry/charts/scatter-chart";
import { type ChartConfig } from "@/registry/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    colors: {
      light: ["#047857"],
      dark: ["#10b981"],
    },
  },
  mobile: {
    label: "Mobile",
    colors: {
      light: ["#be123c"],
      dark: ["#f43f5e"],
    },
  },
} satisfies ChartConfig;

export function EvilExampleScatterChart() {
  return (
    <EvilScatterChart config={chartConfig} className="h-full w-full p-4" isLoading>
      <Grid />
      <XAxis dataKey="x" />
      <YAxis dataKey="y" />
      <Legend />
      <Tooltip />
      <Scatter dataKey="desktop" data={[]} />
      <Scatter dataKey="mobile" data={[]} />
    </EvilScatterChart>
  );
}

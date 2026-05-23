"use client";

import {
  EvilFunnelChart,
  Stages,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "@/registry/charts/funnel-chart";
import { type ChartConfig } from "@/registry/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
    colors: { light: ["#3b82f6"], dark: ["#60a5fa"] },
  },
  signups: {
    label: "Signups",
    colors: { light: ["#10b981"], dark: ["#34d399"] },
  },
} satisfies ChartConfig;

export function EvilExampleFunnelChart() {
  return (
    <EvilFunnelChart
      config={chartConfig}
      data={[]}
      stageKey="stage"
      valueKey="value"
      isLoading
      className="h-full w-full p-4"
    >
      <YAxis />
      <XAxis />
      <Stages />
      <Legend />
      <Tooltip />
    </EvilFunnelChart>
  );
}

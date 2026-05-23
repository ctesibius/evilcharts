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

const data = [
  { stage: "visitors", value: 10000 },
  { stage: "signups", value: 5200 },
  { stage: "trials", value: 2800 },
  { stage: "paid", value: 1200 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    colors: { light: ["#3b82f6"], dark: ["#60a5fa"] },
  },
  signups: {
    label: "Signups",
    colors: { light: ["#10b981"], dark: ["#34d399"] },
  },
  trials: {
    label: "Trials",
    colors: { light: ["#f59e0b"], dark: ["#fbbf24"] },
  },
  paid: {
    label: "Paid",
    colors: { light: ["#be123c"], dark: ["#f43f5e"] },
  },
} satisfies ChartConfig;

export function EvilExampleFunnelChart() {
  return (
    <EvilFunnelChart
      config={chartConfig}
      data={data}
      stageKey="stage"
      valueKey="value"
      className="h-full w-full p-4"
    >
      <YAxis />
      <XAxis />
      <Stages isClickable />
      <Legend isClickable />
      <Tooltip />
    </EvilFunnelChart>
  );
}

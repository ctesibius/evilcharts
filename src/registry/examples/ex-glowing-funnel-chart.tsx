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
  { stage: "awareness", value: 12000 },
  { stage: "interest", value: 7600 },
  { stage: "consideration", value: 4100 },
  { stage: "purchase", value: 1800 },
];

const chartConfig = {
  awareness: {
    label: "Awareness",
    colors: { light: ["#1d4ed8", "#3b82f6"], dark: ["#3b82f6", "#60a5fa"] },
  },
  interest: {
    label: "Interest",
    colors: { light: ["#047857", "#10b981"], dark: ["#10b981", "#34d399"] },
  },
  consideration: {
    label: "Consideration",
    colors: { light: ["#b45309", "#f59e0b"], dark: ["#f59e0b", "#fbbf24"] },
  },
  purchase: {
    label: "Purchase",
    colors: { light: ["#be123c", "#f43f5e"], dark: ["#f43f5e", "#fb7185"] },
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
      <Stages glowingStages={["interest", "purchase"]} />
      <Legend />
      <Tooltip variant="frosted-glass" />
    </EvilFunnelChart>
  );
}

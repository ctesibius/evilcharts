"use client";

import {
  EvilScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Grid,
  Tooltip,
  Legend,
  Dot,
  ActiveDot,
} from "@/registry/charts/scatter-chart";
import { type ChartConfig } from "@/registry/ui/chart";

const desktopData = [
  { x: 120, y: 260 },
  { x: 180, y: 420 },
  { x: 240, y: 310 },
  { x: 320, y: 480 },
  { x: 390, y: 360 },
  { x: 450, y: 520 },
  { x: 510, y: 410 },
  { x: 580, y: 550 },
];

const mobileData = [
  { x: 140, y: 180 },
  { x: 210, y: 290 },
  { x: 280, y: 220 },
  { x: 350, y: 340 },
  { x: 420, y: 270 },
  { x: 490, y: 380 },
  { x: 560, y: 300 },
  { x: 620, y: 430 },
];

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
    <EvilScatterChart config={chartConfig} className="h-full w-full p-4">
      <Grid />
      <XAxis dataKey="x" name="Spend" unit="k" />
      <YAxis dataKey="y" name="Revenue" unit="k" />
      <Legend isClickable />
      <Tooltip />
      <Scatter dataKey="desktop" data={desktopData} isClickable>
        <Dot variant="border" />
        <ActiveDot variant="colored-border" />
      </Scatter>
      <Scatter dataKey="mobile" data={mobileData} isClickable>
        <Dot variant="border" />
        <ActiveDot variant="colored-border" />
      </Scatter>
    </EvilScatterChart>
  );
}

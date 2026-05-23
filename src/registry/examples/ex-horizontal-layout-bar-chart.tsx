"use client";

import { EvilBarChart, Bar, XAxis, YAxis, Grid, Tooltip, Legend } from "@/registry/charts/bar-chart";
import { type ChartConfig } from "@/registry/ui/chart";

const data = [
  { month: "January", desktop: 342 },
  { month: "February", desktop: 876 },
  { month: "March", desktop: 512 },
  { month: "April", desktop: 629 },
  { month: "May", desktop: 458 },
  { month: "June", desktop: 781 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    colors: {
      light: ["#047857"],
      dark: ["#10b981"],
    },
  },
} satisfies ChartConfig;

export function EvilExampleBarChart() {
  return (
    <EvilBarChart
      data={data}
      config={chartConfig}
      className="h-full w-full p-4"
      layout="horizontal" // [!code highlight]
    >
      <Grid />
      <XAxis type="number" />
      <YAxis
        dataKey="month"
        type="category"
        width={48}
        tickFormatter={(value) => value.substring(0, 3)} // [!code highlight]
      />
      <Legend />
      <Tooltip />
      <Bar dataKey="desktop" variant="default" />
    </EvilBarChart>
  );
}

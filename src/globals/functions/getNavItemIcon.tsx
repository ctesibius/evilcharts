import {
  BarChartIcon,
  ChartStackedAreaIcon,
  ChartStackedLineIcon,
  ComposedChartIcon,
  PieChartIcon,
  RadialChartIcon,
  RadarChartIcon,
  SankeyChartIcon,
  ScatterChartIcon,
} from "@/assets/icons";

/** Normalizes fumadocs folder ids across versions (`root:area-chart` and `area-chart`). */
function getChartSlug(tag?: string) {
  if (!tag) return null;

  const slug = tag.includes(":") ? tag.split(":").at(-1) : tag;
  return slug?.endsWith(".mdx") ? null : slug;
}

// Custom icons for each item in the sidebar of MDX files
export function getNavItemIcon(tag?: string) {
  switch (getChartSlug(tag)) {
    case "area-chart":
      return <ChartStackedAreaIcon />;
    case "line-chart":
      return <ChartStackedLineIcon />;
    case "bar-chart":
      return <BarChartIcon />;
    case "composed-chart":
      return <ComposedChartIcon />;
    case "pie-chart":
      return <PieChartIcon />;
    case "radial-chart":
      return <RadialChartIcon />;
    case "radar-chart":
      return <RadarChartIcon />;
    case "sankey-chart":
      return <SankeyChartIcon />;
    case "scatter-chart":
      return <ScatterChartIcon />;
    default:
      return null;
  }
}

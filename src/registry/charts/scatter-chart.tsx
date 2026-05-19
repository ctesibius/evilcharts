"use client";

import {
  type ChartConfig,
  ChartContainer,
  getColorsCount,
  LoadingIndicator,
} from "@/registry/ui/chart";
import {
  ChartTooltip,
  ChartTooltipContent,
  type TooltipRoundness,
  type TooltipVariant,
} from "@/registry/ui/tooltip";
import { ChartLegend, ChartLegendContent, type ChartLegendVariant } from "@/registry/ui/legend";
import { ChartBackground, type BackgroundVariant } from "@/registry/ui/background";
import { ChartDot, type DotVariant } from "@/registry/ui/dot";
import {
  Children,
  createContext,
  isValidElement,
  use,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type ComponentProps,
  type FC,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  CartesianGrid,
  Scatter as RechartsScatter,
  ScatterChart as RechartsScatterChart,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  type ScatterPointItem,
} from "recharts";

const LOADING_POINTS = 12;
const LOADING_ANIMATION_DURATION = 1500;

// ─────────────────────────────────────────────────────────────────────────────
// Shared context
// ─────────────────────────────────────────────────────────────────────────────

type ScatterChartContextValue = {
  config: ChartConfig;
  isLoading: boolean;
  selectedDataKey: string | null;
  selectDataKey: (dataKey: string | null) => void;
};

const ScatterChartContext = createContext<ScatterChartContextValue | null>(null);

function useScatterChart() {
  const context = use(ScatterChartContext);

  if (!context) {
    throw new Error(
      "Scatter chart parts (<Scatter />, <XAxis />, …) must be used within <EvilScatterChart />",
    );
  }

  return context;
}

// ─────────────────────────────────────────────────────────────────────────────
// Root container
// ─────────────────────────────────────────────────────────────────────────────

type EvilScatterChartProps<TConfig extends Record<string, ChartConfig[string]>> = {
  config: TConfig;
  children: ReactNode;
  className?: string;
  chartProps?: ComponentProps<typeof RechartsScatterChart>;
  backgroundVariant?: BackgroundVariant;
  defaultSelectedDataKey?: string | null;
  onSelectionChange?: (selectedDataKey: string | null) => void;
  isLoading?: boolean;
  loadingPoints?: number;
};

export function EvilScatterChart<TConfig extends Record<string, ChartConfig[string]>>({
  config,
  children,
  className,
  chartProps,
  backgroundVariant,
  defaultSelectedDataKey = null,
  onSelectionChange,
  isLoading = false,
  loadingPoints,
}: EvilScatterChartProps<TConfig>) {
  const chartId = useId().replace(/:/g, "");
  const [selectedDataKey, setSelectedDataKey] = useState<string | null>(defaultSelectedDataKey);
  const loadingData = useLoadingData(isLoading, loadingPoints);

  const selectDataKey = useCallback(
    (newSelectedDataKey: string | null) => {
      setSelectedDataKey(newSelectedDataKey);
      onSelectionChange?.(newSelectedDataKey);
    },
    [onSelectionChange],
  );

  const contextValue = useMemo<ScatterChartContextValue>(
    () => ({
      config,
      isLoading,
      selectedDataKey,
      selectDataKey,
    }),
    [config, isLoading, selectedDataKey, selectDataKey],
  );

  return (
    <ScatterChartContext value={contextValue}>
      <ChartContainer className={className} config={config}>
        <LoadingIndicator isLoading={isLoading} />
        <RechartsScatterChart id={chartId} accessibilityLayer {...chartProps}>
          {backgroundVariant && <ChartBackground variant={backgroundVariant} />}
          {children}
          {isLoading && <LoadingScatter data={loadingData} />}
        </RechartsScatterChart>
      </ChartContainer>
    </ScatterChartContext>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Composible parts
// ─────────────────────────────────────────────────────────────────────────────

type ScatterProps<TPoint extends Record<string, unknown>> = {
  dataKey: string;
  data: TPoint[];
  isGlowing?: boolean;
  isClickable?: boolean;
  children?: ReactNode;
  scatterProps?: Omit<ComponentProps<typeof RechartsScatter>, "data" | "dataKey" | "name">;
};

export function Scatter<TPoint extends Record<string, unknown>>({
  dataKey,
  data,
  isGlowing = false,
  isClickable = false,
  children,
  scatterProps,
}: ScatterProps<TPoint>) {
  const { config, isLoading, selectedDataKey, selectDataKey } = useScatterChart();
  const id = useId().replace(/:/g, "");

  if (isLoading) return null;

  const isSelected = selectedDataKey === null || selectedDataKey === dataKey;
  const opacity = isClickable && !isSelected ? 0.25 : 1;
  const { dotVariant, activeDotVariant } = resolveDots(children);

  const shape = (props: ScatterPointItem) => (
    <ChartDot
      type={dotVariant}
      cx={props.cx}
      cy={props.cy}
      dataKey={dataKey}
      chartId={id}
      fillOpacity={opacity}
    />
  );

  const activeShape = (props: ScatterPointItem) => (
    <ChartDot
      type={activeDotVariant ?? dotVariant}
      cx={props.cx}
      cy={props.cy}
      dataKey={dataKey}
      chartId={id}
      fillOpacity={opacity}
    />
  );

  return (
    <>
      <RechartsScatter
        name={String(config[dataKey]?.label ?? dataKey)}
        data={data}
        fill={`url(#${id}-colors-${dataKey})`}
        fillOpacity={opacity}
        shape={shape}
        activeShape={activeShape}
        filter={isGlowing ? `url(#${id}-scatter-glow-${dataKey})` : undefined}
        className="transition-opacity duration-200"
        style={isClickable ? { cursor: "pointer" } : undefined}
        onClick={() => {
          if (!isClickable) return;
          selectDataKey(selectedDataKey === dataKey ? null : dataKey);
        }}
        {...scatterProps}
      />
      <defs>
        <ColorGradient id={id} dataKey={dataKey} config={config} />
        {isGlowing && <GlowFilter id={id} dataKey={dataKey} />}
      </defs>
    </>
  );
}

type DotProps = {
  variant?: DotVariant;
};

export const Dot: FC<DotProps> = () => null;
export const ActiveDot: FC<DotProps> = () => null;

type XAxisProps = ComponentProps<typeof RechartsXAxis>;

export function XAxis({
  type = "number",
  tickLine = false,
  axisLine = false,
  tickMargin = 8,
  ...props
}: XAxisProps) {
  return (
    <RechartsXAxis type={type} tickLine={tickLine} axisLine={axisLine} tickMargin={tickMargin} {...props} />
  );
}

type YAxisProps = ComponentProps<typeof RechartsYAxis>;

export function YAxis({
  type = "number",
  tickLine = false,
  axisLine = false,
  tickMargin = 8,
  width = "auto",
  ...props
}: YAxisProps) {
  return (
    <RechartsYAxis
      type={type}
      tickLine={tickLine}
      axisLine={axisLine}
      tickMargin={tickMargin}
      width={width}
      {...props}
    />
  );
}

type GridProps = ComponentProps<typeof CartesianGrid>;

export function Grid({ vertical = false, strokeDasharray = "3 3", ...props }: GridProps) {
  return <CartesianGrid vertical={vertical} strokeDasharray={strokeDasharray} {...props} />;
}

type TooltipProps = {
  variant?: TooltipVariant;
  roundness?: TooltipRoundness;
  defaultIndex?: number;
  cursor?: boolean;
};

export function Tooltip({ variant, roundness, defaultIndex, cursor = true }: TooltipProps) {
  const { isLoading, selectedDataKey } = useScatterChart();

  if (isLoading) return null;

  return (
    <ChartTooltip
      defaultIndex={defaultIndex}
      cursor={cursor ? { strokeDasharray: "3 3" } : false}
      content={
        <ChartTooltipContent selected={selectedDataKey} roundness={roundness} variant={variant} />
      }
    />
  );
}

type LegendProps = {
  variant?: ChartLegendVariant;
  align?: "left" | "center" | "right";
  verticalAlign?: "top" | "middle" | "bottom";
  isClickable?: boolean;
};

export function Legend({
  variant,
  align = "right",
  verticalAlign = "top",
  isClickable = false,
}: LegendProps) {
  const { isLoading, selectedDataKey, selectDataKey } = useScatterChart();

  if (isLoading) return null;

  return (
    <ChartLegend
      verticalAlign={verticalAlign}
      align={align}
      content={
        <ChartLegendContent
          selected={selectedDataKey}
          onSelectChange={selectDataKey}
          isClickable={isClickable}
          variant={variant}
        />
      }
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dot helpers
// ─────────────────────────────────────────────────────────────────────────────

const resolveDots = (children: ReactNode) => {
  let dotVariant: DotVariant = "default";
  let activeDotVariant: DotVariant | undefined;

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;

    if (child.type === Dot) {
      dotVariant = (child as ReactElement<DotProps>).props.variant ?? "default";
    }

    if (child.type === ActiveDot) {
      activeDotVariant = (child as ReactElement<DotProps>).props.variant;
    }
  });

  return { dotVariant, activeDotVariant };
};

// ─────────────────────────────────────────────────────────────────────────────
// Style definitions
// ─────────────────────────────────────────────────────────────────────────────

type StyleProps = {
  id: string;
  dataKey: string;
  config: ChartConfig;
};

const ColorGradient = ({ id, dataKey, config }: StyleProps) => {
  const colorsCount = getColorsCount(config[dataKey] ?? {});

  return (
    <linearGradient id={`${id}-colors-${dataKey}`} x1="0" y1="0" x2="1" y2="0">
      {colorsCount === 1 ? (
        <>
          <stop offset="0%" stopColor={`var(--color-${dataKey}-0)`} />
          <stop offset="100%" stopColor={`var(--color-${dataKey}-0)`} />
        </>
      ) : (
        Array.from({ length: colorsCount }, (_, index) => {
          const offset = `${(index / (colorsCount - 1)) * 100}%`;
          return (
            <stop
              key={offset}
              offset={offset}
              stopColor={`var(--color-${dataKey}-${index}, var(--color-${dataKey}-0))`}
            />
          );
        })
      )}
    </linearGradient>
  );
};

const GlowFilter = ({ id, dataKey }: Pick<StyleProps, "id" | "dataKey">) => {
  return (
    <filter id={`${id}-scatter-glow-${dataKey}`} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.7 0"
        result="glow"
      />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Loading skeleton
// ─────────────────────────────────────────────────────────────────────────────

const generateLoadingData = (points: number) => {
  return Array.from({ length: points }, () => ({
    x: 20 + Math.random() * 80,
    y: 20 + Math.random() * 80,
  }));
};

export function useLoadingData(isLoading: boolean, loadingPoints: number = LOADING_POINTS) {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setRefreshKey((prev) => prev + 1);
    }, LOADING_ANIMATION_DURATION);

    return () => clearInterval(interval);
  }, [isLoading]);

  const loadingData = useMemo(
    () => generateLoadingData(loadingPoints),
    // refreshKey toggle triggers re-computation each animation cycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadingPoints, refreshKey],
  );

  return loadingData;
}

const LoadingScatter = ({ data }: { data: { x: number; y: number }[] }) => {
  return (
    <RechartsScatter
      data={data}
      fill="currentColor"
      fillOpacity={0.25}
      shape={(props) => {
        const { cx, cy } = props;
        if (cx === undefined || cy === undefined) return <></>;
        return <circle cx={cx} cy={cy} r={4} fill="currentColor" fillOpacity={0.35} />;
      }}
      isAnimationActive
      animationDuration={LOADING_ANIMATION_DURATION}
      animationEasing="ease-in-out"
      legendType="none"
      tooltipType="none"
    />
  );
};

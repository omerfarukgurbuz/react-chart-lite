import type React from 'react';
import type { ChartLegendItem } from '@/components/ui/shared/chart/types';
export type { ChartLegendItem } from '@/components/ui/shared/chart/types';

export interface PieChartDatum {
  /** Numeric value for the slice */
  value: number;
  /** Legend id to resolve color and label */
  legendId: string;
}

export interface PieChartProps {
  /** Slices to render */
  data: ReadonlyArray<PieChartDatum>;
  /** Explicit legend items mapping ids to labels and colors */
  legends: ReadonlyArray<ChartLegendItem>;
  /** Title displayed above the chart */
  title?: string;
  /** Subtitle displayed under the title */
  subtitle?: string;
  /** Optional 44x44 icon on the left of the title */
  iconSrc?: string;
  /** Show/hide legend under the chart */
  showLegend?: boolean;
  /** Chart box size (width=height). SVG viewBox is square */
  size?: number;
  /** 0 => full pie, 0.6 => donut (60% of outer radius is empty) */
  innerRadiusRatio?: number;
  /** Degrees between slices for visual separation */
  padAngle?: number;
  /** Render text labels inside slices */
  showLabels?: boolean;
  /** Format function for labels; receives percent (0..1), value, legend label */
  labelFormatter?: (percent: number, value: number, legendLabel: string) => string;
  /** Additional class names */
  className?: string;
  /** Inline style for root */
  style?: React.CSSProperties;
  /** Component id */
  id?: string;
  /** Show value balloon on hover */
  showTooltip?: boolean;
  /** Render with minimal default styles */
  unstyled?: boolean;
  /** Class overrides for internal parts */
  classes?: {
    root?: string;
    container?: string;
    square?: string;
    svg?: string;
    label?: string;
    tooltip?: string;
  };
} 

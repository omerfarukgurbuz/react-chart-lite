import type React from 'react';
import type { ChartLegendItem, GridLineVariant, BarDatum } from '@/components/ui/shared/chart/types';
import type { ChartScale } from '@/utils/scale';

/** Common props shared by Horizontal and Vertical bar charts */
export interface BarChartCommonProps<B extends BarDatum = BarDatum> {
  /** Explicit legend items mapping ids to labels and colors */
  legends: ReadonlyArray<ChartLegendItem>;
  /** Scale configuration for numeric domain */
  scale?: ChartScale;

  /** Header: main title */
  title?: string;
  /** Header: subtitle under the title */
  subtitle?: string;
  /** Optional 44x44 icon path shown left of the title */
  iconSrc?: string;
  /** Controls legend visibility */
  showLegend?: boolean;

  /** Space between bars in the same category (px) */
  barSpacing?: number;
  /** Space between categories (px) */
  categorySpacing?: number;

  /** Master toggle for background grids */
  showGrid?: boolean;
  /** Value grid visibility (orientation depends on chart) */
  showValueGrid?: boolean;
  /** Grid line style */
  gridLineVariant?: GridLineVariant;

  /** Show numeric values on bars */
  showValues?: boolean;
  /** Animate bars */
  animated?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;

  /** Axis helpers */
  showBaselineAxis?: boolean;
  showLeftAxis?: boolean;

  /** Hover tooltip */
  showTooltip?: boolean;

  /** Extra class names and style */
  className?: string;
  style?: React.CSSProperties;
  id?: string;

  /** Bar click handler */
  onBarClick?: (data: B, categoryIndex: number, barIndex: number) => void;

  /** Disable default styles */
  unstyled?: boolean;
  /** Per-part class overrides (keys vary per chart) */
  classes?: Record<string, string | undefined>;

}

export type { ChartLegendItem, GridLineVariant, BarDatum };
export type { ChartScale };

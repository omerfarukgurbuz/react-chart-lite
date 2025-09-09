import type React from 'react';
import type { ChartScale } from '@/utils/scale';
import type { useTooltip } from '@/hooks/useTooltip';

export type LegendLike = { id: string; label: string; color: string };
export type BarLike = { value: number; legendId: string; tooltip?: string };
export type DataItemLike<B extends BarLike = BarLike> = { category: string; bars: ReadonlyArray<B> };

export type UseBarChartCoreParams<B extends BarLike = BarLike> = {
  data: ReadonlyArray<DataItemLike<B>>;
  legends: ReadonlyArray<LegendLike>;
  scale?: ChartScale;
  showTooltip?: boolean;
  /** When true, only legends referenced by bars will be returned as barLegends */
  filterBarLegends?: boolean;
  /** Optional overrides for scale calculation */
  valueMinBase?: number;
  intervals?: number;
};

export type UseBarChartCoreReturn = {
  legendMap: Map<string, LegendLike>;
  calculatedScale: ChartScale;
  gridLines: Array<{ value: number; position: number }>;
  /** Percentage between 0..100 based on scale */
  getValuePercentage: (value: number) => number;
  /** Only legends present in data bars when filterBarLegends=true, otherwise legends */
  barLegends: ReadonlyArray<LegendLike>;
  /** Tooltip API and body ref to compute positions */
  tooltip: ReturnType<typeof useTooltip>;
  bodyRef: React.MutableRefObject<HTMLDivElement | null>;
  /** Legend hover state */
  hoveredLegendId: string | null;
  onLegendEnter: (id: string) => void;
  onLegendLeave: () => void;
}; 
import React from 'react';
import { calculateNiceScale, getGridLines } from '@/utils/scale';
import { useTooltip } from '@/hooks/useTooltip';
import type { ChartScale } from '@/utils/scale';
import type { BarLike, LegendLike, UseBarChartCoreParams, UseBarChartCoreReturn } from './useBarChartCore.types';

export function useBarChartCore<B extends BarLike = BarLike>(params: UseBarChartCoreParams<B>): UseBarChartCoreReturn {
  const { data, legends, scale, showTooltip = false, filterBarLegends = false, valueMinBase = 0, intervals = 5 } = params;

  // Legend map for O(1) lookups (recompute every render based on legends)
  const legendMap = (() => {
    const map = new Map<string, LegendLike>();
    legends.forEach(l => map.set(l.id, l));
    return map;
  })();

  // Scale and grid lines (compute directly based on inputs)
  const calculatedScale: ChartScale = scale
    ? { ...scale }
    : (() => {
        const values = data.flatMap(item => item.bars.map(b => b.value));
        return calculateNiceScale(values, undefined, { minBase: valueMinBase, intervals });
      })();

  const gridLines = getGridLines(calculatedScale);

  const getValuePercentage = React.useCallback((value: number) => {
    const { min, max } = calculatedScale;
    const pct = ((value - min) / (max - min || 1)) * 100;
    return Math.max(0, Math.min(100, pct));
  }, [calculatedScale]);

  // Tooltip
  const bodyRef = React.useRef<HTMLDivElement | null>(null);
  const tooltip = useTooltip({ enabled: showTooltip });

  // Legend hover state
  const [hoveredLegendId, setHoveredLegendId] = React.useState<string | null>(null);
  const onLegendEnter = React.useCallback((id: string) => setHoveredLegendId(id), []);
  const onLegendLeave = React.useCallback(() => setHoveredLegendId(null), []);

  // Compute bar legends when requested (recompute each render based on data/legends)
  const barLegends = (() => {
    if (!filterBarLegends) return Array.from(legends);
    const barIds = new Set<string>();
    data.forEach(item => item.bars.forEach(b => barIds.add(b.legendId)));
    return legends.filter(l => barIds.has(l.id));
  })();

  return {
    legendMap,
    calculatedScale,
    gridLines,
    getValuePercentage,
    barLegends,
    tooltip,
    bodyRef,
    hoveredLegendId,
    onLegendEnter,
    onLegendLeave,
  };
} 
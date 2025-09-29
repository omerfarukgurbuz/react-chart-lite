'use client';

/**
 * Client component for interactive vertical bar chart.
 */
import React, { useRef, useEffect, useId, useState, useMemo, useCallback } from 'react';
import { ChartHeader } from '../shared/chart/parts/ChartHeader';
import { Legend as SharedLegend } from '../shared/chart/parts/Legend';
import { ValueGrid } from '../shared/chart/parts/ValueGrid';
import { CategoryGrid } from '../shared/chart/parts/CategoryGrid';
import styles from './VerticalBarChart.module.css';
import type {
  VerticalBarChartProps,
  VerticalBarChartLineSeries,
  ChartLegendItem,
} from './VerticalBarChart.types';
import { useTooltip } from '@/hooks/useTooltip';
import { useBarChartCore } from '../shared/bar/useBarChartCore';
import { classNames } from '@/utils/classNames';

// ==================== UTILITY FUNCTIONS ====================

/** classNames moved to '@/utils/classNames' */

/** Shallow object comparison */
const shallowEqual = (obj1: unknown, obj2: unknown): boolean => {
  if (obj1 === obj2) return true;
  if (!obj1 || !obj2) return false;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

  const a = obj1 as Record<string, unknown>;
  const b = obj2 as Record<string, unknown>;

  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (a[key] !== b[key]) return false;
  }
  return true;
};

// ==================== SCALE CALCULATION FUNCTIONS ====================
// Height/position now derive from shared getValuePercentage from useBarChartCore

// ==================== GEOMETRY CALCULATION FUNCTIONS ====================

const computeGroupWidth = (
  containerWidth: number,
  totalCategories: number,
  categorySpacing: number
): number => {
  const gaps = Math.max(0, totalCategories - 1) * categorySpacing;
  return totalCategories > 0 ? (containerWidth - gaps) / totalCategories : 0;
};

const createValueToY = (
  chartHeight: number,
  dpr: number,
  getValuePercentage: (value: number) => number
) => (value: number): number => {
  const pct = getValuePercentage(value) / 100;
  return (1 - pct) * chartHeight * dpr;
};

const createCategoryCenterX = (
  groupWidth: number,
  categorySpacing: number,
  dpr: number
) => (index: number): number => {
  const xCss = index * (groupWidth + categorySpacing) + groupWidth / 2;
  return xCss * dpr;
};

// ==================== OPTIMIZED LINE RENDERING ====================

const renderLineLayer = (
  showLine: boolean,
  lineSeries: ReadonlyArray<VerticalBarChartLineSeries>,
  containerWidth: number,
  chartHeight: number,
  data: VerticalBarChartProps['data'],
  categorySpacing: number,
  getValuePercentage: (value: number) => number,
  lineWidth: number,
  showLinePoints: boolean,
  linePointRadius: number,
  legendMap: Map<string, ChartLegendItem>,
  hoveredLegendId: string | null,
  showTooltip: boolean,
  onEnterOrMove: (evt: React.MouseEvent<SVGElement>) => void,
  onLeave: () => void,
  onFocus: (evt: React.FocusEvent<SVGElement>) => void,
  onBlur: () => void,
  unstyled: boolean,
  classes: VerticalBarChartProps['classes']
): React.ReactElement | null => {
  if (!showLine || !lineSeries || lineSeries.length === 0) return null;

  return (
    <svg
      className={unstyled ? classes?.lineLayer : classNames(styles.chart__lineLayer, classes?.lineLayer)}
      width={containerWidth}
      height={chartHeight}
      viewBox={`0 0 ${containerWidth} ${chartHeight}`}
      aria-hidden="true"
    >
      {lineSeries.map((series, sIdx) => {
        const totalCategories = data.length;
        const groupWidth = computeGroupWidth(containerWidth, totalCategories, categorySpacing);
        const valueToY = createValueToY(chartHeight, 1, getValuePercentage);
        const categoryCenterX = createCategoryCenterX(groupWidth, categorySpacing, 1);

        const points = series.values
          .slice(0, totalCategories)
          .map((value, idx) => ({
            x: categoryCenterX(idx),
            y: valueToY(value),
          }));

        const d = points.reduce((acc, p, i) => (
          acc + (i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`)
        ), '');

        const legend = legendMap.get(series.legendId);
        const strokeColor = legend?.color || '#888888';
        const isDimmed = hoveredLegendId !== null && series.legendId !== hoveredLegendId;

        return (
          <g key={sIdx}>
            <path
              d={d}
              stroke={strokeColor}
              strokeWidth={Math.max(1, lineWidth)}
              fill="none"
              strokeDasharray={series.dashed ? '6 4' : undefined}
              className={!unstyled && isDimmed ? styles['chart__line--dimmed'] : undefined}
            />
            {showLinePoints && points.map((p, idx) => {
              const categoryLabel = data[idx]?.category ?? `${idx + 1}`;
              const legendLabel = legend?.label || series.legendId;
              const valueAtPoint = series.values[idx];
              const titleText = `${categoryLabel} - ${legendLabel}: ${valueAtPoint}`;

              return (
                <circle
                  key={idx}
                  cx={p.x}
                  cy={p.y}
                  r={Math.max(1, linePointRadius)}
                  fill={strokeColor}
                  className={!unstyled && isDimmed ? styles['chart__dot--dimmed'] : undefined}
                  data-tooltip={titleText}
                  aria-label={titleText}
                  onMouseEnter={onEnterOrMove}
                  onMouseMove={onEnterOrMove}
                  onMouseLeave={onLeave}
                  onFocus={onFocus}
                  onBlur={onBlur}
                >
                  {!showTooltip && <title>{titleText}</title>}
                </circle>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

const renderBars = (
  data: VerticalBarChartProps['data'],
  barSpacing: number,
  getValuePercentage: (value: number) => number,
  showValues: boolean,
  animated: boolean,
  animationDuration: number,
  legendMap: Map<string, ChartLegendItem>,
  onBarClick: VerticalBarChartProps['onBarClick'] | undefined,
  hoveredLegendId: string | null,
  showTooltip: boolean,
  onEnterOrMove: (evt: React.MouseEvent<HTMLButtonElement>) => void,
  onLeave: () => void,
  onFocus: (evt: React.FocusEvent<HTMLButtonElement>) => void,
  onBlur: () => void,
  unstyled: boolean,
  classes: VerticalBarChartProps['classes']
): React.ReactElement[] => (
  data.map((item, categoryIndex) => (
    <div
      key={categoryIndex}
      className={unstyled ? classes?.group : classNames(styles.chart__group, classes?.group)}
      style={{ gap: `${barSpacing}px` }}
      aria-label={item.category}
    >
      {item.bars.map((bar, barIndex) => {
        const height = getValuePercentage(bar.value);
        const legend = (legendMap as Map<string, ChartLegendItem>).get(bar.legendId);
        const color = legend?.color || '#999999';

        const baseStyle: React.CSSProperties & {
          ['--bar-height']?: string;
        } = {
          backgroundColor: color,
          animationDuration: animated ? `${animationDuration}ms` : '0ms',
          animationDelay: animated
            ? `${categoryIndex * 100 + barIndex * 50}ms`
            : '0ms',
        };

        const barStyle = animated
          ? { ...baseStyle, ['--bar-height']: `${height}%` }
          : { ...baseStyle, height: `${height}%` };

        const ariaLabel = legend ? `${item.category} - ${legend.label}: ${bar.value}` : `${item.category}: ${bar.value}`;
        const titleText = bar.tooltip || ariaLabel;
        const isDimmed = hoveredLegendId !== null && bar.legendId !== hoveredLegendId;

        return (
          <button
            key={barIndex}
            className={
              unstyled
                ? classNames(classes?.bar)
                : classNames(styles.chart__bar, isDimmed ? styles['chart__bar--dimmed'] : undefined, classes?.bar)
            }
            style={barStyle}
            onClick={() => onBarClick?.(bar, categoryIndex, barIndex)}
            aria-label={ariaLabel}
            title={showTooltip ? undefined : titleText}
            data-tooltip={titleText}
            type="button"
            onMouseEnter={onEnterOrMove}
            onMouseMove={onEnterOrMove}
            onMouseLeave={onLeave}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            {showValues && (
              <span className={unstyled ? classes?.barValue : classNames(styles['chart__bar-value'], classes?.barValue)}>{bar.value}</span>
            )}
          </button>
        );
      })}
    </div>
  ))
);

const renderXLabels = (
  data: VerticalBarChartProps['data'],
  categorySpacing: number,
  unstyled: boolean,
  classes: VerticalBarChartProps['classes']
): React.ReactElement => (
  <div
    className={unstyled ? classes?.xLabels : classNames(styles.chart__xLabels, classes?.xLabels)}
    style={{ gap: `${categorySpacing}px` }}
  >
    {data.map((item, index) => (
      <div key={index} className={unstyled ? classes?.xLabel : classNames(styles.chart__xLabel, classes?.xLabel)}>
        {item.category}
      </div>
    ))}
  </div>
);

// ==================== MAIN COMPONENT ====================

function VerticalBarChart({
  data,
  legends,
  scale,
  title,
  subtitle,
  iconSrc,
  showLegend = true,
  barSpacing = 2,
  categorySpacing = 8,
  showGrid = true,
  showValueGrid = true,
  showCategoryGrid = false,
  gridLineVariant = 'dashed',
  showValues = false,
  animated = true,
  animationDuration = 500,
  chartHeight = 368,
  className = '',
  id,
  onBarClick,
  showLine = false,
  lineSeries = [],
  lineWidth = 2,
  showLinePoints = true,
  linePointRadius = 4,
  apsis = true,
  ordinat = true,
  showTooltip = false,
  unstyled = false,
  style,
  classes,
}: VerticalBarChartProps) {
  // ==================== HOOKS & STATE ====================
  
  // Aliases for readability
  const showBaselineAxis = apsis;
  const showLeftAxis = ordinat;

  const reactId = useId();
  const chartId = id ?? reactId;
  const columnsRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { legendMap, calculatedScale, gridLines, tooltip, hoveredLegendId, onLegendEnter, onLegendLeave, barLegends, getValuePercentage } = useBarChartCore({
    data,
    legends,
    scale,
    showTooltip,
    filterBarLegends: true,
    valueMinBase: 0,
    intervals: 5,
  });

  const gridVariantClass = useMemo(() => (
    gridLineVariant === 'solid'
      ? styles['chart--grid-solid']
      : gridLineVariant === 'dotted'
      ? styles['chart--grid-dotted']
      : styles['chart--grid-dashed']
  ), [gridLineVariant]);

  const containerClasses = useMemo(() => (
    classNames(
      styles.chart,
      animated && styles['chart--animated'],
      gridVariantClass,
      className,
      classes?.root
    )
  ), [animated, gridVariantClass, className, classes?.root]);

  /** Observe container width to drive line layer layout */
  useEffect(() => {
    const columnsEl = columnsRef.current;
    if (!columnsEl) return;

    const updateWidth = () => {
      setContainerWidth(columnsEl.clientWidth);
    };

    // Initial measurement
    updateWidth();

    const ro = new ResizeObserver(updateWidth);
    ro.observe(columnsEl);
    
    return () => {
      ro.disconnect();
    };
  }, []);

  // Unified tooltip handlers using data-tooltip (for buttons and svg circles)
  const handleEnterOrMoveBtn = useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
    const el = evt.currentTarget as Element;
    const content = el.getAttribute('data-tooltip') || '';
    if (content) {
      tooltip.showAtEvent(evt as unknown as React.MouseEvent, content, columnsRef.current);
    }
  }, [tooltip]);

  const handleEnterOrMoveSvg = useCallback((evt: React.MouseEvent<SVGElement>) => {
    const el = evt.currentTarget as Element;
    const content = el.getAttribute('data-tooltip') || '';
    if (content) {
      tooltip.showAtEvent(evt as unknown as React.MouseEvent, content, columnsRef.current);
    }
  }, [tooltip]);

  const handleLeave = useCallback(() => { tooltip.hide(); }, [tooltip]);

  const handleFocusBtn = useCallback((evt: React.FocusEvent<HTMLButtonElement>) => {
    const el = evt.currentTarget as Element;
    const content = el.getAttribute('data-tooltip') || '';
    if (content) {
      tooltip.showAtElement(el, content, columnsRef.current);
    }
  }, [tooltip]);

  const handleFocusSvg = useCallback((evt: React.FocusEvent<SVGElement>) => {
    const el = evt.currentTarget as Element;
    const content = el.getAttribute('data-tooltip') || '';
    if (content) {
      tooltip.showAtElement(el, content, columnsRef.current);
    }
  }, [tooltip]);

  const handleBlur = useCallback(() => { tooltip.hide(); }, [tooltip]);

  return (
    <div className={unstyled ? classNames(className, classes?.root) : containerClasses} id={chartId} style={style}>
      <ChartHeader variant="vertical" iconSrc={iconSrc} title={title} subtitle={subtitle} />

      <div className={unstyled ? classes?.container : classNames(styles.chart__container, classes?.container)}>
        <div className={unstyled ? classes?.body : classNames(styles.chart__body, classes?.body)}>
          <ValueGrid variant="verticalBar" orientation="horizontal" show={showGrid && showValueGrid} gridLines={gridLines} formatter={calculatedScale.formatter} />
          <CategoryGrid show={showGrid && showCategoryGrid} categoryCount={data.length} categorySpacing={categorySpacing} apsis={showBaselineAxis} ordinat={showLeftAxis} />

          <div
            ref={columnsRef}
            className={unstyled ? classes?.columns : classNames(styles.chart__columns, classes?.columns)}
            style={{ gap: `${categorySpacing}px`, height: `${chartHeight}px` }}
          >
            {renderBars(
              data,
              barSpacing,
              getValuePercentage,
              showValues,
              animated,
              animationDuration,
              legendMap,
              onBarClick,
              hoveredLegendId,
              showTooltip,
              handleEnterOrMoveBtn,
              handleLeave,
              handleFocusBtn,
              handleBlur,
              unstyled,
              classes
            )}
            {renderLineLayer(
              showLine,
              lineSeries,
              containerWidth,
              chartHeight,
              data,
              categorySpacing,
              getValuePercentage,
              lineWidth,
              showLinePoints,
              linePointRadius,
              legendMap,
              hoveredLegendId,
              showTooltip,
              handleEnterOrMoveSvg,
              handleLeave,
              handleFocusSvg,
              handleBlur,
              unstyled,
              classes
            )}
            {showTooltip && tooltip.state.visible && (
              <div className={unstyled ? classes?.tooltip : classNames(styles.chart__tooltip, classes?.tooltip)} style={{ left: tooltip.state.x, top: tooltip.state.y }} role="status" aria-live="polite">
                {tooltip.state.content}
              </div>
            )}
          </div>
        </div>

        {renderXLabels(data, categorySpacing, unstyled, classes)}
      </div>

      <SharedLegend
        variant="vertical"
        show={showLegend}
        items={barLegends}
        lineItems={lineSeries}
        legendMap={legendMap as unknown as Map<string, ChartLegendItem>}
        onEnter={(id) => onLegendEnter(id)}
        onLeave={() => onLegendLeave()}
      />
    </div>
  );
}

// ==================== PERFORMANCE UTILITIES ====================

/**
 * Utility to check if chart data has actually changed
 */
export const hasChartDataChanged = (
  prevData: VerticalBarChartProps['data'],
  newData: VerticalBarChartProps['data']
): boolean => {
  if (prevData.length !== newData.length) return true;
  
  for (let i = 0; i < prevData.length; i++) {
    const prevItem = prevData[i];
    const newItem = newData[i];
    
    if (prevItem.category !== newItem.category) return true;
    if (prevItem.bars.length !== newItem.bars.length) return true;
    
    for (let j = 0; j < prevItem.bars.length; j++) {
      const prevBar = prevItem.bars[j];
      const newBar = newItem.bars[j];
      
      if (prevBar.value !== newBar.value || 
          prevBar.label !== newBar.label || 
          prevBar.legendId !== newBar.legendId) {
        return true;
      }
    }
  }
  
  return false;
};

/**
 * Memory-efficient props comparison
 */
export const shouldChartRerender = (
  prevProps: Partial<VerticalBarChartProps>,
  newProps: Partial<VerticalBarChartProps>
): boolean => {
  const criticalProps = [
    'chartHeight', 'barSpacing', 'categorySpacing', 'showLine', 
    'lineWidth', 'showLinePoints', 'linePointRadius'
  ] as const;
  
  for (const prop of criticalProps) {
    if (prevProps[prop] !== newProps[prop]) return true;
  }
  
  return (
    !shallowEqual(prevProps.scale, newProps.scale) ||
    hasChartDataChanged(prevProps.data || [], newProps.data || []) ||
    !shallowEqual(prevProps.lineSeries, newProps.lineSeries) ||
    !shallowEqual(prevProps.legends, newProps.legends)
  );
};

export default React.memo(VerticalBarChart, (prev, next) => !shouldChartRerender(prev, next));

// ==================== OPTIONAL UTILITIES  ====================

/** Performance monitoring hook for development */
export const useChartPerformanceMonitor = (enabled: boolean = false) => {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    let rafId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let fps = 0;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;

        const perfMemory = (performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number } }).memory;
        console.log('Chart Performance:', {
          fps,
          memoryUsage: perfMemory
            ? {
                used: Math.round(perfMemory.usedJSHeapSize / 1048576),
                total: Math.round(perfMemory.totalJSHeapSize / 1048576)
              }
            : 'Not available'
        });
      }

      rafId = requestAnimationFrame(measureFPS);
    };

    rafId = requestAnimationFrame(measureFPS);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled]);
};

/**
 * Virtual scrolling hook for large datasets (no memoization)
 */
export const useVirtualizedChart = (
  data: VerticalBarChartProps['data'],
  containerWidth: number,
  itemWidth: number,
  overscan: number = 5
) => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [range, setRange] = useState(() => ({
    startIndex: 0,
    endIndex: data.length,
    visibleData: data,
  }));
  
  useEffect(() => {
    const startIndex = Math.max(0, Math.floor(scrollLeft / itemWidth) - overscan);
    const endIndex = Math.min(
      data.length,
      Math.ceil((scrollLeft + containerWidth) / itemWidth) + overscan
    );
    setRange({
      startIndex,
      endIndex,
      visibleData: data.slice(startIndex, endIndex)
    });
  }, [data, scrollLeft, containerWidth, itemWidth, overscan]);
  
  return {
    ...range,
    onScroll: (e: React.UIEvent<HTMLDivElement>) => {
      setScrollLeft(e.currentTarget.scrollLeft);
    }
  };
};

// ==================== EXPORT TYPES FOR EXTERNAL USE ====================

export type { VerticalBarChartProps, VerticalBarChartLineSeries };

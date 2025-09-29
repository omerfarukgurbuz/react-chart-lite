'use client';

import React, { useState, useRef, useMemo, useCallback, useId } from 'react';
import { useTooltip } from '@/hooks/useTooltip';
import { ChartHeader } from '../shared/chart/parts/ChartHeader';
import { Legend as SharedLegend } from '../shared/chart/parts/Legend';
import { RadarGrid } from '../shared/chart/parts/RadarGrid';
import { RadarAxes } from '../shared/chart/parts/RadarAxes';
import styles from './RadarChart.module.css';
import type { RadarChartProps, RadarChartScale, RadarChartSeries, ChartLegendItem } from './RadarChart.types';
import { polarToCartesian, buildPolygonPath } from '@/utils/geometry';
import { classNames } from '@/utils/classNames';

// classNames moved to '@/utils/classNames'

// Compute scale if not provided
const inferScale = (series: RadarChartSeries[], provided?: RadarChartScale): RadarChartScale => {
  if (provided) return { ...provided };
  const values = series.flatMap(s => s.values);
  const maxValue = Math.max(0, ...values);
  const magnitude = Math.pow(10, Math.floor(Math.log10(Math.max(1, maxValue))));
  const roundedMax = Math.ceil(maxValue / magnitude) * magnitude || 10;
  return { min: 0, max: roundedMax, intervals: 5, formatter: (v: number) => v.toString() };
};

const valueToRadius = (value: number, scale: RadarChartScale, maxRadius: number) => {
  const clamped = Math.max(scale.min, Math.min(scale.max, value));
  const ratio = (clamped - scale.min) / (scale.max - scale.min || 1);
  return ratio * maxRadius;
};

function RadarChart({
  axes,
  series,
  legends,
  scale,
  title,
  subtitle,
  iconSrc,
  showLegend = true,
  showGrid = true,
  showAxes = true,
  showAxisLabels = true,
  gridLineVariant = 'dashed',
  dotRadius = 3,
  strokeWidth = 2,
  fillOpacity = 0.15,
  size = 360,
  className = '',
  id,
  showTooltip = false,
  style,
  unstyled = false,
  classes,
}: RadarChartProps) {
  // Derived ids and tooltip
  const reactId = useId();
  const chartId = id ?? reactId;

  const svgWrapRef = useRef<HTMLDivElement | null>(null);
  const tooltip = useTooltip({ enabled: showTooltip });

  // Layout
  const viewSize = size;
  const center = viewSize / 2;
  const maxRadius = center * 0.8;

  // Derived scale and related values
  const resolvedScale = useMemo(() => inferScale(series as RadarChartSeries[], scale), [series, scale]);
  const axisCount = Math.max(1, axes.length);
  const angleStep = 360 / axisCount;

  // Container classes
  const variantClass = useMemo(() => (
    gridLineVariant === 'solid' ? styles['radar--grid-solid'] : gridLineVariant === 'dotted' ? styles['radar--grid-dotted'] : styles['radar--grid-dashed']
  ), [gridLineVariant]);
  const containerClasses = useMemo(() => (
    unstyled ? classNames(className, classes?.root) : classNames(styles.radar, variantClass, className, classes?.root)
  ), [unstyled, className, classes?.root, variantClass]);

  // Axis endpoints and grid levels
  const axisEndpoints = useMemo(() => (
    axes.map((_, idx) => polarToCartesian(center, center, maxRadius, -90 + idx * angleStep))
  ), [axes, center, maxRadius, angleStep]);

  const gridLevels = useMemo(() => (
    Array.from({ length: resolvedScale.intervals }, (_, i) => {
      const levelRatio = (i + 1) / resolvedScale.intervals;
      const r = levelRatio * maxRadius;
      return axes.map((_, idx) => polarToCartesian(center, center, r, -90 + idx * angleStep));
    })
  ), [resolvedScale.intervals, maxRadius, axes, center, angleStep]);

  const ringLabels = useMemo(() => (
    Array.from({ length: resolvedScale.intervals + 1 }, (_, i) => {
      const value = resolvedScale.min + ((resolvedScale.max - resolvedScale.min) * i) / resolvedScale.intervals;
      return resolvedScale.formatter ? resolvedScale.formatter(value) : String(value);
    })
  ), [resolvedScale]);

  // Legend map and hover state
  const legendMap = useMemo(() => {
    const m = new Map<string, ChartLegendItem>();
    legends.forEach(l => m.set(l.id, l));
    return m;
  }, [legends]);

  const [hoveredLegendId, setHoveredLegendId] = useState<string | null>(null);

  // Tooltip handlers (stable)
  const showTooltipAt = useCallback((evt: React.MouseEvent<SVGElement | SVGCircleElement | SVGPathElement, MouseEvent>, content: string) => {
    tooltip.showAtEvent(evt as unknown as React.MouseEvent, content, svgWrapRef.current);
  }, [tooltip]);
  const hideTooltip = useCallback(() => { tooltip.hide(); }, [tooltip]);

  // Unified hover/focus handlers using data-tooltip to avoid inline closures
  const handleEnterOrMove = useCallback((evt: React.MouseEvent<SVGElement>) => {
    const el = evt.currentTarget as Element;
    const content = el.getAttribute('data-tooltip') || '';
    if (content) {
      tooltip.showAtEvent(evt as unknown as React.MouseEvent, content, svgWrapRef.current);
    }
  }, [tooltip]);

  const handleLeave = useCallback(() => {
    tooltip.hide();
  }, [tooltip]);

  const handleFocus = useCallback((evt: React.FocusEvent<SVGElement>) => {
    const el = evt.currentTarget as Element;
    const content = el.getAttribute('data-tooltip') || '';
    if (content) {
      tooltip.showAtElement(el, content, svgWrapRef.current);
    }
  }, [tooltip]);

  const handleBlur = useCallback(() => {
    tooltip.hide();
  }, [tooltip]);

  return (
    <div className={containerClasses} id={chartId} style={style}>
      <ChartHeader variant="radar" iconSrc={iconSrc} title={title} subtitle={subtitle} />
      <div className={unstyled ? classes?.container : classNames(styles.radar__container, classes?.container)}>
        <div className={unstyled ? classes?.svgWrap : classNames(styles.radar__svgWrap, classes?.svgWrap)} ref={svgWrapRef}>
          <div className={unstyled ? classes?.square : classNames(styles.radar__square, classes?.square)}>
            <svg className={unstyled ? classes?.svg : classNames(styles.radar__svg, classes?.svg)} viewBox={`0 0 ${viewSize} ${viewSize}`} aria-label="Radar chart">
              <RadarGrid show={showGrid} gridLevels={gridLevels} />
              <RadarAxes show={showAxes} center={center} endpoints={axisEndpoints} />

              {series.map((s, sIdx) => {
                const points = axes.map((_, idx) => {
                  const value = s.values[idx] ?? 0;
                  const r = valueToRadius(value, resolvedScale, maxRadius);
                  return polarToCartesian(center, center, r, -90 + idx * angleStep);
                });
                const path = buildPolygonPath(points);
                const legend = legendMap.get(s.legendId);
                const color = legend?.color || '#888888';
                const seriesFillOpacity = legend?.fillOpacity ?? fillOpacity;
                const label = legend?.label || s.legendId;
                const isDimmed = hoveredLegendId !== null && s.legendId !== hoveredLegendId;
                return (
                  <g key={sIdx} aria-label={label}>
                    <path
                      d={path}
                      fill={color}
                      fillOpacity={seriesFillOpacity}
                      stroke={color}
                      strokeWidth={strokeWidth}
                      className={!unstyled && isDimmed ? styles['radar__series--dimmed'] : undefined}
                      data-tooltip={label}
                      aria-label={label}
                      tabIndex={0}
                      onMouseEnter={handleEnterOrMove}
                      onMouseMove={handleEnterOrMove}
                      onMouseLeave={handleLeave}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    {points.map((p, pIdx) => {
                      const valueText = `${label}: ${series[sIdx].values[pIdx] ?? 0}`;
                      return (
                        <circle
                          key={`p-${pIdx}`}
                          cx={p.x}
                          cy={p.y}
                          r={dotRadius}
                          fill={color}
                          className={!unstyled && isDimmed ? styles['radar__dot--dimmed'] : undefined}
                          data-tooltip={valueText}
                          aria-label={valueText}
                          tabIndex={0}
                          onMouseEnter={handleEnterOrMove}
                          onMouseMove={handleEnterOrMove}
                          onMouseLeave={handleLeave}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        >
                          {!showTooltip && <title>{valueText}</title>}
                        </circle>
                      );
                    })}
                  </g>
                );
              })}

              {showAxisLabels && (
                <>
                  {axes.map((label, idx) => {
                    const end = axisEndpoints[idx];
                    const labelOffset = 10;
                    const lx = end.x + (end.x - center) * (labelOffset / maxRadius);
                    const ly = end.y + (end.y - center) * (labelOffset / maxRadius);
                    return (
                      <foreignObject key={`axis-label-${idx}`} x={lx - 40} y={ly - 10} width={80} height={20} pointerEvents="none">
                        <div className={unstyled ? classes?.axisLabel : classNames(styles.radar__axisLabel, classes?.axisLabel)}>{label}</div>
                      </foreignObject>
                    );
                  })}
                </>
              )}

              {showGrid && (
                <g aria-hidden="true">
                  {ringLabels.map((t, i) => (
                    <text key={`rl-${i}`} x={center} y={center - (maxRadius * i) / resolvedScale.intervals} dy={-2} textAnchor="middle" fontSize={10} fill="#3A3E44">
                      {t}
                    </text>
                  ))}
                </g>
              )}
            </svg>
            {showTooltip && tooltip.state.visible && (
              <div className={unstyled ? classes?.tooltip : classNames(styles.radar__tooltip, classes?.tooltip)} style={{ left: tooltip.state.x, top: tooltip.state.y }} role="status" aria-live="polite">{tooltip.state.content}</div>
            )}
          </div>
        </div>
      </div>
      <SharedLegend variant="radar" show={showLegend} items={legends} onEnter={(id) => setHoveredLegendId(id)} onLeave={() => setHoveredLegendId(null)} />
    </div>
  );
}

export default React.memo(RadarChart);

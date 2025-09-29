'use client';

import React, { useState, useRef, useMemo, useCallback, useId } from 'react';
import { useTooltip } from '@/hooks/useTooltip';
import { ChartHeader } from '../shared/chart/parts/ChartHeader';
import { Legend as SharedLegend } from '../shared/chart/parts/Legend';
import styles from './PieChart.module.css';
import type { PieChartProps, ChartLegendItem } from './PieChart.types';
import { polarToCartesian, buildArcPath, roundTo } from '@/utils/geometry';
import { classNames } from '@/utils/classNames';

// classNames moved to '@/utils/classNames'

/**
 * PieChart: interactive pie/donut chart with legend and tooltips
 */
function PieChart({
  data,
  legends,
  title,
  subtitle,
  iconSrc,
  showLegend = true,
  size = 360,
  innerRadiusRatio = 0,
  padAngle = 0,
  showLabels = true,
  labelFormatter,
  className = '',
  id,
  showTooltip = false,
  style,
  unstyled = false,
  classes,
}: PieChartProps) {
  // Derived ids and tooltip
  const reactId = useId();
  const chartId = id ?? reactId;

  const svgWrapRef = useRef<HTMLDivElement | null>(null);
  const tooltip = useTooltip({ enabled: showTooltip });

  // Computed totals and geometry
  const total = useMemo(() => data.reduce((sum, d) => sum + Math.max(0, d.value), 0), [data]);
  const safeTotal = useMemo(() => (total <= 0 ? 1 : total), [total]);

  const viewSize = size;
  const cx = viewSize / 2;
  const cy = viewSize / 2;
  const outerR = viewSize * 0.45; // padding inside box
  const innerR = Math.max(0, Math.min(outerR * innerRadiusRatio, outerR - 1));
  const gap = Math.max(0, Math.min(10, padAngle));

  // Derived slices
  const slices = useMemo(() => {
    let currentAngle = -90; // start at top
    return data.map(d => {
      const fraction = Math.max(0, d.value) / safeTotal;
      const angle = fraction * 360;
      const start = currentAngle + gap / 2;
      const end = currentAngle + angle - gap / 2;
      currentAngle += angle;
      return { datum: d, start, end, fraction };
    });
  }, [data, safeTotal, gap]);

  // Legend map for O(1) lookups
  const legendMap = useMemo(() => {
    const m = new Map<string, ChartLegendItem>();
    legends.forEach(l => m.set(l.id, l));
    return m;
  }, [legends]);

  // Hover state for legend interactions
  const [hoveredLegendId, setHoveredLegendId] = useState<string | null>(null);

  // Container class names
  const containerClasses = useMemo(() => (
    unstyled ? classNames(className, classes?.root) : classNames(styles.pie, className, classes?.root)
  ), [unstyled, className, classes?.root]);

  // Tooltip handlers (stable)
  const showTooltipAt = useCallback((
    evt: React.MouseEvent<SVGPathElement, MouseEvent>,
    content: string
  ) => {
    tooltip.showAtEvent(evt as unknown as React.MouseEvent, content, svgWrapRef.current);
  }, [tooltip]);

  const hideTooltip = useCallback(() => {
    tooltip.hide();
  }, [tooltip]);

  return (
    <div className={containerClasses} id={chartId} style={style}>
      <ChartHeader
        variant="pie"
        iconSrc={iconSrc}
        title={title}
        subtitle={subtitle}
      />
      <div className={unstyled ? classes?.container : classNames(styles.pie__container, classes?.container)}>
        <div className={unstyled ? classes?.square : classNames(styles.pie__square, classes?.square)} ref={svgWrapRef}>
          <svg
            className={unstyled ? classes?.svg : classNames(styles.pie__svg, classes?.svg)}
            viewBox={`0 0 ${viewSize} ${viewSize}`}
            aria-label="Pie chart"
          >
            <g>
              {slices.map((s, idx) => {
                const legend = legendMap.get(s.datum.legendId);
                const fill = legend?.color || '#999999';
                const label = legend?.label || s.datum.legendId;
                const isDimmed = hoveredLegendId !== null && s.datum.legendId !== hoveredLegendId;
                const percent = Math.round(s.fraction * 100);
                const titleText = `${label}: ${percent}%`;
                return (
                  <path
                    key={idx}
                    d={buildArcPath(cx, cy, outerR, innerR, s.start, s.end)}
                    fill={fill}
                    aria-label={`${label}: ${(s.fraction * 100).toFixed(1)}%`}
                    className={classNames(
                      !unstyled && isDimmed && styles['pie__slice--dimmed']
                    )}
                    onMouseEnter={e => showTooltipAt(e, titleText)}
                    onMouseMove={e => showTooltipAt(e, titleText)}
                    onMouseLeave={hideTooltip}
                  >
                    {!showTooltip && <title>{titleText}</title>}
                  </path>
                );
              })}
            </g>

            {showLabels && (
              <g>
                {slices.map((s, idx) => {
                  const legend = legendMap.get(s.datum.legendId);
                  const legendLabel = legend?.label || s.datum.legendId;
                  const mid = (s.start + s.end) / 2;
                  const r = innerR > 0 ? (innerR + outerR) / 2 : outerR * 0.67;
                  const p = polarToCartesian(cx, cy, r, mid);
                  const px = roundTo(p.x);
                  const py = roundTo(p.y);
                  const text = labelFormatter
                    ? labelFormatter(s.fraction, s.datum.value, legendLabel)
                    : `${Math.round(s.fraction * 100)}%`;
                  return (
                    <text
                      key={`lbl-${idx}`}
                      x={px}
                      y={py}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={unstyled ? classes?.label : classNames(styles.pie__label, classes?.label)}
                    >
                      {text}
                    </text>
                  );
                })}
              </g>
            )}
          </svg>
          {showTooltip && tooltip.state.visible && (
            <div
              className={unstyled ? classes?.tooltip : classNames(styles.pie__tooltip, classes?.tooltip)}
              style={{ left: tooltip.state.x, top: tooltip.state.y }}
              role="status"
              aria-live="polite"
            >
              {tooltip.state.content}
            </div>
          )}
        </div>
      </div>
      <SharedLegend
        variant="pie"
        show={showLegend}
        items={legends}
        onEnter={id => setHoveredLegendId(id)}
        onLeave={() => setHoveredLegendId(null)}
      />
    </div>
  );
}

export default React.memo(PieChart);

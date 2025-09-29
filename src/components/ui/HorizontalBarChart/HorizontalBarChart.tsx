'use client';

import React, { useMemo, useCallback } from 'react';
import { ChartHeader } from '../shared/chart/parts/ChartHeader';
import { Legend as SharedLegend } from '../shared/chart/parts/Legend';
import { ValueGrid } from '../shared/chart/parts/ValueGrid';
import styles from './HorizontalBarChart.module.css';
import type { HorizontalBarChartProps, ChartBar } from './HorizontalBarChart.types';
import { useBarChartCore } from '../shared/bar/useBarChartCore';
import { classNames } from '@/utils/classNames';

/** classNames moved to '@/utils/classNames' */

/**
 * Calculates the width percentage of a bar based on its value and scale
 */
const calculateBarWidth = (
  value: number, 
  min: number, 
  max: number
): number => {
  const range = max - min || 1;
  const normalizedValue = (value - min) / range;
  return Math.max(0, Math.min(100, normalizedValue * 100));
};

/**
 * Creates inline styles for animated and non-animated bars
 */
const createBarStyles = (
  width: number,
  barHeight: number,
  color: string,
  barSpacing: number,
  isLastBar: boolean,
  animated: boolean,
  animationDuration: number,
  categoryIndex: number,
  barIndex: number
): React.CSSProperties & { ['--bar-width']?: string } => {
  const baseStyle: React.CSSProperties = {
    height: `${barHeight}px`,
    backgroundColor: color,
    marginBottom: isLastBar ? 0 : `${barSpacing}px`,
    animationDuration: animated ? `${animationDuration}ms` : '0ms',
    animationDelay: animated ? `${(categoryIndex * 100) + (barIndex * 50)}ms` : '0ms',
  };

  return animated
    ? { ...baseStyle, ['--bar-width']: `${width}%` }
    : { ...baseStyle, width: `${width}%` };
};

/**
 * Renders a single bar with all its interactions and styling
 */
const BarComponent: React.FC<{
  bar: ChartBar;
  categoryIndex: number;
  barIndex: number;
  isLastBar: boolean;
  barHeight: number;
  barSpacing: number;
  color: string;
  width: number;
  ariaLabel: string;
  titleText: string;
  isDimmed: boolean;
  animated: boolean;
  animationDuration: number;
  showValues: boolean;
  showTooltip: boolean;
  unstyled: boolean;
  classes?: any;
  onBarClick?: (bar: ChartBar, categoryIndex: number, barIndex: number) => void;
  onShowTooltip: (evt: React.MouseEvent, content: string) => void;
  onHideTooltip: () => void;
}> = ({
  bar,
  categoryIndex,
  barIndex,
  isLastBar,
  barHeight,
  barSpacing,
  color,
  width,
  ariaLabel,
  titleText,
  isDimmed,
  animated,
  animationDuration,
  showValues,
  showTooltip,
  unstyled,
  classes,
  onBarClick,
  onShowTooltip,
  onHideTooltip,
}) => {
  const barStyle = createBarStyles(
    width,
    barHeight,
    color,
    barSpacing,
    isLastBar,
    animated,
    animationDuration,
    categoryIndex,
    barIndex
  );

  const handleClick = useCallback(() => {
    onBarClick?.(bar, categoryIndex, barIndex);
  }, [bar, categoryIndex, barIndex, onBarClick]);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    onShowTooltip(e, titleText);
  }, [onShowTooltip, titleText]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    onShowTooltip(e, titleText);
  }, [onShowTooltip, titleText]);

  return (
    <div
      className={unstyled ? classes?.barWrapper : classNames(styles['chart__bar-wrapper'], classes?.barWrapper)}
      style={{ 
        height: `${barHeight}px`, 
        marginBottom: isLastBar ? 0 : `${barSpacing}px` 
      }}
    >
      <button
        className={unstyled
          ? classNames(classes?.bar)
          : classNames(
              styles.chart__bar,
              isDimmed ? styles['chart__bar--dimmed'] : undefined,
              classes?.bar
            )
        }
        style={barStyle}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={onHideTooltip}
        aria-label={ariaLabel}
        title={showTooltip ? undefined : titleText}
        type="button"
      >
        {showValues && (
          <span className={unstyled ? classes?.barValue : classNames(styles['chart__bar-value'], classes?.barValue)}>
            {bar.value}
          </span>
        )}
      </button>
    </div>
  );
};

/**
 * HorizontalBarChart - A responsive horizontal bar chart component
 * 
 * Features:
 * - Multiple series support with legends
 * - Interactive tooltips and hover effects  
 * - Configurable animations and styling
 * - Accessibility support with ARIA labels
 * - Grid lines and value formatting
 */
function HorizontalBarChart({
  data,
  legends,
  scale,
  title,
  subtitle,
  iconSrc,
  showLegend = true,
  barHeight = 30,
  barSpacing = 2,
  categorySpacing = 8,
  showGrid = true,
  showVerticalGrid = true,
  gridLineVariant = 'dashed',
  apsis = true,
  ordinat = true,
  showValues = false,
  animated = true,
  animationDuration = 500,
  className = '',
  id,
  onBarClick,
  showTooltip = false,
  style,
  unstyled = false,
  classes,
}: HorizontalBarChartProps) {
  const reactId = React.useId();
  const chartId = id ?? reactId;

  // Initialize chart core logic with hooks
  const { 
    legendMap, 
    calculatedScale, 
    gridLines, 
    tooltip, 
    bodyRef, 
    hoveredLegendId, 
    onLegendEnter, 
    onLegendLeave 
  } = useBarChartCore({
    data,
    legends,
    scale,
    showTooltip,
    filterBarLegends: false,
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

  // Memoize container classes to prevent unnecessary re-renders
  const containerClasses = useMemo(() => {
    return unstyled
      ? classNames(
          className,
          classes?.root
        )
      : classNames(
          styles.chart,
          animated && styles['chart--animated'],
          gridVariantClass,
          !apsis && styles['chart--no-apsis'],
          ordinat && styles['chart--ordinat'],
          className,
          classes?.root
        );
  }, [unstyled, className, classes?.root, animated, gridVariantClass, showGrid, apsis, ordinat]);

  // Tooltip event handlers
  const handleShowTooltip = useCallback((evt: React.MouseEvent, content: string) => {
    tooltip.showAtEvent(evt, content, bodyRef.current);
  }, [tooltip, bodyRef]);

  const handleHideTooltip = useCallback(() => {
    tooltip.hide();
  }, [tooltip]);

  return (
    <div className={containerClasses} id={chartId} style={style}>
      {/* Chart header with title, subtitle, and icon */}
      <ChartHeader 
        variant="horizontal" 
        iconSrc={iconSrc} 
        title={title} 
        subtitle={subtitle} 
      />

      <div className={unstyled ? classes?.container : classNames(styles.chart__container, classes?.container)}>
        <div className={unstyled ? classes?.body : classNames(styles.chart__body, classes?.body)} ref={bodyRef}>
          {/* Background grid lines */}
          <ValueGrid 
            variant="horizontalBar" 
            orientation="vertical" 
            show={showGrid && showVerticalGrid} 
            gridLines={gridLines} 
            formatter={calculatedScale.formatter} 
          />

          {/* Chart data rows */}
          <div className={unstyled ? classes?.rows : classNames(styles.chart__rows, classes?.rows)}>
            {data.map((item, categoryIndex) => (
              <div 
                key={`category-${categoryIndex}`}
                className={unstyled ? classes?.row : classNames(styles.chart__row, classes?.row)}
                style={{ marginBottom: `${categorySpacing}px` }}
              >
                {/* Category label */}
                <div className={unstyled ? classes?.rowLabel : classNames(styles['chart__row-label'], classes?.rowLabel)}>
                  {item.category}
                </div>
                
                {/* Bars container */}
                <div className={unstyled ? classes?.rowBars : classNames(styles['chart__row-bars'], classes?.rowBars)}>
                  {item.bars.map((bar, barIndex) => {
                    const legend = legendMap.get(bar.legendId);
                    const color = legend?.color || '#999999';
                    const width = calculateBarWidth(bar.value, calculatedScale.min, calculatedScale.max);
                    const ariaLabel = legend 
                      ? `${item.category} - ${legend.label}: ${bar.value}` 
                      : `${item.category}: ${bar.value}`;
                    const titleText = bar.tooltip || ariaLabel;
                    const isDimmed = hoveredLegendId !== null && bar.legendId !== hoveredLegendId;
                    const isLastBar = barIndex === item.bars.length - 1;

                    return (
                      <BarComponent
                        key={`bar-${categoryIndex}-${barIndex}`}
                        bar={bar}
                        categoryIndex={categoryIndex}
                        barIndex={barIndex}
                        isLastBar={isLastBar}
                        barHeight={barHeight}
                        barSpacing={barSpacing}
                        color={color}
                        width={width}
                        ariaLabel={ariaLabel}
                        titleText={titleText}
                        isDimmed={isDimmed}
                        animated={animated}
                        animationDuration={animationDuration}
                        showValues={showValues}
                        showTooltip={showTooltip}
                        unstyled={unstyled}
                        classes={classes}
                        onBarClick={onBarClick}
                        onShowTooltip={handleShowTooltip}
                        onHideTooltip={handleHideTooltip}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive tooltip */}
          {showTooltip && tooltip.state.visible && (
            <div 
              className={unstyled ? classes?.tooltip : classNames(styles.chart__tooltip, classes?.tooltip)} 
              style={{ left: tooltip.state.x, top: tooltip.state.y }} 
              role="status" 
              aria-live="polite"
            >
              {tooltip.state.content}
            </div>
          )}
        </div>
      </div>

      {/* Chart legend */}
      <SharedLegend
        variant="horizontal"
        show={showLegend}
        items={legends}
        onEnter={onLegendEnter}
        onLeave={onLegendLeave}
      />
    </div>
  );
}

export default React.memo(HorizontalBarChart);

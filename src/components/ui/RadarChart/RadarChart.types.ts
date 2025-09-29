import type React from 'react';
import type { ChartLegendItem, GridLineVariant } from '@/components/ui/shared/chart/types';
import type { ChartScale } from '@/utils/scale';
export type { ChartLegendItem } from '@/components/ui/shared/chart/types';

export type RadarChartScale = ChartScale;

// ChartLegendItem unified in shared types (with optional fillOpacity)

export interface RadarChartSeries {
	/** Values for each axis, in the same order as axes */
	values: number[];
	/** Legend id to map color/label/fillOpacity */
	legendId: string;
}

export interface RadarChartProps {
	/** Axis labels (the chart will distribute these evenly in a circle) */
	axes: ReadonlyArray<string>;
	/** One or more data series to render */
	series: ReadonlyArray<RadarChartSeries>;
	/** Legends mapping to describe each series */
	legends: ReadonlyArray<ChartLegendItem>;
	/** Optional scale configuration; if omitted it will be inferred from series values */
	scale?: RadarChartScale;
	/** Header: main title */
	title?: string;
	/** Header: subtitle/description below the title */
	subtitle?: string;
	/** Header: 44x44 icon path shown left of the title */
	iconSrc?: string;
	/** Controls legend visibility */
	showLegend?: boolean;
	/** Controls grid visibility */
	showGrid?: boolean;
	/** Controls axis baseline lines visibility */
	showAxes?: boolean;
	/** Controls axis labels visibility */
	showAxisLabels?: boolean;
	/** Grid line variant */
	gridLineVariant?: GridLineVariant;
	/** Radius of the small dots at each value point */
	dotRadius?: number;
	/** Stroke width for series outline */
	strokeWidth?: number;
	/** Default fill opacity for series area (0..1) */
	fillOpacity?: number;
	/** Square SVG viewport size in px (it will scale responsively) */
	size?: number;
	/** Extra class name for container */
	className?: string;
	/** Inline style for root */
	style?: React.CSSProperties;
	/** Optional id for the container */
	id?: string;
	/** Show value balloon on hover */
	showTooltip?: boolean;
	/** Render with minimal default styles */
	unstyled?: boolean;
	/** Class overrides for internal parts */
	classes?: {
		root?: string;
		container?: string;
		svgWrap?: string;
		square?: string;
		svg?: string;
		axisLabel?: string;
		tooltip?: string;
	};
} 

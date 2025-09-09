import stylesV from '@/components/ui/VerticalBarChart/VerticalBarChart.module.css';
import stylesH from '@/components/ui/HorizontalBarChart/HorizontalBarChart.module.css';
import type { ValueGridProps } from './ValueGrid.types';

const variantToStyles = {
	verticalBar: {
		wrap: stylesV.chart__grid,
		line: stylesV['chart__grid-line'],
		label: stylesV['chart__grid-label'],
	},
	horizontalBar: {
		wrap: stylesH.chart__grid,
		line: stylesH['chart__grid-line'],
		label: stylesH['chart__grid-label'],
	},
} as const;

export function ValueGrid({ variant, orientation, show, gridLines, formatter }: ValueGridProps) {
	if (!show) return null;
	const s = variantToStyles[variant];
	return (
		<div className={s.wrap} aria-hidden="true">
			{gridLines.map((line, index) => (
				<div
					key={index}
					className={s.line}
					style={orientation === 'horizontal' ? { bottom: `${line.position}%` } : { left: `${line.position}%` }}
				>
					<span className={s.label}>
						{formatter ? formatter(line.value) : Number(line.value).toFixed(1)}
					</span>
				</div>
			))}
		</div>
	);
} 
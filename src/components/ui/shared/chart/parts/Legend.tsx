import stylesV from '@/components/ui/VerticalBarChart/VerticalBarChart.module.css';
import stylesH from '@/components/ui/HorizontalBarChart/HorizontalBarChart.module.css';
import stylesP from '@/components/ui/PieChart/PieChart.module.css';
import stylesR from '@/components/ui/RadarChart/RadarChart.module.css';
import type { LegendProps } from './Legend.types';

const variantToStyles = {
	vertical: {
		wrap: stylesV.chart__legend,
		item: stylesV['chart__legend-item'],
		color: stylesV['chart__legend-color'],
		label: stylesV['chart__legend-label'],
		line: stylesV['chart__legend-line'],
		lineDashed: stylesV['chart__legend-line--dashed'],
	},
	horizontal: {
		wrap: stylesH.chart__legend,
		item: stylesH['chart__legend-item'],
		color: stylesH['chart__legend-color'],
		label: stylesH['chart__legend-label'],
		line: stylesH['chart__legend-line'],
		lineDashed: stylesH['chart__legend-line--dashed'],
	},
	pie: {
		wrap: stylesP.pie__legend,
		item: stylesP['pie__legend-item'],
		color: stylesP['pie__legend-color'],
		label: stylesP['pie__legend-label'],
		line: undefined as unknown as string,
		lineDashed: undefined as unknown as string,
	},
	radar: {
		wrap: stylesR.radar__legend,
		item: stylesR['radar__legend-item'],
		color: stylesR['radar__legend-color'],
		label: stylesR['radar__legend-label'],
		line: undefined as unknown as string,
		lineDashed: undefined as unknown as string,
	},
} as const;

export function Legend({ variant, show, items, lineItems, legendMap, onEnter, onLeave, className = '' }: LegendProps) {
	if (!show) return null;
	const s = variantToStyles[variant];
	return (
		<div className={[s.wrap, className].filter(Boolean).join(' ')}>
			{items.map((item, index) => (
				<div key={index} className={s.item} onMouseEnter={() => onEnter?.(item.id)} onMouseLeave={onLeave}>
					<span className={s.color} style={{ backgroundColor: item.color }} aria-hidden="true" />
					<span className={s.label}>{item.label}</span>
				</div>
			))}

			{variant !== 'pie' && variant !== 'radar' && Array.isArray(lineItems) && legendMap && lineItems.map((li, idx) => {
				const l = legendMap.get(li.legendId);
				const color = l?.color || '#888888';
				return (
					<div key={`line-${idx}`} className={s.item} onMouseEnter={() => onEnter?.(li.legendId)} onMouseLeave={onLeave}>
						<span className={[s.line, li.dashed ? s.lineDashed : ''].filter(Boolean).join(' ')} style={{ borderColor: color }} aria-hidden="true" />
						<span className={s.label}>{l?.label || li.legendId}</span>
					</div>
				);
			})}
		</div>
	);
} 
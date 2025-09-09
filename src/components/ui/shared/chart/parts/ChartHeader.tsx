// import removed: React default import was unused
// import removed: next/image is not required
import stylesV from '@/components/ui/VerticalBarChart/VerticalBarChart.module.css';
import stylesH from '@/components/ui/HorizontalBarChart/HorizontalBarChart.module.css';
import stylesP from '@/components/ui/PieChart/PieChart.module.css';
import stylesR from '@/components/ui/RadarChart/RadarChart.module.css';
import type { ChartHeaderProps } from './ChartHeader.types';

const variantToStyles = {
	vertical: {
		wrap: stylesV.chart__header,
		icon: stylesV.chart__icon,
		titles: stylesV.chart__titles,
		title: stylesV.chart__title,
		subtitle: stylesV.chart__subtitle,
	},
	horizontal: {
		wrap: stylesH.chart__header,
		icon: stylesH.chart__icon,
		titles: stylesH.chart__titles,
		title: stylesH.chart__title,
		subtitle: stylesH.chart__subtitle,
	},
	pie: {
		wrap: stylesP.pie__header,
		icon: stylesP.pie__icon,
		titles: stylesP.pie__titles,
		title: stylesP.pie__title,
		subtitle: stylesP.pie__subtitle,
	},
	radar: {
		wrap: stylesR.radar__header,
		icon: stylesR.radar__icon,
		titles: stylesR.radar__titles,
		title: stylesR.radar__title,
		subtitle: stylesR.radar__subtitle,
	},
} as const;

export function ChartHeader({ variant, iconSrc, title, subtitle, className = '' }: ChartHeaderProps) {
	const s = variantToStyles[variant];
	if (!iconSrc && !title && !subtitle) return null;
	return (
		<div className={[s.wrap, className].filter(Boolean).join(' ')}>
			{iconSrc && (
				<div className={s.icon} aria-hidden="true">
					<img src={iconSrc} alt="" />
				</div>
			)}
			<div className={s.titles}>
				{title && <h3 className={s.title}>{title}</h3>}
				{subtitle && <p className={s.subtitle}>{subtitle}</p>}
			</div>
		</div>
	);
} 
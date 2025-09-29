import stylesV from '@/components/ui/VerticalBarChart/VerticalBarChart.module.css';
import type { CategoryGridProps } from './CategoryGrid.types';
import { classNames } from '@/utils/classNames';

export function CategoryGrid({ show, categoryCount, categorySpacing, showBaselineAxis, showLeftAxis }: CategoryGridProps) {
	if (!show) return null;
	return (
		<div
			className={classNames(
				stylesV.chart__vgrid,
				showBaselineAxis && stylesV['chart__vgrid--apsis'],
				showLeftAxis && stylesV['chart__vgrid--ordinat']
			)}
			aria-hidden="true"
			style={{ gap: `${categorySpacing}px` }}
		>
			{Array.from({ length: categoryCount }).map((_, index) => (
				<div key={index} className={stylesV['chart__vgrid-col']}>
					<div className={stylesV['chart__vgrid-line']} />
				</div>
			))}
		</div>
	);
} 

import stylesR from '@/components/ui/RadarChart/RadarChart.module.css';
import type { RadarGridProps } from './RadarGrid.types';

export function RadarGrid({ show, gridLevels, strokeColor = '#BEC1C6' }: RadarGridProps) {
	if (!show) return null;
	return (
		<g className={stylesR.radar__grid}>
			{gridLevels.map((points, idx) => (
				<polygon key={idx} className={stylesR['radar__grid-level']} points={points.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke={strokeColor} />
			))}
		</g>
	);
} 
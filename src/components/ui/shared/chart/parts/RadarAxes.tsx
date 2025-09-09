import stylesR from '@/components/ui/RadarChart/RadarChart.module.css';
import type { RadarAxesProps } from './RadarAxes.types';

export function RadarAxes({ show, center, endpoints, strokeColor = '#BEC1C6' }: RadarAxesProps) {
	if (!show) return null;
	return (
		<g>
			{endpoints.map((end, idx) => (
				<line key={`axis-${idx}`} className={stylesR.radar__axis} x1={center} y1={center} x2={end.x} y2={end.y} stroke={strokeColor} />
			))}
		</g>
	);
} 
import styles from './Legend.module.css';
import type { LegendProps } from './Legend.types';

export function Legend({ variant, show, items, lineItems, legendMap, onEnter, onLeave, className = '' }: LegendProps) {
	if (!show) return null;
	return (
		<div className={[styles.legend, className].filter(Boolean).join(' ')} data-variant={variant}>
			{items.map((item, index) => (
				<div key={index} className={styles.legendItem} onMouseEnter={() => onEnter?.(item.id)} onMouseLeave={onLeave}>
					<span className={styles.legendColor} style={{ backgroundColor: item.color }} aria-hidden="true" />
					<span className={styles.legendLabel}>{item.label}</span>
				</div>
			))}

			{variant !== 'pie' && variant !== 'radar' && Array.isArray(lineItems) && legendMap && lineItems.map((li, idx) => {
				const l = legendMap.get(li.legendId);
				const color = l?.color || '#888888';
				return (
					<div key={`line-${idx}`} className={styles.legendItem} onMouseEnter={() => onEnter?.(li.legendId)} onMouseLeave={onLeave}>
						<span className={[styles.legendLine, li.dashed ? styles.legendLineDashed : ''].filter(Boolean).join(' ')} style={{ borderColor: color }} aria-hidden="true" />
						<span className={styles.legendLabel}>{l?.label || li.legendId}</span>
					</div>
				);
			})}
		</div>
	);
}

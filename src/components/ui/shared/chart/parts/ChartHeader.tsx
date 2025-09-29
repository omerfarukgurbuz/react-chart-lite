import styles from './ChartHeader.module.css';
import type { ChartHeaderProps } from './ChartHeader.types';

export function ChartHeader({ variant, iconSrc, title, subtitle, className = '' }: ChartHeaderProps) {
	// variant is kept for API consistency; styles are shared
	if (!iconSrc && !title && !subtitle) return null;
	return (
		<div className={[styles.header, className].filter(Boolean).join(' ')} data-variant={variant}>
			{iconSrc && (
				<div className={styles.icon} aria-hidden="true">
					<img src={iconSrc} alt="" width={44} height={44} loading="lazy" decoding="async" />
				</div>
			)}
			<div className={styles.titles}>
				{title && <h3 className={styles.title}>{title}</h3>}
				{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
			</div>
		</div>
	);
}

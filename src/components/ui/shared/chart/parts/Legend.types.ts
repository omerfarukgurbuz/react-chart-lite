export type LegendVariant = 'vertical' | 'horizontal' | 'pie' | 'radar';
import type { ChartLegendItem } from '@/components/ui/shared/chart/types';
export type SharedLegendItem = ChartLegendItem;

export type SharedLineLegendItem = {
	legendId: string;
	dashed?: boolean;
};

export type LegendProps = {
	variant: LegendVariant;
	show: boolean;
	items: ReadonlyArray<SharedLegendItem>;
	lineItems?: ReadonlyArray<SharedLineLegendItem>;
	legendMap?: Map<string, SharedLegendItem>;
	onEnter?: (id: string) => void;
	onLeave?: () => void;
	className?: string;
}; 

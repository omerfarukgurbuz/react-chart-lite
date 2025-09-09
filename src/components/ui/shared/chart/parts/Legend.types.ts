export type LegendVariant = 'vertical' | 'horizontal' | 'pie' | 'radar';

export type SharedLegendItem = {
	id: string;
	label: string;
	color: string;
};

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
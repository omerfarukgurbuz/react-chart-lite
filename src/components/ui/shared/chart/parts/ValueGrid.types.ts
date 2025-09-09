export type Variant = 'verticalBar' | 'horizontalBar';

export type GridLine = { value: number; position: number };

export type ValueGridProps = {
	variant: Variant;
	orientation: 'horizontal' | 'vertical';
	show: boolean;
	gridLines: GridLine[];
	formatter?: (value: number) => string;
}; 
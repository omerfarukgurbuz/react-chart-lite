// Shared chart types to unify props and avoid duplication across components

export type GridLineVariant = 'dashed' | 'solid' | 'dotted';

export type ChartLegendItem = {
  id: string;
  label: string;
  color: string;
  /** Optional opacity for filled areas (used by Radar); ignored elsewhere */
  fillOpacity?: number;
};

// Minimal bar datum used by bar-like charts; optional label for flexibility
export type BarDatum = {
  value: number;
  legendId: string;
  tooltip?: string;
  label?: string;
};


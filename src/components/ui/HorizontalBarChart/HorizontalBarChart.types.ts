import type React from 'react';
import type { BarDatum, ChartLegendItem } from '@/components/ui/shared/chart/types';
import type { ChartScale } from '@/utils/scale';
import type { BarChartCommonProps } from '@/components/ui/shared/bar/BarChartBase.types';
export type { ChartLegendItem } from '@/components/ui/shared/chart/types';
export type { ChartScale } from '@/utils/scale';

export type ChartBar = BarDatum; // keep exported name for API compatibility

export interface ChartDataItem {
  /** Y ekseninde görünecek kategori etiketi */
  category: string;
  /** Bu kategoriye ait bar'lar */
  bars: ReadonlyArray<ChartBar>;
}

export interface HorizontalBarChartProps extends BarChartCommonProps<ChartBar> {
  /** Grafik verisi */
  data: ReadonlyArray<ChartDataItem>;
  /** Bar yüksekliği (px) */
  barHeight?: number;
  /** İç parça sınıfları için override */
  classes?: {
    root?: string;
    container?: string;
    body?: string;
    rows?: string;
    row?: string;
    rowLabel?: string;
    rowBars?: string;
    barWrapper?: string;
    bar?: string;
    barValue?: string;
    tooltip?: string;
  };
}

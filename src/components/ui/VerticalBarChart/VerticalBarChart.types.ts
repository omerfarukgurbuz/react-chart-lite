import type React from 'react';
import type { ChartLegendItem, GridLineVariant, BarDatum } from '@/components/ui/shared/chart/types';
import type { ChartScale } from '@/utils/scale';
import type { BarChartCommonProps } from '@/components/ui/shared/bar/BarChartBase.types';
export type VerticalBarChartScale = ChartScale;

export type VerticalBarChartBar = BarDatum; // keep exported name for API compatibility
export type { ChartLegendItem } from '@/components/ui/shared/chart/types';

export interface VerticalBarChartDataItem {
  /** Y ekseninde görünecek kategori etiketi */
  category: string;
  /** Bu kategoriye ait bar'lar */
  bars: ReadonlyArray<VerticalBarChartBar>;
}

export interface VerticalBarChartLineSeries {
  /** Kategoriler ile aynı sırada olacak şekilde değerler dizisi */
  values: ReadonlyArray<number>;
  /** Legend mapping id for color/label */
  legendId: string;
  /** Kesik çizgi için */
  dashed?: boolean;
}

export interface VerticalBarChartProps extends BarChartCommonProps<VerticalBarChartBar> {
  /** Grafik verisi */
  data: ReadonlyArray<VerticalBarChartDataItem>;
  /** Kategori ızgarası (dikey kolonlar) görünürlüğü */
  showCategoryGrid?: boolean;
  /** Grafik dikey alan yüksekliği (px) */
  chartHeight?: number;
  /** Çizgi grafiğinin gösterilip gösterilmeyeceği */
  showLine?: boolean;
  /** Bir veya birden fazla çizgi serisi */
  lineSeries?: ReadonlyArray<VerticalBarChartLineSeries>;
  /** Çizgi kalınlığı (px) */
  lineWidth?: number;
  /** Noktaların (point) gösterimi */
  showLinePoints?: boolean;
  /** Nokta yarıçapı (px) */
  linePointRadius?: number;
  /** İç parça sınıfları için override */
  classes?: {
    root?: string;
    container?: string;
    body?: string;
    columns?: string;
    group?: string;
    bar?: string;
    barValue?: string;
    xLabels?: string;
    xLabel?: string;
    lineLayer?: string;
    tooltip?: string;
  };
} 

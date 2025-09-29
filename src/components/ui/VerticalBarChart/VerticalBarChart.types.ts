import type React from 'react';
import type { ChartLegendItem, GridLineVariant, BarDatum } from '@/components/ui/shared/chart/types';
import type { ChartScale } from '@/utils/scale';
export type VerticalBarChartScale = ChartScale;

export type VerticalBarChartBar = BarDatum; // keep exported name for API compatibility
export type { ChartLegendItem } from '@/components/ui/shared/chart/types';

export interface VerticalBarChartDataItem {
  /** Y ekseninde görünecek kategori etiketi */
  category: string;
  /** Bu kategoriye ait bar'lar */
  bars: VerticalBarChartBar[];
}

export interface VerticalBarChartLineSeries {
  /** Kategoriler ile aynı sırada olacak şekilde değerler dizisi */
  values: number[];
  /** Legend mapping id for color/label */
  legendId: string;
  /** Kesik çizgi için */
  dashed?: boolean;
}

  export interface VerticalBarChartProps {
  /** Grafik verisi */
  data: ReadonlyArray<VerticalBarChartDataItem>;
  /** Explicit legend items mapping ids to labels and colors */
  legends: ReadonlyArray<ChartLegendItem>;
  /** X ekseni ölçek ayarları */
  scale?: VerticalBarChartScale;
  /** Grafik başlığı */
  title?: string;
  /** Başlığın altında gösterilecek alt başlık */
  subtitle?: string;
  /** Başlığın solunda 44x44 ikon görseli */
  iconSrc?: string;
  /** Legend'ın gösterilip gösterilmeyeceği */
  showLegend?: boolean;
  /** Aynı grup içindeki bar'lar arası boşluk (px) */
  barSpacing?: number;
  /** Gruplar (kategoriler) arası yatay boşluk (px) */
  categorySpacing?: number;
  /** Grid çizgilerinin genel olarak gösterilip gösterilmeyeceği (ana anahtar) */
  showGrid?: boolean;
  /** Yatay grid çizgilerinin gösterilip gösterilmeyeceği */
  showHorizontalGrid?: boolean;
  /** Dikey grid çizgilerinin gösterilip gösterilmeyeceği */
  showVerticalGrid?: boolean;
  /** Grid çizgisi stili (noktalı/ düz) */
  gridLineVariant?: GridLineVariant;
  /** Değerlerin bar üzerinde gösterilip gösterilmeyeceği */
  showValues?: boolean;
  /** Animasyon aktif mi? */
  animated?: boolean;
  /** Animasyon süresi (ms) */
  animationDuration?: number;
  /** Grafik dikey alan yüksekliği (px) */
  chartHeight?: number;
  /** Ek CSS sınıfları */
  className?: string;
  /** Inline stil */
  style?: React.CSSProperties;
  /** Component ID'si */
  id?: string;
  /** Bar'a tıklandığında tetiklenen event */
  onBarClick?: (data: VerticalBarChartBar, categoryIndex: number, barIndex: number) => void;
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
  /** Apsis çizgisini (alt sınır) göster */
  apsis?: boolean;
  /** Ordinat çizgisini (sol sınır) göster */
  ordinat?: boolean;
  /** Hover'da değer baloncuğunu göster */
  showTooltip?: boolean;
  /** Varsayılan stilleri kapatır (yalın çıktı) */
  unstyled?: boolean;
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

import type React from 'react';
import type { ChartLegendItem, GridLineVariant, BarDatum } from '@/components/ui/shared/chart/types';
import type { ChartScale } from '@/utils/scale';
export type { ChartLegendItem } from '@/components/ui/shared/chart/types';
export type { ChartScale } from '@/utils/scale';

export type ChartBar = BarDatum; // keep exported name for API compatibility

export interface ChartDataItem {
  /** Y ekseninde görünecek kategori etiketi */
  category: string;
  /** Bu kategoriye ait bar'lar */
  bars: ChartBar[];
}

export interface HorizontalBarChartProps {
  /** Grafik verisi */
  data: ChartDataItem[];
  /** Explicit legend items mapping ids to labels and colors */
  legends: ChartLegendItem[];
  /** X ekseni ölçek ayarları */
  scale?: ChartScale;
  /** Grafik başlığı */
  title?: string;
  /** Başlığın altında gösterilecek alt başlık */
  subtitle?: string;
  /** Başlığın solunda 44x44 ikon görseli */
  iconSrc?: string;
  /** Legend'ın gösterilip gösterilmeyeceği */
  showLegend?: boolean;
  /** Bar yüksekliği (px) */
  barHeight?: number;
  /** Bar'lar arası boşluk (px) */
  barSpacing?: number;
  /** Kategoriler arası boşluk (px) */
  categorySpacing?: number;
  /** Grid çizgilerinin gösterilip gösterilmeyeceği (ana anahtar) */
  showGrid?: boolean;
  /** Dikey değer ızgarası (X ekseni değer çizgileri) görünürlüğü */
  showVerticalGrid?: boolean;
  /** Grid çizgisi stili (noktalı/ düz) */
  gridLineVariant?: GridLineVariant;
  /** Apsis çizgisini (alt sınır) göster */
  apsis?: boolean;
  /** Ordinat çizgisini (sol sınır) göster */
  ordinat?: boolean;
  /** Değerlerin bar üzerinde gösterilip gösterilmeyeceği */
  showValues?: boolean;
  /** Animasyon aktif mi? */
  animated?: boolean;
  /** Animasyon süresi (ms) */
  animationDuration?: number;
  /** Ek CSS sınıfları */
  className?: string;
  /** Inline stil */
  style?: React.CSSProperties;
  /** Component ID'si */
  id?: string;
  /** Bar'a tıklandığında tetiklenen event */
  onBarClick?: (data: ChartBar, categoryIndex: number, barIndex: number) => void;
  /** Hover'da değer baloncuğunu göster */
  showTooltip?: boolean;
  /** Varsayılan stilleri kapatır (yalın çıktı) */
  unstyled?: boolean;
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

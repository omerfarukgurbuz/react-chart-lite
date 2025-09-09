import type React from 'react';

export interface ChartLegendItem {
  /** Unique id to match bars/series */
  id: string;
  /** Visible label shown in legend */
  label: string;
  /** Color used for rendering bars/series */
  color: string;
}

export interface ChartBar {
  /** Bar için görüntülenecek metin etiketi */
  label: string;
  /** Bar'ın sayısal değeri */
  value: number;
  /** Legend item id that provides color and legend label */
  legendId: string;
  /** Opsiyonel tooltip veya açıklama metni */
  tooltip?: string;
}

export interface ChartDataItem {
  /** Y ekseninde görünecek kategori etiketi */
  category: string;
  /** Bu kategoriye ait bar'lar */
  bars: ChartBar[];
}

export interface ChartScale {
  /** X ekseninin minimum değeri */
  min: number;
  /** X ekseninin maksimum değeri */
  max: number;
  /** X ekseninde gösterilecek aralık sayısı */
  intervals: number;
  /** Değerlerin formatlanması için opsiyonel formatter fonksiyonu */
  formatter?: (value: number) => string;
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
  gridLineVariant?: 'dashed' | 'solid' | 'dotted';
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
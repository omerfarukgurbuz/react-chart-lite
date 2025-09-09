# VerticalBarChart

Dikey bar grafiği ve opsiyonel çizgi katmanı. Tek/çok seriyi destekler; sadece bar, sadece çizgi veya hibrit (bar + çizgi) görünüm kullanılabilir. Ölçek sağlanmazsa otomatik hesaplanır.

- Tailwind bağımlılığı yoktur; CSS Modules bileşenin içinde gelir.
- Bar ve çizgi renk/etiket bilgisi legend üzerinden yönetilir; veri serileri `legendId` ile eşleşir.
- `unstyled` ve `classes` ile görünümü tamamen özelleştirebilirsiniz.

## Kurulum

```bash
# npm
npm i react-chart-lite

# yarn
yarn add react-chart-lite

# pnpm
pnpm add react-chart-lite
```

Peer dependencies:
- react: ^18 || ^19
- react-dom: ^18 || ^19

Ek stil importu gerekmez. Bileşenler kendi CSS Module dosyalarını içe aktarır.

## Hızlı Başlangıç (Bar + Çizgi)

```tsx
import { VerticalBarChart } from 'react-chart-lite';

const legends = [
  { id: 'sales', label: 'Satış', color: '#3B82F6' },
  { id: 'target', label: 'Hedef', color: '#10B981' },
  { id: 'trend', label: 'Trend', color: '#EF4444' },
];

const data = [
  { category: 'Ocak', bars: [
    { label: 'Satış', value: 120, legendId: 'sales' },
    { label: 'Hedef', value: 100, legendId: 'target' }
  ]},
  { category: 'Şubat', bars: [
    { label: 'Satış', value: 150, legendId: 'sales' },
    { label: 'Hedef', value: 120, legendId: 'target' }
  ]},
];

const lineSeries = [
  { legendId: 'trend', values: [110, 135], dashed: false },
];

export default function Example() {
  return (
    <VerticalBarChart
      data={data}
      legends={legends}
      title="Satış & Hedef & Trend"
      showLegend
      showGrid
      showHorizontalGrid
      showVerticalGrid
      showLine
      lineSeries={lineSeries}
      showLinePoints
      showTooltip
    />
  );
}
```

## Veri Modeli

- **Legend (renk/etiket):**
```ts
interface ChartLegendItem {
  id: string;    // legend kimliği; bar/çizgi legendId ile eşleşir
  label: string; // görünür legend etiketi
  color: string; // renk
}
```
- **Bar/Kategori:**
```ts
interface VerticalBarChartBar {
  label: string;
  value: number;
  legendId: string;
  tooltip?: string;
}

interface VerticalBarChartDataItem {
  category: string;                     // X ekseni etiketi
  bars: ReadonlyArray<VerticalBarChartBar>;
}
```
- **Çizgi Serisi:**
```ts
interface VerticalBarChartLineSeries {
  values: number[];       // kategori sırası ile aynı uzunlukta olmalı
  legendId: string;       // renk/etiket için legends[id]
  dashed?: boolean;       // kesikli çizgi
}
```
- **Ölçek (opsiyonel):**
```ts
interface VerticalBarChartScale {
  min: number;
  max: number;
  intervals: number;                    // yatay grid çizgisi sayısı
  formatter?: (v: number) => string;    // grid etiket biçimi
}
```

## Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| data | `VerticalBarChartDataItem[]` | - | Zorunlu. Bar verileri |
| legends | `ChartLegendItem[]` | - | Zorunlu. Renk/etiket eşlemesi |
| scale | `VerticalBarChartScale` | Otomatik | Y ekseni ölçeği |
| title | `string` | - | Başlık |
| subtitle | `string` | - | Alt başlık |
| iconSrc | `string` | - | 44x44 ikon |
| showLegend | `boolean` | `true` | Legend görünürlüğü |
| barSpacing | `number` | `2` | Aynı gruptaki barlar arası boşluk (px) |
| categorySpacing | `number` | `8` | Kategoriler arası boşluk (px) |
| showGrid | `boolean` | `true` | Grid ana anahtar |
| showHorizontalGrid | `boolean` | `true` | Yatay grid |
| showVerticalGrid | `boolean` | `false` | Dikey grid |
| gridLineVariant | `'solid' | 'dashed' | 'dotted'` | `'dashed'` | Grid çizgisi stili |
| showValues | `boolean` | `false` | Bar üstünde değeri göster |
| animated | `boolean` | `true` | Animasyon |
| animationDuration | `number` | `500` | Animasyon süresi (ms) |
| chartHeight | `number` | `368` | Grafik yüksekliği (px) |
| className | `string` | `''` | Ek sınıf |
| style | `React.CSSProperties` | - | Inline stil |
| id | `string` | - | Kök öğe id |
| onBarClick | `(bar, categoryIndex, barIndex) => void` | - | Tıklama olayı |
| showLine | `boolean` | `false` | Çizgi katmanını aç |
| lineSeries | `VerticalBarChartLineSeries[]` | `[]` | Çizgi serileri (legendId ile) |
| lineWidth | `number` | `2` | Çizgi kalınlığı (px) |
| showLinePoints | `boolean` | `true` | Çizgi noktaları |
| linePointRadius | `number` | `4` | Nokta yarıçapı (px) |
| apsis | `boolean` | `true` | Alt sınır çizgisi |
| ordinat | `boolean` | `true` | Sol sınır çizgisi |
| showTooltip | `boolean` | `false` | Hover tooltip |
| unstyled | `boolean` | `false` | Varsayılan stilleri kapat |
| classes | `Record<string,string>` | - | İç parça sınıf override'ları |

### classes anahtarları
- **root, container, body, columns, group, bar, barValue, xLabels, xLabel, lineLayer, tooltip**

## Etkileşimler
- Legend hover, bar/çizgi katmanında ilgili olmayan öğeleri soluklaştırır.
- Tooltip açıkken imleç konumunda gösterilir; kapalıyken `<title>` etiketi kullanılır.
- Erişilebilirlik: Barlar `button` olarak render edilir, `aria-label` atanır; tooltip `role="status"` ve `aria-live="polite"` ile duyurulur.

## Ölçek
- Sağlanmazsa bar ve çizgi değerlerine göre birlikte "nice" ölçek üretilir (min=0, intervals=5).
- `formatter` ile birim/para/yüzde biçimi uygulanabilir.

## Tema ve Özelleştirme

### CSS değişkenleri
- `--rcl-surface-bg`
- `--rcl-font-family`
- `--rcl-text-primary`
- `--rcl-text-muted`
- `--rcl-grid-bottom-color`
- `--rcl-border-color`
- `--rcl-tooltip-bg`, `--rcl-tooltip-text`
- `--rcl-on-primary`

```css
:root {
  --rcl-surface-bg: #0b1220;
  --rcl-text-primary: #e7e9ee;
  --rcl-text-muted: #9aa3b2;
  --rcl-border-color: #253048;
}
```

### unstyled + classes
```tsx
<VerticalBarChart
  data={data}
  legends={legends}
  unstyled
  classes={{
    root: 'myRoot',
    columns: 'myColumns',
    bar: 'myBar',
    lineLayer: 'myLineLayer',
    tooltip: 'myTooltip',
  }}
/>
```

## Notlar
- `lineSeries.values` uzunluğu kategori sayısı ile aynı olmalıdır (fazlası yok sayılır).
- Grid stili: `gridLineVariant` ile `solid/dashed/dotted`.
- Büyük veri setleri için animasyonları kapatabilir (`animated={false}`) veya kendi sanallaştırma yaklaşımınızı uygulayabilirsiniz.
- SSR/CSR: Server-render güvenli; tooltip ölçümleri ve animasyonlar yalnızca tarayıcıda etkinleşir. 
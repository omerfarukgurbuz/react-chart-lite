# HorizontalBarChart

Yatay bar grafiği bileşeni. Bir veya birden fazla seri için kategorilere göre değerleri yatay barlar halinde gösterir. Ölçek (scale) verilmezse veri aralığına göre otomatik hesaplanır.

- Tailwind bağımlılığı yoktur; CSS Modules bileşenin içinde gelir.
- `legends` ile renk/etiket yönetimi yapılır; bar'lar `legendId` ile eşleştirilir.
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

Ek stil importu gerekmez. Bileşenler kendi CSS Module dosyalarını içe aktarır. Bundler'ınız (Vite/Next.js/CRA) CSS Modules destekliyorsa ekstra ayar gerektirmez. Desteklemeyen ortamlarda `unstyled` kullanıp kendi stillerinizi geçebilirsiniz.

## Hızlı Başlangıç

```tsx
import { HorizontalBarChart } from 'react-chart-lite';

const legends = [
  { id: 'income', label: 'Gelir', color: '#10B981' },
  { id: 'expense', label: 'Gider', color: '#F59E0B' },
];

const data = [
  {
    category: 'Ocak',
    bars: [
      { label: 'Gelir', value: 450, legendId: 'income' },
      { label: 'Gider', value: 380, legendId: 'expense' },
    ],
  },
  {
    category: 'Şubat',
    bars: [
      { label: 'Gelir', value: 520, legendId: 'income' },
      { label: 'Gider', value: 410, legendId: 'expense' },
    ],
  },
];

export default function Example() {
  return (
    <HorizontalBarChart
      data={data}
      legends={legends}
      title="Gelir-Gider"
      showLegend
      showGrid
      showTooltip
      showVerticalGrid
      showHorizontalGrid
      gridLineVariant="dashed"
      apsis
      ordinat
    />
  );
}
```

## Veri Modeli

- **Legend (renk/etiket):**
```ts
// Color/label mapping
interface ChartLegendItem {
  id: string;      // bar.legendId ile eşleşir
  label: string;   // legend görünür etiketi
  color: string;   // bar rengi
}
```
- **Bar ve Kategori:**
```ts
interface ChartBar {
  label: string;        // Bar için metin etiketi (legend etiketinden farklı olabilir)
  value: number;        // Sayısal değer
  legendId: string;     // Renk/etiket için ChartLegendItem.id
  tooltip?: string;     // Hover içeriği (opsiyonel)
}

interface ChartDataItem {
  category: string;     // Sol sütunda gösterilen kategori
  bars: ChartBar[];     // Bu kategoriye ait barlar
}
```
- **Ölçek (opsiyonel):**
```ts
interface ChartScale {
  min: number;
  max: number;
  intervals: number;                    // ızgara çizgisi sayısı
  formatter?: (v: number) => string;    // grid etiketleri için biçimlendirme
}
```

## Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| data | `ChartDataItem[]` | - | Zorunlu. Grafik verisi |
| legends | `ChartLegendItem[]` | - | Zorunlu. Renk/etiket eşlemesi |
| scale | `ChartScale` | Otomatik | X eksen ölçeği (min, max, intervals, formatter) |
| title | `string` | - | Başlık |
| subtitle | `string` | - | Alt başlık |
| iconSrc | `string` | - | 44x44 ikon görseli |
| showLegend | `boolean` | `true` | Legend görünsün mü |
| barHeight | `number` | `30` | Bar yüksekliği (px) |
| barSpacing | `number` | `2` | Aynı kategori içindeki barlar arası boşluk (px) |
| categorySpacing | `number` | `8` | Kategoriler arası boşluk (px) |
| showGrid | `boolean` | `true` | Grid ana anahtar |
| showVerticalGrid | `boolean` | `true` | Dikey değer ızgarası |
| showHorizontalGrid | `boolean` | `false` | Yatay kategori çizgileri |
| gridLineVariant | `'solid' \| 'dashed' \| 'dotted'` | `'dashed'` | Grid çizgisi stili |
| apsis | `boolean` | `true` | Alt sınır çizgisi |
| ordinat | `boolean` | `true` | Sol sınır çizgisi |
| showValues | `boolean` | `false` | Bar üstünde değeri göster |
| animated | `boolean` | `true` | Animasyon |
| animationDuration | `number` | `500` | Animasyon süresi (ms) |
| className | `string` | `''` | Ek sınıf |
| style | `React.CSSProperties` | - | Inline stil |
| id | `string` | - | Kök öğe id |
| onBarClick | `(bar, categoryIndex, barIndex) => void` | - | Tıklama olayı |
| showTooltip | `boolean` | `false` | Hover tooltip aktif |
| unstyled | `boolean` | `false` | Varsayılan stilleri kapat |
| classes | `Record<string,string>` | - | İç parça sınıf override'ları |

### classes anahtarları
- **root, container, body, rows, row, rowLabel, rowBars, barWrapper, bar, barValue, tooltip**

## Etkileşimler
- Legend üzerinde hover, ilgili olmayan barları soluklaştırır.
- `showTooltip` açıkken imleç konumuna göre tooltip gösterilir; kapalıyken `<title>` attribute'u kullanılır.
- Erişilebilirlik: Bar butonları `aria-label` ile açıklanır; tooltip `role="status"` ve `aria-live="polite"` ile duyurulur.

## Ölçek
- Sağlanmazsa min=0, otomatik `max` ve `intervals=5` hesaplanır.
- `formatter` ile grid etiketlerini özelleştirebilirsiniz (örn. yüzde, adet, para birimi).

## Tema ve Özelleştirme

### CSS değişkenleri
Aşağıdaki CSS custom property'leri tema için kullanılabilir:

- `--rcl-surface-bg` (arka plan, varsayılan `#fff`)
- `--rcl-font-family` (yazı tipi ailesi)
- `--rcl-text-primary` (ana metin rengi)
- `--rcl-text-muted` (ikincil metin rengi)
- `--rcl-grid-bottom-color` (alt çizgi rengi)
- `--rcl-border-color` (ızgara çizgileri)
- `--rcl-tooltip-bg`, `--rcl-tooltip-text`
- `--rcl-on-primary` (bar üstü metin rengi)

```css
/* Örnek: Tema değişkenleri */
:root {
  --rcl-surface-bg: #0b1220;
  --rcl-text-primary: #e7e9ee;
  --rcl-text-muted: #9aa3b2;
  --rcl-border-color: #253048;
  --rcl-tooltip-bg: #111827;
}
```

### unstyled + classes
```tsx
<HorizontalBarChart
  data={data}
  legends={legends}
  unstyled
  classes={{
    root: 'myRoot',
    bar: 'myBar',
    tooltip: 'myTooltip',
  }}
/>
```

## Performans ve SSR
- Animasyonlar (varsayılan açık) performans dostu gecikmelerle tetiklenir.
- SSR/CSR ortamlarında ek ayar gerektirmez; tooltip ölçümü, gövde öğesi sınırları içinde yapılır. 
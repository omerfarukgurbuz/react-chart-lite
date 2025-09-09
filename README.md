# react-chart-lite

Hafif, stil bağımsız, React 18/19 uyumlu grafik bileşenleri. CSS Modules ile gelir; theming için CSS değişkenleri ve `unstyled`/`classes` ile tam özelleştirme sunar.

![npm version](https://img.shields.io/npm/v/react-chart-lite?color=blue)
![license](https://img.shields.io/github/license/omerfarukgurbuz/react-chart-lite)
![CI](https://img.shields.io/github/actions/workflow/status/omerfarukgurbuz/react-chart-lite/release.yml?label=release)
![CI](https://img.shields.io/github/actions/workflow/status/omerfarukgurbuz/react-chart-lite/ci.yml?label=ci)
![types](https://img.shields.io/badge/types-TypeScript-blue)

<p align="center">
  <img src="docs/main.gif" alt="react-chart-lite showcase: Weekly Metrics" />
  <br/>
  <img src="docs/1.png" alt="react-chart-lite vertical" />
   <br/>
  <img src="docs/2.png" alt="react-chart-lite radar" />
   <br/>
  <img src="docs/3.png" alt="react-chart-lite pie" />
   <br/>
  <img src="docs/4.png" alt="react-chart-lite horizontal" />
</p>



## İçindekiler

- [Özellikler](#özellikler)
- [Kurulum](#kurulum)
- [Hızlı Başlangıç](#hızlı-başlangıç)
- [Bileşenler ve API](#bileşenler-ve-api)
- [Bileşen Dokümantasyonu](#bileşen-dokümantasyonu)
  - [HorizontalBarChart](#horizontalbarchart)
  - [VerticalBarChart](#verticalbarchart)
  - [PieChart](#piechart)
  - [RadarChart](#radarchart)
- [Theming ve Özelleştirme](#theming-ve-özelleştirme)
- [SSR/CSR](#ssrcsr)
- [Erişilebilirlik](#erişilebilirlik)
- [Örnekler](#örnekler)
- [Showcase](#showcase)
- [Paketleme ve Kullanım Notları](#paketleme-ve-kullanım-notları)
- [Katkı ve Sürümleme](#katkı-ve-sürümleme)
- [Lisans](#lisans)

## Özellikler

- Hafif ve bağımsız: Yalnızca React peer dependency
- React 18/19 uyumlu, TypeScript ile güçlü tipler
- SSR uyumlu; etkileşim/ölçüm tarayıcıda etkinleşir
- CSS Modules tabanlı; `unstyled`, `classes`, `className`, `style` ile tam kontrol
- CSS custom properties ile tema oluşturma
- Erişilebilirlik dostu (klavye ve screen reader)
- Ağaç-sallama uyumlu ESM dağıtımı
- Tailwind'e bağımlı değil (yalnızca örneklerde kullanılabilir)

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

## Hızlı Başlangıç

```tsx
import { HorizontalBarChart, VerticalBarChart } from 'react-chart-lite';

const legends = [
  { id: 'income', label: 'Income', color: '#10B981' },
  { id: 'expense', label: 'Expense', color: '#F59E0B' },
];

const data = [
  { category: 'Jan', bars: [
    { label: 'Income', value: 450, legendId: 'income' },
    { label: 'Expense', value: 380, legendId: 'expense' },
  ]},
  { category: 'Feb', bars: [
    { label: 'Income', value: 520, legendId: 'income' },
    { label: 'Expense', value: 410, legendId: 'expense' },
  ]},
];

export default function Example() {
  return (
    <div>
      <HorizontalBarChart
        data={data}
        legends={legends}
        title="Income vs Expense"
        showLegend
        showGrid
        showTooltip
      />

      <VerticalBarChart
        data={data}
        legends={legends}
        title="Income vs Expense (Vertical)"
        showLegend
        showGrid
        showHorizontalGrid
        showTooltip
      />
    </div>
  );
}
```

## Bileşenler ve API

```ts
// Components
HorizontalBarChart
VerticalBarChart
PieChart
RadarChart

// Shared parts
ChartHeader
Legend
ValueGrid
CategoryGrid
RadarGrid
RadarAxes

// Types
HorizontalBarChartProps, ChartBar, HorizontalBarChartLegendItem
VerticalBarChartProps, VerticalBarChartDataItem, VerticalBarChartScale, VerticalBarChartLineSeries, VerticalBarChartLegendItem
PieChartProps, PieChartDatum, PieChartLegendItem
RadarChartProps, RadarChartSeries, RadarChartScale, RadarChartLegendItem
```

## Bileşen Dokümantasyonu

### HorizontalBarChart

Yatay bar grafiği bileşeni. Bir veya birden fazla seri için kategorilere göre değerleri yatay barlar halinde gösterir. Ölçek verilmezse veri aralığına göre otomatik hesaplanır.

- Tailwind bağımlılığı yoktur; CSS Modules bileşenin içinde gelir.
- `legends` ile renk/etiket yönetimi yapılır; bar'lar `legendId` ile eşleştirilir.
- `unstyled` ve `classes` ile görünümü tamamen özelleştirebilirsiniz.

#### Veri Modeli

```ts
interface ChartLegendItem {
  id: string;      // bar.legendId ile eşleşir
  label: string;   // legend etiketi
  color: string;   // bar rengi
}

interface ChartBar {
  label: string;
  value: number;
  legendId: string;
  tooltip?: string;
}

interface ChartDataItem {
  category: string; // Sol sütunda gösterilen kategori
  bars: ChartBar[];
}

interface ChartScale {
  min: number;
  max: number;
  intervals: number;                    // ızgara sayısı
  formatter?: (v: number) => string;    // grid etiket biçimi
}
```

#### Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| data | `ChartDataItem[]` | - | Zorunlu. Grafik verisi |
| legends | `ChartLegendItem[]` | - | Zorunlu. Renk/etiket eşlemesi |
| scale | `ChartScale` | Otomatik | X eksen ölçeği |
| title | `string` | - | Başlık |
| subtitle | `string` | - | Alt başlık |
| iconSrc | `string` | - | 44x44 ikon |
| showLegend | `boolean` | `true` | Legend görünürlüğü |
| barHeight | `number` | `30` | Bar yüksekliği (px) |
| barSpacing | `number` | `2` | Aynı kategori içi boşluk (px) |
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
| showTooltip | `boolean` | `false` | Hover tooltip |
| unstyled | `boolean` | `false` | Varsayılan stilleri kapat |
| classes | `Record<string,string>` | - | İç parça sınıf override'ları |

- `classes` anahtarları: `root, container, body, rows, row, rowLabel, rowBars, barWrapper, bar, barValue, tooltip`

#### Etkileşimler

- Legend hover, ilgili olmayan barları soluklaştırır.
- `showTooltip` açıkken imleç konumuna göre tooltip gösterilir; kapalıyken `<title>` kullanılır.
- Erişilebilirlik: Bar butonları `aria-label` ile açıklanır; tooltip `role="status"` ve `aria-live="polite"` ile duyurulur.

#### Ölçek

- Sağlanmazsa `min=0`, otomatik `max` ve `intervals=5` hesaplanır.
- `formatter` ile grid etiketlerini özelleştirebilirsiniz (yüzde, adet, para).

#### Tema ve Özelleştirme

- CSS değişkenleri: `--rcl-surface-bg`, `--rcl-font-family`, `--rcl-text-primary`, `--rcl-text-muted`, `--rcl-grid-bottom-color`, `--rcl-border-color`, `--rcl-tooltip-bg`, `--rcl-tooltip-text`, `--rcl-on-primary`.

```tsx
<HorizontalBarChart
  data={data}
  legends={legends}
  unstyled
  classes={{ root: 'myRoot', bar: 'myBar', tooltip: 'myTooltip' }}
/>
```

---

### VerticalBarChart

Dikey bar grafiği ve opsiyonel çizgi katmanı. Tek/çok seriyi destekler; sadece bar, sadece çizgi veya hibrit (bar + çizgi) görünüm kullanılabilir.

- Tailwind bağımlılığı yoktur; CSS Modules bileşenin içinde gelir.
- Bar ve çizgi renk/etiket bilgisi legend üzerinden yönetilir; veri serileri `legendId` ile eşleşir.
- `unstyled` ve `classes` ile görünümü tamamen özelleştirebilirsiniz.

#### Veri Modeli

```ts
interface ChartLegendItem { id: string; label: string; color: string }

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

interface VerticalBarChartLineSeries {
  values: number[];       // kategori sırası ile aynı uzunlukta
  legendId: string;       // renk/etiket için legends[id]
  dashed?: boolean;       // kesikli çizgi
}

interface VerticalBarChartScale {
  min: number;
  max: number;
  intervals: number;                    // yatay grid çizgisi sayısı
  formatter?: (v: number) => string;    // grid etiket biçimi
}
```

#### Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| data | `VerticalBarChartDataItem[]` | - | Zorunlu. Bar verileri |
| legends | `ChartLegendItem[]` | - | Zorunlu. Renk/etiket |
| scale | `VerticalBarChartScale` | Otomatik | Y ekseni ölçeği |
| title | `string` | - | Başlık |
| subtitle | `string` | - | Alt başlık |
| iconSrc | `string` | - | 44x44 ikon |
| showLegend | `boolean` | `true` | Legend |
| barSpacing | `number` | `2` | Aynı gruptaki barlar arası boşluk (px) |
| categorySpacing | `number` | `8` | Kategoriler arası boşluk (px) |
| showGrid | `boolean` | `true` | Grid anahtar |
| showHorizontalGrid | `boolean` | `true` | Yatay grid |
| showVerticalGrid | `boolean` | `false` | Dikey grid |
| gridLineVariant | `'solid' \| 'dashed' \| 'dotted'` | `'dashed'` | Grid çizgisi stili |
| showValues | `boolean` | `false` | Bar üstünde değeri göster |
| animated | `boolean` | `true` | Animasyon |
| animationDuration | `number` | `500` | Animasyon süresi (ms) |
| chartHeight | `number` | `368` | Grafik yüksekliği (px) |
| className | `string` | `''` | Ek sınıf |
| style | `React.CSSProperties` | - | Inline stil |
| id | `string` | - | Kök öğe id |
| onBarClick | `(bar, categoryIndex, barIndex) => void` | - | Tıklama olayı |
| showLine | `boolean` | `false` | Çizgi katmanını aç |
| lineSeries | `VerticalBarChartLineSeries[]` | `[]` | Çizgi serileri |
| lineWidth | `number` | `2` | Çizgi kalınlığı (px) |
| showLinePoints | `boolean` | `true` | Çizgi noktaları |
| linePointRadius | `number` | `4` | Nokta yarıçapı (px) |
| apsis | `boolean` | `true` | Alt sınır çizgisi |
| ordinat | `boolean` | `true` | Sol sınır çizgisi |
| showTooltip | `boolean` | `false` | Hover tooltip |
| unstyled | `boolean` | `false` | Varsayılan stil kapat |
| classes | `Record<string,string>` | - | İç parça sınıf override'ları |

- `classes` anahtarları: `root, container, body, columns, group, bar, barValue, xLabels, xLabel, lineLayer, tooltip`

#### Etkileşimler ve Notlar

- Legend hover, bar/çizgi katmanında ilgili olmayan öğeleri soluklaştırır.
- Tooltip açıkken imleç konumunda gösterilir; kapalıyken `<title>` etiketi kullanılır.
- `lineSeries.values` uzunluğu kategori sayısı ile aynı olmalıdır.
- Büyük veri setlerinde animasyonları kapatmak (`animated={false}`) performans için faydalıdır.

#### Ölçek ve Tema

- Sağlanmazsa bar+çizgi değerlerine göre birlikte "nice" ölçek üretilir (min=0, intervals=5).
- CSS değişkenleri: `--rcl-surface-bg`, `--rcl-text-primary`, `--rcl-text-muted`, `--rcl-border-color`, `--rcl-tooltip-bg`, `--rcl-tooltip-text`, `--rcl-on-primary`.

---

### PieChart

Pasta/Donut grafiği bileşeni. Dilimler toplamı üzerinden alan paylaştırır. `innerRadiusRatio` ile tam pasta (0) veya donut (0 < r < 1) görünümleri desteklenir.

- Tailwind bağımlılığı yoktur; CSS Modules bileşenin içinde gelir.
- Dilimler renk/etiket bilgisini legend üzerinden alır; veri `legendId` içerir.
- `unstyled` ve `classes` ile görünümü özelleştirin.

#### Veri Modeli

```ts
interface ChartLegendItem { id: string; label: string; color: string }

interface PieChartDatum {
  value: number;      // dilim değeri
  legendId: string;   // legend id
}
```

#### Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| data | `PieChartDatum[]` | - | Zorunlu. Dilimler |
| legends | `ChartLegendItem[]` | - | Zorunlu. Renk/etiket |
| title | `string` | - | Başlık |
| subtitle | `string` | - | Alt başlık |
| iconSrc | `string` | - | 44x44 ikon |
| showLegend | `boolean` | `true` | Legend |
| size | `number` | `360` | Kare SVG görünüm boyutu |
| innerRadiusRatio | `number` | `0` | 0: tam pasta, (0..1): donut |
| padAngle | `number` | `0` | Dilimler arası boşluk (derece) |
| showLabels | `boolean` | `true` | Dilim içi metin |
| labelFormatter | `(percent:number,value:number,legendLabel:string)=>string` | - | Etiket metni |
| className | `string` | `''` | Ek sınıf |
| style | `React.CSSProperties` | - | Inline stil |
| id | `string` | - | Kök id |
| showTooltip | `boolean` | `false` | Hover tooltip |
| unstyled | `boolean` | `false` | Varsayılan stilleri kapat |
| classes | `Record<string,string>` | - | İç parça sınıf override'ları |

- `classes` anahtarları: `root, container, square, svg, label, tooltip`

#### Etkileşim & Tema

- Legend hover, ilgili olmayan dilimleri soluklaştırır.
- Tooltip açıkken imleç konumuna göre gösterilir; kapalıyken `<title>` attribute'u kullanılır.
- CSS değişkenleri: `--rcl-surface-bg`, `--rcl-font-family`, `--rcl-text-primary`, `--rcl-text-muted`, `--rcl-tooltip-bg`, `--rcl-tooltip-text`.

```tsx
<PieChart
  data={data}
  legends={legends}
  innerRadiusRatio={0.6}
  padAngle={2}
  labelFormatter={(percent, value, label) => `${label}`}
/>
```

---

### RadarChart

Altıgen/çokgen grid üzerinde değerleri görselleştiren radar grafiği. Bir veya daha fazla seri, eksenler etrafında alan (dolu çokgen) ve noktalarla gösterilir.

- Tailwind bağımlılığı yoktur; CSS Modules bileşenin içinde gelir.
- Seriler renk/etiket bilgisini legend üzerinden alır; seri `legendId` içerir.
- `unstyled` ve `classes` ile özelleştirin.

#### Veri Modeli

```ts
interface ChartLegendItem {
  id: string;
  label: string;
  color: string;
  fillOpacity?: number; // (0..1)
}

interface RadarChartSeries {
  values: number[];    // axes ile aynı sırada
  legendId: string;
}

interface RadarChartScale {
  min: number;
  max: number;
  intervals: number;                    // halka sayısı
  formatter?: (v: number) => string;    // etiket biçimi
}
```

#### Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| axes | `string[]` | - | Zorunlu. Eksen etiketleri |
| series | `RadarChartSeries[]` | - | Zorunlu. Veri serileri |
| legends | `ChartLegendItem[]` | - | Zorunlu. Renk/etiket/opsiyonel opaklık |
| scale | `RadarChartScale` | Otomatik | Ölçek (min/max/intervals/formatter) |
| title | `string` | - | Başlık |
| subtitle | `string` | - | Alt başlık |
| iconSrc | `string` | - | 44x44 ikon |
| showLegend | `boolean` | `true` | Legend |
| showGrid | `boolean` | `true` | Konsantrik grid |
| showAxes | `boolean` | `true` | Merkezden eksen çizgileri |
| showAxisLabels | `boolean` | `true` | Eksen başlıkları |
| gridLineVariant | `'solid' \| 'dashed' \| 'dotted'` | `'dashed'` | Grid stili |
| dotRadius | `number` | `3` | Nokta yarıçapı |
| strokeWidth | `number` | `2` | Seri dış çizgi kalınlığı |
| fillOpacity | `number` | `0.15` | Seri alan opaklığı (varsayılan) |
| size | `number` | `360` | Kare SVG görünümü (px) |
| className | `string` | `''` | Ek sınıf |
| style | `React.CSSProperties` | - | Inline stil |
| id | `string` | - | Kök id |
| showTooltip | `boolean` | `false` | Hover tooltip |
| unstyled | `boolean` | `false` | Varsayılan stilleri kapat |
| classes | `Record<string,string>` | - | İç parça sınıf override'ları |

- `classes` anahtarları: `root, container, svgWrap, square, svg, axisLabel, tooltip`

#### Etkileşim & Notlar

- Legend hover, ilgili olmayan seri/point'leri soluklaştırır.
- Tooltip açıkken imleç üzerinde gösterilir; kapalıyken `<title>` etiketi kullanılır.
- Sağlanmazsa: min=0, `max` veri aralığına yuvarlanır, `intervals=5` ve etiketler `formatter` ile biçimlenir.

`src/index.ts` ile dışa aktarılanlar:
- `HorizontalBarChart`, `HorizontalBarChartProps`, `ChartBar`, `HorizontalBarChartLegendItem`
- `VerticalBarChart`, `VerticalBarChartProps`, `VerticalBarChartDataItem`, `VerticalBarChartScale`, `VerticalBarChartLineSeries`, `VerticalBarChartLegendItem`
- `PieChart`, `PieChartProps`, `PieChartDatum`, `PieChartLegendItem`
- `RadarChart`, `RadarChartProps`, `RadarChartSeries`, `RadarChartScale`, `RadarChartLegendItem`
- Parçalar: `ChartHeader`, `Legend`, `ValueGrid`, `CategoryGrid`, `RadarGrid`, `RadarAxes`

## Theming ve Özelleştirme

- `className` ve `style` ile dış kap üzerinde kontrol
- `classes` ile iç parça sınıflarını override edebilirsiniz (bileşen README'lerine bakın)
- `unstyled` ile varsayılan stilleri kapatabilirsiniz
- CSS custom properties ile tema uygulayabilirsiniz:

```css
:root {
  --rcl-surface-bg: #ffffff;
  --rcl-font-family: ui-sans-serif, system-ui;
  --rcl-text-primary: #0f172a;
  --rcl-text-muted: #64748b;
  --rcl-grid-bottom-color: #e2e8f0;
  --rcl-border-color: #e5e7eb;
  --rcl-tooltip-bg: #111827;
  --rcl-tooltip-text: #f9fafb;
  --rcl-on-primary: #ffffff;
}
```

Notlar:
- Kütüphane Tailwind’e bağımlı değildir; yalnızca örnek uygulamalarda kullanılabilir.
- Paket, CSS Modules kullanır ve `package.json` içinde CSS dosyaları side effect olarak işaretlenmiştir.

## SSR/CSR

- Bileşenler interactivity gerektiren bölümler için `use client` ile işaretlidir.
- SSR ortamında güvenle render edilebilir; ölçüm ve animasyonlar tarayıcıda etkinleşir.
- Next.js: Normal import ile kullanılır; ekstra stil ayarı gerekmez.

## Erişilebilirlik

- Barlar `button` olarak render edilir ve açıklayıcı `aria-label` alır.
- Tooltip, etkinleştiğinde `role="status"` ve `aria-live="polite"` kullanır.

## Örnekler

- `examples/demo-vite` klasöründe Vite + React 19 örneği bulunur.
- Çalıştırmak için proje kökünde:

```bash
cd examples/demo-vite
npm i && npm run dev
```

## Showcase

Öne çıkan kullanım senaryalarından kısa örnekler:

### 1) scale
- 0..200 aralığında sabit ölçek ve 5 aralık ile grid etiketleri.

```tsx
import { VerticalBarChart, HorizontalBarChart } from 'react-chart-lite';

const legends = [
  { id: 'sales', label: 'Satış', color: '#00ADB5' },
  { id: 'target', label: 'Hedef', color: '#526D82' },
  { id: 'returns', label: 'İade', color: '#9DB2BF' },
];
const data = [
  { category: 'Ocak', bars: [
    { label: 'Satış', value: 120, legendId: 'sales' },
    { label: 'Hedef', value: 100, legendId: 'target' },
    { label: 'İade', value: 20, legendId: 'returns' },
  ]},
  { category: 'Şubat', bars: [
    { label: 'Satış', value: 150, legendId: 'sales' },
    { label: 'Hedef', value: 120, legendId: 'target' },
    { label: 'İade', value: 18, legendId: 'returns' },
  ]},
];

export default function ShowcaseScale() {
  return (
    <>
      <HorizontalBarChart
        data={data}
        legends={legends}
        showLegend
        scale={{ min: 0, max: 200, intervals: 5 }}
        showGrid
        showVerticalGrid
        gridLineVariant="dashed"
        showTooltip
        apsis
        ordinat
      />
      <VerticalBarChart
        data={data}
        legends={legends}
        showLegend
        scale={{ min: 0, max: 200, intervals: 5 }}
        showGrid
        showHorizontalGrid
        showTooltip
        apsis
        ordinat
      />
    </>
  );
}
```

### 2) onBarClick
- Bara tıkladığınızda bilgi veren etkileşim tetiklenir.

```tsx
import { VerticalBarChart, HorizontalBarChart } from 'react-chart-lite';
const legends = [
  { id: 'sales', label: 'Satış', color: '#00ADB5' },
  { id: 'target', label: 'Hedef', color: '#526D82' },
];
const data = [
  { category: 'X', bars: [
    { label: 'Satış', value: 90, legendId: 'sales' },
    { label: 'Hedef', value: 75, legendId: 'target' },
  ]},
];

function onBarClick(bar: { label: string; value: number }, categoryIndex: number, barIndex: number) {
  alert(`${bar.label} (${bar.value}) - Kategori #${categoryIndex + 1}, Bar #${barIndex + 1}`);
}

export default function ShowcaseOnBarClick() {
  return (
    <>
      <HorizontalBarChart data={data} legends={legends} showLegend showGrid showVerticalGrid onBarClick={onBarClick} showTooltip apsis ordinat />
      <VerticalBarChart data={data} legends={legends} showLegend showGrid showHorizontalGrid onBarClick={onBarClick} showTooltip apsis ordinat />
    </>
  );
}
```

### 3) showLine + lineSeries (Vertical)
- Barların üzerinde trend/target/sales çizgi serileri (noktalarla birlikte).

```tsx
import { VerticalBarChart } from 'react-chart-lite';
const legends = [
  { id: 'sales', label: 'Satış', color: '#00ADB5' },
  { id: 'target', label: 'Hedef', color: '#526D82' },
  { id: 'trend', label: 'Trend', color: '#222831' },
];
const data = [
  { category: 'G', bars: [
    { label: 'Satış', value: 110, legendId: 'sales' },
    { label: 'Hedef', value: 95, legendId: 'target' },
  ]},
  { category: 'H', bars: [
    { label: 'Satış', value: 125, legendId: 'sales' },
    { label: 'Hedef', value: 100, legendId: 'target' },
  ]},
];
const lineSeries = [
  { legendId: 'trend', values: [105, 118], dashed: false },
  { legendId: 'target', values: [100, 100], dashed: true },
  { legendId: 'sales', values: [110, 125], dashed: false },
];

export default function ShowcaseLines() {
  return (
    <VerticalBarChart
      data={data}
      legends={legends}
      showLegend
      showGrid
      showHorizontalGrid
      showLine
      lineSeries={lineSeries}
      showLinePoints
      lineWidth={2}
      linePointRadius={4}
      showTooltip
      apsis
      ordinat
    />
  );
}
```

> Not: `showLine` ve `lineSeries` sadece `VerticalBarChart` için geçerlidir.

## Paketleme ve Kullanım Notları

- Paket CSS Modules içerir ve CSS dosyaları `sideEffects` olarak işaretlidir.
- Tailwind bağımlılığı yoktur; yalnızca `examples/` içinde kullanılabilir.
- ESM dağıtımı: `type: module`, `exports` alanı ile ağaç sallama uyumlu.

## Katkı ve Sürümleme

- Katkı rehberi için `CONTRIBUTING.md` dosyasına bakın.
- Davranış kuralları için `CODE_OF_CONDUCT.md`.
- Değişiklik geçmişi için `CHANGELOG.md`.

## Lisans

MIT 
# react-chart-lite

<p align="center">
  <img src="docs/weekly-metrics.png" alt="react-chart-lite showcase: Weekly Metrics" />
  <br/>
</p>

Hafif, stil bağımsız, React 18/19 uyumlu grafik bileşenleri. CSS Modules ile gelir; theming için CSS değişkenleri ve `unstyled`/`classes` ile tam özelleştirme sunar.

![npm version](https://img.shields.io/npm/v/react-chart-lite?color=blue)
![license](https://img.shields.io/github/license/omerfarukgurbuz/react-chart-lite)
![CI](https://img.shields.io/github/actions/workflow/status/omerfarukgurbuz/react-chart-lite/release.yml?label=release)
![CI](https://img.shields.io/github/actions/workflow/status/omerfarukgurbuz/react-chart-lite/ci.yml?label=ci)
![types](https://img.shields.io/badge/types-TypeScript-blue)

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

## İçindekiler

- [Kurulum](#kurulum)
- [Hızlı Başlangıç](#hızlı-başlangıç)
- [Bileşenler ve Tipler](#bileşenler-ve-tipler)
- [API Surface](#api-surface)
- [Theming ve Özelleştirme](#theming-ve-özelleştirme)
- [SSR/CSR](#ssrcsr)
- [Ölçek (Scale)](#ölçek-scale)
- [Erişilebilirlik](#erişilebilirlik)
- [Örnekler](#örnekler)
- [Showcase](#showcase)
- [Paketleme ve Kullanım Notları](#paketleme-ve-kullanım-notları)
- [Katkı ve Sürümleme](#katkı-ve-sürümleme)
- [Lisans](#lisans)

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

## Bileşenler ve Tipler

## API Surface

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

Component dokümantasyonları:
- [`HorizontalBarChart`](src/components/ui/HorizontalBarChart/README.md)
- [`VerticalBarChart`](src/components/ui/VerticalBarChart/README.md)
- [`PieChart`](src/components/ui/PieChart/README.md)
- [`RadarChart`](src/components/ui/RadarChart/README.md)

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

- Bileşenler client interactivity gerektirdiği için etkileşimli katmanlar `use client` ile işaretlidir.
- SSR ortamında güvenle render edilebilir; tooltip ölçümü ve animasyonlar tarayıcıda etkinleşir.
- Next.js için: Bileşenleri normal şekilde import edip kullanabilirsiniz. Stil importu ekstra ayar gerektirmez.

## Ölçek (Scale)

- Sağlamazsanız `min=0`, `intervals=5` ile "nice" bir `max` otomatik hesaplanır.
- `formatter` ile grid değerlerini biçimlendirebilirsiniz (ör. yüzde, para, adet).

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

Aşağıdaki örneklerde iki grafik de birlikte gösterilir. Tüm snippet'lerde legend açıktır; `apsis` ve `ordinat` varsayılan olarak açık ve örneklerde de açık bırakılmıştır.

### 1) scale
- Ne görürsünüz: 0..200 aralığında sabitlenmiş ölçek ve 5 aralık ile grid etiketleri.

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

### 2) showGrid
- Ne görürsünüz: Grid çizgileri kapalı; eksen çizgileri (apsis/ordinat) görünür.

```tsx
import { VerticalBarChart, HorizontalBarChart } from 'react-chart-lite';
const legends = [
  { id: 'sales', label: 'Satış', color: '#00ADB5' },
  { id: 'target', label: 'Hedef', color: '#526D82' },
  { id: 'returns', label: 'İade', color: '#9DB2BF' },
];
const data = [
  { category: 'A', bars: [
    { label: 'Satış', value: 80, legendId: 'sales' },
    { label: 'Hedef', value: 70, legendId: 'target' },
  ]},
  { category: 'B', bars: [
    { label: 'Satış', value: 120, legendId: 'sales' },
    { label: 'Hedef', value: 110, legendId: 'target' },
  ]},
];

export default function ShowcaseShowGrid() {
  return (
    <>
      <HorizontalBarChart data={data} legends={legends} showLegend showGrid={false} apsis ordinat />
      <VerticalBarChart data={data} legends={legends} showLegend showGrid={false} apsis ordinat />
    </>
  );
}
```

### 3) onBarClick
- Ne görürsünüz: Bara tıkladığınızda bilgi veren etkileşim (alert/log) tetiklenir.

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

### 4) showTooltip
- Ne görürsünüz: Hover üzerinde imleç konumunda tooltip gösterilir.

```tsx
import { VerticalBarChart, HorizontalBarChart } from 'react-chart-lite';
const legends = [
  { id: 'sales', label: 'Satış', color: '#00ADB5' },
  { id: 'target', label: 'Hedef', color: '#526D82' },
];
const data = [
  { category: 'C', bars: [
    { label: 'Satış', value: 110, legendId: 'sales', tooltip: 'Satış: 110' },
    { label: 'Hedef', value: 95, legendId: 'target', tooltip: 'Hedef: 95' },
  ]},
];

export default function ShowcaseTooltip() {
  return (
    <>
      <HorizontalBarChart data={data} legends={legends} showLegend showGrid showVerticalGrid showTooltip apsis ordinat />
      <VerticalBarChart data={data} legends={legends} showLegend showGrid showHorizontalGrid showTooltip apsis ordinat />
    </>
  );
}
```

### 5) gridLineVariant
- Ne görürsünüz: Grid çizgileri düz (solid) stilde.

```tsx
import { VerticalBarChart, HorizontalBarChart } from 'react-chart-lite';
const legends = [
  { id: 'sales', label: 'Satış', color: '#00ADB5' },
  { id: 'target', label: 'Hedef', color: '#526D82' },
];
const data = [
  { category: 'D', bars: [
    { label: 'Satış', value: 130, legendId: 'sales' },
    { label: 'Hedef', value: 120, legendId: 'target' },
  ]},
];

export default function ShowcaseGridVariant() {
  return (
    <>
      <HorizontalBarChart data={data} legends={legends} showLegend showGrid showVerticalGrid gridLineVariant="solid" apsis ordinat />
      <VerticalBarChart data={data} legends={legends} showLegend showGrid showHorizontalGrid gridLineVariant="solid" apsis ordinat />
    </>
  );
}
```

### 6) showVerticalGrid
- Ne görürsünüz: Dikey değer ızgarası açık (horizontal barda), dikey kategori ızgarası açık (vertical barda).

```tsx
import { VerticalBarChart, HorizontalBarChart } from 'react-chart-lite';
const legends = [
  { id: 'sales', label: 'Satış', color: '#00ADB5' },
  { id: 'target', label: 'Hedef', color: '#526D82' },
];
const data = [
  { category: 'E', bars: [
    { label: 'Satış', value: 70, legendId: 'sales' },
    { label: 'Hedef', value: 65, legendId: 'target' },
  ]},
];

export default function ShowcaseVerticalGrid() {
  return (
    <>
      <HorizontalBarChart data={data} legends={legends} showLegend showGrid showVerticalGrid gridLineVariant="dashed" apsis ordinat />
      <VerticalBarChart data={data} legends={legends} showLegend showGrid showVerticalGrid gridLineVariant="dashed" apsis ordinat />
    </>
  );
}
```

### 7) showHorizontalGrid
- Ne görürsünüz: Yatay grid/satır ayırıcıları açık.

```tsx
import { VerticalBarChart, HorizontalBarChart } from 'react-chart-lite';
const legends = [
  { id: 'sales', label: 'Satış', color: '#00ADB5' },
  { id: 'target', label: 'Hedef', color: '#526D82' },
];
const data = [
  { category: 'F', bars: [
    { label: 'Satış', value: 85, legendId: 'sales' },
    { label: 'Hedef', value: 92, legendId: 'target' },
  ]},
];

export default function ShowcaseHorizontalGrid() {
  return (
    <>
      <HorizontalBarChart data={data} legends={legends} showLegend showGrid showHorizontalGrid gridLineVariant="dotted" apsis ordinat />
      <VerticalBarChart data={data} legends={legends} showLegend showGrid showHorizontalGrid gridLineVariant="dotted" apsis ordinat />
    </>
  );
}
```

### 8) showLine + lineSeries (Vertical)
- Ne görürsünüz: Barların üzerinde trend/target/sales çizgi serileri (noktalarla birlikte).

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

---

Tüm örneklerde `apsis` ve `ordinat` açık bırakılmıştır; eksen çizgileri her zaman görünür.

## Lisans

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
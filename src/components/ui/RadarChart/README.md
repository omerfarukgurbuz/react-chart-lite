# RadarChart

Altıgen/çokgen grid üzerinde değerleri görselleştiren radar grafiği. Bir veya daha fazla seri, eksenler etrafında alan (dolu çokgen) ve noktalarla gösterilir. Ölçek verilmezse otomatik hesaplanır.

- Tailwind bağımlılığı yoktur; CSS Modules bileşenin içinde gelir.
- Seriler renk/etiket bilgisini legend üzerinden alır; seri `legendId` içerir.
- `unstyled` ve `classes` ile özelleştirin.

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
import { RadarChart } from 'react-chart-lite';

const legends = [
  { id: 'A', label: 'Series A', color: '#8E966B', fillOpacity: 0.15 },
  { id: 'B', label: 'Series B', color: '#143263', fillOpacity: 0.12 },
];

const axes = ['Kalite', 'Hız', 'Ölçeklenebilirlik', 'Güvenlik', 'Kullanılabilirlik', 'Dokümantasyon'];

const series = [
  { legendId: 'A', values: [2, 9, 3, 4, 2, 3] },
  { legendId: 'B', values: [3, 7, 4, 2, 2, 4] },
];

export default function Example() {
  return (
    <RadarChart
      axes={axes}
      series={series}
      legends={legends}
      title="Örnek Radar"
      showLegend
      showGrid
      showAxes
      showAxisLabels
      showTooltip
    />
  );
}
```

## Veri Modeli

- **Legend (renk/etiket/opsiyonel opaklık):**
```ts
interface ChartLegendItem {
  id: string;
  label: string;
  color: string;
  fillOpacity?: number; // bu seri için özel opaklık (0..1)
}
```
- **Seri:**
```ts
interface RadarChartSeries {
  values: number[];    // axes ile aynı sırada
  legendId: string;    // renk/etiket için legends[id]
}
```
- **Ölçek (opsiyonel):**
```ts
interface RadarChartScale {
  min: number;
  max: number;
  intervals: number;                    // konsantrik halka sayısı
  formatter?: (v: number) => string;    // halka etiket biçimi
}
```

## Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| axes | `string[]` | - | Zorunlu. Eksen etiketleri |
| series | `RadarChartSeries[]` | - | Zorunlu. Veri serileri |
| legends | `ChartLegendItem[]` | - | Zorunlu. Renk/etiket/opsiyonel opaklık |
| scale | `RadarChartScale` | Otomatik | Ölçek (min/max/intervals/formatter) |
| title | `string` | - | Başlık |
| subtitle | `string` | - | Alt başlık |
| iconSrc | `string` | - | 44x44 ikon |
| showLegend | `boolean` | `true` | Legend görünürlüğü |
| showGrid | `boolean` | `true` | Konsantrik grid |
| showAxes | `boolean` | `true` | Merkezden eksen çizgileri |
| showAxisLabels | `boolean` | `true` | Eksen başlıkları |
| gridLineVariant | `'solid' | 'dashed' | 'dotted'` | `'dashed'` | Grid stili |
| dotRadius | `number` | `3` | Nokta yarıçapı |
| strokeWidth | `number` | `2` | Seri dış çizgi kalınlığı |
| fillOpacity | `number` | `0.15` | Seri alanı için varsayılan opaklık |
| size | `number` | `360` | Kare SVG görünümü (px) |
| className | `string` | `''` | Ek sınıf |
| style | `React.CSSProperties` | - | Inline stil |
| id | `string` | - | Kök id |
| showTooltip | `boolean` | `false` | Hover tooltip |
| unstyled | `boolean` | `false` | Varsayılan stilleri kapat |
| classes | `Record<string,string>` | - | İç parça sınıf override'ları |

### classes anahtarları
- **root, container, svgWrap, square, svg, axisLabel, tooltip**

## Etkileşim & Erişilebilirlik
- Legend hover, ilgili olmayan seri/point'leri soluklaştırır.
- Tooltip açıkken imleç üzerinde gösterilir; kapalıyken `<title>` etiketi kullanılır.
- Eksen etiketleri `foreignObject` ile yerleştirilir (responsive).

## Ölçek
- Sağlanmazsa: min=0, `max` veri aralığına yuvarlanır, `intervals=5` ve etiketler `formatter` ile biçimlenir.

## Tema ve Özelleştirme

### CSS değişkenleri
- `--rcl-surface-bg`
- `--rcl-font-family`
- `--rcl-text-primary`
- `--rcl-text-muted`
- `--rcl-border-color`
- `--rcl-tooltip-bg`, `--rcl-tooltip-text`

```css
:root {
  --rcl-border-color: #253048;
}
```

## Notlar
- SSR/CSR: Server-render güvenli; tooltip ölçümleri ve animasyonlar yalnızca tarayıcıda etkinleşir.

### Grid stili
```tsx
<RadarChart gridLineVariant="solid" />
<RadarChart gridLineVariant="dotted" />
``` 
# PieChart

Pasta/Donut grafiği bileşeni. Girilen dilimler toplamı üzerinden alan paylaştırır. `innerRadiusRatio` ile tam pasta (0) veya donut (0 < r < 1) görünümleri desteklenir.

- Tailwind bağımlılığı yoktur; CSS Modules bileşenin içinde gelir.
- Dilimler renk/etiket bilgisini legend üzerinden alır; veri `legendId` içerir.
- `unstyled` ve `classes` ile görünümü özelleştirin.

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

Ek stil importu gerekmez.

## Hızlı Başlangıç

```tsx
import { PieChart } from 'react-chart-lite';

const legends = [
  { id: 'A', label: 'A', color: '#8E966B' },
  { id: 'B', label: 'B', color: '#9DA77A' },
  { id: 'C', label: 'C', color: '#AFB78E' },
  { id: 'D', label: 'D', color: '#8C8F68' },
];

const data = [
  { value: 50, legendId: 'A' },
  { value: 25, legendId: 'B' },
  { value: 15, legendId: 'C' },
  { value: 10, legendId: 'D' },
];

export default function Example() {
  return (
    <PieChart
      data={data}
      legends={legends}
      title="Full Pie"
      showLegend
      showLabels
      showTooltip
    />
  );
}
```

## Veri Modeli

- **Legend:**
```ts
interface ChartLegendItem { id: string; label: string; color: string }
```
- **Dilime ait veri:**
```ts
interface PieChartDatum {
  value: number;      // dilim değeri
  legendId: string;   // renk/etiket için legend id
}
```

## Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| data | `PieChartDatum[]` | - | Zorunlu. Dilimler |
| legends | `ChartLegendItem[]` | - | Zorunlu. Renk/etiket |
| title | `string` | - | Başlık |
| subtitle | `string` | - | Alt başlık |
| iconSrc | `string` | - | 44x44 ikon |
| showLegend | `boolean` | `true` | Legend görünürlüğü |
| size | `number` | `360` | Kare SVG görünüm boyutu |
| innerRadiusRatio | `number` | `0` | 0: tam pasta, (0..1): donut |
| padAngle | `number` | `0` | Dilimler arası derece cinsinden boşluk |
| showLabels | `boolean` | `true` | Dilim içi metin |
| labelFormatter | `(percent:number,value:number,legendLabel:string)=>string` | - | Etiket metni |
| className | `string` | `''` | Ek sınıf |
| style | `React.CSSProperties` | - | Inline stil |
| id | `string` | - | Kök id |
| showTooltip | `boolean` | `false` | Hover tooltip |
| unstyled | `boolean` | `false` | Varsayılan stilleri kapat |
| classes | `Record<string,string>` | - | İç parça sınıf override'ları |

### classes anahtarları
- **root, container, square, svg, label, tooltip**

## Etkileşim & Erişilebilirlik
- Legend hover, ilgili olmayan dilimleri soluklaştırır.
- Tooltip açıkken imleç konumuna göre gösterilir; kapalıyken `<title>` attribute'u kullanılır.
- Etiket konumları SSR/CSR farklılıklarına karşı sabit ondalıklarla yuvarlanır.

## Tema ve Özelleştirme

### CSS değişkenleri
- `--rcl-surface-bg`
- `--rcl-font-family`
- `--rcl-text-primary`
- `--rcl-text-muted`
- `--rcl-tooltip-bg`, `--rcl-tooltip-text`

```css
:root {
  --rcl-surface-bg: #0b1220;
  --rcl-text-primary: #e7e9ee;
}
```

### Donut ve Etiket Örneği
```tsx
<PieChart
  data={data}
  legends={legends}
  innerRadiusRatio={0.6}
  padAngle={2}
  labelFormatter={(percent, value, label) => `${label}`}
/>
```

## Notlar
- SSR/CSR: Server-render güvenli; tooltip ölçümleri ve animasyonlar yalnızca tarayıcıda etkinleşir. 
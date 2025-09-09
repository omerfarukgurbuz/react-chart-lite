# react-chart-lite

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

Lightweight, style-agnostic chart components for React 18/19. Ships with CSS Modules; customize via CSS variables, `unstyled`, and `classes`.

![npm version](https://img.shields.io/npm/v/react-chart-lite?color=blue)
![license](https://img.shields.io/github/license/omerfarukgurbuz/react-chart-lite)
![CI](https://img.shields.io/github/actions/workflow/status/omerfarukgurbuz/react-chart-lite/release.yml?label=release)
![CI](https://img.shields.io/github/actions/workflow/status/omerfarukgurbuz/react-chart-lite/ci.yml?label=ci)
![types](https://img.shields.io/badge/types-TypeScript-blue)

> Note: This library is client-side only. Use inside React client components (e.g., add `"use client"` in Next.js pages/components).

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Components and API](#components-and-api)
- [Component Documentation](#component-documentation)
  - [HorizontalBarChart](#horizontalbarchart)
  - [VerticalBarChart](#verticalbarchart)
  - [PieChart](#piechart)
  - [RadarChart](#radarchart)
- [Theming and Customization](#theming-and-customization)
- [Accessibility](#accessibility)
- [Examples](#examples)
- [Showcase](#showcase)
- [Packaging and Notes](#packaging-and-notes)
- [Contributing and Versioning](#contributing-and-versioning)
- [License](#license)

## Features

- Lightweight and dependency-free (except React)
- React 18/19 support with strong TypeScript types
- Client-side only rendering
- CSS Modules by default; full control via `unstyled`, `classes`, `className`, and `style`
- Theming with CSS custom properties (variables)
- Accessible by design (keyboard and screen reader friendly)
- ESM distribution with tree-shaking friendly exports
- No Tailwind dependency (only used in example apps if needed)

## Installation

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

## Quick Start

### Bar charts (Horizontal + Vertical)

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

### PieChart — quick example

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

export default function PieExample() {
  return (
    <PieChart
      data={data}
      legends={legends}
      title="Distribution"
      showLegend
      showLabels
      showTooltip
    />
  );
}
```

### RadarChart — quick example

```tsx
import { RadarChart } from 'react-chart-lite';

const axes = ['Quality', 'Speed', 'Scalability', 'Security', 'Usability', 'Docs'];

const legends = [
  { id: 'A', label: 'Series A', color: '#8E966B', fillOpacity: 0.15 },
  { id: 'B', label: 'Series B', color: '#143263', fillOpacity: 0.12 },
];

const series = [
  { legendId: 'A', values: [2, 9, 3, 4, 2, 3] },
  { legendId: 'B', values: [3, 7, 4, 2, 2, 4] },
];

export default function RadarExample() {
  return (
    <RadarChart
      axes={axes}
      series={series}
      legends={legends}
      title="Capability Radar"
      showLegend
      showGrid
      showAxes
      showAxisLabels
      showTooltip
    />
  );
}
```

## Components and API

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

## Component Documentation

### HorizontalBarChart

Horizontal bar chart for one or more series per category. If no `scale` is provided, a nice range is computed from data.

- No Tailwind dependency; ships with CSS Modules
- Colors/labels come from `legends` and bars point to a `legendId`
- Full visual control via `unstyled` and `classes`

#### Data model

```ts
// Color/label mapping
interface ChartLegendItem {
  id: string;      // matches bar.legendId
  label: string;   // visible legend label
  color: string;   // bar color
}

interface ChartBar {
  label: string;        // display label for the bar
  value: number;        // numeric value
  legendId: string;     // maps to ChartLegendItem.id
  tooltip?: string;     // optional hover content
}

interface ChartDataItem {
  category: string;     // category name shown on the left
  bars: ChartBar[];
}

interface ChartScale {
  min: number;
  max: number;
  intervals: number;                    // number of grid lines
  formatter?: (v: number) => string;    // grid label formatter
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | `ChartDataItem[]` | — | Required. Chart data |
| legends | `ChartLegendItem[]` | — | Required. Color/label mapping |
| scale | `ChartScale` | auto | X-axis scale (min/max/intervals/formatter) |
| title | `string` | — | Chart title |
| subtitle | `string` | — | Subtitle |
| iconSrc | `string` | — | 44x44 icon URL |
| showLegend | `boolean` | `true` | Toggle legend |
| barHeight | `number` | `30` | Bar height (px) |
| barSpacing | `number` | `2` | Spacing between bars in a group (px) |
| categorySpacing | `number` | `8` | Spacing between categories (px) |
| showGrid | `boolean` | `true` | Toggle grid |
| showVerticalGrid | `boolean` | `true` | Vertical value grid |
| showHorizontalGrid | `boolean` | `false` | Horizontal category separators |
| gridLineVariant | `'solid' \| 'dashed' \| 'dotted'` | `'dashed'` | Grid line style |
| apsis | `boolean` | `true` | Bottom axis line |
| ordinat | `boolean` | `true` | Left axis line |
| showValues | `boolean` | `false` | Show value on bars |
| animated | `boolean` | `true` | Enable animations |
| animationDuration | `number` | `500` | Animation duration (ms) |
| className | `string` | `''` | Extra class for root |
| style | `React.CSSProperties` | — | Inline style |
| id | `string` | — | Root element id |
| onBarClick | `(bar, categoryIndex, barIndex) => void` | — | Click handler |
| showTooltip | `boolean` | `false` | Enable hover tooltip |
| unstyled | `boolean` | `false` | Disable default styles |
| classes | `Record<string,string>` | — | Override internal part classes |

- `classes` keys: `root, container, body, rows, row, rowLabel, rowBars, barWrapper, bar, barValue, tooltip`

#### Interactions

- Legend hover dims unrelated bars
- With `showTooltip`, a floating tooltip follows the pointer; otherwise native `<title>` is used
- Accessibility: bars render as `button` with `aria-label`; tooltip uses `role="status"` and `aria-live="polite"`

#### Scale

- If not provided: `min=0`, a computed “nice” `max`, and `intervals=5`
- Customize grid labels via `formatter` (percent, currency, counts, etc.)

#### Theming

- CSS variables: `--rcl-surface-bg`, `--rcl-font-family`, `--rcl-text-primary`, `--rcl-text-muted`, `--rcl-grid-bottom-color`, `--rcl-border-color`, `--rcl-tooltip-bg`, `--rcl-tooltip-text`, `--rcl-on-primary`

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

Vertical bar chart with optional line overlay. Supports bar-only, line-only, and hybrid (bar + line) displays.

- No Tailwind dependency; ships with CSS Modules
- Colors/labels come from `legends` and data series point to `legendId`
- Fully customizable via `unstyled` and `classes`

#### Data model

```ts
interface ChartLegendItem { id: string; label: string; color: string }

interface VerticalBarChartBar {
  label: string;
  value: number;
  legendId: string;
  tooltip?: string;
}

interface VerticalBarChartDataItem {
  category: string;                     // X-axis label
  bars: ReadonlyArray<VerticalBarChartBar>;
}

interface VerticalBarChartLineSeries {
  values: number[];       // must match the number of categories
  legendId: string;       // maps to legends[id]
  dashed?: boolean;       // dashed line style
}

interface VerticalBarChartScale {
  min: number;
  max: number;
  intervals: number;                    // number of horizontal grid lines
  formatter?: (v: number) => string;    // grid label formatter
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | `VerticalBarChartDataItem[]` | — | Required. Bar data |
| legends | `ChartLegendItem[]` | — | Required. Color/label mapping |
| scale | `VerticalBarChartScale` | auto | Y-axis scale |
| title | `string` | — | Chart title |
| subtitle | `string` | — | Subtitle |
| iconSrc | `string` | — | 44x44 icon URL |
| showLegend | `boolean` | `true` | Toggle legend |
| barSpacing | `number` | `2` | Spacing between bars in a group (px) |
| categorySpacing | `number` | `8` | Spacing between categories (px) |
| showGrid | `boolean` | `true` | Toggle grid |
| showHorizontalGrid | `boolean` | `true` | Horizontal grid |
| showVerticalGrid | `boolean` | `false` | Vertical grid |
| gridLineVariant | `'solid' \| 'dashed' \| 'dotted'` | `'dashed'` | Grid line style |
| showValues | `boolean` | `false` | Show value on bars |
| animated | `boolean` | `true` | Enable animations |
| animationDuration | `number` | `500` | Animation duration (ms) |
| chartHeight | `number` | `368` | Chart height (px) |
| className | `string` | `''` | Extra class for root |
| style | `React.CSSProperties` | — | Inline style |
| id | `string` | — | Root id |
| onBarClick | `(bar, categoryIndex, barIndex) => void` | — | Click handler |
| showLine | `boolean` | `false` | Enable line overlay |
| lineSeries | `VerticalBarChartLineSeries[]` | `[]` | Line series (by legendId) |
| lineWidth | `number` | `2` | Line width (px) |
| showLinePoints | `boolean` | `true` | Show line points |
| linePointRadius | `number` | `4` | Point radius (px) |
| apsis | `boolean` | `true` | Bottom axis line |
| ordinat | `boolean` | `true` | Left axis line |
| showTooltip | `boolean` | `false` | Enable hover tooltip |
| unstyled | `boolean` | `false` | Disable default styles |
| classes | `Record<string,string>` | — | Override internal part classes |

- `classes` keys: `root, container, body, columns, group, bar, barValue, xLabels, xLabel, lineLayer, tooltip`

#### Interactions and notes

- Legend hover dims unrelated bars/lines
- Tooltip follows pointer when enabled; otherwise native `<title>` is used
- `lineSeries.values` length must match the number of categories
- For very large datasets, consider disabling animations (`animated={false}`)

#### Scale and theming

- Without a scale, a combined “nice” range is computed from bar + line values (min=0, intervals=5)
- CSS variables: `--rcl-surface-bg`, `--rcl-text-primary`, `--rcl-text-muted`, `--rcl-border-color`, `--rcl-tooltip-bg`, `--rcl-tooltip-text`, `--rcl-on-primary`

---

### PieChart

Pie/Donut chart. Slices share the area by total. `innerRadiusRatio` controls full pie (0) vs donut (0 < r < 1).

- No Tailwind dependency; ships with CSS Modules
- Slices get color/label from `legends` via `legendId`
- Style with `unstyled` and `classes`

#### Data model

```ts
interface ChartLegendItem { id: string; label: string; color: string }

interface PieChartDatum {
  value: number;      // slice value
  legendId: string;   // legend id for color/label
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | `PieChartDatum[]` | — | Required. Slices |
| legends | `ChartLegendItem[]` | — | Required. Color/label mapping |
| title | `string` | — | Chart title |
| subtitle | `string` | — | Subtitle |
| iconSrc | `string` | — | 44x44 icon URL |
| showLegend | `boolean` | `true` | Toggle legend |
| size | `number` | `360` | Square SVG view size |
| innerRadiusRatio | `number` | `0` | 0: full pie; (0..1): donut |
| padAngle | `number` | `0` | Gap between slices in degrees |
| showLabels | `boolean` | `true` | Show labels inside slices |
| labelFormatter | `(percent:number,value:number,legendLabel:string)=>string` | — | Custom label text |
| className | `string` | `''` | Extra class for root |
| style | `React.CSSProperties` | — | Inline style |
| id | `string` | — | Root id |
| showTooltip | `boolean` | `false` | Enable hover tooltip |
| unstyled | `boolean` | `false` | Disable default styles |
| classes | `Record<string,string>` | — | Override internal part classes |

- `classes` keys: `root, container, square, svg, label, tooltip`

#### Interaction & theming

- Legend hover dims unrelated slices
- Tooltip follows pointer when enabled; otherwise native `<title>` is used
- CSS variables: `--rcl-surface-bg`, `--rcl-font-family`, `--rcl-text-primary`, `--rcl-text-muted`, `--rcl-tooltip-bg`, `--rcl-tooltip-text`

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

Radar chart (polygon grid) for visualizing values around axes. One or more series can be rendered with filled areas and points.

- No Tailwind dependency; ships with CSS Modules
- Series get color/label from `legends` via `legendId`
- Customizable via `unstyled` and `classes`

#### Data model

```ts
interface ChartLegendItem {
  id: string;
  label: string;
  color: string;
  fillOpacity?: number; // per-series area opacity (0..1)
}

interface RadarChartSeries {
  values: number[];    // same order as axes
  legendId: string;    // maps to legends[id]
}

interface RadarChartScale {
  min: number;
  max: number;
  intervals: number;                    // number of concentric rings
  formatter?: (v: number) => string;    // ring label formatter
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| axes | `string[]` | — | Required. Axis labels |
| series | `RadarChartSeries[]` | — | Required. Data series |
| legends | `ChartLegendItem[]` | — | Required. Color/label/optional opacity |
| scale | `RadarChartScale` | auto | Scale (min/max/intervals/formatter) |
| title | `string` | — | Chart title |
| subtitle | `string` | — | Subtitle |
| iconSrc | `string` | — | 44x44 icon URL |
| showLegend | `boolean` | `true` | Toggle legend |
| showGrid | `boolean` | `true` | Concentric grid |
| showAxes | `boolean` | `true` | Axes from center |
| showAxisLabels | `boolean` | `true` | Axis labels |
| gridLineVariant | `'solid' \| 'dashed' \| 'dotted'` | `'dashed'` | Grid style |
| dotRadius | `number` | `3` | Point radius |
| strokeWidth | `number` | `2` | Series stroke width |
| fillOpacity | `number` | `0.15` | Default area opacity |
| size | `number` | `360` | Square SVG view size (px) |
| className | `string` | `''` | Extra class for root |
| style | `React.CSSProperties` | — | Inline style |
| id | `string` | — | Root id |
| showTooltip | `boolean` | `false` | Enable hover tooltip |
| unstyled | `boolean` | `false` | Disable default styles |
| classes | `Record<string,string>` | — | Override internal part classes |

- `classes` keys: `root, container, svgWrap, square, svg, axisLabel, tooltip`

#### Interaction & notes

- Legend hover dims unrelated series/points
- Tooltip follows pointer when enabled; otherwise native `<title>` is used

---

## Theming and Customization

- Control outer wrapper with `className` and `style`
- Override internal part classes with `classes` (see component docs above)
- Turn off default styles via `unstyled`
- Apply themes with CSS custom properties:

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

Notes:
- The library does not depend on Tailwind; it’s only used in example apps
- CSS is packaged as CSS Modules and marked as `sideEffects` in `package.json`

## Accessibility

- Bars render as `button` elements with descriptive `aria-label`
- Tooltip announces using `role="status"` and `aria-live="polite"`

## Examples

- See `examples/demo-vite` for a Vite + React 19 example
- To run:

```bash
cd examples/demo-vite
npm i && npm run dev
```

## Showcase

Highlighted scenarios with short examples:

### 1) scale
- Fixed scale 0..200 with 5 intervals and labeled grid lines

```tsx
import { VerticalBarChart, HorizontalBarChart } from 'react-chart-lite';

const legends = [
  { id: 'sales', label: 'Sales', color: '#00ADB5' },
  { id: 'target', label: 'Target', color: '#526D82' },
  { id: 'returns', label: 'Returns', color: '#9DB2BF' },
];
const data = [
  { category: 'Jan', bars: [
    { label: 'Sales', value: 120, legendId: 'sales' },
    { label: 'Target', value: 100, legendId: 'target' },
    { label: 'Returns', value: 20, legendId: 'returns' },
  ]},
  { category: 'Feb', bars: [
    { label: 'Sales', value: 150, legendId: 'sales' },
    { label: 'Target', value: 120, legendId: 'target' },
    { label: 'Returns', value: 18, legendId: 'returns' },
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
- Clicking a bar triggers a custom handler

```tsx
import { VerticalBarChart, HorizontalBarChart } from 'react-chart-lite';
const legends = [
  { id: 'sales', label: 'Sales', color: '#00ADB5' },
  { id: 'target', label: 'Target', color: '#526D82' },
];
const data = [
  { category: 'Q1', bars: [
    { label: 'Sales', value: 90, legendId: 'sales' },
    { label: 'Target', value: 75, legendId: 'target' },
  ]},
];

function onBarClick(bar: { label: string; value: number }, categoryIndex: number, barIndex: number) {
  alert(`${bar.label} (${bar.value}) - Category #${categoryIndex + 1}, Bar #${barIndex + 1}`);
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
- Overlay line series with optional points

```tsx
import { VerticalBarChart } from 'react-chart-lite';
const legends = [
  { id: 'sales', label: 'Sales', color: '#00ADB5' },
  { id: 'target', label: 'Target', color: '#526D82' },
  { id: 'trend', label: 'Trend', color: '#222831' },
];
const data = [
  { category: 'G', bars: [
    { label: 'Sales', value: 110, legendId: 'sales' },
    { label: 'Target', value: 95, legendId: 'target' },
  ]},
  { category: 'H', bars: [
    { label: 'Sales', value: 125, legendId: 'sales' },
    { label: 'Target', value: 100, legendId: 'target' },
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

> Note: `showLine` and `lineSeries` are only available for `VerticalBarChart`.

## Packaging and Notes

- CSS Modules are packaged and CSS files are marked as `sideEffects`
- No Tailwind dependency; it may appear only in `examples/`
- ESM distribution with `type: module` and an `exports` map

## Contributing and Versioning

- See `CONTRIBUTING.md` for the contribution guide
- See `CODE_OF_CONDUCT.md` for the code of conduct
- See `CHANGELOG.md` for the change history

## License

MIT omerfarukgurbuz
import React from 'react'
import { VerticalBarChart, HorizontalBarChart, type VerticalBarChartProps, type HorizontalBarChartProps } from 'react-chart-lite'

// Palette
const PALETTE = {
  dark1: '#222831',
  dark2: '#393E46',
  teal: '#00ADB5',
  light: '#EEEEEE',
  navy: '#27374D',
  slate: '#526D82',
  steel: '#9DB2BF',
  ice: '#DDE6ED',
}

// Legends mapped to palette
const verticalLegends: VerticalBarChartProps['legends'] = [
  { id: 'sales', label: 'Satış', color: PALETTE.teal },
  { id: 'target', label: 'Hedef', color: PALETTE.slate },
  { id: 'returns', label: 'İade', color: PALETTE.steel },
  { id: 'trend', label: 'Trend', color: PALETTE.dark1 },
]

const horizontalLegends: HorizontalBarChartProps['legends'] = [
  { id: 'sales', label: 'Satış', color: PALETTE.teal },
  { id: 'target', label: 'Hedef', color: PALETTE.slate },
  { id: 'returns', label: 'İade', color: PALETTE.steel },
]

// Sample data (4 categories)
const verticalData: VerticalBarChartProps['data'] = [
  {
    category: 'Ocak',
    bars: [
      { label: 'Satış', value: 120, legendId: 'sales' },
      { label: 'Hedef', value: 100, legendId: 'target' },
      { label: 'İade', value: 20, legendId: 'returns' },
    ],
  },
  {
    category: 'Şubat',
    bars: [
      { label: 'Satış', value: 150, legendId: 'sales' },
      { label: 'Hedef', value: 120, legendId: 'target' },
      { label: 'İade', value: 18, legendId: 'returns' },
    ],
  },
  {
    category: 'Mart',
    bars: [
      { label: 'Satış', value: 130, legendId: 'sales' },
      { label: 'Hedef', value: 140, legendId: 'target' },
      { label: 'İade', value: 25, legendId: 'returns' },
    ],
  },
  {
    category: 'Nisan',
    bars: [
      { label: 'Satış', value: 170, legendId: 'sales' },
      { label: 'Hedef', value: 150, legendId: 'target' },
      { label: 'İade', value: 22, legendId: 'returns' },
    ],
  },
]

const horizontalData: HorizontalBarChartProps['data'] = [
  {
    category: 'Ürün A',
    bars: [
      { label: 'Satış', value: 80, legendId: 'sales' },
      { label: 'Hedef', value: 70, legendId: 'target' },
    ],
  },
  {
    category: 'Ürün B',
    bars: [
      { label: 'Satış', value: 120, legendId: 'sales' },
      { label: 'Hedef', value: 110, legendId: 'target' },
    ],
  },
  {
    category: 'Ürün C',
    bars: [
      { label: 'Satış', value: 60, legendId: 'sales' },
      { label: 'Hedef', value: 90, legendId: 'target' },
    ],
  },
]

const horizontalDataThreeBars: HorizontalBarChartProps['data'] = [
  {
    category: 'Ürün A',
    bars: [
      { label: 'Satış', value: 80, legendId: 'sales' },
      { label: 'Hedef', value: 70, legendId: 'target' },
      { label: 'İade', value: 10, legendId: 'returns' },
    ],
  },
  {
    category: 'Ürün B',
    bars: [
      { label: 'Satış', value: 120, legendId: 'sales' },
      { label: 'Hedef', value: 110, legendId: 'target' },
      { label: 'İade', value: 6, legendId: 'returns' },
    ],
  },
]

// Larger datasets (10 categories)
const v10Data: VerticalBarChartProps['data'] = Array.from({ length: 10 }).map((_, i) => ({
  category: `K${i + 1}`,
  bars: [
    { label: 'Satış', value: 80 + ((i * 13) % 60), legendId: 'sales' },
    { label: 'Hedef', value: 65 + ((i * 17) % 70), legendId: 'target' },
    { label: 'İade', value: 5 + ((i * 7) % 25), legendId: 'returns' },
  ],
}))

const h10DataThreeBars: HorizontalBarChartProps['data'] = Array.from({ length: 10 }).map((_, i) => ({
  category: `Ürün ${String.fromCharCode(65 + i)}`,
  bars: [
    { label: 'Satış', value: 40 + ((i * 9) % 80), legendId: 'sales' },
    { label: 'Hedef', value: 30 + ((i * 11) % 90), legendId: 'target' },
    { label: 'İade', value: 2 + ((i * 5) % 20), legendId: 'returns' },
  ],
}))

type VCfg = { title: string; props: VerticalBarChartProps }
type HCfg = { title: string; props: HorizontalBarChartProps }

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-gray-200 p-4 shadow-sm bg-white">
      <div className="text-sm font-semibold mb-3">{title}</div>
      {children}
    </div>
  )
}

export default function BarChartsGallery() {
  const onBarClick: VerticalBarChartProps['onBarClick'] = (bar, ci, bi) => {
    // eslint-disable-next-line no-alert
    alert(`${bar.label} clicked (category #${ci + 1}, bar #${bi + 1}) -> ${bar.value}`)
  }
  const onHBarClick: HorizontalBarChartProps['onBarClick'] = (bar, ci, bi) => {
    // eslint-disable-next-line no-alert
    alert(`${bar.label} clicked (category #${ci + 1}, bar #${bi + 1}) -> ${bar.value}`)
  }

  const verticalConfigs: VCfg[] = [
    { title: 'V1 Basic (dashed grid)', props: { data: verticalData, legends: verticalLegends, title: 'Satış & Hedef & İade', showLegend: true, showGrid: true, showValueGrid: true, showTooltip: true, chartHeight: 320 } },
    { title: 'V2 Solid Grid', props: { data: verticalData, legends: verticalLegends, gridLineVariant: 'solid', showLegend: true, showGrid: true, showValueGrid: true, showTooltip: true, chartHeight: 320 } },
    { title: 'V3 Dotted Grid', props: { data: verticalData, legends: verticalLegends, gridLineVariant: 'dotted', showLegend: true, showGrid: true, showValueGrid: true, chartHeight: 320, showTooltip: true } },
    { title: 'V4 Values On', props: { data: verticalData, legends: verticalLegends, showValues: true, showLegend: true, showGrid: true, chartHeight: 320, showTooltip: true } },
    { title: 'V5 Tight Bars', props: { data: verticalData, legends: verticalLegends, barSpacing: 1, categorySpacing: 6, showLegend: true, showGrid: true, chartHeight: 300, showTooltip: true } },
    { title: 'V6 Loose Bars', props: { data: verticalData, legends: verticalLegends, barSpacing: 8, categorySpacing: 14, showLegend: true, showGrid: true, chartHeight: 320, showTooltip: true } },
    { title: 'V7 Custom Scale (0..200)', props: { data: verticalData, legends: verticalLegends, scale: { min: 0, max: 200, intervals: 5 }, showLegend: true, showGrid: true, chartHeight: 340, showTooltip: true } },
    { title: 'V8 Hide Axes (baseline=false, left=false)', props: { data: verticalData, legends: verticalLegends, showLegend: true, showGrid: true, showBaselineAxis: false, showLeftAxis: false, chartHeight: 320, showTooltip: true } },
    { title: 'V9 ShowLine + LineSeries', props: { data: verticalData, legends: verticalLegends, showLegend: true, showGrid: true, showLine: true, lineSeries: [{ legendId: 'trend', values: [110, 130, 125, 140], dashed: false }], chartHeight: 340, showTooltip: true } },
    { title: 'V10 Line Dashed + Thick', props: { data: verticalData, legends: verticalLegends, showLegend: true, showGrid: true, showLine: true, lineWidth: 3, lineSeries: [{ legendId: 'trend', values: [100, 145, 135, 150], dashed: true }], chartHeight: 340, showTooltip: true } },
    // New: 10 categories, 3 line series
    { title: 'V11 10 Categories + 3 Line Series', props: { data: v10Data, legends: verticalLegends, showLegend: true, showGrid: true, showValueGrid: true, showLine: true, lineWidth: 2, showLinePoints: true, linePointRadius: 3, lineSeries: [
      { legendId: 'trend', values: Array.from({ length: 10 }).map((_, i) => 70 + ((i * 9) % 90)), dashed: false },
      { legendId: 'target', values: Array.from({ length: 10 }).map((_, i) => 60 + ((i * 7) % 80)), dashed: true },
      { legendId: 'sales', values: Array.from({ length: 10 }).map((_, i) => 65 + ((i * 5) % 85)), dashed: false },
    ], chartHeight: 380, showTooltip: true } },
    // New: 10 categories, values on
    { title: 'V12 10 Categories + Values On', props: { data: v10Data, legends: verticalLegends, showLegend: true, showGrid: true, showValueGrid: true, showValues: true, chartHeight: 380, showTooltip: true } },
  ]

  const horizontalConfigs: HCfg[] = [
    { title: 'H1 Basic (dashed grid)', props: { data: horizontalData, legends: horizontalLegends, title: 'Ürün Bazlı Satış', showLegend: true, showGrid: true, showTooltip: true, showValueGrid: true, gridLineVariant: 'dashed', showBaselineAxis: true, showLeftAxis: true } },
    { title: 'H2 Solid Grid + Both Grids', props: { data: horizontalData, legends: horizontalLegends, showLegend: true, showGrid: true, showTooltip: true, showValueGrid: true, gridLineVariant: 'solid', showBaselineAxis: true, showLeftAxis: true } },
    { title: 'H3 Dotted Grid + Row Separators', props: { data: horizontalData, legends: horizontalLegends, showLegend: true, showGrid: true, showTooltip: true, showValueGrid: false, gridLineVariant: 'dotted', showBaselineAxis: true, showLeftAxis: true } },
    { title: 'H4 Values On', props: { data: horizontalData, legends: horizontalLegends, showLegend: true, showValues: true, showGrid: true, showTooltip: true, showValueGrid: true } },
    { title: 'H5 Bar Height 18px', props: { data: horizontalData, legends: horizontalLegends, showLegend: true, barHeight: 18, showGrid: true, showTooltip: true, showValueGrid: true } },
    { title: 'H6 Bar Height 42px', props: { data: horizontalData, legends: horizontalLegends, showLegend: true, barHeight: 42, showGrid: true, showTooltip: true, showValueGrid: true } },
    { title: 'H7 Tight Categories', props: { data: horizontalData, legends: horizontalLegends, showLegend: true, categorySpacing: 4, showGrid: true, showTooltip: true, showValueGrid: true } },
    { title: 'H8 Loose Categories', props: { data: horizontalData, legends: horizontalLegends, showLegend: true, categorySpacing: 16, showGrid: true, showTooltip: true, showValueGrid: true } },
    { title: 'H9 Three Bars + Tooltip', props: { data: horizontalDataThreeBars, legends: horizontalLegends, showLegend: true, showGrid: true, showTooltip: true, showValueGrid: true } },
    { title: 'H10 Custom Scale (0..150)', props: { data: horizontalData, legends: horizontalLegends, showLegend: true, scale: { min: 0, max: 150, intervals: 5 }, showGrid: true, showTooltip: true, showValueGrid: true } },
    { title: 'H11 Hide Axes (baseline=false, left=false)', props: { data: horizontalData, legends: horizontalLegends, showLegend: true, showGrid: true, showTooltip: true, showValueGrid: true, showBaselineAxis: false, showLeftAxis: false } },
    // New: 10 categories, 3 bars each
    { title: 'H12 10 Categories + 3 Bars Each (values)', props: { data: h10DataThreeBars, legends: horizontalLegends, showLegend: true, showGrid: true, showValueGrid: true, showValues: true, gridLineVariant: 'dashed', showBaselineAxis: true, showLeftAxis: true, showTooltip: true } },
    { title: 'H13 10 Categories Solid Grid', props: { data: h10DataThreeBars, legends: horizontalLegends, showLegend: true, showGrid: true, showValueGrid: true, gridLineVariant: 'solid', showBaselineAxis: true, showLeftAxis: true, showTooltip: true } },
  ]

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="text-lg font-bold mb-3">VerticalBarChart Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {verticalConfigs.map((cfg, i) => (
            <Card key={i} title={cfg.title}>
              <VerticalBarChart {...cfg.props} onBarClick={onBarClick} />
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3">HorizontalBarChart Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {horizontalConfigs.map((cfg, i) => (
            <Card key={i} title={cfg.title}>
              <HorizontalBarChart {...cfg.props} onBarClick={onHBarClick} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 

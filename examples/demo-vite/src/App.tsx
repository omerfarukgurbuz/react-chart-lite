import { VerticalBarChart, HorizontalBarChart, PieChart, RadarChart } from 'react-chart-lite'
import BarChartsGallery from './BarChartsGallery'

const verticalData = [
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

const verticalLegends = [
  { id: 'sales', label: 'Satış', color: '#3B82F6' },
  { id: 'target', label: 'Hedef', color: '#10B981' },
  { id: 'returns', label: 'İade', color: '#EF4444' },
  { id: 'average', label: 'Ortalama', color: '#F59E0B' },
]

const horizontalData = [
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

const horizontalLegends = [
  { id: 'sales', label: 'Satış', color: '#3B82F6' },
  { id: 'target', label: 'Hedef', color: '#10B981' },
]

// Pastel palette requested for PieChart examples
const PIE_PASTEL_COLORS = [
  'rgb(231, 204, 204)',
  'rgb(237, 232, 220)',
  'rgb(165, 182, 141)',
  'rgb(193, 207, 161)',
] as const

const pieLegends = [
  { id: 'chrome', label: 'Chrome', color: PIE_PASTEL_COLORS[0] },
  { id: 'safari', label: 'Safari', color: PIE_PASTEL_COLORS[1] },
  { id: 'firefox', label: 'Firefox', color: PIE_PASTEL_COLORS[2] },
  { id: 'edge', label: 'Edge', color: PIE_PASTEL_COLORS[3] },
]

const pieData = [
  { value: 63, legendId: 'chrome' },
  { value: 19, legendId: 'safari' },
  { value: 12, legendId: 'firefox' },
  { value: 6, legendId: 'edge' },
]

// Alternative distribution to diversify visuals with the same pastel palette
const pieDataAlt = [
  { value: 40, legendId: 'chrome' },
  { value: 28, legendId: 'safari' },
  { value: 18, legendId: 'firefox' },
  { value: 14, legendId: 'edge' },
]

const radarAxes = ['Hız', 'Kalite', 'Kapsam', 'Stabilite', 'Kullanılabilirlik']
const radarAxes6 = ['Hız', 'Kalite', 'Kapsam', 'Stabilite', 'Kullanılabilirlik', 'Dokümantasyon']
const radarAxes7 = ['Hız', 'Kalite', 'Kapsam', 'Stabilite', 'Kullanılabilirlik', 'Dokümantasyon', 'Destek']
const radarAxes8 = ['Hız', 'Kalite', 'Kapsam', 'Stabilite', 'Kullanılabilirlik', 'Dokümantasyon', 'Destek', 'Topluluk']
const radarAxes9 = ['Hız', 'Kalite', 'Kapsam', 'Stabilite', 'Kullanılabilirlik', 'Dokümantasyon', 'Destek', 'Topluluk', 'Güvenlik']

const radarLegends = [
  { id: 'v1', label: 'Sürüm v1', color: '#3B82F6', fillOpacity: 0.25 },
  { id: 'v2', label: 'Sürüm v2', color: '#10B981', fillOpacity: 0.25 },
]

const radarSeries = [
  { values: [65, 70, 75, 60, 55], legendId: 'v1' },
  { values: [80, 78, 72, 69, 74], legendId: 'v2' },
]

// Pastel radar legends using the same palette as PieChart
const radarPastelLegends = [
  { id: 'p1', label: 'Pastel A', color: PIE_PASTEL_COLORS[0], fillOpacity: 0.25 },
  { id: 'p2', label: 'Pastel B', color: PIE_PASTEL_COLORS[1], fillOpacity: 0.25 },
  { id: 'p3', label: 'Pastel C', color: PIE_PASTEL_COLORS[2], fillOpacity: 0.25 },
  { id: 'p4', label: 'Pastel D', color: PIE_PASTEL_COLORS[3], fillOpacity: 0.25 },
]

function radarValues(seed: number, base: number, axes: string[] = radarAxes) {
  return axes.map((_, i) => {
    const n = (seedNoise(i + 1 + seed) - 0.5) * 2
    return Math.max(0, Math.round(base + n * 20))
  })
}

const radarPastelSeries1 = [
  { legendId: 'p1', values: radarValues(1, 60) },
  { legendId: 'p2', values: radarValues(2, 70) },
]

const radarPastelSeries2 = [
  { legendId: 'p1', values: radarValues(3, 65) },
  { legendId: 'p2', values: radarValues(4, 75) },
  { legendId: 'p3', values: radarValues(5, 55) },
]

const radarPastelSeriesAll = [
  { legendId: 'p1', values: radarValues(6, 62) },
  { legendId: 'p2', values: radarValues(7, 72) },
  { legendId: 'p3', values: radarValues(8, 58) },
  { legendId: 'p4', values: radarValues(9, 66) },
]

// Full-width testbed data (EN labels, 20 columns, 3 bar series, 4 trend lines)
const testLegends = [
  { id: 'revenue', label: 'Revenue', color: '#00ADB5' },
  { id: 'cost', label: 'Cost', color: '#526D82' },
  { id: 'returnsEn', label: 'Returns', color: '#9DB2BF' },
  { id: 'l1', label: 'Line A', color: '#F67280' },
  { id: 'l2', label: 'Line B', color: '#C06C84' },
  { id: 'l3', label: 'Line C', color: '#6C5B7B' },
  { id: 'l4', label: 'Line D', color: '#355C7D' },
]

function seedNoise(n: number) {
  const v = Math.abs(Math.sin((n + 1) * 12.9898) * 43758.5453) % 1;
  return v;
}

function gentleTrend(i: number, start: number, step: number, amplitude: number, period: number, noiseAmp: number, seedOffset: number) {
  const base = start + step * i;
  const wave = amplitude * Math.sin((i * 2 * Math.PI) / period);
  const noise = (seedNoise(i + seedOffset) - 0.5) * 2 * noiseAmp;
  return Math.max(0, base + wave + noise);
}

const testData20 = Array.from({ length: 20 }).map((_, i) => ({
  category: `W${String(i + 1).padStart(2, '0')}`,
  bars: [
    { label: 'Revenue', value: Math.round(100 + ((i * 9) % 120)), legendId: 'revenue' },
    { label: 'Cost', value: Math.round(60 + ((i * 7) % 90)), legendId: 'cost' },
    { label: 'Returns', value: Math.round(5 + ((i * 5) % 30)), legendId: 'returnsEn' },
  ],
}))

const testLineSeries = [
  { legendId: 'l1', dashed: false, values: Array.from({ length: 20 }).map((_, i) => Math.round(gentleTrend(i, 95, 1.2, 10, 7, 2, 0))) },
  { legendId: 'l2', dashed: true,  values: Array.from({ length: 20 }).map((_, i) => Math.round(gentleTrend(i, 105, -0.8, 12, 9, 2, 5))) },
  { legendId: 'l3', dashed: false, values: Array.from({ length: 20 }).map((_, i) => Math.round(gentleTrend(i, 85, 0.6, 8, 5, 1.5, 9))) },
  { legendId: 'l4', dashed: true,  values: Array.from({ length: 20 }).map((_, i) => Math.round(gentleTrend(i, 115, -0.3, 6, 11, 1.5, 13))) },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600 }}>{title}</h2>
      {children}
    </section>
  )
}

function App() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Full-width testbed */}
      <div className="md:col-span-2 lg:col-span-3">
        <Section title="Testbed – Vertical (20 columns, 3 bars + 4 random lines)">
          <div className="w-full">
            <VerticalBarChart
              data={testData20}
              legends={testLegends}
              title="Weekly Metrics"
              subtitle="Revenue vs Cost vs Returns with multiple trend lines"
              showLegend
              showGrid
              showVerticalGrid
              showHorizontalGrid
              gridLineVariant="dashed"
              showLine
              lineSeries={testLineSeries}
              lineWidth={2}
              showLinePoints
              linePointRadius={3}
              chartHeight={420}
              showTooltip
              apsis
              ordinat
            />
          </div>
        </Section>
      </div>

      <div className="md:col-span-2 lg:col-span-3">
        <Section title="BarCharts Gallery – 30+ Variants">
          <BarChartsGallery />
        </Section>
      </div>

      <Section title="VerticalBarChart – Basic">
        <VerticalBarChart
          data={verticalData}
          legends={verticalLegends}
          title="Aylık Satış"
          showLegend
          showGrid
          showVerticalGrid
          showHorizontalGrid
          showTooltip
          chartHeight={320}
        />
      </Section>

      <Section title="VerticalBarChart – Çizgi Serisi ve Özelleştirilmiş Ölçek">
        <VerticalBarChart
          data={verticalData}
          legends={verticalLegends}
          title="Satış vs Hedef + Ortalama"
          showLegend
          showGrid
          showVerticalGrid
          gridLineVariant="dashed"
          showTooltip
          chartHeight={340}
          showLine
          lineSeries={[
            { legendId: 'average', values: [110, 130, 125, 140], dashed: true },
          ]}
          lineWidth={2}
          showLinePoints
          linePointRadius={3}
          scale={{ min: 0, max: 200, intervals: 5 }}
        />
      </Section>

      <Section title="VerticalBarChart – Değer Gösterimi ve Sıkı Aralık">
        <VerticalBarChart
          data={verticalData}
          legends={verticalLegends}
          title="Satış (Detay)"
          showLegend={false}
          showGrid
          showVerticalGrid
          barSpacing={6}
          categorySpacing={8}
          showValues
          showTooltip
          chartHeight={320}
        />
      </Section>

      <Section title="HorizontalBarChart – Basic">
        <HorizontalBarChart
          data={horizontalData}
          legends={horizontalLegends}
          title="Ürün Performansı"
          showLegend
          showGrid
          showTooltip
          animationDuration={500}
        />
      </Section>

      <Section title="HorizontalBarChart – Sıkı Boşluk ve Değer Gösterimi">
        <HorizontalBarChart
          data={horizontalData}
          legends={horizontalLegends}
          title="Ürün Performansı (Detay)"
          showLegend={false}
          showGrid
          barSpacing={6}
          categorySpacing={10}
          showValues
          showTooltip
        />
      </Section>

      <Section title="HorizontalBarChart – Küçük Barlar ve Ölçek">
        <HorizontalBarChart
          data={horizontalData}
          legends={horizontalLegends}
          title="Hedef Karşılaştırma"
          showLegend={false}
          showGrid
          barHeight={18}
          barSpacing={8}
          categorySpacing={12}
          scale={{ min: 0, max: 150, intervals: 5 }}
          showTooltip
        />
      </Section>

      <Section title="PieChart – Basic">
        <div style={{ maxWidth: 520 }}>
          <PieChart
            data={pieData}
            legends={pieLegends}
            title="Tarayıcı Pazar Payı"
            showLegend
            size={360}
            showTooltip
          />
        </div>
      </Section>

      <Section title="PieChart – Donut ve Etiketler">
        <div style={{ maxWidth: 520 }}>
          <PieChart
            data={pieData}
            legends={pieLegends}
            title="Tarayıcı Pazar Payı (Donut)"
            showLegend={false}
            size={360}
            innerRadiusRatio={0.6}
            showLabels
            labelFormatter={(percent, _value, label) => `${label} ${(percent * 100).toFixed(0)}%`}
            showTooltip
          />
        </div>
      </Section>

      <Section title="PieChart – Pad Angle ve Kompakt">
        <div style={{ maxWidth: 420 }}>
          <PieChart
            data={pieDataAlt}
            legends={pieLegends}
            title="Pazar Payı (Kompakt)"
            showLegend={false}
            size={300}
            padAngle={2}
            showTooltip
          />
        </div>
      </Section>

      <Section title="PieChart – Donut (Pastel) + Etiketler (Alt Dağılım)">
        <div style={{ maxWidth: 420 }}>
          <PieChart
            data={pieDataAlt}
            legends={pieLegends}
            title="Pastel Donut"
            showLegend
            size={300}
            innerRadiusRatio={0.55}
            showLabels
            labelFormatter={(percent, value, label) => `${label} ${value} (${(percent * 100).toFixed(0)}%)`}
            showTooltip
          />
        </div>
      </Section>

      <Section title="RadarChart – Çoklu Seri">
        <div style={{ maxWidth: 560 }}>
          <RadarChart
            axes={radarAxes}
            series={radarSeries}
            legends={radarLegends}
            title="Ürün Özellik Skorları"
            showLegend
            showGrid
            showAxes
            showAxisLabels
            size={420}
            strokeWidth={2}
            dotRadius={3}
            showTooltip
          />
        </div>
      </Section>

      <Section title="RadarChart – Dotted Grid ve Yoğun Doldurma">
        <div style={{ maxWidth: 560 }}>
          <RadarChart
            axes={radarAxes}
            series={radarSeries}
            legends={radarLegends}
            title="Karşılaştırma"
            showLegend={false}
            showGrid
            gridLineVariant="dotted"
            fillOpacity={0.35}
            size={420}
            showTooltip
          />
        </div>
      </Section>

      <Section title="RadarChart – Minimal">
        <div style={{ maxWidth: 560 }}>
          <RadarChart
            axes={radarAxes}
            series={radarSeries}
            legends={radarLegends}
            title="Minimal Radar"
            showLegend={false}
            showGrid={false}
            showAxes
            size={380}
            strokeWidth={1}
            dotRadius={2}
            showTooltip
          />
        </div>
      </Section>

      {/* Pastel Radar Gallery (10 examples) */}
      <div className="md:col-span-2 lg:col-span-3">
        <Section title="RadarChart – Pastel Gallery (10 examples)">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* 1 */}
            <RadarChart axes={radarAxes} series={radarPastelSeries1} legends={radarPastelLegends} title="P1" showLegend showGrid size={240} showTooltip />
            {/* 2 */}
            <RadarChart axes={radarAxes} series={radarPastelSeries2} legends={radarPastelLegends} title="P2" showLegend showGrid gridLineVariant="solid" size={240} showTooltip />
            {/* 3 */}
            <RadarChart axes={radarAxes} series={radarPastelSeriesAll} legends={radarPastelLegends} title="P3" showLegend showGrid gridLineVariant="dotted" size={240} showTooltip />
            {/* 4 */}
            <RadarChart axes={radarAxes} series={[{ legendId: 'p3', values: radarValues(10, 62) }, { legendId: 'p4', values: radarValues(11, 64) }]} legends={radarPastelLegends} title="P4" showLegend showGrid size={240} showTooltip />
            {/* 5 */}
            <RadarChart axes={radarAxes} series={[{ legendId: 'p1', values: radarValues(12, 70) }]} legends={radarPastelLegends} title="P5 (Single)" showLegend showGrid size={240} showTooltip />
            {/* 6 */}
            <RadarChart axes={radarAxes} series={[{ legendId: 'p2', values: radarValues(13, 68) }, { legendId: 'p4', values: radarValues(14, 60) }]} legends={radarPastelLegends} title="P6" showLegend showGrid gridLineVariant="dashed" size={240} showTooltip />
            {/* 7 */}
            <RadarChart axes={radarAxes} series={[{ legendId: 'p3', values: radarValues(15, 58) }, { legendId: 'p1', values: radarValues(16, 66) }]} legends={radarPastelLegends} title="P7" showLegend showGrid size={240} showTooltip />
            {/* 8 */}
            <RadarChart axes={radarAxes} series={[{ legendId: 'p4', values: radarValues(17, 72) }, { legendId: 'p2', values: radarValues(18, 63) }]} legends={radarPastelLegends} title="P8" showLegend showGrid gridLineVariant="dotted" size={240} showTooltip />
            {/* 9 */}
            <RadarChart axes={radarAxes} series={[{ legendId: 'p2', values: radarValues(19, 74) }, { legendId: 'p3', values: radarValues(20, 61) }, { legendId: 'p1', values: radarValues(21, 57) }]} legends={radarPastelLegends} title="P9" showLegend showGrid size={240} showTooltip />
            {/* 10 */}
            <RadarChart axes={radarAxes} series={[{ legendId: 'p4', values: radarValues(22, 65) }]} legends={radarPastelLegends} title="P10 (Single)" showLegend showGrid gridLineVariant="solid" size={240} showTooltip />
          </div>
        </Section>
      </div>

      {/* Multi-axes (6/7/8/9) pastel examples */}
      <div className="md:col-span-2 lg:col-span-3">
        <Section title="RadarChart – Multi-Axes (6/7/8/9)">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RadarChart axes={radarAxes6} series={[{ legendId: 'p1', values: radarValues(31, 64, radarAxes6) }, { legendId: 'p2', values: radarValues(32, 70, radarAxes6) }]} legends={radarPastelLegends} title="6-gen" showLegend showGrid size={260} showTooltip />
            <RadarChart axes={radarAxes7} series={[{ legendId: 'p3', values: radarValues(33, 62, radarAxes7) }, { legendId: 'p1', values: radarValues(34, 68, radarAxes7) }]} legends={radarPastelLegends} title="7-gen" showLegend showGrid size={260} showTooltip />
            <RadarChart axes={radarAxes8} series={[{ legendId: 'p4', values: radarValues(35, 66, radarAxes8) }, { legendId: 'p2', values: radarValues(36, 72, radarAxes8) }]} legends={radarPastelLegends} title="8-gen" showLegend showGrid size={260} showTooltip />
            <RadarChart axes={radarAxes9} series={[{ legendId: 'p1', values: radarValues(37, 70, radarAxes9) }, { legendId: 'p3', values: radarValues(38, 62, radarAxes9) }, { legendId: 'p4', values: radarValues(39, 58, radarAxes9) }]} legends={radarPastelLegends} title="9-gen" showLegend showGrid size={260} showTooltip />
          </div>
        </Section>
      </div>
    </div>
  )
}

export default App

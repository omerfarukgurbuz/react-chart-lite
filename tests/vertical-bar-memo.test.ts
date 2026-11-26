import { describe, it, expect } from 'vitest';
import {
  hasChartDataChanged,
  shouldChartRerender,
  type VerticalBarChartProps,
} from '@/components/ui/VerticalBarChart/VerticalBarChart';

const baseLegends: VerticalBarChartProps['legends'] = [
  { id: 'sales', label: 'Sales', color: '#00ADB5' },
];

const baseData: VerticalBarChartProps['data'] = [
  {
    category: 'Jan',
    bars: [{ value: 42, legendId: 'sales', label: 'Sales', tooltip: 'Jan sales: 42' }],
  },
];

describe('VerticalBarChart memo comparators', () => {
  it('skips re-render when props and data contents are unchanged', () => {
    const onBarClick = () => {};
    const prev: Partial<VerticalBarChartProps> = {
      data: baseData,
      legends: baseLegends,
      scale: { min: 0, max: 100, intervals: 5 },
      title: 'Revenue',
      showValues: false,
      showGrid: true,
      style: { width: '100%' },
      classes: { root: 'chart-root' },
      onBarClick,
    };

    const next: Partial<VerticalBarChartProps> = {
      data: [
        {
          category: 'Jan',
          bars: [{ value: 42, legendId: 'sales', label: 'Sales', tooltip: 'Jan sales: 42' }],
        },
      ],
      legends: [...baseLegends],
      scale: { min: 0, max: 100, intervals: 5 },
      title: 'Revenue',
      showValues: false,
      showGrid: true,
      style: { width: '100%' },
      classes: { root: 'chart-root' },
      onBarClick,
    };

    expect(hasChartDataChanged(prev.data!, next.data!)).toBe(false);
    expect(shouldChartRerender(prev, next)).toBe(false);
  });

  it('re-renders when visual, toggle, or callback props change', () => {
    const base: Partial<VerticalBarChartProps> = {
      data: baseData,
      legends: baseLegends,
      title: 'Revenue',
      subtitle: 'Q1',
      showLegend: true,
      showGrid: true,
      showValueGrid: true,
      showCategoryGrid: false,
      gridLineVariant: 'dashed',
      showValues: false,
      animated: true,
      animationDuration: 500,
      showBaselineAxis: true,
      showLeftAxis: true,
      showTooltip: false,
      className: 'a',
      id: 'chart-1',
      unstyled: false,
      onBarClick: () => {},
    };

    expect(shouldChartRerender(base, { ...base, title: 'Updated Revenue' })).toBe(true);
    expect(shouldChartRerender(base, { ...base, subtitle: 'Q2' })).toBe(true);
    expect(shouldChartRerender(base, { ...base, showLegend: false })).toBe(true);
    expect(shouldChartRerender(base, { ...base, showGrid: false })).toBe(true);
    expect(shouldChartRerender(base, { ...base, showValueGrid: false })).toBe(true);
    expect(shouldChartRerender(base, { ...base, showCategoryGrid: true })).toBe(true);
    expect(shouldChartRerender(base, { ...base, gridLineVariant: 'solid' })).toBe(true);
    expect(shouldChartRerender(base, { ...base, showValues: true })).toBe(true);
    expect(shouldChartRerender(base, { ...base, animated: false })).toBe(true);
    expect(shouldChartRerender(base, { ...base, animationDuration: 250 })).toBe(true);
    expect(shouldChartRerender(base, { ...base, showBaselineAxis: false })).toBe(true);
    expect(shouldChartRerender(base, { ...base, showLeftAxis: false })).toBe(true);
    expect(shouldChartRerender(base, { ...base, showTooltip: true })).toBe(true);
    expect(shouldChartRerender(base, { ...base, className: 'b' })).toBe(true);
    expect(shouldChartRerender(base, { ...base, id: 'chart-2' })).toBe(true);
    expect(shouldChartRerender(base, { ...base, unstyled: true })).toBe(true);
    expect(shouldChartRerender(base, { ...base, onBarClick: () => {} })).toBe(true);
  });

  it('re-renders when style or classes values change', () => {
    const base: Partial<VerticalBarChartProps> = {
      data: baseData,
      legends: baseLegends,
      style: { width: '100%' },
      classes: { bar: 'bar-a' },
    };

    expect(shouldChartRerender(base, { ...base, style: { width: '50%' } })).toBe(true);
    expect(shouldChartRerender(base, { ...base, classes: { bar: 'bar-b' } })).toBe(true);
    expect(shouldChartRerender(base, { ...base, classes: { root: undefined } })).toBe(true);
  });

  it('detects bar tooltip updates in chart data', () => {
    const updatedData: VerticalBarChartProps['data'] = [
      {
        category: 'Jan',
        bars: [{ value: 42, legendId: 'sales', label: 'Sales', tooltip: 'Updated tooltip' }],
      },
    ];

    expect(hasChartDataChanged(baseData, updatedData)).toBe(true);
    expect(shouldChartRerender({ data: baseData, legends: baseLegends }, { data: updatedData, legends: baseLegends })).toBe(true);
  });
});

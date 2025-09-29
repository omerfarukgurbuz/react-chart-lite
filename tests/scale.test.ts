import { describe, it, expect } from 'vitest';
import { calculateNiceScale, getGridLines } from '@/utils/scale';

describe('scale utils', () => {
  it('calculateNiceScale returns nice max and defaults', () => {
    const s = calculateNiceScale([3, 17]);
    expect(s.min).toBe(0);
    expect(s.max).toBe(20);
    expect(s.intervals).toBe(5);
    expect(typeof s.formatter).toBe('function');
  });

  it('calculateNiceScale handles empty inputs', () => {
    const s = calculateNiceScale([]);
    expect(s.min).toBe(0);
    expect(s.max).toBe(100);
  });

  it('calculateNiceScale respects provided scale', () => {
    const provided = { min: 10, max: 50, intervals: 4, formatter: (v: number) => `${v}` };
    const s = calculateNiceScale([1, 2, 3], provided);
    expect(s).toEqual(provided);
  });

  it('getGridLines returns intervals+1 lines with positions 0..100', () => {
    const s = { min: 0, max: 100, intervals: 5, formatter: (v: number) => `${v}` };
    const lines = getGridLines(s);
    expect(lines).toHaveLength(6);
    expect(lines[0].position).toBe(0);
    expect(lines.at(-1)?.position).toBe(100);
  });
});


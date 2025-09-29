import { describe, it, expect } from 'vitest';
import { degToRad, polarToCartesian, buildPolygonPath, buildArcPath, roundTo } from '@/utils/geometry';

describe('geometry utils', () => {
  it('degToRad converts degrees to radians', () => {
    expect(degToRad(0)).toBe(0);
    expect(degToRad(180)).toBeCloseTo(Math.PI);
    expect(degToRad(360)).toBeCloseTo(2 * Math.PI);
  });

  it('polarToCartesian computes correct coordinates', () => {
    const c = { x: 100, y: 50 };
    const r = 10;
    expect(polarToCartesian(c.x, c.y, r, 0)).toEqual({ x: c.x + r, y: c.y });
    expect(polarToCartesian(c.x, c.y, r, 90).x).toBeCloseTo(c.x);
    expect(polarToCartesian(c.x, c.y, r, 90).y).toBeCloseTo(c.y + r);
  });

  it('buildPolygonPath builds a closed path for points', () => {
    const path = buildPolygonPath([
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
      { x: 0, y: 10 },
    ]);
    expect(path.startsWith('M')).toBe(true);
    expect(path.endsWith(' Z')).toBe(true);
  });

  it('buildArcPath handles donut and pie slices', () => {
    const cx = 50, cy = 50;
    const donut = buildArcPath(cx, cy, 40, 20, 0, 120);
    const pie = buildArcPath(cx, cy, 40, 0, 0, 120);
    expect(donut).toContain('A');
    expect(pie).toContain('A');
    expect(donut).toContain('Z');
  });

  it('roundTo rounds to given precision', () => {
    expect(roundTo(1.2345, 2)).toBe(1.23);
    expect(roundTo(1.235, 2)).toBe(1.24);
  });
});


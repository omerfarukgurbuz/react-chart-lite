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
    expect((pie.match(/A /g) || [])).toHaveLength(1);
    expect((donut.match(/A /g) || [])).toHaveLength(2);
  });

  it.each([0, 20])('draws a full circle with inner radius %s using semicircular arcs', (innerR) => {
    const path = buildArcPath(50, 50, 40, innerR, -90, 270);
    const arcs = [...path.matchAll(/A ([\d.]+) ([\d.]+) 0 (\d) (\d) ([\d.-]+) ([\d.-]+)/g)];

    // Coincident start/end points make a single SVG arc disappear.
    expect(arcs).toHaveLength(innerR === 0 ? 2 : 4);
    expect(arcs[0].slice(1)).toEqual(['40', '40', '0', '1', '50', '90']);
    expect(arcs[1].slice(1)).toEqual(['40', '40', '0', '1', '50', '10']);
    if (innerR > 0) {
      // Reverse the inner contour to preserve the donut hole.
      expect(arcs[2].slice(1)).toEqual(['20', '20', '0', '0', '50', '70']);
      expect(arcs[3].slice(1)).toEqual(['20', '20', '0', '0', '50', '30']);
    }
    expect(path.endsWith(' Z')).toBe(true);
  });

  it('roundTo rounds to given precision', () => {
    expect(roundTo(1.2345, 2)).toBe(1.23);
    expect(roundTo(1.235, 2)).toBe(1.24);
  });
});


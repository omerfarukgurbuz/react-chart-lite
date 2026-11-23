import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';
import RadarChart from '@/components/ui/RadarChart/RadarChart';

it('renders without exceeding the argument limit while inferring the scale', () => {
  const values = Array<number>(250_000).fill(3);
  values[125_000] = 17;
  const markup = renderToStaticMarkup(createElement(RadarChart, {
    axes: ['First', 'Second', 'Third'],
    series: [{ legendId: 'series', values }],
    legends: [],
  }));
  expect(markup).toContain('aria-label="Radar chart"');
  expect(markup).toContain('>20</text>');
});

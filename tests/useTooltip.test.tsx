// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect } from 'vitest';
import { createRoot } from 'react-dom/client';
import { useTooltip } from '@/hooks/useTooltip';

type TooltipApi = ReturnType<typeof useTooltip>;

function Harness(props: {
  onReady: (api: TooltipApi, bodyEl: HTMLDivElement | null) => void;
  onStateChange: (state: TooltipApi['state']) => void;
}) {
  const bodyRef = React.useRef<HTMLDivElement | null>(null);
  const tooltip = useTooltip({ enabled: true });
  React.useEffect(() => {
    props.onReady(tooltip, bodyRef.current);
  }, []);
  React.useEffect(() => {
    props.onStateChange(tooltip.state);
  }, [tooltip.state]);
  return <div ref={bodyRef} data-testid="body" />;
}

describe('useTooltip hook', () => {
  it('shows at clamped position and hides correctly', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    let api: TooltipApi | null = null;
    let bodyEl: HTMLDivElement | null = null;
    const states: TooltipApi['state'][] = [];

    root.render(
      <Harness
        onReady={(a, el) => {
          api = a;
          bodyEl = el;
        }}
        onStateChange={(s) => states.push(s)}
      />
    );

    // Ensure body element exists and mock its bounding rect
    expect(bodyEl).not.toBeNull();
    if (!bodyEl) throw new Error('Body element not found');
    bodyEl.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 200,
      bottom: 100,
      width: 200,
      height: 100,
      toJSON: () => ({}),
    } as DOMRect);

    // Call showAtEvent near bottom-right; expect clamping to width-8/height-8 with +12 offset
    const fakeEvt = { clientX: 190, clientY: 95 } as unknown as React.MouseEvent;
    api!.showAtEvent(fakeEvt, 'Hello', bodyEl);

    // Wait microtask for state update
    await Promise.resolve();

    const last = states.at(-1);
    expect(last).toBeDefined();
    expect(last!.visible).toBe(true);
    expect(last!.content).toBe('Hello');
    expect(last!.x).toBe(192); // min(190+12, 200-8)
    expect(last!.y).toBe(92);  // min(95+12, 100-8)

    // Hide tooltip
    api!.hide();
    await Promise.resolve();
    const afterHide = states.at(-1);
    expect(afterHide!.visible).toBe(false);
  });
});


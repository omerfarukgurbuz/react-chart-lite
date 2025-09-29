import React from 'react';
import type { TooltipApi, TooltipState } from './useTooltip.types';


export function useTooltip(options: { enabled: boolean }): TooltipApi {
	const [state, setState] = React.useState<TooltipState>({
		visible: false,
		x: 0,
		y: 0,
		content: ''
	});

	const showAtEvent = React.useCallback(
		(evt: React.MouseEvent, content: string, bodyEl?: HTMLDivElement | null) => {
			if (!options.enabled || !bodyEl) return;
			const rect = bodyEl.getBoundingClientRect();
			const x = Math.max(0, Math.min(evt.clientX - rect.left + 12, rect.width - 8));
			const y = Math.max(0, Math.min(evt.clientY - rect.top + 12, rect.height - 8));
			setState({ visible: true, x, y, content });
		},
		[options.enabled]
	);

	const hide = React.useCallback(() => {
		if (!options.enabled) return;
		setState(prev => ({ ...prev, visible: false }));
	}, [options.enabled]);

	const showAtElement = React.useCallback((el: Element, content: string, bodyEl?: HTMLDivElement | null) => {
		if (!options.enabled || !bodyEl) return;
		try {
			const bodyRect = bodyEl.getBoundingClientRect();
			const elRect = el.getBoundingClientRect();
			const x = Math.max(0, Math.min(elRect.left - bodyRect.left + elRect.width / 2, bodyRect.width - 8));
			const y = Math.max(0, Math.min(elRect.top - bodyRect.top + elRect.height / 2, bodyRect.height - 8));
			setState({ visible: true, x, y, content });
		} catch {
			// no-op
		}
	}, [options.enabled]);

	return { state, showAtEvent, showAtElement, hide };
}

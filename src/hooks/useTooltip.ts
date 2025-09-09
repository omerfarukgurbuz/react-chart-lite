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

	return { state, showAtEvent, hide };
} 
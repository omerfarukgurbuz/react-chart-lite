import type React from 'react';

export type TooltipState = {
	visible: boolean;
	x: number;
	y: number;
	content: string;
};

export type TooltipApi = {
	state: TooltipState;
	showAtEvent: (
		evt: React.MouseEvent,
		content: string,
		bodyEl?: HTMLDivElement | null
	) => void;
	hide: () => void;
}; 
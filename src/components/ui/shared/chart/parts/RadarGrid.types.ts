export type Point = { x: number; y: number };

export type RadarGridProps = {
	show: boolean;
	gridLevels: Array<Point[]>;
	strokeColor?: string;
}; 
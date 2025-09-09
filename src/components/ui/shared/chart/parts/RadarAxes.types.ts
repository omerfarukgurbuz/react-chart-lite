export type Point = { x: number; y: number };

export type RadarAxesProps = {
	show: boolean;
	center: number;
	endpoints: Point[];
	strokeColor?: string;
}; 
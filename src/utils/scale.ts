export type ChartScale = {
	min: number;
	max: number;
	intervals: number;
	formatter?: (value: number) => string;
};

export function calculateNiceScale(
	values: number[],
	provided?: ChartScale,
	options?: { minBase?: number; intervals?: number }
): ChartScale {
	if (provided) return { ...provided };
	const minBase = options?.minBase ?? 0;
	const safeValues = Array.isArray(values) && values.length > 0 ? values : [0];
	const maxValue = Math.max(minBase, ...safeValues);
	const range = maxValue - minBase;
	const magnitude = Math.pow(10, Math.floor(Math.log10(range || 1)));
	const roundedMax = Math.ceil(maxValue / magnitude) * magnitude;
	return {
		min: minBase,
		max: roundedMax || 100,
		intervals: options?.intervals ?? 5,
		formatter: (v: number) => v.toString(),
	};
}

export function getGridLines(scale: ChartScale): Array<{ value: number; position: number }>{
	const { min, max, intervals } = scale;
	const step = (max - min) / intervals;
	return Array.from({ length: intervals + 1 }, (_, i) => {
		const value = min + step * i;
		const position = ((value - min) / (max - min || 1)) * 100;
		return { value, position };
	});
} 
export const degToRad = (deg: number) => (deg * Math.PI) / 180;

export const polarToCartesian = (centerX: number, centerY: number, radius: number, angleDeg: number) => {
	const angle = degToRad(angleDeg);
	return {
		x: centerX + radius * Math.cos(angle),
		y: centerY + radius * Math.sin(angle),
	};
};

export const buildPolygonPath = (points: Array<{ x: number; y: number }>): string => {
	if (points.length === 0) return '';
	return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
};

export const roundTo = (value: number, precision = 2): number => Number(value.toFixed(precision));

export const buildArcPath = (
	cx: number,
	cy: number,
	outerR: number,
	innerR: number,
	startAngle: number,
	endAngle: number
) => {
	const startOuter = polarToCartesian(cx, cy, outerR, startAngle);
	const endOuter = polarToCartesian(cx, cy, outerR, endAngle);
	const startInner = polarToCartesian(cx, cy, innerR, endAngle);
	const endInner = polarToCartesian(cx, cy, innerR, startAngle);
	const largeArc = endAngle - startAngle > 180 ? 1 : 0;

	// Round coordinates to avoid hydration mismatches
	const sox = roundTo(startOuter.x);
	const soy = roundTo(startOuter.y);
	const eox = roundTo(endOuter.x);
	const eoy = roundTo(endOuter.y);
	const six = roundTo(startInner.x);
	const siy = roundTo(startInner.y);
	const eix = roundTo(endInner.x);
	const eiy = roundTo(endInner.y);
	const rcx = roundTo(cx);
	const rcy = roundTo(cy);
	const rOuter = roundTo(outerR);
	const rInner = roundTo(innerR);

	if (innerR <= 0) {
		// Full pie (no inner hole)
		return [
			`M ${rcx} ${rcy}`,
			`L ${sox} ${soy}`,
			`A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${eox} ${eoy}`,
			'Z',
		].join(' ');
	}

	// Donut slice (ring)
	return [
		`M ${sox} ${soy}`,
		`A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${eox} ${eoy}`,
		`L ${six} ${siy}`,
		`A ${rInner} ${rInner} 0 ${largeArc} 0 ${eix} ${eiy}`,
		'Z',
	].join(' ');
}; 
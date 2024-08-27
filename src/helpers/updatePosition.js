export const updatePosition = arr =>
	arr.map((el, i) => ({
		...el,
		position: i + 1,
	}));

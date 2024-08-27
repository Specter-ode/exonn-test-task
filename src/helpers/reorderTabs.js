export const reorderTabs = (tabs, startIndex, endIndex) => {
	const result = Array.from(tabs);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result.map((tab, index) => ({
			...tab,
			position: index + 1,
	}));
};
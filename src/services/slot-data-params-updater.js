export default {
	getSlotSizes(adSlot) {
		let result = {};

		adSlot.getSizes()
			.forEach((s) => {
				result[s.viewportSize[0] + 'x' + s.viewportSize[1]] = s.sizes
			});

		return JSON.stringify(result);
	}
};

let offsetTop = 1000;

export default {
	getId() {
		return 'gpt-fake-ad';
	},

	getSlotName() {
		return 'FAKE_AD';
	},

	getViewportConflicts() {
		return [
			'foo-container'
		];
	},

	getElement() {
		return {
			classList: {
				contains: () => {}
			},
			offsetHeight: 300,
			offsetTop,
			offsetParent: null,
			ownerDocument: {}
		}
	},

	setOffsetTop(offset) {
		offsetTop = offset;
	},

	config: {
		targeting: {
			wsi: 'yyyy',
		}
	}
};

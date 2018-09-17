let offsetTop = 1000;

export default {
	getSlotName() {
		return 'FAKE_AD';
	},

	getViewportConflicts() {
		return [];
	},

	getCopy() {
		return JSON.parse(JSON.stringify(this.config));
	},

	hasDefinedViewportConflicts() {
		return false;
	},

	isEnabled() {
		return true;
	},

	isRepeatable() {
		return false;
	},

	getStatus() {
		return null;
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
		};
	},

	setOffsetTop(offset) {
		offsetTop = offset;
	},

	config: {
		targeting: {
			wsi: 'yyyy',
			rv: 1
		}
	}
};

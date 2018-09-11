import helpers from '../common/helpers';

class RepeatableSlots {
	constructor() {
		this.pageLink = 'slots/repeatable-slots/';
		this.limitSlots = 'limit=';
		this.contentLength = 'content_length=';
		this.boxadWidth = 300;
		this.boxadHeight = 250;
		this.repeatableBoxad = '#repeatable_boxad_';
	}

	/**
	 * Scrolls between boxads
	 * @param currentBoxad {string} currently visible boxad
	 * @param {number} distance to scroll
	 */
	scrollBetweenBoxads(currentBoxad, distance = 2000) {
		helpers.slowScroll(distance, currentBoxad);
	}

	/**
	 * Sets number of ad slots to load
	 * @param {number} slotNumber - slots to load
	 * @returns {string} parameter with number of slots
	 */
	getRepeatableSlot(slotNumber) {
		return `${this.repeatableBoxad}${slotNumber}`;
	}

	/**
	 * Provides parameter to limit number of slots
	 * @param {number} limit - the amount to limit to
	 * @returns {string} parameter with slot limit
	 */
	setLimitOfSlots(limit = 3) {
		return `${this.limitSlots}${limit}`;
	}

	/**
	 * Provides parameter to add more paragraphs
	 * @param {number}lengthNumber - number of added paragraphs multiplied by 15
	 * @returns {string} parameter with paragraphs added
	 */
	setLengthOfContent(lengthNumber = 5) {
		return `${this.contentLength}${lengthNumber}`;
	}
}

export default new RepeatableSlots();

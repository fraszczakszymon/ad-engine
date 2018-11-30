import { helpers } from '../common/helpers';
import { adSlots } from '../common/ad-slots';

class RepeatableSlots {
	constructor() {
		this.pageLink = 'slots/repeatable-slots/';
	}

	/**
	 * Scrolls between boxads
	 * @param currentBoxad {string} currently visible boxad
	 * @param {number} distance to scroll
	 */
	scrollBetweenBoxads(currentBoxad, distance = 2250) {
		helpers.slowScroll(distance, currentBoxad);
	}

	/**
	 * Provides parameter to set number of ad slots to load
	 * @param {number} slotNumber - slots to load
	 * @returns {string} parameter with number of slots
	 */
	getRepeatableSlot(slotNumber) {
		return `${adSlots.repeatableBoxad}${slotNumber}`;
	}
}

export const repeatableSlots = new RepeatableSlots();

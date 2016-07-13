'use strict';

import {getTopOffset} from '../utils/dimensions';
import ScrollListener from '../listeners/scroll-listener';

export default class FloatingAd {
	/**
	 * Constructor
	 *
	 * @param {object} adSlot
	 */
	constructor(adSlot) {
		this.adSlot = adSlot;
	}

	/**
	 * Initializes the ad skin
	 */
	init() {
		let container,
			containerOffset,
			end,
			slotHeight,
			slotNode = document.getElementById(this.adSlot.getId()),
			space,
			start = 0;

		if (!slotNode || !slotNode.classList.contains('floating')) {
			return;
		}

		ScrollListener.addCallback(() => {
			let scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

			container = slotNode.parentNode;
			containerOffset = getTopOffset(container);
			slotHeight = slotNode.offsetHeight;
			end = containerOffset + container.offsetHeight - slotHeight;

			start = containerOffset;
			if (slotNode.previousElementSibling) {
				start = getTopOffset(slotNode.previousElementSibling) + slotNode.previousElementSibling.offsetHeight;
			}

			space = end - start;
			if (space <= slotHeight) {
				slotNode.classList.add('pinned-top');
				slotNode.classList.remove('pinned-bottom');
				return;
			}

			if (scrollPosition <= start) {
				slotNode.classList.add('pinned-top');
				slotNode.classList.remove('pinned-bottom');
			} else if (scrollPosition >= end) {
				slotNode.classList.add('pinned-bottom');
				slotNode.classList.remove('pinned-top');
			} else {
				slotNode.classList.remove('pinned-top');
				slotNode.classList.remove('pinned-bottom');
			}
		});
	}
}

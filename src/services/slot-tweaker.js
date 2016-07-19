'use strict';

import {logger} from '../utils/logger';

const logGroup = 'slot-tweaker';

export default class SlotTweaker {
	static getContainer(adSlot) {
		const container = document.getElementById(adSlot.getId());

		if (!container) {
			logger('Slot tweaker: cannot find container for ' + adSlot.getId());
		}

		return container;
	}

	static hide(adSlot) {
		let container = this.getContainer(adSlot);

		if (container) {
			logger(logGroup, 'hide', adSlot.getId());
			container.classList.add('hide');
		}
	}

	static show(adSlot) {
		let container = this.getContainer(adSlot);

		if (container) {
			logger(logGroup, 'show', adSlot.getId());
			container.classList.remove('hide');
		}
	}

	static makeResponsive(adSlot, aspectRatio = null) {
		this.onReady(adSlot, (iframe) => {
			const container = iframe.parentElement;

			if (!aspectRatio) {
				const height = iframe.contentWindow.document.body.scrollHeight,
					width = iframe.contentWindow.document.body.scrollWidth;

				aspectRatio = width/height;
			}

			logger(logGroup, 'make responsive', adSlot.getId());
			container.style.paddingBottom = 100/aspectRatio + '%';
		});
	}

	static onReady(adSlot, callback) {
		let container = this.getContainer(adSlot),
			iframe = container.querySelector('div[id*="_container_"] iframe');

		if (!iframe) {
			return;
		}

		if (iframe.contentWindow.document.readyState === 'complete') {
			callback(iframe);
		} else {
			iframe.addEventListener('load', function () {
				callback(iframe);
			});
		}
	}
}

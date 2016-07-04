'use strict';

import {makeLazyQueue} from './utils/lazy-queue';
import AdSlot from './ad-slot';
import Config from './config';
import GptProvider from './providers/gpt-provider';
import ScrollListener from './listeners/scroll-listener';
import SlotService from './services/slot-service';

export default class AdEngine {
	/**
	 * Create new instance
	 *
	 * @param {array} adStack List of ad objects from the DOM
	 * @param {object} pageData Article or other page type data, ex: categories, tags, vertical
	 * @param {boolean} isMobile Are we on a mobile screen size
	 */
	constructor(adStack, pageData, isMobile) {
		this.adStack = adStack;
		this.pageData = pageData;
		this.isMobile = isMobile;

		window.ads = window.ads || {};
		window.ads.runtime = window.ads.runtime || {};
	}

	init() {
		let provider = new GptProvider(this.pageData);

		makeLazyQueue(this.adStack, (ad) => {
			this.fillInUsingProvider(ad, provider);

			if (this.adStack.length === 0) {
				provider.flush();
			}
		});
		this.adStack.start();

		ScrollListener.init();

		if (Config.events && Config.events.pushOnScroll) {
			Config.events.pushOnScroll.ids.forEach((id) => {
				ScrollListener.addSlot(this.adStack, id, Config.events.pushOnScroll.threshold);
			});
		}
	}

	fillInUsingProvider(ad, provider) {
		const adSlot = new AdSlot(ad);

		SlotService.add(adSlot);
		if (this.shouldLoadAd(adSlot)) {
			provider.fillIn(adSlot);
		}
	};

	/**
	 * Check if the ad corresponds to this screen size
	 * @param adSlot
	 * @returns {*|boolean}
	 */
	shouldLoadAd(adSlot) {
		const shouldLoad = adSlot.getSupportedScreen() === 'both',
			shouldLoadDesktop = !this.isMobile && adSlot.getSupportedScreen() === 'desktop',
			shouldLoadMobile = this.isMobile && adSlot.getSupportedScreen() === 'mobile';

		return shouldLoad || shouldLoadDesktop || shouldLoadMobile;
	}
}

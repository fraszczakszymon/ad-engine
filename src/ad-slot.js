'use strict';

import config from './config';
import FloatingAd from './templates/floating-ad';
import SlotTweaker from './services/slot-tweaker';

const adUnitPrefix = '/5441/wka.fandom/';

export default class AdSlot {
	/**
	 * Parse the object that's passed from the template to extract more details
	 * @param {object} ad Object containing an ad id and page type
	 *      Format of id is:
	 *           gpt-<location>-<ad-type>[-<screen-size>]
	 *      Examples:
	 *           gpt-top-leaderboard
	 *           gpt-bottom-boxad-mobile
	 *           gpt-bottom-leaderboard-desktop
	 */
	constructor(ad) {
		let segments = ad.id.split('-');

		if (segments.length < 3) {
			throw 'Invalid GPT id passed to parseId (' + ad.id + ').';
		}

		this.id = ad.id;
		this.pageType = ad.pageType;
		this.location = segments[1];
		this.screenSize = !!segments[3] ? segments[3] : 'both';
		this.type = segments[2];
		this.config = config.slots[this.location + '-' + this.type];
		this.enabled = !this.config.disabled;
	}

	getId() {
		return this.id;
	}

	getAdUnit() {
		const namespaces = {
				home: '_home/HOME_',
				hub: '_vertical/VERTICAL_',
				article: '_article/ARTICLE_',
				other: '_other/OTHER_'
			},
			namespace = namespaces[this.pageType];

		if (!namespace) {
			throw 'Page type needs to have a namespace associated with it (' + this.pageType + ').';
		}

		return adUnitPrefix + namespace + this.getSlotName();
	}

	getSlotName() {
		return this.config.slotName;
	}

	getSizes() {
		return this.config.sizes;
	}

	getTargeting() {
		return this.config.targeting;
	}

	getDefaultSizes() {
		return this.config.defaultSizes;
	}

	getSupportedScreen() {
		return this.screenSize;
	}

	isAboveTheFold() {
		return !!this.config.aboveTheFold;
	}

	isEnabled() {
		return this.enabled;
	}

	enable() {
		this.enabled = true;
	}

	disable() {
		this.enabled = false;
	}

	success() {
		SlotTweaker.show(this);
		switch (this.config.defaultTemplate) {
			case 'floating-ad':
				new FloatingAd(this).init();
				break;
		}
	}

	collapse() {
		SlotTweaker.hide(this);
	}
}

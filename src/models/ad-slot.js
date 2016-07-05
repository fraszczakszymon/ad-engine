'use strict';

import Context from '../services/context-service';
import FloatingAd from '../templates/floating-ad';
import SlotTweaker from '../services/slot-tweaker';
import StringBuilder from '../utils/string-builder';

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
		this.location = segments[1];
		this.screenSize = !!segments[3] ? segments[3] : 'both';
		this.type = segments[2];
		this.config = Context.get('slots.' + this.location + '-' + this.type);
		this.enabled = !this.config.disabled;
	}

	getId() {
		return this.id;
	}

	getAdUnit() {
		if (!this.adUnit) {
			this.adUnit = StringBuilder.build(
				Context.get('adUnitId'),
				{
					slotName: this.getSlotName()
				}
			);
		}

		return this.adUnit;
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

	shouldLoad() {
		const isMobile = Context.get('state.isMobile'),
			shouldLoad = this.screenSize === 'both',
			shouldLoadDesktop = !isMobile && this.screenSize === 'desktop',
			shouldLoadMobile = isMobile && this.screenSize === 'mobile';

		return shouldLoad || shouldLoadDesktop || shouldLoadMobile;
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

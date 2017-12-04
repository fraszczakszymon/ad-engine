import { EventEmitter } from 'events';
import Context from '../services/context-service';
import SlotTweaker from '../services/slot-tweaker';
import StringBuilder from '../utils/string-builder';
import TemplateService from '../services/template-service';

export const SLOT_VIEWED_EVENT = 'slotViewed';

export default class AdSlot extends EventEmitter {
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
		super();

		const segments = ad.id.split('-');

		if (segments.length < 3) {
			throw new Error(`Invalid GPT id passed to parseId (${ad.id}).`);
		}

		this.id = ad.id;
		this.location = segments[1];
		this.screenSize = segments[3] ? segments[3] : 'both';
		this.type = segments[2];
		this.config = Context.get(`slots.${this.location}-${this.type}`) || {};
		this.enabled = !this.config.disabled;
		this.viewed = false;

		this.config.targeting = this.config.targeting || {};
		this.config.targeting.src = this.config.targeting.src || Context.get('src');
		this.config.targeting.pos = this.config.targeting.pos || this.getSlotName();

		this.once(SLOT_VIEWED_EVENT, () => {
			this.viewed = true;
		});
	}

	getId() {
		return this.id;
	}

	getAdUnit() {
		if (!this.adUnit) {
			this.adUnit = StringBuilder.build(
				this.config.adUnit || Context.get('adUnitId'),
				{
					slotConfig: this.config
				}
			);
		}

		return this.adUnit;
	}

	getVideoAdUnit() {
		if (!this.videoAdUnit) {
			this.videoAdUnit = StringBuilder.build(
				this.config.videoAdUnit || Context.get('vast.adUnitId'),
				{
					slotConfig: this.config
				}
			);
		}

		return this.videoAdUnit;
	}

	getElement() {
		return document.getElementById(this.id);
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

	isViewed() {
		return this.viewed;
	}

	enable() {
		this.enabled = true;
	}

	disable() {
		this.enabled = false;
	}

	success() {
		SlotTweaker.show(this);
		SlotTweaker.setDataParam(this, 'slotResult', 'success');

		if (this.config.defaultTemplate) {
			TemplateService.init(this.config.defaultTemplate, this);
		}
	}

	collapse() {
		SlotTweaker.hide(this);
		SlotTweaker.setDataParam(this, 'slotResult', 'collapse');
	}
}

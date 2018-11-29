import { AdSlot, context, utils } from '@wikia/ad-engine';
import { Stickiness } from './uap/themes/hivi/stickiness';

const logGroup = 'sticky-base';

export class StickyBase {
	static DEFAULT_UNSTICK_DELAY = 2000;
	static SLOT_STICKY_READY_STATE = 'sticky-ready';
	static SLOT_UNSTICK_IMMEDIATELY = 'force-unstick';
	static ADX = 'AdX';

	/**
	 * Base class for sticky ads
	 * @param {AdSlot} adSlot
	 */
	constructor(adSlot) {
		this.adSlot = adSlot;
		this.lineId = adSlot.lineItemId === null ? StickyBase.ADX : adSlot.lineItemId;
		this.stickiness = null;
		this.config = context.get(`templates.${this.getName()}`);
		this.lines = context.get(`templates.${this.getName()}.lineItemIds`);
	}

	/**
	 * Returns template name.
	 *
	 * @abstract
	 * @return {string}
	 */
	getName() {}

	/**
	 * Runs logic which decides when to unstick the template.
	 */
	addUnstickLogic() {
		const { stickyAdditionalTime, stickyUntilSlotViewed } = this.config;
		const whenSlotViewedOrTimeout = async () => {
			await (stickyUntilSlotViewed && !this.adSlot.isViewed() ?
				utils.once(this.adSlot, AdSlot.SLOT_VIEWED_EVENT) :
				Promise.resolve());
			await utils.wait(StickyBase.DEFAULT_UNSTICK_DELAY + stickyAdditionalTime);
		};

		this.stickiness = new Stickiness(this.adSlot, whenSlotViewedOrTimeout(), true);
	}

	isEnabled() {
		const isEnabledInContext = context.get(`templates.${this.getName()}.enabled`);
		const isEnabled = isEnabledInContext
			&& this.lines
			&& this.lines.length
			&& this.lineId
			&& (this.lines.indexOf(this.lineId.toString()) >= 0 || this.lines.indexOf(this.lineId) >= 0);

		if (isEnabled) {
			utils.logger(logGroup, `enabled with line item id ${this.lineId}`);

			// DISCUSS: Should we set lineItemId to ADX for all slots or only sticky ones?
			if (this.lineId === StickyBase.ADX) {
				this.adSlot.lineItemId = StickyBase.ADX;
				this.adSlot.creativeId = StickyBase.ADX;
			}
		}

		return isEnabled;
	}
}

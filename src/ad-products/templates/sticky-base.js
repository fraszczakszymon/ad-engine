import { AdSlot, context, utils } from '@wikia/ad-engine';
import { Stickiness } from './uap/themes/hivi/stickiness';

const logGroup = 'sticky-base';

export class StickyBase {
	static DEFAULT_UNSTICK_DELAY = 2000;
	static SLOT_STICKY_READY_STATE = 'sticky-ready';
	static SLOT_UNSTICK_IMMEDIATELY = 'force-unstick';

	/**
	 * Base class for sticky ads
	 * @param {AdSlot} adSlot
	 */
	constructor(adSlot) {
		this.adSlot = adSlot;
		this.lineId = adSlot.lineItemId;
		this.lines = context.get(`templates.${this.getName()}.lineItemIds`);
		this.stickiness = null;
		this.config = context.get(`templates.${this.getName()}`);
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
			await (stickyUntilSlotViewed && !this.adSlot.isViewed()
				? utils.once(this.adSlot, AdSlot.SLOT_VIEWED_EVENT)
				: Promise.resolve());
			await utils.wait(StickyBase.DEFAULT_UNSTICK_DELAY + stickyAdditionalTime);
		};

		this.stickiness = new Stickiness(this.adSlot, whenSlotViewedOrTimeout(), true);
	}

	isEnabled() {
		const isEnabledInContext = context.get(`templates.${this.getName()}.enabled`);
		const isLineAndGeo = StickyBase.isLineAndGeo(this.lineId, this.lines);
		const isEnabled = isEnabledInContext && isLineAndGeo;

		if (isEnabled) {
			utils.logger(logGroup, `enabled with line item id ${this.lineId}`);
		}

		return isEnabled;
	}

	static isLineAndGeo(lineId, lines) {
		if (!lineId || !lines || !lines.length) {
			return false;
		}

		let found = false;

		lineId = lineId.toString();

		lines.forEach((line) => {
			line = line.split(':', 2);

			if (line[0] === lineId && (!line[1] || utils.isProperGeo([line[1]]))) {
				found = true;
			}
		});
		if (found) {
			utils.logger(logGroup, `line item ${lineId} enabled in geo`);
		}

		return found;
	}
}

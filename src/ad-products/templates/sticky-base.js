import { AdSlot, context, utils } from '@wikia/ad-engine';
import { Stickiness } from './uap/themes/hivi/stickiness';

const logGroup = 'sticky-base';

export class StickyBase {
	static DEFAULT_UNSTICK_DELAY = 2000;

	/**
	 * Base class for sticky ads
	 * @param {AdSlot} adSlot
	 */
	constructor(adSlot) {
		this.adSlot = adSlot;
		this.lineId = adSlot.lineItemId.toString() || '';
		this.lines = context.get(`templates.${this.getName()}.lineItemIds`) || [];
		this.stickiness = null;
		this.config = context.get(`templates.${this.getName()}`);
	}

	/**
	 * Returns template name.
	 *
	 * @abstract
	 * @return {string}
	 */
	getName() {
		throw new utils.NotImplementedException();
	}

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
		const isEnabled = isEnabledInContext && this.isLineAndGeo();

		if (isEnabled) {
			utils.logger(logGroup, `enabled with line item id ${this.lineId}`);
		}

		return isEnabled;
	}

	/** @private */
	isLineAndGeo() {
		const found = this.lines.some((line) => {
			const [lineId, geo] = line.split(':', 2);

			return lineId === this.lineId && (!geo || utils.isProperGeo([geo]));
		});

		if (found) {
			utils.logger(logGroup, `line item ${this.lineId} enabled in geo`);
		}

		return found;
	}
}

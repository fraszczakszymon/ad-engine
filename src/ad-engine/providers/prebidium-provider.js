import { decorate } from 'core-decorators';
import { IframeBuilder, logger } from '../utils';
import { context, slotService } from '../services';

const logGroup = 'prebidium-provider';

// TODO: Duplicate from ad-bidders/prebid/index.js
// Perhaps create PBJS wrapper, or at least place to share this kind of functions
function postponeExecutionUntilPbjsLoads(method) {
	return function (...args) {
		return window.pbjs.que.push(() => method.apply(this, args));
	};
}

export class PrebidiumProvider {
	iframeBuilder = new IframeBuilder();

	@decorate(postponeExecutionUntilPbjsLoads)
	fillIn(adSlot) {
		slotService.add(adSlot);

		const doc = this.getIframeDoc(adSlot);
		const adId = this.getAdId(adSlot);

		window.pbjs.renderAd(doc, adId);
		logger(logGroup, adSlot.getSlotName(), 'slot added');
	}

	/** @private */
	getIframeDoc(adSlot) {
		const iframe = this.iframeBuilder.create(adSlot);

		return iframe.contentWindow.document;
	}

	/** @private */
	getAdId(adSlot) {
		return context.get(`slots.${adSlot.getSlotName()}.targeting.hb_adid`);
	}
}

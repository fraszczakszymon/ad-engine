import { slotListener } from '../listeners';
import { logger } from '../utils';
import { context, slotService } from '../services';

const logGroup = 'prebidium-provider';

export class PrebidiumProvider {
	iframeBuilder = new IframeBuilder();

	fillIn(adSlot) {
		const doc = this.getIframeDoc(adSlot);
		const adId = this.getAdId(adSlot);

		window.pbjs.renderAd(doc, adId);
		logger(logGroup, adSlot.getSlotName(), 'slot added');

		this.forceWrappedFillInCallback(adSlot);
	}

	/**
	 * This method causes wrappedFillInCallback method in BtfBlockerService["push"] to fire.
	 * This is a workaround to simulate real event from google tag used in GptProvider.
	 * @private
	 * @param adSlot
	 */
	forceWrappedFillInCallback(adSlot) {
		const slot = slotService.get(adSlot.config.slotName);
		slotListener.emitRenderEnded(() => {}, slot);
	}

	/** @private */
	getIframeDoc(adSlot) {
		const iframe = this.iframeBuilder.create(adSlot);
		return iframe.contentWindow.document;
	}

	/** @private */
	getAdId(adSlot) {
		const winning = context.get(`slots.${adSlot.config.slotName}.targeting`);
		return winning.hb_adid;
	}

	flush() {}
}

class IframeBuilder {
	create(adSlot) {
		const doc = document.getElementById(`${adSlot.config.slotName}`);
		const iframe = doc.appendChild(document.createElement('iframe'));
		iframe.frameBorder = 0;
		iframe.onload = () => this.removeBodyMargin(iframe);
		return iframe;
	}

	/** @private */
	removeBodyMargin(iframe) {
		// eslint-disable-next-line prefer-destructuring
		const body = iframe.contentDocument.body;
		body.style.margin = 0;
	}
}

import { slotListener } from '../listeners';
import { logger } from '../utils';
import { context, slotService } from '../services';

const logGroup = 'prebidium-provider';

export class PrebidiumProvider {
	iframeBuilder = new IframeBuilder();

	fillIn(adSlot) {
		const winning = context.get(`slots.${adSlot.config.slotName}.targeting`);
		const adId = winning.hb_adid;

		const iframe = this.iframeBuilder.create(adSlot);
		const doc = iframe.contentWindow.document;

		window.pbjs.renderAd(doc, adId);
		logger(logGroup, adSlot.getSlotName(), 'slot added');

		const slot = slotService.get(adSlot.config.slotName);
		slotListener.emitRenderEnded(() => {}, slot);
	}

	flush() {
	}
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

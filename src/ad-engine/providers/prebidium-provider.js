import { logger, timer } from '../utils';
import { context } from '../services';

const logGroup = 'gpt-provider';

export class PrebidiumProvider {
	fillIn(adSlot) {
		const winning = context.get(`slots.${adSlot.config.slotName}.targeting`);

		timer.log(
			'PrebidiumProvider fillIn',
			winning,
		);

		const doc = document.getElementById(`${adSlot.config.slotName}`);
		const iframe = doc.appendChild(document.createElement('iframe'));
		iframe.frameBorder = 0;

		window.pbjs.renderAd(iframe.contentWindow.document, winning.hb_adid);

		logger(logGroup, adSlot.getSlotName(), 'slot added');
	}

	flush() {

	}

	/** @private */
	createCss() {
		const style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = `body {
			margin: 0;
		}`;
		return style;
	}
}

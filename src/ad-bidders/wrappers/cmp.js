import { utils } from '@wikia/ad-engine';

export class Cmp {
	get exists() {
		return !!window.__cmp;
	}

	/**
	 * @param {*=} param
	 * @param {function(object)} cb Callback receiving current bids
	 * @returns {!Promise} If `cb` has been omitted
	 */
	getConsentData(param, cb = null) {
		return utils.getPromiseAndExecuteCallback((resolve) => {
			window.__cmp('getConsentData', param, (consentData) => resolve(consentData));
		}, cb);
	}

	override(newCmp) {
		window.__cmp = newCmp;
	}
}

export const cmp = new Cmp();

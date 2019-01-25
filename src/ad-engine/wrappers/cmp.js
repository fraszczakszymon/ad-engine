import { getPromiseAndExecuteCallback } from '../utils';

export class Cmp {
	get exists() {
		return !!window.__cmp;
	}

	/**
	 * @param {function(object)} cb Callback receiving current bids
	 * @returns {!Promise} If `cb` has been omitted
	 */
	getConsentData(param, cb = null) {
		return getPromiseAndExecuteCallback((resolve) => {
			window.__cmp('getConsentData', param, (consentData) => resolve(consentData));
		}, cb);
	}

	override(newCmp) {
		window.__cmp = newCmp;
	}
}

export const cmp = new Cmp();

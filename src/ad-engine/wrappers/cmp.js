import { bindCallback } from '../utils';

export class Cmp {
	get exists() {
		return !!window.__cmp;
	}

	/**
	 * @param {function(object)} cb Callback receiving current bids
	 * @returns {!Promise} If `cb` has been omitted
	 */
	getConsentData(param, cb = null) {
		return bindCallback(cb, new Promise((resolve) => {
			window.__cmp('getConsentData', param, consentData => resolve(consentData));
		}));
	}

	override(newCmp) {
		window.__cmp = newCmp;
	}
}

export const cmp = new Cmp();

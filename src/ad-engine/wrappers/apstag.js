import { bindCallback } from '../utils';

export class Apstag {
	init(apsConfig) {
		this.configure();
		window.apstag.init(apsConfig);
	}

	/** @private */
	configure() {
		window.apstag = window.apstag || {};
		window.apstag._Q = window.apstag._Q || [];

		if (typeof window.apstag.init === 'undefined') {
			window.apstag.init = (...args) => {
				this.configureCommand('i', args);
			};
		}

		if (typeof window.apstag.fetchBids === 'undefined') {
			window.apstag.fetchBids = (...args) => {
				this.configureCommand('f', args);
			};
		}
	}

	/** @private */
	configureCommand(command, args) {
		window.apstag._Q.push([command, args]);
	}

	/**
	 * @param {object} bidsConfig configuration of bids
	 * @param {function(object)} cb Callback receiving current bids
	 * @returns {!Promise} If `cb` has been omitted
	 */
	fetchBids(bidsConfig, cb = null) {
		return bindCallback(cb, new Promise((resolve) => {
			window.apstag.fetchBids(bidsConfig, currentBids => resolve(currentBids));
		}));
	}

	targetingKeys() {
		return window.apstag.targetingKeys();
	}

	enableDebug() {
		window.apstag.debug('enable');
	}

	disableDebug() {
		window.apstag.debug('disable');
	}
}

export const apstag = new Apstag();

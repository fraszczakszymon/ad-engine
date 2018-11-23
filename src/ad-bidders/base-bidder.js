import { utils } from '@wikia/ad-engine';

export class BaseBidder {
	constructor(name, bidderConfig, timeout = 2000) {
		this.name = name;
		this.logGroup = `${name}-bidder`;
		this.bidderConfig = bidderConfig;
		this.timeout = timeout;

		this.resetState();

		utils.logger(this.logGroup, 'created');
	}

	resetState() {
		this.called = false;
		this.response = false;
		this.onResponseCallbacks = [];

		utils.makeLazyQueue(this.onResponseCallbacks, (callback) => {
			callback(this.name);
		});
	}

	call() {
		this.response = false;
		this.called = true;

		this.callBids(() => this.onBidResponse());

		utils.logger(this.logGroup, 'called');
	}

	onBidResponse() {
		this.response = true;

		this.calculatePrices();
		this.onResponseCallbacks.start();

		utils.logger(this.logGroup, 'respond');
	}

	createWithTimeout(func, msToTimeout = 2000) {
		return Promise.race([new Promise(func), utils.timeoutReject(msToTimeout)]);
	}

	getSlotBestPrice(slotName) {
		return this.getBestPrice(slotName);
	}

	getSlotTargetingParams(slotName) {
		if (!this.called || !this.isSlotSupported(slotName)) {
			return {};
		}

		return this.getTargetingParams(slotName);
	}

	isSlotSupported(slotName) {
		return this.isSupported(slotName);
	}

	waitForResponse() {
		return this.createWithTimeout((resolve) => {
			if (this.hasResponse()) {
				resolve();
			} else {
				this.addResponseListener(resolve);
			}
		}, this.timeout);
	}

	hasResponse() {
		return this.response;
	}

	addResponseListener(callback) {
		this.onResponseCallbacks.push(callback);
	}

	wasCalled() {
		return this.called;
	}

	/** @abstract */
	// eslint-disable-next-line no-unused-vars
	callBids(cb) {}

	/** @abstract */
	calculatePrices() {}

	/** @abstract */
	// eslint-disable-next-line no-unused-vars
	getBestPrice(slotName) {
		return {};
	}

	/** @abstract */
	// eslint-disable-next-line no-unused-vars
	getTargetingParams(slotName) {
		return {};
	}

	/** @abstract */
	// eslint-disable-next-line no-unused-vars
	isSupported(slotName) {
		return false;
	}
}

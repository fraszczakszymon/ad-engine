import { context, slotService, utils, apstag, cmp } from '@wikia/ad-engine';
import { BaseBidder } from '../base-bidder';

export class A9 extends BaseBidder {
	/** @private */
	loaded = false;

	constructor(bidderConfig, timeout = 2000) {
		super('a9', bidderConfig, timeout);

		this.isCMPEnabled = context.get('custom.isCMPEnabled');
		this.amazonId = this.bidderConfig.amazonId;
		this.slots = this.bidderConfig.slots;
		this.bids = {};
		this.priceMap = {};
		this.slotNamesMap = {};
		this.targetingKeys = [];
		this.apstag = apstag;
		this.cmp = cmp;
		this.utils = utils;
		this.slotService = slotService;
	}

	init(onResponse, consentData = {}) {
		this.initIfNotLoaded(consentData);

		this.bids = {};
		this.priceMap = {};

		this.fetchBids(onResponse);
	}

	initIfNotLoaded(consentData) {
		if (!this.loaded) {
			this.insertScript();
			this.apstag.init(this.getApstagConfig(consentData));
			this.loaded = true;
		}
	}

	insertScript() {
		this.utils.scriptLoader.loadScript('//c.amazon-adsystem.com/aax2/apstag.js', 'text/javascript', true, 'first');
	}

	getApstagConfig(consentData) {
		return {
			pubID: this.amazonId,
			videoAdServer: 'DFP',
			deals: !!this.bidderConfig.dealsEnabled,
			...this.getGdprIfApplicable(consentData)
		};
	}

	getGdprIfApplicable(consentData) {
		if (this.isCMPEnabled && consentData && consentData.consentData) {
			return {
				gdpr: {
					enabled: consentData.gdprApplies,
					consent: consentData.consentData,
					cmpTimeout: 5000
				}
			};
		}
		return {};
	}

	async fetchBids(onResponse) {
		const currentBids = await this.apstag.fetchBids(this.getBidsConfig());
		currentBids.forEach((bid) => {
			const slotName = this.slotNamesMap[bid.slotID] || bid.slotID;
			const { keys, bidTargeting } = this.getBidTargetingWithKeys(bid);
			this.updateBidSlot(slotName, keys, bidTargeting);
		});
		onResponse();
	}

	getBidsConfig() {
		return {
			slots: this.getA9Slots(),
			timeout: this.timeout
		};
	}

	getA9Slots() {
		return Object
			.keys(this.slots)
			.map(key => this.createSlotDefinition(key, this.slots[key]))
			.filter(slot => slot !== null);
	}

	createSlotDefinition(slotName, config) {
		if (!this.slotService.getState(slotName)) {
			return null;
		}

		const slotID = config.slotId || slotName;
		const definition = {
			slotID,
			slotName: slotID
		};

		this.slotNamesMap[slotID] = slotName;

		if (!this.bidderConfig.videoEnabled && config.type === 'video') {
			return null;
		} else if (config.type === 'video') {
			definition.mediaType = 'video';
		} else {
			definition.sizes = config.sizes;
		}

		return definition;
	}

	getBidTargetingWithKeys(bid) {
		if (this.bidderConfig.dealsEnabled) {
			return {
				keys: bid.helpers.targetingKeys,
				bidTargeting: bid.targeting
			};
		}
		return {
			keys: this.apstag.targetingKeys(),
			bidTargeting: bid
		};
	}

	updateBidSlot(slotName, keys, bidTargeting) {
		this.bids[slotName] = {};
		keys.forEach((key) => {
			if (this.targetingKeys.indexOf(key) === -1) {
				this.targetingKeys.push(key);
			}
			this.bids[slotName][key] = bidTargeting[key];
		});
	}

	async callBids(onResponse) {
		if (this.cmp.exists) {
			const consentData = await this.cmp.getConsentData(null);
			this.init(onResponse, consentData);
		} else {
			this.init(onResponse);
		}
	}

	calculatePrices() {
		return Object
			.keys(this.bids)
			.forEach((slotName) => {
				this.priceMap[slotName] = this.bids[slotName].amznbid;
			});
	}

	getBestPrice(slotName) {
		return this.priceMap[slotName] ? { a9: this.priceMap[slotName] } : {};
	}

	getTargetingParams(slotName) {
		return this.bids[slotName] || {};
	}

	isSupported(slotName) {
		return !!this.slots[slotName];
	}

	getPrices() {
		return this.priceMap;
	}

	getTargetingKeysToReset() {
		return this.targetingKeys;
	}
}

import { context, slotService, utils, apstag, cmp } from '@wikia/ad-engine';
import { BaseBidder } from '../base-bidder';

let loaded = false;

// DISCUSS: GodClass? SR?
export class A9 extends BaseBidder {
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
	}

	init(onResponse, consentData = {}) {
		this.initIfNotLoaded(consentData);

		this.bids = {};
		this.priceMap = {};

		this.fetchBids(onResponse);
	}

	initIfNotLoaded(consentData) {
		if (!loaded) {
			this.insertScript();
			this.apstag.init(this.getApsConfig(consentData));
			loaded = true;
		}
	}

	insertScript() {
		utils.scriptLoader.loadScript('//c.amazon-adsystem.com/aax2/apstag.js', 'text/javascript', true, 'first');
	}

	getApsConfig(consentData) {
		return {
			pubID: this.amazonId,
			videoAdServer: 'DFP',
			deals: !!this.bidderConfig.dealsEnabled,
			gdpr: this.getGdprIfEnabled(consentData)
		};
	}

	getGdprIfEnabled(consentData) {
		if (this.isCMPEnabled && consentData && consentData.consentData) {
			return {
				enabled: consentData.gdprApplies,
				consent: consentData.consentData,
				cmpTimeout: 5000
			};
		}
		return undefined;
	}

	async fetchBids(onResponse) {
		const currentBids = await this.apstag.fetchBids(this.getBidsConfig());
		currentBids.forEach((bid) => {
			const slotName = this.slotNamesMap[bid.slotID] || bid.slotID;
			const { keys, bidTargeting } = this.getBidTargetingAndKeys(bid);
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
		if (!slotService.getState(slotName)) {
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

	getBidTargetingAndKeys(bid) {
		return this.bidderConfig.dealsEnabled
			? {
				keys: bid.helpers.targetingKeys,
				bidTargeting: bid.targeting
			}
			: {
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
		if (this.cmp) {
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

	// DISCUSS: Is it used somewhere?
	// Should mark external methods, so that we know they cannot be easily renamed
	getPrices() {
		return this.priceMap;
	}

	// DISCUSS: Is it used somewhere?
	getTargetingKeysToReset() {
		return this.targetingKeys;
	}
}

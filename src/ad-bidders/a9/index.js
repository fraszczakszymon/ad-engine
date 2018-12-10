import { context, slotService, utils } from '@wikia/ad-engine';
import { BaseBidder } from '../base-bidder';

let loaded = false;

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
		this.timeout = timeout;
	}

	calculatePrices() {
		Object.keys(this.bids).forEach((slotName) => {
			this.priceMap[slotName] = this.bids[slotName].amznbid;
		});
	}

	callBids(onResponse) {
		if (window.__cmp) {
			window.__cmp('getConsentData', null, (consentData) => {
				this.init(onResponse, consentData);
			});
		} else {
			this.init(onResponse);
		}
	}

	init(onResponse, consentData = {}) {
		if (!loaded) {
			this.insertScript();
			this.configureApstag();

			const apsConfig = {
				pubID: this.amazonId,
				videoAdServer: 'DFP',
				deals: !!this.bidderConfig.dealsEnabled,
			};

			if (this.isCMPEnabled && consentData && consentData.consentData) {
				apsConfig.gdpr = {
					enabled: consentData.gdprApplies,
					consent: consentData.consentData,
					cmpTimeout: 5000,
				};
			}

			window.apstag.init(apsConfig);

			loaded = true;
		}

		this.bids = {};
		this.priceMap = {};

		const a9Slots = Object.keys(this.slots)
			.map((key) => this.createSlotDefinition(key, this.slots[key]))
			.filter((slot) => slot !== null);

		window.apstag.fetchBids(
			{
				slots: a9Slots,
				timeout: this.timeout,
			},
			(currentBids) => {
				currentBids.forEach((bid) => {
					const slotName = this.slotNamesMap[bid.slotID] || bid.slotID;

					let bidTargeting = bid;
					let keys = window.apstag.targetingKeys();

					if (this.bidderConfig.dealsEnabled) {
						keys = bid.helpers.targetingKeys;
						bidTargeting = bid.targeting;
					}

					this.bids[slotName] = {};
					keys.forEach((key) => {
						if (this.targetingKeys.indexOf(key) === -1) {
							this.targetingKeys.push(key);
						}
						this.bids[slotName][key] = bidTargeting[key];
					});
				});

				onResponse();
			},
		);
	}

	configureApstag() {
		window.apstag = window.apstag || {};
		window.apstag._Q = window.apstag._Q || [];

		if (typeof window.apstag.init === 'undefined') {
			window.apstag.init = (...args) => {
				this.configureApstagCommand('i', args);
			};
		}

		if (typeof window.apstag.fetchBids === 'undefined') {
			window.apstag.fetchBids = (...args) => {
				this.configureApstagCommand('f', args);
			};
		}
	}

	configureApstagCommand(command, args) {
		window.apstag._Q.push([command, args]);
	}

	createSlotDefinition(slotName, config) {
		if (!slotService.getState(slotName)) {
			return null;
		}

		const slotID = config.slotId || slotName;
		const definition = {
			slotID,
			slotName: slotID,
		};

		this.slotNamesMap[slotID] = slotName;

		if (!this.bidderConfig.videoEnabled && config.type === 'video') {
			return null;
		}
		if (config.type === 'video') {
			definition.mediaType = 'video';
		} else {
			definition.sizes = config.sizes;
		}

		return definition;
	}

	getBestPrice(slotName) {
		return this.priceMap[slotName] ? { a9: this.priceMap[slotName] } : {};
	}

	getPrices() {
		return this.priceMap;
	}

	getTargetingKeysToReset() {
		return this.targetingKeys;
	}

	getTargetingParams(slotName) {
		return this.bids[slotName] || {};
	}

	insertScript() {
		utils.scriptLoader.loadScript(
			'//c.amazon-adsystem.com/aax2/apstag.js',
			'text/javascript',
			true,
			'first',
		);
	}

	isSupported(slotName) {
		return !!this.slots[slotName];
	}
}

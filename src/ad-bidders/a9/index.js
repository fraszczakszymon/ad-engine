import { context, slotService, utils } from '@wikia/ad-engine';
import { BaseBidder } from '../base-bidder';

/**
 * @typedef {Object} A9SlotDefinition
 * @property {string} slotID
 * @property {string} slotName
 */

let loaded = false;
const logGroup = 'A9';

export class A9 extends BaseBidder {
	constructor(bidderConfig, timeout = 2000) {
		super('a9', bidderConfig, timeout);

		this.isCMPEnabled = context.get('custom.isCMPEnabled');
		this.amazonId = this.bidderConfig.amazonId;
		this.slots = this.bidderConfig.slots;
		this.slotsNames = Object.keys(this.slots);
		this.bids = {};
		this.priceMap = {};
		this.slotNamesMap = {};
		this.targetingKeys = [];
		this.timeout = timeout;
		this.bidsRefreshing = context.get('bidders.a9.bidsRefreshing');
		this.isBidsRefreshingEnabled = this.bidsRefreshing && this.bidsRefreshing.enabled;
	}

	calculatePrices() {
		Object.keys(this.bids).forEach((slotName) => {
			this.priceMap[slotName] = this.bids[slotName].amznbid;
		});
	}

	callBids() {
		if (window.__cmp) {
			window.__cmp('getConsentData', null, (consentData) => {
				this.init(consentData);
			});
		} else {
			this.init();
		}
	}

	init(consentData = {}) {
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

		const a9Slots = this.getA9SlotsDefinitions(this.slotsNames);

		this.fetchBids(a9Slots);
	}

	/**
	 * Fetches bids from A9.
	 *
	 * Calls this.onResponse() upon success.
	 *
	 * @param {A9SlotDefinition[]} slots
	 */
	fetchBids(slots) {
		utils.logger(logGroup, 'fetching bids for slots', slots);
		window.apstag.fetchBids(
			{
				slots,
				timeout: this.timeout,
			},
			(currentBids) => {
				utils.logger(logGroup, 'bids fetched for slots', slots, 'bids', currentBids);
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

				this.onResponse();
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

	getBestPrice(slotName) {
		const slotAlias = this.getSlotAlias(slotName);

		return this.priceMap[slotAlias] ? { a9: this.priceMap[slotAlias] } : {};
	}

	getPrices() {
		return this.priceMap;
	}

	getTargetingKeysToReset() {
		return this.targetingKeys;
	}

	getTargetingParams(slotName) {
		return this.bids[this.getSlotAlias(slotName)] || {};
	}

	insertScript() {
		utils.scriptLoader
			.loadScript('//c.amazon-adsystem.com/aax2/apstag.js', 'text/javascript', true, 'first')
			.then(() => {
				if (window.apstag.renderImp && this.isBidsRefreshingEnabled) {
					this.registerBidsRefreshing();
				}
			});
	}

	/**
	 * Wraps apstag.renderImp by calling this.refreshBid() afterwards.
	 */
	registerBidsRefreshing() {
		utils.logger(logGroup, 'overwriting window.apstag.renderImp');
		window.apstag.renderImp = ((original) => (doc, impId) => {
			original(doc, impId);
			this.refreshBid(impId);
		})(window.apstag.renderImp);
	}

	/**
	 * Checks if slot with given name is supported by bidder.
	 *
	 * @param {string} slotName
	 * @returns {boolean}
	 */
	isSupported(slotName) {
		return !!this.slots[this.getSlotAlias(slotName)];
	}

	/**
	 * Checks if slot should be refreshed.
	 *
	 * @param {AdSlot} slot
	 * @param {string | number} impId
	 * @returns {boolean}
	 */
	shouldRefreshSlot(slot, impId) {
		const isIdMatching = slot.getTargeting().amzniid === impId;
		const isSlotRefreshable = this.bidsRefreshing.slots.includes(slot.getSlotName());

		return isIdMatching && isSlotRefreshable;
	}

	/**
	 * Refreshes bid with given id.
	 *
	 * @param {string | number} impId
	 */
	refreshBid(impId) {
		let updatedSlotName;

		slotService.forEach((slot) => {
			if (this.shouldRefreshSlot(slot, impId)) {
				updatedSlotName = this.getSlotAlias(slot.getSlotName());
			}
		});

		if (!updatedSlotName) {
			return;
		}

		const slotDef = this.createSlotDefinition(updatedSlotName);

		if (slotDef) {
			utils.logger(logGroup, 'refresh bids for slot', slotDef);
			this.fetchBids([slotDef]);
		}
	}

	/**
	 * Transforms slots names into A9 slot definitions.
	 *
	 * @param {string[]} slotsNames
	 * @returns {A9SlotDefinition[]}
	 */
	getA9SlotsDefinitions(slotsNames) {
		return slotsNames
			.map((slotName) => this.createSlotDefinition(slotName))
			.filter((slot) => slot !== null);
	}

	/**
	 * Creates A9 slot definition from slot name.
	 *
	 * @param {string} slotName
	 * @returns {A9SlotDefinition | null} Returns null i
	 */
	createSlotDefinition(slotName) {
		const slotAlias = this.getSlotAlias(slotName);
		const config = this.slots[slotAlias];
		const slotID = config.slotId || this.slots[slotAlias];
		const definition = {
			slotID,
			slotName: slotID,
		};

		if (!slotService.getState(slotID)) {
			return null;
		}

		this.slotNamesMap[slotID] = slotAlias;

		// DISCUSS Do we enable A9 video bidder anywhere?
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
}

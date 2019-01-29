import { context, events, slotService, utils } from '@wikia/ad-engine';
import { apstag, cmp } from '../wrappers';
import { BaseBidder } from '../base-bidder';

const logGroup = 'A9';

/**
 * @typedef {Object} A9SlotDefinition
 * @property {string} slotID
 * @property {string} slotName
 */

export class A9 extends BaseBidder {
	/** @private */
	loaded = false;

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
		this.apstag = apstag;
		this.cmp = cmp;
		this.utils = utils;
		this.events = events;
		this.slotService = slotService;
		this.timeout = timeout;
		this.bidsRefreshing = context.get('bidders.a9.bidsRefreshing') || {};
		this.isRenderImpOverwritten = false;
	}

	getPrices() {
		return this.priceMap;
	}

	getTargetingKeysToReset() {
		return this.targetingKeys;
	}

	init(consentData = {}) {
		this.initIfNotLoaded(consentData);

		this.bids = {};
		this.priceMap = {};
		const a9Slots = this.getA9SlotsDefinitions(this.slotsNames);

		this.fetchBids(a9Slots);
	}

	/**
	 * @private
	 * @param consentData
	 */
	initIfNotLoaded(consentData) {
		if (!this.loaded) {
			this.apstag.init(this.getApstagConfig(consentData));
			this.loaded = true;
		}
	}

	/**
	 * @private
	 * @param consentData
	 * @returns {{videoAdServer: string, deals: boolean, pubID: (*|string), gdpr: ()}}
	 */
	getApstagConfig(consentData) {
		return {
			pubID: this.amazonId,
			videoAdServer: 'DFP',
			deals: !!this.bidderConfig.dealsEnabled,
			...this.getGdprIfApplicable(consentData),
		};
	}

	/**
	 * @private
	 * @param consentData
	 * @returns {*}
	 */
	getGdprIfApplicable(consentData) {
		if (this.isCMPEnabled && consentData && consentData.consentData) {
			return {
				gdpr: {
					enabled: consentData.gdprApplies,
					consent: consentData.consentData,
					cmpTimeout: 5000,
				},
			};
		}

		return {};
	}

	/**
	 * Transforms slots names into A9 slot definitions.
	 * @param {string[]} slotsNames
	 * @returns {A9SlotDefinition[]}
	 */
	getA9SlotsDefinitions(slotsNames) {
		return slotsNames
			.map((slotName) => this.getSlotAlias(slotName))
			.map((slotAlias) => this.createSlotDefinition(slotAlias))
			.filter((slot) => slot !== null);
	}

	/**
	 * Fetches bids from A9.
	 * Calls this.onBidResponse() upon success.
	 * @private
	 * @param {A9SlotDefinition[]} slots
	 * @param {boolean} refresh
	 */
	async fetchBids(slots, refresh = false) {
		utils.logger(logGroup, 'fetching bids for slots', slots);
		const currentBids = await this.apstag.fetchBids({ slots, timeout: this.timeout });

		utils.logger(logGroup, 'bids fetched for slots', slots, 'bids', currentBids);
		this.overwriteApstagRenderImpOnFirstFetch();

		currentBids.forEach(async (bid) => {
			const slotName = this.slotNamesMap[bid.slotID] || bid.slotID;
			const { keys, bidTargeting } = await this.getBidTargetingWithKeys(bid);

			this.updateBidSlot(slotName, keys, bidTargeting);
		});

		this.onBidResponse();
		if (refresh) {
			this.events.emit(this.events.BIDS_REFRESH);
		}
	}

	/**
	 * @private
	 */
	overwriteApstagRenderImpOnFirstFetch() {
		if (!this.isRenderImpOverwritten) {
			this.overwriteRenderImp();
			this.isRenderImpOverwritten = true;
		}
	}

	/**
	 * Wraps apstag.renderImp
	 * Calls this.refreshBid() if bids refreshing is enabled.
	 * @private
	 */
	// TODO: (wf JBJ) - Move to apstag wrapper and change it so that human can read it.
	overwriteRenderImp() {
		utils.logger(logGroup, 'overwriting window.apstag.renderImp');
		window.apstag.renderImp = ((original) => (doc, impId) => {
			original(doc, impId);

			const slot = this.getRenderedSlot(impId);
			const slotName = slot.getSlotName();

			utils.logger(logGroup, `bid used for slot ${slotName}`);
			delete this.bids[this.getSlotAlias(slotName)];

			if (window.apstag.renderImp && this.bidsRefreshing.enabled) {
				this.refreshBid(slot);
			}
		})(window.apstag.renderImp);
	}

	/**
	 * Returns slot which used bid with given impression id.
	 * @private
	 * @param {string | number} impId
	 * @returns {AdSlot | undefined }
	 */
	getRenderedSlot(impId) {
		return this.slotService.find((slot) => slot.getTargeting().amzniid === impId);
	}

	/**
	 * Refreshes bid for given slot.
	 * @private
	 * @param {AdSlot} slot
	 */
	refreshBid(slot) {
		if (!this.shouldRefreshSlot(slot)) {
			return;
		}

		const slotDef = this.createSlotDefinition(this.getSlotAlias(slot.getSlotName()));

		if (slotDef) {
			utils.logger(logGroup, 'refresh bids for slot', slotDef);
			this.fetchBids([slotDef], true);
		}
	}

	/**
	 * Checks if slot should be refreshed.
	 * @private
	 * @param {AdSlot} slot
	 * @returns {boolean}
	 */
	shouldRefreshSlot(slot) {
		return this.bidsRefreshing.slots.includes(this.getSlotAlias(slot.getSlotName()));
	}

	/**
	 * Creates A9 slot definition from slot alias.
	 * @param {string} slotAlias
	 * @returns {A9SlotDefinition | null} Returns null i
	 */
	createSlotDefinition(slotAlias) {
		const config = this.slots[slotAlias];
		const slotID = config.slotId || slotAlias;
		const definition = {
			slotID,
			slotName: slotID,
		};

		this.slotNamesMap[slotID] = slotAlias;

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

	/**
	 * @private
	 * @param bid
	 * @returns {*}
	 */
	async getBidTargetingWithKeys(bid) {
		if (this.bidderConfig.dealsEnabled) {
			return {
				keys: await bid.helpers.targetingKeys,
				bidTargeting: bid.targeting,
			};
		}

		return {
			keys: await this.apstag.targetingKeys(),
			bidTargeting: bid,
		};
	}

	/**
	 * @private
	 * @param slotName
	 * @param keys
	 * @param bidTargeting
	 */
	updateBidSlot(slotName, keys, bidTargeting) {
		this.bids[slotName] = {};
		keys.forEach((key) => {
			if (this.targetingKeys.indexOf(key) === -1) {
				this.targetingKeys.push(key);
			}
			this.bids[slotName][key] = bidTargeting[key];
		});
	}

	/**
	 * @protected
	 * @returns {Promise<void>}
	 */
	async callBids() {
		if (this.cmp.exists) {
			const consentData = await this.cmp.getConsentData(null);

			this.init(consentData);
		} else {
			this.init();
		}
	}

	/**
	 * @inheritDoc
	 */
	calculatePrices() {
		return Object.keys(this.bids).forEach((slotName) => {
			this.priceMap[slotName] = this.bids[slotName].amznbid;
		});
	}

	/**
	 * @inheritDoc
	 */
	getBestPrice(slotName) {
		const slotAlias = this.getSlotAlias(slotName);

		return this.priceMap[slotAlias] ? { a9: this.priceMap[slotAlias] } : {};
	}

	/**
	 * @inheritDoc
	 */
	getTargetingParams(slotName) {
		return this.bids[this.getSlotAlias(slotName)] || {};
	}

	/**
	 * @inheritDoc
	 */
	isSupported(slotName) {
		return !!this.slots[this.getSlotAlias(slotName)];
	}
}

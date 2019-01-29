import { utils } from '@wikia/ad-engine';

export class Apstag {
	/**
	 * @private
	 */
	renderImpEndCallbacks = [];

	constructor() {
		this.utils = utils;
		this.insertScript();
		this.configure();
		this.addRenderImpHooks();
	}

	/**
	 * @private
	 */
	insertScript() {
		this.script = this.utils.scriptLoader.loadScript(
			'//c.amazon-adsystem.com/aax2/apstag.js',
			'text/javascript',
			true,
			'first',
		);
	}

	/**
	 * @private
	 */
	async addRenderImpHooks() {
		await this.script;
		const original = window.apstag.renderImp;

		window.apstag.renderImp = (doc, impId) => {
			original(doc, impId);
			this.renderImpEndCallbacks.forEach((cb) => cb(doc, impId));
		};
	}

	/**
	 * @private
	 */
	// TODO May not be necessary - try to remove.
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

	async init(apsConfig) {
		await this.script;
		window.apstag.init(apsConfig);
	}

	/**
	 * @param {{slots: A9SlotDefinition[], timeout: number}} bidsConfig configuration of bids
	 * @param {function(object)} cb Callback receiving current bids
	 * @returns {!Promise} If `cb` has been omitted
	 */
	async fetchBids(bidsConfig, cb = null) {
		await this.script;

		return this.utils.getPromiseAndExecuteCallback((resolve) => {
			window.apstag.fetchBids(bidsConfig, (currentBids) => resolve(currentBids));
		}, cb);
	}

	async targetingKeys() {
		await this.script;

		return window.apstag.targetingKeys();
	}

	async enableDebug() {
		await this.script;
		window.apstag.debug('enable');
	}

	async disableDebug() {
		await this.script;
		window.apstag.debug('disable');
	}

	/**
	 * Executes callback each time after apstag.renderImp is called
	 * @param {function} callback
	 */
	onRenderImpEnd(callback) {
		if (typeof callback !== 'function') {
			throw new Error('onRenderImpEnd used with callback not being a function');
		}
		this.renderImpEndCallbacks.push(callback);
	}
}

export const apstag = new Apstag();

import { utils } from '@ad-engine/core';
import { A9BidConfig } from '../a9/types';

export class Apstag {
	private static instance: Apstag;

	static make(): Apstag {
		if (!Apstag.instance) {
			Apstag.instance = new Apstag();
		}

		return Apstag.instance;
	}

	private script: Promise<Event>;
	private renderImpEndCallbacks = [];
	private renderImpHookPresent = false;
	utils = utils;

	private constructor() {
		this.insertScript();
		this.configure();
	}

	private insertScript(): void {
		this.script = this.utils.scriptLoader.loadScript(
			'//c.amazon-adsystem.com/aax2/apstag.js',
			'text/javascript',
			true,
			'first',
		);
	}

	private configure(): void {
		window.apstag = window.apstag || { _Q: [] };

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

	private configureCommand(command, args): void {
		window.apstag._Q.push([command, args]);
	}

	async init(apsConfig): Promise<void> {
		await this.script;
		window.apstag.init(apsConfig);
	}

	async fetchBids(bidsConfig: A9BidConfig, cb: (bids: any) => void = null): Promise<void> {
		await this.script;
		window.apstag.fetchBids(bidsConfig, (currentBids) => cb(currentBids));
	}

	async targetingKeys(): Promise<string[]> {
		await this.script;

		return window.apstag.targetingKeys();
	}

	async enableDebug(): Promise<void> {
		await this.script;
		window.apstag.debug('enable');
	}

	async disableDebug(): Promise<void> {
		await this.script;
		window.apstag.debug('disable');
	}

	/**
	 * Executes callback each time after apstag.renderImp is called
	 */
	onRenderImpEnd(callback: (doc: any, impId: any) => void): void {
		if (typeof callback !== 'function') {
			throw new Error('onRenderImpEnd used with callback not being a function');
		}
		if (!this.renderImpHookPresent) {
			this.addRenderImpHook();
		}
		this.renderImpEndCallbacks.push(callback);
	}

	private addRenderImpHook(): void {
		const original = window.apstag.renderImp;

		window.apstag.renderImp = (...options) => {
			original(...options);
			const [doc, impId] = options;
			this.renderImpEndCallbacks.forEach((cb) => cb(doc, impId));
		};
	}
}

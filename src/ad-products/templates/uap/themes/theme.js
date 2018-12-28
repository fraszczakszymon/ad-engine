import { context } from '@wikia/ad-engine';

/**
 * @abstract
 */
export class BigFancyAdTheme {
	constructor(adSlot, params) {
		this.adSlot = adSlot;
		this.container = this.adSlot.getElement();
		this.config = context.get('templates.bfaa');
		this.params = params;
	}

	/**
	 @abstract
	 */
	onAdReady() {}

	/**
	 @abstract
	 */
	async adIsReady(videoSettings) {
		console.error('Attempting to call not implemented method with arg:', { videoSettings });
		throw new Error('Not Implemented Exception');
	}

	/**
	 * @abstract
	 */
	onVideoReady() {}
}

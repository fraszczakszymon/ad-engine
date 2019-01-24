import { context } from '@wikia/ad-engine';

export class IncontentNative {
	static getName() {
		return 'incontent_native';
	}

	static getDefaultConfig() {
		return {
			adSlotSelector: '#incontent_native',
			itemClassList: ['wikia-card__item', 'wds-font-size-s', 'wds-leading-tight', 'ember-view'],
			titleClassList: ['wikia-card__title', 'wds-font-weight-medium'],
			descriptionClassList: ['wikia-card__snippet', 'wds-font-size-xs'],
		};
	}

	constructor() {
		this.config = context.get('templates.incontent_native');
		this.adSlot = document.querySelector(this.config.adSlotSelector);
	}

	/**
	 * Initializes the Skin unit
	 *
	 * @param {Object} params
	 * @param {string} params.title - title of fake search result
	 * @param {string} params.description - fake search result description
	 * @param {href} params.clickThroughURL - link to open after clicking into ad
	 */
	init(params) {
		this.params = params;
		this.createAd();
	}

	createAd() {
		const itemDiv = document.createElement('a');
		const titleDiv = document.createElement('div');
		const descriptionDiv = document.createElement('div');

		itemDiv.href = this.params.clickThroughURL;
		itemDiv.classList.add(...this.config.itemClassList);
		titleDiv.innerText = this.params.title;
		titleDiv.classList.add(...this.config.titleClassList);
		descriptionDiv.innerText = this.params.description;
		descriptionDiv.classList.add(...this.config.descriptionClassList);

		itemDiv.appendChild(titleDiv);
		itemDiv.appendChild(descriptionDiv);
		this.adSlot.classList.add('wikia-card');
		this.adSlot.appendChild(itemDiv);
	}
}

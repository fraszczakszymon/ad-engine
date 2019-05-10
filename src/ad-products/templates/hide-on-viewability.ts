import { AdSlot, context, slotTweaker, utils } from '@wikia/ad-engine';
import { CSS_TIMING_EASE_IN_CUBIC, FADE_IN_TIME, SLIDE_OUT_TIME } from './uap/constants';

export interface HideOnViewabilityTemplateConfig {
	additionalHideTime: number;
	slideOutEdge: string;
	hideAnimation: (adSlot: AdSlot, edge: string) => void;
}

export class HideOnViewability {
	/**
	 * Returns template name
	 */
	static getName(): string {
		return 'hideOnViewability';
	}

	/**
	 * Returns default template config
	 */
	static getDefaultConfig(): HideOnViewabilityTemplateConfig {
		return {
			additionalHideTime: 0,
			slideOutEdge: 'bottom',
			hideAnimation: (adSlot, edge) => {
				const height = adSlot.getElement().offsetHeight;
				const hideStyles = {
					transition:
						`${edge} ${SLIDE_OUT_TIME}ms ${CSS_TIMING_EASE_IN_CUBIC}, ` +
						`opacity ${FADE_IN_TIME}ms ${CSS_TIMING_EASE_IN_CUBIC}`,
					opacity: '0',
				};

				hideStyles[edge] = `-${height}px`;

				Object.assign(adSlot.getElement().style, hideStyles);
			},
		};
	}

	/**
	 * Returns current template config
	 */
	static getConfig(): HideOnViewabilityTemplateConfig {
		return context.get('templates.hideOnViewability');
	}

	/**
	 * Constructor
	 */
	constructor(public adSlot: AdSlot) {
		this.adSlot = adSlot;
	}

	/**
	 * Initialises the template
	 */
	init(): void {
		this.registerViewabilityListener(this.adSlot);

		utils.logger(HideOnViewability.getName(), 'init');
	}

	/**
	 * Registers viewability listener
	 *
	 * @private
	 */
	registerViewabilityListener(slot: AdSlot): void {
		const viewabilityListener = {
			onImpressionViewable(adSlot): void {
				const config = HideOnViewability.getConfig();

				if (adSlot.getSlotName() !== slot.getSlotName() || !config || !config.hideAnimation) {
					return;
				}

				setTimeout(() => {
					config.hideAnimation(adSlot, config.slideOutEdge);

					setTimeout(() => {
						slotTweaker.hide(adSlot);
					}, SLIDE_OUT_TIME + FADE_IN_TIME);
				}, config.additionalHideTime);

				utils.logger(HideOnViewability.getName(), 'hiding slot');
			},
		};

		context.push('listeners.slot', viewabilityListener);
	}
}

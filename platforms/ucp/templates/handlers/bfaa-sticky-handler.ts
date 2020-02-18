import {
	AdSlot,
	NAVBAR,
	slotTweaker,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { setResolvedImagesInAd } from '../helpers/set-images';

// function moveNavbar(offset, time) {
// 	const navbarElement: HTMLElement = document.querySelector('.wds-global-navigation-wrapper');

// 	if (navbarElement) {
// 		navbarElement.style.transition = offset
// 			? ''
// 			: `top ${time}ms ${universalAdPackage.CSS_TIMING_EASE_IN_CUBIC}`;
// 		navbarElement.style.top = offset ? `${offset}px` : '';
// 	}
// }

@Injectable()
export class BfaaStickyHandler implements TemplateStateHandler {
	constructor(
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(NAVBAR) private navbar: HTMLElement,
	) {}

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
		const aspectRatios = this.params.config.aspectRatio;
		const iframe = await slotTweaker.onReady(this.adSlot);

		slotTweaker.setPaddingBottom(iframe, aspectRatios.resolved);
		setResolvedImagesInAd(this.adSlot, this.params);

		const adHeight = this.adSlot.getElement().offsetHeight;
		const aAdAndNavHeight = adHeight + this.navbar.offsetHeight;

		this.adSlot.getElement().style.setProperty('position', 'fixed');
		this.adSlot.getElement().style.setProperty('top', '0');
		this.navbar.style.setProperty('position', 'fixed');
		this.navbar.style.setProperty('width', '100%');
		this.navbar.style.setProperty('top', `${adHeight}px`);
		document.body.style.paddingTop = `${aAdAndNavHeight}px`;
	}

	async onLeave(): Promise<void> {}
}

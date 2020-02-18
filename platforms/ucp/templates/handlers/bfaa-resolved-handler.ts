import {
	AdSlot,
	NavbarManager,
	slotTweaker,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
	universalAdPackage,
	utils,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { Subject } from 'rxjs';

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
export class BfaaResolvedHandler implements TemplateStateHandler {
	private unsubscribe$ = new Subject<void>();

	constructor(
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		private navbarManager: NavbarManager,
	) {}

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
		const aspectRatios = this.params.config.aspectRatio;
		const iframe = await slotTweaker.onReady(this.adSlot);

		// TODO: you can do better
		if (document.hidden) {
			await utils.once(window, 'visibilitychange');
		}

		document.body.style.paddingTop = `${aspectRatios.resolved}vw`;
		this.navbarManager.applyStyles({ top: `${aspectRatios.resolved}vw` });
		slotTweaker.setPaddingBottom(iframe, aspectRatios.resolved);
		this.adSlot.getElement().classList.add('theme-hivi');
		this.switchImagesInAd();
	}

	private switchImagesInAd(): void {
		this.adSlot.getElement().classList.add(universalAdPackage.CSS_CLASSNAME_THEME_RESOLVED);

		if (this.params.image2 && this.params.image2.background) {
			this.params.image2.element.classList.remove('hidden-state');
			this.params.image1.element.classList.add('hidden-state');
		} else {
			this.params.image1.element.classList.remove('hidden-state');
		}
	}

	async onLeave(): Promise<void> {
		this.unsubscribe$.next();
	}
}

import { context, scrollListener, slotTweaker, universalAdPackage, utils } from '@wikia/ad-engine';
import { getNavbarHeight, pinNavbar } from './navbar-updater';

const {
	CSS_CLASSNAME_STICKY_BFAA,
	CSS_TIMING_EASE_IN_CUBIC,
	FADE_IN_TIME,
	SLIDE_OUT_TIME,
} = universalAdPackage;

export function getBfaaConfigMobile(): any {
	return {
		adjustPageMarginOnScroll: null,
		autoPlayAllowed: true,
		defaultStateAllowed: true,
		fullscreenAllowed: true,
		stickinessAllowed: true,
		adSlot: null,
		templateParams: null,
		updateNavbarOnScroll: null,
		slotsToDisable: ['cdm-zone-02', 'cdm-zone-03', 'cdm-zone-04', 'cdm-zone-06'],
		navbarElement: null,

		onInit(adSlot, params, config): void {
			this.adSlot = adSlot;
			this.templateParams = params;
			this.config = config || context.get('templates.bfaa') || {};
			this.navbarElement = document.getElementsByClassName('header-container')[0];

			slotTweaker.onReady(adSlot).then(() => {
				this.adjustPageMargin();
				this.adjustPageMarginOnScroll = scrollListener.addCallback(() => this.adjustPageMargin());

				const container = this.adSlot.getElement();

				// For unknown reasons container.offsetHeight is a little bit different before setTimeout
				setTimeout(() => this.moveNavbar(this.isSticky() ? container.offsetHeight : 0));
			});

			this.navbarElement.style.zIndex = '9000';
		},

		onAfterStickBfaaCallback(): void {
			this.updateNavbarPosition();
			this.updateNavbarOnScroll = scrollListener.addCallback(() => this.updateNavbarPosition());
		},

		onBeforeUnstickBfaaCallback(): void {
			scrollListener.removeCallback(this.adjustPageMarginOnScroll);
			Object.assign(this.navbarElement.style, {
				transition:
					`top ${SLIDE_OUT_TIME}ms ${CSS_TIMING_EASE_IN_CUBIC}, ` +
					`opacity ${FADE_IN_TIME}ms ${CSS_TIMING_EASE_IN_CUBIC}`,
				opacity: '0',
				top: 0,
			});
		},

		onAfterUnstickBfaaCallback(): void {
			scrollListener.removeCallback(this.updateNavbarOnScroll);
			this.updateNavbarPosition();
			pinNavbar(this.navbarElement);
			this.setTopMargin(this.navbarElement, `-${this.navbarElement.offsetHeight}px`);
			Object.assign(this.adSlot.getElement().parentNode.style, {
				position: 'absolute',
			});
			this.adjustPageMargin(true);
			this.adjustSlotMargin();
			this.navbarElement.style.setProperty('top', '');
		},

		onResolvedStateSetCallback(): void {
			scrollListener.removeCallback(this.adjustPageMarginOnScroll);

			this.adjustPageMargin(true);
			this.adjustSlotMargin();

			if (this.isSticky()) {
				const aspectRatio = this.getSlotRatio(true);

				this.navbarElement.style.setProperty('top', `calc(${100 / aspectRatio}vw)`);
			}
		},

		onResolvedStateResetCallback(): void {
			this.adjustPageMargin(false);
			this.removeSlotMargin();
		},

		isResolved(): boolean {
			const container: HTMLElement = this.adSlot.getElement();

			return container.classList.contains('theme-resolved');
		},

		isSticky(): boolean {
			const container: HTMLElement = this.adSlot.getElement();

			return container.classList.contains(CSS_CLASSNAME_STICKY_BFAA);
		},

		getSlotRatio(resolved: boolean): number {
			const aspectRatios = this.templateParams.config.aspectRatio;

			return resolved ? aspectRatios.resolved : aspectRatios.default;
		},

		adjustPageMargin(resolved?: boolean): void {
			const isResolved: boolean = resolved !== undefined ? resolved : this.isResolved();
			const aspectRatio: number = this.getSlotRatio(isResolved);

			this.setTopMargin(
				this.config.mainContainer,
				`calc(${100 / aspectRatio}vw + ${getNavbarHeight(this.navbarElement) - 1}px)`,
			);
		},

		adjustSlotMargin(): void {
			if (!this.isSticky()) {
				const container: HTMLElement = this.adSlot.getElement();
				const { top, left } = utils.getElementOffset(container);

				container.style.setProperty('margin-top', `-${top}px`);
				container.style.setProperty('margin-left', `-${left}px`);
				container.style.setProperty('width', `100vw`);
			}
		},

		setTopMargin(element: HTMLElement, value: string): void {
			element.style.setProperty('margin-top', value);
		},

		removeSlotMargin(): void {
			const container: HTMLElement = this.adSlot.getElement();

			container.style.removeProperty('margin-top');
		},

		updateNavbarPosition(): void {
			const container = this.adSlot.getElement();

			this.moveNavbar(this.isSticky() ? container.offsetHeight : 0);
		},

		moveNavbar(offset: number, animationTime?: number): void {
			// UGLY HACK
			// Control navbar movement to avoid side-effects.
			// AdEngine calls this method with second argument.
			if (animationTime) {
				return;
			}
			this.navbarElement.style.top = offset ? `${offset}px` : '';
		},
	};
}

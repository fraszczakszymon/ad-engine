import { AdSlot, scrollListener, utils } from '@wikia/ad-engine';

import AdvertisementLabel from './interface/advertisement-label';
import { animate } from './interface/animate';
import CloseButton from './interface/close-button';
import { Stickiness } from './uap/themes/hivi/stickiness';
import { StickyAd } from './sticky-ad';
import { StickyBase } from './sticky-base';
import { universalAdPackage } from './uap/universal-ad-package';
import {
	CSS_CLASSNAME_FADE_IN_ANIMATION, CSS_CLASSNAME_SLIDE_OUT_ANIMATION,
	CSS_CLASSNAME_STICKY_BFAA, SLIDE_OUT_TIME, FADE_IN_TIME,
	CSS_CLASSNAME_STICKY_IAB,
} from './uap/constants';

const logGroup = 'sticky-tlb';

export class StickyTLB extends StickyBase {
	static getDefaultConfig() {
		return {
			enabled: true,
			desktopNavbarWrapperSelector: '.wds-global-navigation-wrapper',
			mobileNavbarWrapperSelector: '.global-navigation-mobile-wrapper',
			mainContainer: document.body,
			handleNavbar: false,
			stickyAdditionalTime: 0,
			stickyUntilSlotViewed: true,
			slotSibling: '.topic-header',
			onInit: () => {},
			onBeforeStickBfaaCallback: () => {},
			onAfterStickBfaaCallback: () => {},
			onBeforeUnstickBfaaCallback: () => {},
			onAfterUnstickBfaaCallback: () => {},
			moveNavbar(offset, time = SLIDE_OUT_TIME) {
				const navbarElement = document.querySelector('body > nav.navigation');

				if (navbarElement) {
					navbarElement.style.transition = (
						offset ? '' : `top ${time}ms ${universalAdPackage.CSS_TIMING_EASE_IN_CUBIC}`
					);
					navbarElement.style.top = (offset ? `${offset}px` : '');
				}
			}
		};
	}

	constructor(adSlot) {
		super(adSlot);
		this.container = document.getElementById(this.adSlot.getSlotName());
	}

	static getName() {
		return 'stickyTLB';
	}

	getName() {
		return StickyTLB.getName();
	}

	isEnabled() {
		return super.isEnabled() && this.container;
	}

	init(params) {
		this.params = params;

		if (!this.isEnabled()) {
			utils.logger(logGroup, 'stickiness rejected');
			return;
		}

		this.adSlot.setConfigProperty('useGptOnloadEvent', true);
		this.adSlot.onLoad().then(() => {
			utils.logger(logGroup, this.adSlot.getSlotName(), 'slot ready for stickiness');
			this.adSlot.emitEvent(StickyAd.SLOT_STICKY_READY_STATE);
		});

		this.addStickinessPlugin();

		this.container.style.backgroundColor = '#000';
		this.container.classList.add('bfaa-template');

		this.config.onInit(this.adSlot, this.params, this.config);
		this.onAdReady();
	}

	addStickinessPlugin() {
		this.container.classList.add(CSS_CLASSNAME_STICKY_IAB);
		this.addUnstickLogic();
		this.addUnstickButton();
		this.addUnstickEvents();
		this.stickiness.run();
		utils.logger(logGroup, this.adSlot.getSlotName(), 'stickiness added');
	}

	addAdvertisementLabel() {
		const advertisementLabel = new AdvertisementLabel();

		this.adSlot.getElement().appendChild(advertisementLabel.render());
	}

	addUnstickButton() {
		this.closeButton = new CloseButton({
			classNames: ['button-unstick'],
			onClick: () => this.stickiness.close()
		}).render();

		this.container.appendChild(this.closeButton);
	}

	removeUnstickButton() {
		this.closeButton.remove();
	}

	addUnstickEvents() {
		this.stickiness.on(Stickiness.STICKINESS_CHANGE_EVENT, isSticky => this.onStickinessChange(isSticky));
		this.stickiness.on(Stickiness.CLOSE_CLICKED_EVENT, this.unstickImmediately.bind(this));
		this.stickiness.on(Stickiness.UNSTICK_IMMEDIATELY_EVENT, this.unstickImmediately.bind(this));
	}

	async onStickinessChange(isSticky) {
		const stickinessBeforeCallback = isSticky ?
			this.config.onBeforeStickBfaaCallback :
			this.config.onBeforeUnstickBfaaCallback;
		const stickinessAfterCallback = isSticky ?
			this.config.onAfterStickBfaaCallback :
			this.config.onAfterUnstickBfaaCallback;

		stickinessBeforeCallback.call(this.config, this.adSlot, this.params);

		if (!isSticky) {
			this.adSlot.emitEvent(AdSlot.SLOT_UNSTICKED_STATE);
			this.config.moveNavbar(0, SLIDE_OUT_TIME);
			await animate(this.adSlot.getElement(), CSS_CLASSNAME_SLIDE_OUT_ANIMATION, SLIDE_OUT_TIME);
			this.adSlot.getElement().classList.remove(CSS_CLASSNAME_STICKY_BFAA);
			this.adSlot.getElement().classList.add('theme-resolved');
			animate(this.adSlot.getElement(), CSS_CLASSNAME_FADE_IN_ANIMATION, FADE_IN_TIME);
		} else {
			this.adSlot.emitEvent(AdSlot.SLOT_STICKED_STATE);
			this.adSlot.getElement().classList.add(CSS_CLASSNAME_STICKY_BFAA);
		}

		stickinessAfterCallback.call(this.config, this.adSlot, this.params);
		utils.logger(logGroup, 'stickiness changed', isSticky);
	}

	async onAdReady() {
		this.container.classList.add('theme-hivi');
		this.addAdvertisementLabel();

		this.config.mainContainer.style.paddingTop = `${this.container.scrollHeight}px`;
		this.config.mainContainer.classList.add('has-bfaa');


		if (this.config.handleNavbar) {
			this.setupNavbar();
		}

		this.config.moveNavbar(this.adSlot.getElement().scrollHeight, SLIDE_OUT_TIME);

		if (document.hidden) {
			await utils.once(window, 'visibilitychange');
		}

		utils.logger(logGroup, 'ad ready');
	}

	unstickImmediately() {
		this.adSlot.emitEvent(StickyAd.SLOT_UNSTICK_IMMEDIATELY);
		this.config.moveNavbar(0, 0);
		scrollListener.removeCallback(this.scrollListener);
		this.adSlot.getElement().classList.remove(CSS_CLASSNAME_STICKY_BFAA);
		this.adSlot.getElement().classList.add('theme-resolved');
		this.stickiness.sticky = false;
		this.removeUnstickButton();
		this.config.mainContainer.style.paddingTop = '0';
		this.adSlot.getElement().classList.add('hide');
		utils.logger(logGroup, 'unstick immediately');
	}

	setupNavbar() {
		const desktopNavbarWrapper = document.querySelector(this.config.desktopNavbarWrapperSelector);
		const mobileNavbarWrapper = document.querySelector(this.config.mobileNavbarWrapperSelector);
		const slotParent = this.container.parentNode;
		const sibling = document.querySelector(this.config.slotSibling) || this.container.nextElementSibling;

		if (mobileNavbarWrapper) {
			slotParent.insertBefore(mobileNavbarWrapper, sibling);
		}

		if (desktopNavbarWrapper) {
			slotParent.insertBefore(desktopNavbarWrapper, sibling);
		}
	}
}

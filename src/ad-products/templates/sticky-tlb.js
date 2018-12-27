import { scrollListener, utils } from '@wikia/ad-engine';
import AdvertisementLabel from './interface/advertisement-label';
import { animate } from './interface/animate';
import { Stickiness } from './uap/themes/hivi/stickiness';
import { StickyBase } from './sticky-base';
import { universalAdPackage } from './uap/universal-ad-package';
import {
	CSS_CLASSNAME_FADE_IN_ANIMATION,
	CSS_CLASSNAME_SLIDE_OUT_ANIMATION,
	CSS_CLASSNAME_STICKY_BFAA,
	SLIDE_OUT_TIME,
	FADE_IN_TIME,
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
					navbarElement.style.transition = offset
						? ''
						: `top ${time}ms ${universalAdPackage.CSS_TIMING_EASE_IN_CUBIC}`;
					navbarElement.style.top = offset ? `${offset}px` : '';
				}
			},
		};
	}

	static getName() {
		return 'stickyTLB';
	}

	init(params) {
		this.initStickiness(params);

		this.container.style.backgroundColor = '#000';
		this.container.classList.add('bfaa-template');

		this.config.onInit(this.adSlot, this.params, this.config);
		this.onAdReady();
	}

	/** @private */
	async onAdReady() {
		this.container.classList.add('theme-hivi');
		this.addAdvertisementLabel();

		this.config.mainContainer.style.paddingTop = `${this.container.scrollHeight}px`;
		this.config.mainContainer.classList.add('has-bfaa');

		if (this.config.handleNavbar) {
			this.setupNavbar();
		}

		this.config.moveNavbar(this.container.scrollHeight, SLIDE_OUT_TIME);

		if (document.hidden) {
			await utils.once(window, 'visibilitychange');
		}

		utils.logger(logGroup, 'ad ready');
	}

	/** @private */
	addAdvertisementLabel() {
		const advertisementLabel = new AdvertisementLabel();

		this.container.appendChild(advertisementLabel.render());
	}

	/** @private */
	setupNavbar() {
		const desktopNavbarWrapper = document.querySelector(this.config.desktopNavbarWrapperSelector);
		const mobileNavbarWrapper = document.querySelector(this.config.mobileNavbarWrapperSelector);
		const slotParent = this.container.parentNode;
		const sibling =
			document.querySelector(this.config.slotSibling) || this.container.nextElementSibling;

		if (mobileNavbarWrapper) {
			slotParent.insertBefore(mobileNavbarWrapper, sibling);
		}

		if (desktopNavbarWrapper) {
			slotParent.insertBefore(desktopNavbarWrapper, sibling);
		}
	}

	/** @protected */
	async onStickinessChange(isSticky) {
		const stickinessBeforeCallback = isSticky
			? this.config.onBeforeStickBfaaCallback
			: this.config.onBeforeUnstickBfaaCallback;
		const stickinessAfterCallback = isSticky
			? this.config.onAfterStickBfaaCallback
			: this.config.onAfterUnstickBfaaCallback;

		stickinessBeforeCallback.call(this.config, this.adSlot, this.params);

		if (!isSticky) {
			await this.onStick();
		} else {
			this.onUnstick();
		}

		stickinessAfterCallback.call(this.config, this.adSlot, this.params);
		utils.logger(logGroup, 'stickiness changed', isSticky);
	}

	/** @protected */
	async onStick() {
		this.adSlot.emitEvent(Stickiness.SLOT_UNSTICKED_STATE);
		this.config.moveNavbar(0, SLIDE_OUT_TIME);
		await animate(this.container, CSS_CLASSNAME_SLIDE_OUT_ANIMATION, SLIDE_OUT_TIME);
		this.container.classList.remove(CSS_CLASSNAME_STICKY_BFAA);
		this.container.classList.add('theme-resolved');
		animate(this.container, CSS_CLASSNAME_FADE_IN_ANIMATION, FADE_IN_TIME);
	}

	/** @protected */
	onUnstick() {
		this.adSlot.emitEvent(Stickiness.SLOT_STICKED_STATE);
		this.container.classList.add(CSS_CLASSNAME_STICKY_BFAA);
	}

	/** @protected */
	unstickImmediately() {
		this.adSlot.emitEvent(Stickiness.SLOT_UNSTICK_IMMEDIATELY);
		this.config.moveNavbar(0, 0);
		scrollListener.removeCallback(this.scrollListener);
		this.container.classList.remove(CSS_CLASSNAME_STICKY_BFAA);
		this.container.classList.add('theme-resolved');
		this.stickiness.sticky = false;
		this.removeUnstickButton();
		this.config.mainContainer.style.paddingTop = '0';
		this.container.classList.add('hide');
		utils.logger(logGroup, 'unstick immediately');
	}

	/** @protected */
	addStickinessPlugin() {
		this.container.classList.add(CSS_CLASSNAME_STICKY_IAB);
		this.addUnstickLogic();
		this.addUnstickButton(this.container);
		this.addUnstickEvents();
		this.stickiness.run();
		utils.logger(logGroup, this.adSlot.getSlotName(), 'stickiness added');
	}

	/**
	 * Returns template name.
	 * @protected
	 * @return {string}
	 */
	getName() {
		return StickyTLB.getName();
	}

	/**
	 * @protected
	 */
	isEnabled() {
		return super.isEnabled() && this.container;
	}
}

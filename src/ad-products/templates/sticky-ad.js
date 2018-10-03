import { AdSlot, context, scrollListener, utils } from '@wikia/ad-engine';
import { Stickiness } from './uap/themes/hivi/stickiness';
import {
	CSS_CLASSNAME_FADE_IN_ANIMATION,
	CSS_CLASSNAME_SLIDE_OUT_ANIMATION,
	CSS_CLASSNAME_STICKY_SLOT,
	CSS_CLASSNAME_STICKY_TEMPLATE,
	FADE_IN_TIME,
	SLIDE_OUT_TIME
} from './uap/constants';
import { animate } from './interface/animate';

export class StickyAd {
	static DEFAULT_UNSTICK_DELAY = 3000;

	static getName() {
		return 'stickyAd';
	}

	static getDefaultConfig() {
		return {
			enabled: true,
			stickinessAllowed: true,
			stickyAdditionalTime: 0,
			stickyUntilSlotViewed: true,
			handleNavbar: true,
			navbarWrapperSelector: 'body > nav.navigation',
			topOffset: 0
		};
	}

	constructor(adSlot) {
		this.adSlot = adSlot;
		this.config = context.get(`templates.${StickyAd.getName()}`);
		this.stickiness = null;
		this.scrollListener = null;
	}

	static isEnabled() {
		const templateName = StickyAd.getName();

		return context.get(`templates.${templateName}.enabled`)
			&& context.get(`templates.${templateName}.stickinessAllowed`);
	}

	init(params) {
		this.params = params;

		if (!StickyAd.isEnabled()) {
			return;
		}

		this.adSlot.getElement().classList.add(CSS_CLASSNAME_STICKY_TEMPLATE);

		this.addUnstickLogic();
		this.addUnstickButton();
		this.addUnstickEvents();

		if (this.config.handleNavbar) {
			const navbarElement = document.querySelector(this.config.navbarWrapperSelector);

			this.config.topOffset = navbarElement ? navbarElement.offsetHeight : 0;
		}

		const startOffset = utils.getTopOffset(this.adSlot.getElement()) - this.config.topOffset;

		this.scrollListener = scrollListener.addCallback(() => {
			const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

			if (scrollPosition >= startOffset) {
				this.stickiness.run();
				scrollListener.removeCallback(this.scrollListener);
			}
		});
	}

	addUnstickLogic() {
		const { stickyAdditionalTime, stickyUntilSlotViewed } = this.config;
		const whenSlotViewedOrTimeout = async () => {
			await Promise.all([
				stickyUntilSlotViewed && !this.adSlot.isViewed() ?
					utils.once(this.adSlot, AdSlot.SLOT_VIEWED_EVENT) :
					Promise.resolve()
			]);
			await utils.wait(StickyAd.DEFAULT_UNSTICK_DELAY + stickyAdditionalTime);
		};

		this.stickiness = new Stickiness(this.adSlot, whenSlotViewedOrTimeout());
	}

	addUnstickButton() {
		// nope
	}

	addUnstickEvents() {
		this.stickiness.on(Stickiness.STICKINESS_CHANGE_EVENT, isSticky => this.onStickinessChange(isSticky));
		//this.stickiness.on(Stickiness.CLOSE_CLICKED_EVENT, this.onCloseClicked.bind(this));
		//this.stickiness.on(Stickiness.UNSTICK_IMMEDIATELY_EVENT, this.unstickImmediately.bind(this));
	}

	async onStickinessChange(isSticky) {
		if (!isSticky) {
			await animate(this.adSlot.getElement().firstChild, CSS_CLASSNAME_SLIDE_OUT_ANIMATION, SLIDE_OUT_TIME);
			this.adSlot.getElement().classList.remove(CSS_CLASSNAME_STICKY_SLOT);
			this.adSlot.getElement().firstChild.style.top = 0;
			animate(this.adSlot.getElement().firstChild, CSS_CLASSNAME_FADE_IN_ANIMATION, FADE_IN_TIME);
		} else {
			this.adSlot.getElement().classList.add(CSS_CLASSNAME_STICKY_SLOT);
			this.adSlot.getElement().firstChild.style.top = `${this.config.topOffset}px`;
		}
	}
}

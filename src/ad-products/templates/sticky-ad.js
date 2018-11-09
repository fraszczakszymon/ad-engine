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
import CloseButton from './interface/close-button';

export class StickyAd {
	static DEFAULT_UNSTICK_DELAY = 2000;

	static getName() {
		return 'stickyAd';
	}

	static getDefaultConfig() {
		return {
			enabled: true,
			stickyAdditionalTime: 0,
			stickyUntilSlotViewed: true,
			handleNavbar: true,
			navbarWrapperSelector: 'body > nav.navigation',
			smartBannerSelector: null,
			slotsIgnoringNavbar: []
		};
	}

	constructor(adSlot) {
		this.adSlot = adSlot;
		this.lineId = adSlot.lineItemId;
		this.config = context.get(`templates.${StickyAd.getName()}`);
		this.lines = context.get(`templates.${StickyAd.getName()}.lineItemIds`);
		this.stickiness = null;
		this.scrollListener = null;
		this.topOffset = 0;
		this.leftOffset = 0;
	}

	static isEnabled() {
		return context.get(`templates.${StickyAd.getName()}.enabled`);
	}

	init(params) {
		this.params = params;

		if (!StickyAd.isEnabled() || !this.lines || !this.lines.length || !this.lineId ||
			(this.lines.indexOf(this.lineId.toString()) === -1 && this.lines.indexOf(this.lineId) === -1)
		) {
			return;
		}

		this.adSlot.getElement().classList.add(CSS_CLASSNAME_STICKY_TEMPLATE);

		this.addUnstickLogic();
		this.addUnstickEventsListeners();

		if (this.config.handleNavbar && this.config.slotsIgnoringNavbar.indexOf(this.adSlot.getSlotName()) === -1) {
			const navbarElement = document.querySelector(this.config.navbarWrapperSelector);

			this.topOffset = navbarElement ? navbarElement.offsetHeight : 0;

			if (this.config.smartBannerSelector) {
				const smartBannerElement = document.querySelector(this.config.smartBannerSelector);

				this.topOffset += smartBannerElement ? smartBannerElement.offsetHeight : 0;
			}
		}

		this.leftOffset = utils.getLeftOffset(this.adSlot.getElement().querySelector('div').firstChild);

		const startOffset = utils.getTopOffset(this.adSlot.getElement().querySelector('div')) - this.topOffset;

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
			await (stickyUntilSlotViewed && !this.adSlot.isViewed() ?
				utils.once(this.adSlot, AdSlot.SLOT_VIEWED_EVENT) :
				Promise.resolve());
			await utils.wait(StickyAd.DEFAULT_UNSTICK_DELAY + stickyAdditionalTime);
		};

		this.stickiness = new Stickiness(this.adSlot, whenSlotViewedOrTimeout(), true);
	}

	addUnstickButton() {
		this.closeButton = new CloseButton({
			classNames: ['button-unstick'],
			onClick: () => this.stickiness.close()
		}).render();

		this.adSlot.getElement().querySelector('div').appendChild(this.closeButton);
	}

	removeUnstickButton() {
		this.closeButton.remove();
	}

	removeStickyParameters() {
		this.adSlot.getElement().classList.remove(CSS_CLASSNAME_STICKY_SLOT);
		this.adSlot.getElement().style.height = null;
		this.adSlot.getElement().querySelector('div').style.top = null;
		this.adSlot.getElement().querySelector('div').style.left = null;
	}

	addUnstickEventsListeners() {
		this.stickiness.on(Stickiness.STICKINESS_CHANGE_EVENT, isSticky => this.onStickinessChange(isSticky));
		this.stickiness.on(Stickiness.CLOSE_CLICKED_EVENT, this.unstickImmediately.bind(this));
		this.stickiness.on(Stickiness.UNSTICK_IMMEDIATELY_EVENT, this.unstickImmediately.bind(this));
	}

	async onStickinessChange(isSticky) {
		if (!isSticky) {
			await animate(this.adSlot.getElement().querySelector('div'), CSS_CLASSNAME_SLIDE_OUT_ANIMATION, SLIDE_OUT_TIME);
			this.removeStickyParameters();
			animate(this.adSlot.getElement().querySelector('div'), CSS_CLASSNAME_FADE_IN_ANIMATION, FADE_IN_TIME);

			this.removeUnstickButton();
		} else {
			this.adSlot.getElement().classList.add(CSS_CLASSNAME_STICKY_SLOT);
			this.adSlot.getElement().style.height = `${this.adSlot.getElement().querySelector('div').offsetHeight}px`;
			this.adSlot.getElement().querySelector('div').style.top = `${this.topOffset}px`;
			this.adSlot.getElement().querySelector('div').style.left = `${this.leftOffset}px`;

			this.addUnstickButton();
		}
	}

	unstickImmediately() {
		if (this.stickiness) {
			this.removeStickyParameters();
			this.stickiness.sticky = false;
			this.removeUnstickButton();
		}
	}
}

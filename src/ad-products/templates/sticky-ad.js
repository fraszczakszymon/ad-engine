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

const logGroup = 'sticky-ad';

export class StickyAd {
	static DEFAULT_UNSTICK_DELAY = 2000;
	static SLOT_STICKY_READY_STATE = 'sticky-ready';
	static SLOT_UNSTICK_IMMEDIATELY = 'force-unstick';

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

	static isLineAndGeo(lineId, lines) {
		if (!lineId || !lines || !lines.length) {
			return false;
		}

		let found = false;
		lineId = lineId.toString();

		lines.forEach((line) => {
			line = line.split(':', 2);

			if (line[0] === lineId && (!line[1] || utils.isProperGeo([line[1]]))) {
				found = true;
			}
		});

		return found;
	}

	adjustAdSlot() {
		this.leftOffset = utils.getLeftOffset(this.adSlot.getElement().querySelector('div').firstChild);
	}

	init(params) {
		this.params = params;

		if (!(StickyAd.isEnabled() && StickyAd.isLineAndGeo(this.lineId, this.lines))) {
			utils.logger(logGroup, 'stickiness rejected');
			return;
		}

		this.adSlot.setConfigProperty('useGptOnloadEvent', true);
		this.adSlot.onLoad().then(() => {
			utils.logger(logGroup, this.adSlot.getSlotName(), 'slot ready for stickiness');
			this.adSlot.emitEvent(StickyAd.SLOT_STICKY_READY_STATE);
		});
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

		this.adjustAdSlot();

		const startOffset = utils.getTopOffset(this.adSlot.getElement().querySelector('div')) - this.topOffset;

		this.scrollListener = scrollListener.addCallback(() => {
			const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

			if (scrollPosition >= startOffset) {
				this.stickiness.run();
				scrollListener.removeCallback(this.scrollListener);
			}
		});

		window.addEventListener('resize', this.adjustAdSlot.bind(this));
		utils.logger(logGroup, this.adSlot.getSlotName(), 'stickiness added');
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
			this.adSlot.emitEvent(AdSlot.SLOT_UNSTICKED_STATE);
			await animate(this.adSlot.getElement().querySelector('div'), CSS_CLASSNAME_SLIDE_OUT_ANIMATION, SLIDE_OUT_TIME);
			this.removeStickyParameters();
			animate(this.adSlot.getElement().querySelector('div'), CSS_CLASSNAME_FADE_IN_ANIMATION, FADE_IN_TIME);

			this.removeUnstickButton();
		} else {
			this.adSlot.emitEvent(AdSlot.SLOT_STICKED_STATE);
			this.adSlot.getElement().classList.add(CSS_CLASSNAME_STICKY_SLOT);
			this.adSlot.getElement().style.height = `${this.adSlot.getElement().querySelector('div').offsetHeight}px`;
			this.adSlot.getElement().querySelector('div').style.top = `${this.topOffset}px`;
			this.adSlot.getElement().querySelector('div').style.left = `${this.leftOffset}px`;

			this.addUnstickButton();
		}
		utils.logger(logGroup, 'stickiness changed', isSticky);
	}

	unstickImmediately() {
		if (this.stickiness) {
			this.adSlot.emitEvent(StickyAd.SLOT_UNSTICK_IMMEDIATELY);
			this.removeStickyParameters();
			this.stickiness.sticky = false;
			this.removeUnstickButton();
			utils.logger(logGroup, 'unstick immediately');
		}
	}
}

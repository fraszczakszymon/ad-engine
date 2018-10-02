import { AdSlot, context, scrollListener, slotService } from '@wikia/ad-engine';
import * as utils from '@wikia/ad-engine/utils';
import { Stickiness } from './../../ad-products/templates/uap/themes/hivi/stickiness';
import { BfabTheme } from './../../ad-products/templates/uap/themes/hivi';
import CloseButton from './../../ad-products/templates/interface/close-button';
import { animate } from './../../ad-products/templates/interface/animate';
import {
	CSS_CLASSNAME_FADE_IN_ANIMATION,
	CSS_CLASSNAME_SLIDE_OUT_ANIMATION,
	CSS_CLASSNAME_STICKY_BFAB, FADE_IN_TIME,
	SLIDE_OUT_TIME
} from './../../ad-products/templates/uap/constants';

export class StickyAd {
	static getName() {
		return 'sticky-ad';
	}


	constructor(adSlot) {
		this.adSlot = adSlot;
		this.config = context.get('templates.bfab');
	}

	init() {
		this.adSlot.once(AdSlot.SLOT_VIEWED_EVENT, () => {
			this.stickiness = new Stickiness(this.adSlot);
			this.stickiness.sticky = true;
			this.addStickinessPlugin();
		});
	}

	async addStickinessPlugin() {
		await this.waitForScrollAndUnstickedBfaa();

		if (!this.adSlot.isViewed()) {
			this.addUnstickLogic();
			this.addUnstickButton();
			this.addUnstickEvents();
			this.stickiness.run();

			scrollListener.addCallback((event, id) => {
				const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

				if (scrollPosition <= this.config.unstickInstantlyBelowPosition) {
					this.adSlot.setStatus('top-conflict');
					scrollListener.removeCallback(id);
					this.stickiness.revertStickiness();
				}
			});
		}
	}

	addUnstickLogic() {
		const whenResolvedAndVideoViewed = async () => {
			await utils.wait(BfabTheme.DEFAULT_UNSTICK_DELAY);
		};

		this.stickiness = new Stickiness(this.adSlot, whenResolvedAndVideoViewed());
	}

	waitForScrollAndUnstickedBfaa() {
		let resolvePromise = null;

		const promise = new Promise((resolve) => {
			resolvePromise = resolve;
		});
		const bfaa = slotService.get(this.config.bfaaSlotName);

		scrollListener.addCallback((event, id) => {
			if (this.adSlot.isViewed()) {
				scrollListener.removeCallback(id);
				return;
			}

			const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop,
				slotPosition = utils.getTopOffset(this.adSlot.getElement()),
				isBfaaSticky = bfaa.getElement().classList.contains('sticky-bfaa'),
				bfaaHeight = bfaa.getElement().offsetHeight;

			if (isBfaaSticky && scrollPosition >= slotPosition - this.config.topThreshold - bfaaHeight) {
				scrollListener.removeCallback(id);
				this.adSlot.setStatus('viewport-conflict');
			} else if (scrollPosition >= slotPosition - this.config.topThreshold && !isBfaaSticky) {
				scrollListener.removeCallback(id);
				resolvePromise();
			}
		});

		return promise;
	}

	addUnstickButton() {
		const closeButton = new CloseButton({
			classNames: ['button-unstick'],
			onClick: () => {
				(this.stickiness || this.stickiness).close();
			}
		});

		this.container.appendChild(closeButton.render());
	}

	addUnstickEvents() {
		this.stickiness.on(Stickiness.STICKINESS_CHANGE_EVENT, isSticky => this.onStickinessChange(isSticky));
		this.stickiness.on(Stickiness.CLOSE_CLICKED_EVENT, this.onCloseClicked.bind(this));
		// this.stickiness.on(Stickiness.UNSTICK_IMMEDIATELY_EVENT, this.unstickImmediately.bind(this));
	}

	async onStickinessChange(isSticky) {
		const element = this.adSlot.getElement();
		if (!isSticky) {
			if (this.adSlot.getStatus() !== 'top-conflict') {
				await animate(this.adSlot, CSS_CLASSNAME_SLIDE_OUT_ANIMATION, SLIDE_OUT_TIME);
			}
			this.adSlot.setStatus(AdSlot.SLOT_UNSTICKED_STATE);
			element.style.top = null;
			element.parentNode.style.height = null;
			element.classList.remove(CSS_CLASSNAME_STICKY_BFAB);
			animate(this.adSlot, CSS_CLASSNAME_FADE_IN_ANIMATION, FADE_IN_TIME);
		} else {
			this.adSlot.setStatus(AdSlot.SLOT_STICKED_STATE);
			element.parentNode.style.height = `${element.offsetHeight}px`;
			element.classList.add(CSS_CLASSNAME_STICKY_BFAB);
			element.style.top = `${this.config.topThreshold}px`;
		}
	}

	onCloseClicked() {
		// this.unstickImmediately();

		this.adSlot.getElement().parentNode.style.height = null;
		this.adSlot.disable();
		this.adSlot.collapse();
	}

/*	unstickImmediately() {
		if (this.stickiness) {
			this.adSlot.getElement().classList.remove(CSS_CLASSNAME_STICKY_BFAB);

			this.stickiness.sticky = false;
		}
	} */
}

import EventEmitter from 'eventemitter3';
import { context, slotTweaker, templateService } from '../services';
import { stringBuilder } from '../utils';
import { slotListener } from '../listeners';

export class AdSlot extends EventEmitter {
	static PROPERTY_CHANGED_EVENT = 'propertyChanged';
	static SLOT_VIEWED_EVENT = 'slotViewed';
	static VIDEO_VIEWED_EVENT = 'videoViewed';

	static SLOT_STICKED_STATE = 'sticked';
	static SLOT_UNSTICKED_STATE = 'unsticked';

	constructor(ad) {
		super();

		this.config = context.get(`slots.${ad.id}`) || {};
		this.enabled = !this.config.disabled;
		this.viewed = false;
		this.element = null;
		this.status = null;

		this.creativeId = null;
		this.creativeSize = null;
		this.lineItemId = null;

		this.config.slotName = this.config.slotName || ad.id;
		this.config.targeting = this.config.targeting || {};
		this.config.targeting.src = this.config.targeting.src || context.get('src');
		this.config.targeting.pos = this.config.targeting.pos || this.getSlotName();

		this.once(AdSlot.SLOT_VIEWED_EVENT, () => {
			this.viewed = true;
		});
	}

	getAdUnit() {
		if (!this.adUnit) {
			this.adUnit = stringBuilder.build(
				this.config.adUnit || context.get('adUnitId'),
				{
					slotConfig: this.config
				}
			);
		}

		return this.adUnit;
	}

	getVideoAdUnit() {
		return stringBuilder.build(this.config.videoAdUnit || context.get('vast.adUnitId'), {
			slotConfig: this.config
		});
	}

	getElement() {
		if (!this.element) {
			this.element = document.getElementById(this.getSlotName());
		}

		return this.element;
	}

	getSlotName() {
		return this.config.slotName;
	}

	getSizes() {
		return this.config.sizes;
	}

	/**
	 * Convenient property to get targeting.
	 * @returns {Object}
	 */
	get targeting() {
		return this.config.targeting;
	}

	getTargeting() {
		return this.config.targeting;
	}

	getDefaultSizes() {
		return this.config.defaultSizes;
	}

	getViewportConflicts() {
		return this.config.viewportConflicts || [];
	}

	hasDefinedViewportConflicts() {
		return this.getViewportConflicts().length > 0;
	}

	getStatus() {
		return this.status;
	}

	setStatus(status = null) {
		this.status = status;
		if (status !== null) {
			slotListener.emitStatusChanged(this);
		}
	}

	/**
	 * Returns true if slot is ATF
	 *
	 * @param config slot config
	 * @returns {boolean} true if slot is ATF
	 */
	static isAboveTheFold(config) {
		return !!config.aboveTheFold;
	}

	isFirstCall() {
		return !!this.config.firstCall;
	}

	isEnabled() {
		return this.enabled;
	}

	isViewed() {
		return this.viewed;
	}

	isRepeatable() {
		return !!this.config.repeat;
	}

	isOutOfPage() {
		return !!this.config.outOfPage;
	}

	getCopy() {
		return JSON.parse(JSON.stringify(this.config));
	}

	enable() {
		this.enabled = true;
	}

	disable(status = null) {
		this.enabled = false;
		this.setStatus(status);
	}

	getConfigProperty(key) {
		return context.get(`slots.${this.config.slotName}.${key}`);
	}

	setConfigProperty(key, value) {
		context.set(`slots.${this.config.slotName}.${key}`, value);
	}

	success(status = 'success') {
		slotTweaker.show(this);
		this.setStatus(status);

		const templates = this.getConfigProperty('defaultTemplates');

		if (templates && templates.length) {
			templates.forEach(template => templateService.init(template, this));
		}
	}

	collapse(status = 'collapse') {
		slotTweaker.hide(this);
		this.setStatus(status);
	}
}

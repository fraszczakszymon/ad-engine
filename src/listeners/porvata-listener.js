import Client from '../utils/client';
import { VIDEO_VIEWED_EVENT } from '../models/ad-slot';
import Context from '../services/context-service';
import SlotService from '../services/slot-service';
import VastParser from '../video/vast-parser';
import { logger } from '../utils/logger';

function getListeners() {
	return Context.get('listeners.porvata');
}

export default class PorvataListener {
	constructor(params) {
		this.params = params;
		this.listeners = getListeners().filter(listener => !listener.isEnabled || listener.isEnabled());
		this.logger = (...args) => logger(PorvataListener.LOG_GROUP, ...args);
	}

	init() {
		this.dispatch('init');
	}

	registerVideoEvents(video) {
		this.video = video;
		this.dispatch('ready');

		Object.keys(PorvataListener.EVENTS).forEach((eventKey) => {
			video.addEventListener(eventKey, (event) => {
				const errorCode = event.getError && event.getError().getErrorCode();

				this.dispatch(PorvataListener.EVENTS[eventKey], errorCode);
			});
		});
	}

	dispatch(eventName, errorCode = 0) {
		const data = this.getData(eventName, errorCode);

		this.logger(eventName, data);
		this.listeners.forEach((listener) => {
			listener.onEvent(eventName, this.params, data);
		});

		if (this.params.position && eventName === PorvataListener.EVENTS.viewable_impression) {
			const adSlot = SlotService.getBySlotName(this.params.position);
			adSlot.emit(VIDEO_VIEWED_EVENT);
		}
	}

	getData(eventName, errorCode) {
		const imaAd = this.video && this.video.ima.getAdsManager() && this.video.ima.getAdsManager().getCurrentAd(),
			{ contentType, creativeId, lineItemId } = VastParser.getAdInfo(imaAd);

		return {
			ad_error_code: errorCode,
			ad_product: this.params.adProduct,
			browser: `${Client.getOperatingSystem()} ${Client.getBrowser()}`,
			content_type: contentType || '(none)',
			creative_id: creativeId || 0,
			event_name: eventName,
			line_item_id: lineItemId || 0,
			player: PorvataListener.PLAYER_NAME,
			position: this.params.position || '(none)',
			timestamp: new Date().getTime()
		};
	}
}

Object.assign(PorvataListener, {
	EVENTS: {
		adCanPlay: 'ad_can_play',
		complete: 'completed',
		click: 'clicked',
		firstquartile: 'first_quartile',
		impression: 'impression',
		loaded: 'loaded',
		midpoint: 'midpoint',
		pause: 'paused',
		resume: 'resumed',
		start: 'started',
		thirdquartile: 'third_quartile',
		viewable_impression: 'viewable_impression',
		adError: 'error',
		wikiaAdPlayTriggered: 'play_triggered',
		wikiaAdStop: 'closed'
	},
	LOG_GROUP: 'porvata-listener',
	PLAYER_NAME: 'porvata'
});

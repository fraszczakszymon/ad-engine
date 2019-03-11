import * as EventEmitter from 'eventemitter3';
import { logger } from '../utils';

const groupName = 'eventService';

export const events = {
	AD_SLOT_CREATED: Symbol('AD_SLOT_CREATED'),
	AD_STACK_START: Symbol('AD_STACK_START'),
	BEFORE_PAGE_CHANGE_EVENT: Symbol('BEFORE_PAGE_CHANGE_EVENT'),
	PAGE_CHANGE_EVENT: Symbol('PAGE_CHANGE_EVENT'),
	PAGE_RENDER_EVENT: Symbol('PAGE_RENDER_EVENT'),

	// video events should happen in the order below
	VIDEO_AD_REQUESTED: Symbol('VIDEO_AD_REQUESTED'),
	VIDEO_AD_ERROR: Symbol('VIDEO_AD_ERROR'),
	VIDEO_AD_IMPRESSION: Symbol('VIDEO_AD_IMPRESSION'),
	VIDEO_AD_USED: Symbol('VIDEO_AD_USED'),

	BIDS_REFRESH: Symbol('BIDS_REFRESH'),
	PREBID_LAZY_CALL: Symbol('PREBID_LAZY_CALL'),
};

class EventService extends EventEmitter.EventEmitter {
	emit(event: symbol, ...args: any[]): boolean {
		logger(groupName, 'emit', event, ...args);
		return super.emit(event, ...args);
	}
}

export const eventService = new EventService();

import { logger } from '../../../../utils/logger';
import initMoatTracking from './moat-video-tracker-script';

const logGroup = 'moat-video-tracker',
	partnerCode = 'wikiaimajsint377461931603';

export default class MoatVideoTracker {
	static init(adsManager, container, viewMode, slicer1, slicer2) {
		const ids = {
			partnerCode,
			viewMode,
			slicer1,
			slicer2
		};

		try {
			initMoatTracking(adsManager, ids, container);
			logger(logGroup, 'MOAT video tracking initialized');
		} catch (error) {
			logger(logGroup, 'MOAT video tracking initalization error', error);
		}
	}
}

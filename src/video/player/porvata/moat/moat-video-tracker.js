import { logger } from '../../../../utils/logger';
import Context from '../../../../services/context-service';
import initMoatTracking from './moat-video-tracker-script';

const logGroup = 'moat-video-tracker';

export default class MoatVideoTracker {
	static init(adsManager, container, viewMode, slicer1, slicer2) {
		const ids = {
			partnerCode: Context.get('options.video.moatTracking.partnerCode'),
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

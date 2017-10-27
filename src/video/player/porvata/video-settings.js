import Context from '../../../services/context-service';
import Sampler from '../../../utils/sampler';

function getMoatTrackingStatus(params) {
	const sampling = Context.get('options.video.moatTracking.sampling');

	if (typeof params.moatTracking === 'boolean') {
		return params.moatTracking;
	}

	if (!Context.get('options.video.moatTracking.enabled')) {
		return false;
	}

	if (sampling === 100) {
		return true;
	}

	if (sampling > 0) {
		return Sampler.sample('moat_video_tracking', sampling);
	}

	return false;
}

export default class VideoSettings {
	constructor(params = {}) {
		this.params = params;
		this.moatTracking = getMoatTrackingStatus(params);
	}

	get(key) {
		return this.params[key];
	}

	getContainer() {
		return this.get('container');
	}

	getParams() {
		return this.params;
	}

	isMoatTrackingEnabled() {
		return this.moatTracking;
	}
}

import Context from '../../../../services/context-service';
import { build as buildVastUrl } from '../../../vast-url-builder';

function createRequest(params) {
	const adsRequest = new window.google.ima.AdsRequest();

	adsRequest.adTagUrl = params.vastUrl || buildVastUrl(params.width / params.height, params.vastTargeting);
	adsRequest.linearAdSlotWidth = params.width;
	adsRequest.linearAdSlotHeight = params.height;

	return adsRequest;
}

function getRenderingSettings(params = {}) {
	const adsRenderingSettings = new window.google.ima.AdsRenderingSettings(),
		maximumRecommendedBitrate = 68000; // 2160p High Frame Rate

	if (!Context.get('state.isMobile')) {
		adsRenderingSettings.bitrate = maximumRecommendedBitrate;
	}

	adsRenderingSettings.loadVideoTimeout = params.loadVideoTimeout || 15000;
	adsRenderingSettings.enablePreloading = true;
	adsRenderingSettings.uiElements = [];

	return adsRenderingSettings;
}

export default {
	createRequest,
	getRenderingSettings
};

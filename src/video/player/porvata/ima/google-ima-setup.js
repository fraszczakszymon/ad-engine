import Context from '../../../../services/context-service';
import { logger } from '../../../../utils/logger';
import { get as getQueryParam } from '../../../../utils/query-string';
import { build as buildVastUrl } from '../../../vast-url-builder';

const logGroup = 'google-ima-setup';

function getOverriddenVast() {
	if (getQueryParam('porvata_override_vast') === '1') {
		const vastXML = window.localStorage.getItem('porvata_vast');
		logger(logGroup, 'Overridden VAST', vastXML);

		return vastXML;
	}

	return null;
}

function createRequest(params) {
	const adsRequest = new window.google.ima.AdsRequest(),
		overriddenVast = getOverriddenVast();

	if (params.vastResponse || overriddenVast) {
		adsRequest.adsResponse = overriddenVast || params.vastResponse;
	}

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

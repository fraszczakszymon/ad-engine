import { context, slotService } from '../../../../services';
import { logger, queryString } from '../../../../utils';
import { buildVastUrl } from '../../../vast-url-builder';

const logGroup = 'google-ima-setup';

function getOverriddenVast() {
	if (queryString.get('porvata_override_vast') === '1') {
		const vastXML = window.localStorage.getItem('porvata_vast');
		logger(logGroup, 'Overridden VAST', vastXML);

		return vastXML;
	}

	return null;
}

function createRequest(params) {
	const adSlot = slotService.get(params.slotName),
		adsRequest = new window.google.ima.AdsRequest(),
		overriddenVast = getOverriddenVast();

	if (params.vastResponse || overriddenVast) {
		adsRequest.adsResponse = overriddenVast || params.vastResponse;
	}

	adSlot.setConfigProperty('autoplay', params.autoPlay);
	adSlot.setConfigProperty('audio', !params.autoPlay);

	adsRequest.adTagUrl = params.vastUrl || buildVastUrl(params.width / params.height, params.slotName, {
		targeting: params.vastTargeting
	});
	adsRequest.linearAdSlotWidth = params.width;
	adsRequest.linearAdSlotHeight = params.height;

	return adsRequest;
}

function getRenderingSettings(params = {}) {
	const adsRenderingSettings = new window.google.ima.AdsRenderingSettings(),
		maximumRecommendedBitrate = 68000; // 2160p High Frame Rate

	if (!context.get('state.isMobile')) {
		adsRenderingSettings.bitrate = maximumRecommendedBitrate;
	}

	adsRenderingSettings.loadVideoTimeout = params.loadVideoTimeout || 15000;
	adsRenderingSettings.enablePreloading = true;
	adsRenderingSettings.uiElements = [];

	return adsRenderingSettings;
}

export const googleImaSetup = {
	createRequest,
	getRenderingSettings
};

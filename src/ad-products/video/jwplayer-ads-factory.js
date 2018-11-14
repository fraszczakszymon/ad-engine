import {
	AdSlot,
	buildVastUrl,
	btfBlockerService,
	context,
	slotService,
	utils,
	vastDebugger,
	vastParser
} from '@wikia/ad-engine';
import { JWPlayerTracker } from '../tracking/video/jwplayer-tracker';

/**
 * Calculate depth
 *
 * @param {number} depth
 * @returns {number}
 */
function calculateRV(depth) {
	const capping = context.get('options.video.adsOnNextVideoFrequency');

	return (depth < 2 || !capping) ? 1 : (Math.floor((depth - 1) / capping) + 1);
}

/**
 * @param {number} depth
 * @returns {boolean}
 */
function shouldPlayAdOnNextVideo(depth) {
	const capping = context.get('options.video.adsOnNextVideoFrequency');

	return context.get('options.video.playAdsOnNextVideo') && capping > 0 && (depth - 1) % capping === 0;
}

/**
 * @param {number} depth
 * @returns {boolean}
 */
function canAdBePlayed(depth) {
	const isReplay = depth > 1;

	return !isReplay || (isReplay && shouldPlayAdOnNextVideo(depth));
}

/**
 * @param {number} videoDepth
 * @returns {boolean}
 */
function shouldPlayPreroll(videoDepth) {
	return canAdBePlayed(videoDepth);
}

/**
 * @param {number} videoDepth
 * @returns {boolean}
 */
function shouldPlayMidroll(videoDepth) {
	return context.get('options.video.isMidrollEnabled') && canAdBePlayed(videoDepth);
}

/**
 * @param {number} videoDepth
 * @returns {boolean}
 */
function shouldPlayPostroll(videoDepth) {
	return context.get('options.video.isPostrollEnabled') && canAdBePlayed(videoDepth);
}

/**
 * @param {Object} slot
 * @param {string} position
 * @param {number} depth
 * @param {number} correlator
 * @param {Object} slotTargeting
 * @returns {string}
 */
function getVastUrl(slot, position, depth, correlator, slotTargeting) {
	return buildVastUrl(16 / 9, slot.getSlotName(), {
		correlator,
		vpos: position,
		targeting: Object.assign({
			passback: 'jwplayer',
			rv: calculateRV(depth),
		}, slotTargeting),
	});
}

/**
 * Creates instance with ads schedule and tracking for JWPlayer
 * @param options
 * @param options.adProduct Base ad product name
 * @param options.slotName Slot name for video ads
 * @param [options.audio] Initial state of audio of created player
 * @param [options.autoplay] Initial state of autoplay of created player
 * @param [options.featured] Decides about ad slot used in the video
 * @returns {{register: register}}
 */
function create(options) {
	function register(player, slotTargeting = {}) {
		const slot = slotService.get(slotName);
		const adProduct = slot.config.trackingKey;
		const videoElement = player && player.getContainer && player.getContainer();
		const videoContainer = videoElement && videoElement.parentNode;
		const targeting = slotTargeting;

		let correlator;
		let depth = 0;
		let prerollPositionReached = false;

		slot.element = videoContainer;
		slot.setConfigProperty('audio', !player.getMute());
		slot.setConfigProperty('autoplay', player.getConfig().autostart);

		if (context.get('options.video.moatTracking.enabledForArticleVideos')) {
			player.on('adImpression', (event) => {
				if (window.moatjw) {
					window.moatjw.add({
						adImpressionEvent: event,
						partnerCode: context.get('options.video.moatTracking.partnerCode'),
						player,
					});
				}
			});
		}

		player.on('adBlock', () => {
			tracker.adProduct = adProduct;
		});

		player.on('beforePlay', () => {
			const currentMedia = player.getPlaylistItem() || {};

			targeting.v1 = currentMedia.mediaid;
			tracker.updateVideoId();

			if (prerollPositionReached) {
				return;
			}

			correlator = Math.round(Math.random() * 10000000000);
			depth += 1;
			slot.setConfigProperty('audio', !player.getMute());
			slot.setConfigProperty('videoDepth', depth);

			if (shouldPlayPreroll(depth)) {
				tracker.adProduct = `${adProduct}-preroll`;
				/**
				 * Fill in slot handle
				 * @returns {void}
				 */
				const fillInSlot = () => {
					player.playAd(getVastUrl(slot, 'preroll', depth, correlator, targeting));
				};


				if (slotName === 'featured') {
					fillInSlot();
				} else {
					btfBlockerService.push(slot, fillInSlot);
				}
			}

			prerollPositionReached = true;
		});

		player.on('videoMidPoint', () => {
			if (shouldPlayMidroll(depth)) {
				tracker.adProduct = `${adProduct}-midroll`;
				slot.setConfigProperty('audio', !player.getMute());
				player.playAd(getVastUrl(slot, 'midroll', depth, correlator, targeting));
			}
		});

		player.on('beforeComplete', () => {
			if (shouldPlayPostroll(depth)) {
				tracker.adProduct = `${adProduct}-postroll`;
				slot.setConfigProperty('audio', !player.getMute());
				player.playAd(getVastUrl(slot, 'postroll', depth, correlator, targeting));
			}
		});

		player.on('complete', () => {
			prerollPositionReached = false;
			tracker.adProduct = adProduct;
		});

		player.on('adRequest', (event) => {
			const vastParams = vastParser.parse(event.tag, {
				imaAd: event.ima && event.ima.ad,
			});

			vastDebugger.setVastAttributesFromVastParams(videoContainer, 'success', vastParams);

			// TODO: set slot status so it's tracked to adengadinfo
			// Currently it isn't working:
			// slotTracker.onRenderEnded(
			// 		slot,
			// 		{
			// 			timestamp: Date.now(),
			// 			line_item_id: vastParams.lineItemId,
			// 			creative_id: vastParams.creativeId,
			// 			creative_size: vastParams.size,
			// 			status: 'success',
			// 			page_width: videoContainer.clientWidth,
			// 			viewport_height: videoContainer.scrollTop,
			// 		},
			// );
		});

		player.on('adError', (event) => {
			vastDebugger.setVastAttributes(videoContainer, event.tag, 'error', event.ima && event.ima.ad);

			// TODO: set slot status so it's tracked to adengadinfo
			// Currently it isn't working:
			// slotTracker.onRenderEnded(
			// 		slot,
			// 		{
			// 			timestamp: Date.now(),
			// 			status: 'error',
			// 			page_width: videoContainer.clientWidth,
			// 			viewport_height: videoContainer.scrollTop,
			// 		},
			// );
		});

		tracker.register(player);
	}

	const slotName = options.featured ? 'featured' : 'video';
	const slot = slotService.get(slotName) || new AdSlot({ id: slotName });

	if (!slotService.get(slotName)) {
		slotService.add(slot);
	}

	const tracker = new JWPlayerTracker({
		adProduct: slot.config.trackingKey,
		audio: options.audio,
		ctp: !options.autoplay,
		slotName,
		videoId: options.videoId
	});

	return {
		register
	};
}

function loadMoatPlugin() {
	utils.scriptLoader.loadScript(context.get('options.video.moatTracking.jwplayerPluginUrl'));
}

export const jwplayerAdsFactory = {
	create,
	loadMoatPlugin
};

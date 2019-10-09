import {
	AdSlot,
	bidders,
	context,
	DelayModule,
	events,
	eventService,
	jwplayerAdsFactory,
	playerEvents,
	utils,
} from '@wikia/ad-engine';
// tslint:disable-next-line:no-submodule-imports
import 'jwplayer-fandom/dist/wikiajwplayer.js';
import adContext from '../../context';
import '../../styles.scss';
import * as videoData from './video-data.json';

const f15sVideoId = utils.queryString.get('f15s');

context.extend(adContext);
context.set('targeting.artid', utils.queryString.get('force-ad-error') === '1' ? 528 : 355);
context.set('targeting.skin', 'oasis');
context.set('targeting.topics', ['foo', 'bar', 'test']);
context.set('custom.device', utils.client.getDeviceType());
context.set('custom.adLayout', 'article');
context.set('options.tracking.kikimora.player', true);
context.set('bidders.prebid.enabled', !!utils.queryString.get('wikia_video_adapter'));
context.set('options.video.isMidrollEnabled', utils.queryString.get('midroll') === '1');
context.set('options.video.isPostrollEnabled', utils.queryString.get('postroll') === '1');
context.set(
	'options.video.adsOnNextVideoFrequency',
	parseInt(utils.queryString.get('capping'), 10) || 3,
);

if (f15sVideoId) {
	context.set('options.featuredVideo15sEnabled', true);
	context.set(`options.featuredVideo15sMap.${f15sVideoId}`, 5.0);
}

eventService.on(playerEvents.VIDEO_PLAYER_TRACKING_EVENT, (eventInfo) => {
	const request = new window.XMLHttpRequest();
	const queryUrl = Object.keys(eventInfo)
		.map((key) => `${key}=${eventInfo[key]}`)
		.join('&');

	request.open('GET', `http://example.com?${queryUrl}`);
	request.send();
});

eventService.on(events.AD_SLOT_CREATED, (slot) => {
	bidders.updateSlotTargeting(slot.getSlotName());
});

let resolveBidders;

const biddersDelay: DelayModule = {
	isEnabled: () => true,
	getName: () => 'bidders-delay',
	getPromise: () =>
		new Promise((resolve) => {
			resolveBidders = resolve;
		}),
};

context.set('options.maxDelayTimeout', 1000);
context.push('delayModules', biddersDelay);

bidders.requestBids({
	responseListener: () => {
		if (bidders.hasAllResponses()) {
			if (resolveBidders) {
				resolveBidders();
				resolveBidders = null;
			}
		}
	},
});

biddersDelay.getPromise().then(() => {
	const playlist = [videoData];
	const playerOptions = {
		autoplay: utils.queryString.get('autoplay') !== '0',
		mute: utils.queryString.get('mute') !== '0',
		settings: {
			showAutoplayToggle: false,
			showQuality: true,
		},
		videoDetails: {
			description: playlist[0].description,
			title: playlist[0].title,
			playlist,
		},
		related: {
			autoplay: true,
			playlistId: 'MGBx1cJh',
			time: 3,
		},
	};
	const videoAds = jwplayerAdsFactory.create({
		adProduct: 'featured-video',
		audio: !playerOptions.mute,
		autoplay: playerOptions.autoplay,
		featured: true,
		slotName: 'featured',
		videoId: videoData.mediaid,
	});

	window.wikiaJWPlayer('playerContainer', playerOptions, (player) => {
		videoAds.register(player);
	});

	jwplayerAdsFactory.loadMoatPlugin();
});

eventService.on(AdSlot.SLOT_STATUS_CHANGED, (adSlot) => {
	console.log(`⛳ ${adSlot.getSlotName()}: %c${adSlot.getStatus()}`, 'font-weight: bold');
});

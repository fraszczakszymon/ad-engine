import { AdSlot, buildVastUrl, context, events, slotService, utils } from '@wikia/ad-engine';
import { JWPlayerTracker } from '@wikia/ad-products';
import 'jwplayer-fandom/dist/wikiajwplayer.js';

import adContext from '../../context';
import video from './video';

import '../../styles.scss';

context.extend(adContext);
context.set('targeting.artid', 355);
context.set('targeting.skin', 'oasis');
context.set('custom.device', utils.client.getDeviceType());
context.set('custom.adLayout', 'article');

slotService.add(new AdSlot({ id: 'featured' }));

events.on(events.VIDEO_PLAYER_TRACKING_EVENT, (eventInfo) => {
	const request = new window.XMLHttpRequest();
	const queryUrl = Object.keys(eventInfo).map(key => `${key}=${eventInfo[key]}`).join('&');

	request.open('GET', `http://example.com?${queryUrl}`);
	request.send();
});

context.set('options.tracking.kikimora.player', true);

const playlist = [video];
const playerOptions = {
	autoplay: true,
	mute: true,
	settings: {
		showAutoplayToggle: false,
		showQuality: true
	},
	videoDetails: {
		description: playlist[0].description,
		title: playlist[0].title,
		playlist
	},
	related: {
		autoplay: true,
		playlistId: 'Y2RWCKuS',
		time: 3
	}
};
const tracker = new JWPlayerTracker({
	adProduct: 'featured-video',
	audio: !playerOptions.mute,
	ctp: !playerOptions.autoplay,
	slotName: 'featured'
});

window.wikiaJWPlayer('playerContainer', playerOptions, (player) => {
	player.on('beforePlay', () => {
		player.playAd(buildVastUrl(640 / 360, 'featured'));
	});

	tracker.register(player);
});

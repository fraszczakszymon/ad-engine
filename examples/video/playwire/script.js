'use strict';

import Context from 'ad-engine/services/context-service';
import Playwire from 'ad-engine/video/playwire';

const configUrl = Playwire.getConfigUrl(1004220, 4843893),
	container = document.getElementById('player');

Context.set('vast.adUnitId', '/5441/VIDEO_ATG');
Context.set('targeting.artid', 217);
Context.set('targeting.s1', '_project43');

Playwire.inject({
	configUrl,
	container,
	onReady: (Bolt, playerId) => {
		container.addEventListener('mouseenter', function () {
			Bolt.unmuteMedia(playerId);
		});
		container.addEventListener('mouseleave', function () {
			Bolt.muteMedia(playerId);
		});
		Bolt.on(playerId, Bolt.BOLT_AD_STARTED, function () {
			Bolt.muteMedia(playerId);
		});
		Bolt.on(playerId, Bolt.BOLT_CONTENT_STARTED, function () {
			Bolt.removeVideo(playerId, true);
		});
	}
});

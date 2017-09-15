import Context from 'ad-engine/services/context-service';
import Playwire from 'ad-engine/video/player/playwire/playwire';

const configUrl = Playwire.getConfigUrl(1004220, 4843893),
	container = document.getElementById('player'),
	params = {
		configUrl,
		container,
		width: 640,
		height: 480,
		slotName: 'TEST_SLOT',
		onReady: (Bolt, playerId) => {
			container.addEventListener('mouseenter', () => {
				Bolt.unmuteMedia(playerId);
			});
			container.addEventListener('mouseleave', () => {
				Bolt.muteMedia(playerId);
			});
			Bolt.on(playerId, Bolt.BOLT_AD_STARTED, () => {
				Bolt.muteMedia(playerId);
			});
			Bolt.on(playerId, Bolt.BOLT_CONTENT_STARTED, () => {
				Bolt.removeVideo(playerId, true);
			});
		}
	};

Context.set('vast.adUnitId', '/5441/wka.life/_project43//article/{src}/{pos}');
Context.set('targeting.artid', 217);
Context.set('targeting.s1', '_project43');

Playwire.inject(params);

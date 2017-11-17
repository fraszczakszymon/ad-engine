import AdSlot from 'ad-engine/models/ad-slot';
import Context from 'ad-engine/services/context-service';
import Porvata from 'ad-engine/video/player/porvata/porvata';
import ScrollListener from 'ad-engine/listeners/scroll-listener';
import SlotService from 'ad-engine/services/slot-service';
import adContext from '../../context';

const container = document.getElementById('player'),
	params = {
		autoPlay: true,
		container,
		width: 300,
		height: 250,
		slotName: 'VIDEO'
	};

Context.extend(adContext);
Context.set('targeting.artid', 292);
Context.set('targeting.vertical', 'games');
Context.set('custom.device', 'desktop');
Context.set('custom.adLayout', 'fv-article');

SlotService.add(new AdSlot({ id: 'gpt-top-video' }));

ScrollListener.init();
Porvata.inject(params)
	.then((video) => {
		const player = document.querySelector('.video-player');

		video.addEventListener('loaded', () => {
			player.classList.remove('hide');
		});
		video.addEventListener('wikiaAdCompleted', () => {
			player.classList.add('hide');
			video.reload();
		});
		container.addEventListener('click', () => {
			video.play();
		});
	});

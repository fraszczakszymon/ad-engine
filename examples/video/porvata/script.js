import {
	AdSlot,
	slotService,
	context,
	scrollListener,
	Porvata,
	utils
} from '@wikia/ad-engine';
import adContext from '../../context';

const container = document.getElementById('player'),
	params = {
		adProduct: 'test-video',
		autoPlay: true,
		container,
		width: 300,
		height: 250,
		slotName: 'OUTSTREAM'
	};

context.extend(adContext);
context.set('targeting.artid', 292);
context.set('targeting.vertical', 'games');
context.set('custom.device', utils.client.getDeviceType());
context.set('custom.adLayout', 'article');

slotService.add(new AdSlot({ id: 'gpt-top-video' }));

scrollListener.init();
Porvata.inject(params)
	.then((_video) => {
		const player = document.querySelector('.video-player');

		_video.addEventListener('loaded', () => {
			player.classList.remove('hide');
		});
		_video.addEventListener('wikiaAdCompleted', () => {
			player.classList.add('hide');
			_video.reload();
		});
		container.addEventListener('click', () => {
			_video.play();
		});
	});

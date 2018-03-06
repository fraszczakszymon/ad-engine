import {
	AdSlot,
	slotService,
	context,
	scrollListener,
	Porvata,
	utils
} from '@wikia/ad-engine';
import adContext from '../../context';

const blockOutOfViewportPausing = utils.queryString.get('block_pausing') === '1',
	container = document.getElementById('player'),
	params = {
		adProduct: 'test-video',
		autoPlay: utils.queryString.get('autoplay') !== '0',
		blockOutOfViewportPausing,
		container,
		width: 300,
		height: 250,
		slotName: 'OUTSTREAM'
	},
	playerCloseButton = document.getElementById('player-close'),
	playerMuteButton = document.getElementById('player-mute'),
	playerResumePlayButton = document.getElementById('player-play-pause'),
	playerUnmuteButton = document.getElementById('player-unmute');

if (blockOutOfViewportPausing) {
	console.warn('🎬 Block out of viewport pausing enabled');
}

context.extend(adContext);
context.set('targeting.artid', 292);
context.set('targeting.vertical', 'games');
context.set('targeting.wpage', '100% Orange Juice');
context.set('custom.device', utils.client.getDeviceType());
context.set('custom.adLayout', 'article');

slotService.add(new AdSlot({ id: 'gpt-top-video' }));

scrollListener.init();
Porvata.inject(params)
	.then((_video) => {
		const player = document.querySelector('.video-player');

		_video.addEventListener('loaded', () => {
			player.classList.remove('hide');
			document.querySelector('.controls').classList.remove('hide');
			if (_video.params.autoPlay) {
				playerMuteButton.classList.add('hide');
				playerUnmuteButton.classList.remove('hide');
			} else {
				playerMuteButton.classList.remove('hide');
				playerUnmuteButton.classList.add('hide');
			}
		});
		_video.addEventListener('wikiaAdCompleted', () => {
			player.classList.add('hide');
			document.querySelector('.controls').classList.add('hide');
			_video.reload();
		});
		container.addEventListener('click', () => {
			_video.play();
		});
		playerCloseButton.addEventListener('click', () => {
			_video.stop();
		});
		playerUnmuteButton.addEventListener('click', () => {
			_video.unmute();
			playerMuteButton.classList.remove('hide');
			playerUnmuteButton.classList.add('hide');
		});
		playerMuteButton.addEventListener('click', () => {
			_video.mute();
			playerMuteButton.classList.add('hide');
			playerUnmuteButton.classList.remove('hide');
		});
		playerResumePlayButton.addEventListener('click', () => {
			if (_video.isPlaying()) {
				_video.pause();
			} else {
				_video.resume();
			}
		});

		window._video = _video;
	});

import GoogleIma from './ima/google-ima';
import ViewportObserver from '../../../utils/viewport-observer';

function prepareVideoAdContainer(videoAdContainer) {
	videoAdContainer.style.position = 'relative';
	videoAdContainer.classList.add('video-player', 'hide');

	return videoAdContainer;
}

export class PorvataPlayer {
	constructor(ima, params) {
		this.ima = ima;
		this.container = prepareVideoAdContainer(params.container.querySelector('div'));
		this.mobileVideoAd = params.container.querySelector('video');
		this.params = params;

		this.width = params.width;
		this.height = params.height;
	}

	addEventListener(eventName, callback) {
		this.ima.addEventListener(eventName, callback);
	}

	getRemainingTime() {
		return this.ima.getAdsManager().getRemainingTime();
	}

	isMuted() {
		return this.ima.getAdsManager().getVolume() === 0;
	}

	isPaused() {
		return this.ima.getStatus() === 'paused';
	}

	pause() {
		this.ima.getAdsManager().pause();
	}

	play(newWidth, newHeight) {
		if (newWidth !== undefined && newHeight !== undefined) {
			this.width = newWidth;
			this.height = newHeight;
		}
		if (!this.width || !this.height) {
			this.width = this.params.container.offsetWidth;
			this.height = this.params.container.offsetHeight;
		}

		this.ima.playVideo(this.width, this.height);
	}

	reload() {
		this.ima.reload();
	}

	resize(newWidth, newHeight) {
		this.width = newWidth;
		this.height = newHeight;

		this.ima.resize(this.width, this.height);
	}

	resume() {
		this.ima.getAdsManager().resume();
	}

	setVolume(volume) {
		if (this.mobileVideoAd) {
			this.mobileVideoAd.muted = volume === 0;
		}
		return this.ima.getAdsManager().setVolume(volume);
	}

	stop() {
		this.ima.getAdsManager().stop();
	}
}

export default class Porvata {
	static inject(params) {
		let autoPaused = false,
			autoPlayed = false,
			viewportListenerId;

		params.vastTargeting = params.vastTargeting || {
			src: params.src,
			pos: params.slotName,
			passback: 'porvata'
		};

		return GoogleIma.load()
			.then(() => GoogleIma.getPlayer(params))
			.then(ima => new PorvataPlayer(ima, params))
			.then((video) => {
				function inViewportCallback(isVisible) {
					// Play video automatically only for the first time
					if (isVisible && !autoPlayed && params.autoPlay) {
						video.play();
						autoPlayed = true;
						// Don't resume when video was paused manually
					} else if (isVisible && autoPaused) {
						video.resume();
						// Pause video once it's out of viewport and set autoPaused to distinguish manual and auto pause
					} else if (!isVisible && !video.isPaused()) {
						video.pause();
						autoPaused = true;
					}
				}

				video.addEventListener('adCanPlay', () => {
					video.ima.getAdsManager().dispatchEvent('wikiaAdStarted');
				});
				video.addEventListener('allAdsCompleted', () => {
					video.ima.getAdsManager().dispatchEvent('wikiaAdCompleted');
					video.ima.setAutoPlay(false);
					if (viewportListenerId) {
						ViewportObserver.removeListener(viewportListenerId);
					}
				});
				video.addEventListener('start', () => {
					video.ima.getAdsManager().dispatchEvent('wikiaAdPlay');
				});
				video.addEventListener('resume', () => {
					video.ima.getAdsManager().dispatchEvent('wikiaAdPlay');
					autoPaused = false;
				});
				video.addEventListener('pause', () => {
					video.ima.getAdsManager().dispatchEvent('wikiaAdPause');
				});

				if (params.onReady) {
					params.onReady(video);
				}

				viewportListenerId = ViewportObserver.addListener(params.container, inViewportCallback, {
					offsetTop: params.viewportOffsetTop || 0,
					offsetBottom: params.viewportOffsetBottom || 0
				});

				return video;
			});
	}
}

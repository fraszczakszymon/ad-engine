import GoogleIma from './ima/google-ima';
import VideoSettings from './video-settings';
import ViewportObserver from '../../../utils/viewport-observer';

const VIDEO_FULLSCREEN_CLASS_NAME = 'video-player-fullscreen';
const STOP_SCROLLING_CLASS_NAME = 'stop-scrolling';

const prepareVideoAdContainer = (params) => {
	const videoAdContainer = params.container.querySelector('div');

	videoAdContainer.classList.add('video-player');
	videoAdContainer.classList.add('hide');

	return videoAdContainer;
};

const nativeFullscreenOnElement = element => ({
	enter() {
		if ('webkitRequestFullscreen' in element) {
			element.webkitRequestFullscreen();
		} else {
			element.requestFullscreen();
		}
	},
	exit() {
		if ('webkitExitFullscreen' in document) {
			document.webkitExitFullscreen();
		} else {
			document.exitFullscreen();
		}
	}
});

export class PorvataPlayer {
	constructor(ima, params) {
		this.ima = ima;
		this.container = prepareVideoAdContainer(params);
		this.mobileVideoAd = params.container.querySelector('video');
		this.params = params;

		this.fullscreen = Boolean(params.isFullscreen);
		this.nativeFullscreen = nativeFullscreenOnElement(this.container);
		this.width = params.width;
		this.height = params.height;
	}

	addEventListener(eventName, callback) {
		this.ima.addEventListener(eventName, callback);
	}

	getRemainingTime() {
		return this.ima.getAdsManager().getRemainingTime();
	}

	isFullscreen() {
		return this.fullscreen;
	}

	isMuted() {
		return this.ima.getAdsManager().getVolume() === 0;
	}

	isMobilePlayerMuted() {
		const mobileVideoAd = this.container.querySelector('video');
		return mobileVideoAd && mobileVideoAd.autoplay && mobileVideoAd.muted;
	}

	isPaused() {
		return this.ima.getStatus() === 'paused';
	}

	isPlaying() {
		return this.ima.getStatus() === 'playing';
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
		if (isFinite(newWidth) && isFinite(newHeight)) {
			this.width = newWidth;
			this.height = newHeight;
		}

		if (this.isFullscreen()) {
			this.ima.resize(window.innerWidth, window.innerHeight, true);
		} else {
			this.ima.resize(this.width, this.height, false);
		}
	}

	resume() {
		this.ima.getAdsManager().resume();
	}

	setVolume(volume) {
		this.updateVideoDOMElement(volume);
		this.ima.getAdsManager().setVolume(volume);

		// This is hack for Safari, because it can't dispatch original IMA event (volumeChange)
		this.ima.dispatchEvent('wikiaVolumeChange');
	}

	toggleFullscreen() {
		this.fullscreen = !this.fullscreen;

		if (this.isFullscreen()) {
			this.nativeFullscreen.enter();
			this.container.classList.add(VIDEO_FULLSCREEN_CLASS_NAME);
			document.documentElement.classList.add(STOP_SCROLLING_CLASS_NAME);
		} else {
			this.nativeFullscreen.exit();
			this.container.classList.remove(VIDEO_FULLSCREEN_CLASS_NAME);
			document.documentElement.classList.remove(STOP_SCROLLING_CLASS_NAME);
		}

		this.resize();
	}

	updateVideoDOMElement(volume) {
		if (this.mobileVideoAd) {
			this.mobileVideoAd.muted = volume === 0;
		}
	}

	mute() {
		this.setVolume(0);
	}

	unmute() {
		this.setVolume(0.75);
	}

	volumeToggle() {
		if (this.isMuted()) {
			this.unmute();
		} else {
			this.mute();
		}
	}

	stop() {
		this.ima.getAdsManager().stop();
	}
}

export default class Porvata {

	/**
	 * @private
	 * @returns listener id
	 */
	static addOnViewportChangeListener(params, listener) {
		return ViewportObserver.addListener(params.container, listener, {
			offsetTop: params.viewportOffsetTop || 0,
			offsetBottom: params.viewportOffsetBottom || 0
		});
	}

	static inject(params) {
		let isFirstPlay = true,
			autoPaused = false,
			autoPlayed = false,
			viewportListenerId = null;

		function muteFirstPlay(video) {
			video.addEventListener('loaded', () => {
				if (isFirstPlay) {
					video.mute();
				}
			});
		}

		params.vastTargeting = params.vastTargeting || {
			passback: 'porvata'
		};

		const videoSettings = new VideoSettings(params);

		return GoogleIma.load()
			.then(() => GoogleIma.getPlayer(videoSettings))
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
					} else if (!isVisible && video.isPlaying()) {
						video.pause();
						autoPaused = true;
					}
				}

				video.addEventListener('adCanPlay', () => {
					video.ima.dispatchEvent('wikiaAdStarted');
				});
				video.addEventListener('allAdsCompleted', () => {
					video.ima.setAutoPlay(false);
					video.ima.dispatchEvent('wikiaAdCompleted');
					if (viewportListenerId) {
						ViewportObserver.removeListener(viewportListenerId);
						viewportListenerId = null;
					}
					isFirstPlay = false;
				});
				video.addEventListener('start', () => {
					video.ima.dispatchEvent('wikiaAdPlay');
					if (!viewportListenerId) {
						viewportListenerId = Porvata.addOnViewportChangeListener(params, inViewportCallback);
					}
				});
				video.addEventListener('resume', () => {
					video.ima.dispatchEvent('wikiaAdPlay');
					autoPaused = false;
				});
				video.addEventListener('pause', () => {
					video.ima.dispatchEvent('wikiaAdPause');
				});

				if (params.autoPlay) {
					muteFirstPlay(video);
				}

				if (params.onReady) {
					params.onReady(video);
				}

				video.addEventListener('wikiaAdsManagerLoaded', () => {
					viewportListenerId = Porvata.addOnViewportChangeListener(params, inViewportCallback);
				});

				return video;
			});
	}
}

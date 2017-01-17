import GoogleIma from './google-ima';
import PorvataPlayerFactory from './porvata-player-factory';
import ViewportObserver from '../../../utils/viewport-observer';

function inject(params) {
	let autoPlayed = false,
		shouldResume = false,
		viewportListenerId;

	params.vastTargeting = params.vastTargeting || {
		src: params.src,
		pos: params.slotName,
		passback: 'porvata'
	};

	return GoogleIma.load()
		.then(() => GoogleIma.getPlayer(params))
		.then((ima) => {
			PorvataPlayerFactory.create(params, ima);
		})
		.then((video) => {
			// TODO Implement viewportObserver
			function inViewportCallback(isVisible) {
				// Play video automatically only for the first time
				if (isVisible && !autoPlayed && params.autoPlay) {
					video.play();
					autoPlayed = true;
					// Don't resume when video was paused manually
				} else if (isVisible && shouldResume) {
					video.resume();
					// Pause video once it's out of viewport and set shouldResume to distinguish manual and auto pause
				} else if (!isVisible && !video.isPaused()) {
					video.pause();
					shouldResume = true;
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
				shouldResume = false;
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

export default {
	inject
};

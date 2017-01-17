function prepareVideoAdContainer(videoAdContainer) {
	videoAdContainer.style.position = 'relative';
	videoAdContainer.classList.add('video-player', 'hide');

	return videoAdContainer;
}

function create(params, ima) {
	let width = params.width,
		height = params.height,
		mobileVideoAd = params.container.querySelector('video'),
		videoAdContainer = params.container.querySelector('div');

	return {
		container: prepareVideoAdContainer(videoAdContainer),
		ima: ima,
		addEventListener: (eventName, callback) => {
			ima.addEventListener(eventName, callback);
		},
		getRemainingTime: () => {
			return ima.getAdsManager().getRemainingTime();
		},
		isMuted: () => {
			return ima.getAdsManager().getVolume() === 0;
		},
		isPaused: () => {
			return ima.getStatus() === 'paused';
		},
		pause: () => {
			ima.getAdsManager().pause();
		},
		play: (newWidth, newHeight) => {
			if (newWidth !== undefined && newHeight !== undefined) {
				width = newWidth;
				height = newHeight;
			}
			if (!width || !height) {
				width = params.container.offsetWidth;
				height = params.container.offsetHeight;
			}

			ima.playVideo(width, height);
		},
		reload: () => {
			ima.reload();
		},
		resize: (newWidth, newHeight) => {
			width = newWidth;
			height = newHeight;

			ima.resize(width, height);
		},
		resume: () => {
			ima.getAdsManager().resume();
		},
		setVolume: (volume) => {
			if (mobileVideoAd) {
				mobileVideoAd.muted = volume === 0;
			}
			return ima.getAdsManager().setVolume(volume);
		},
		stop: () => {
			ima.getAdsManager().stop();
		}
	};
}

export default {
	create
}

import GoogleImaSetup from './google-ima-setup';

function create(adDisplayContainer, adsLoader, params) {
	const videoMock = document.createElement('video'),
		mobileVideoAd = params.container.querySelector('video');

	let isAdsManagerLoaded = false,
		status = '',
		adsManager;

	function adsManagerLoadedCallback(adsManagerLoadedEvent) {
		adsManager = adsManagerLoadedEvent.getAdsManager(videoMock, GoogleImaSetup.getRenderingSettings());
		isAdsManagerLoaded = true;
	}

	function addEventListener(eventName, callback) {
		if (isAdsManagerLoaded) {
			adsManager.addEventListener(eventName, callback);
		} else {
			adsLoader.addEventListener('adsManagerLoaded', () => {
				adsManager.addEventListener(eventName, callback);
			});
		}
	}

	function setAutoPlay(value) {
		// mobileVideoAd DOM element is present on mobile only
		if (mobileVideoAd) {
			mobileVideoAd.autoplay = value;
			mobileVideoAd.muted = value;
		}
	}

	function playVideo(width, height) {
		function callback() {
			// https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdDisplayContainer.initialize
			adDisplayContainer.initialize();
			adsManager.init(width, height, window.google.ima.ViewMode.NORMAL);
			adsManager.start();
			adsLoader.removeEventListener('adsManagerLoaded', callback);
		}

		if (isAdsManagerLoaded) {
			callback();
		} else {
			// When adsManager is not loaded yet video can't start without click on mobile
			// Muted auto play is workaround to run video on adsManagerLoaded event
			setAutoPlay(true);
			adsLoader.addEventListener('adsManagerLoaded', callback, false);
		}
	}

	function reload() {
		adsManager.destroy();
		adsLoader.contentComplete();
		adsLoader.requestAds(GoogleImaSetup.createRequest(params));
	}

	function resize(width, height) {
		if (adsManager) {
			adsManager.resize(width, height, window.google.ima.ViewMode.NORMAL);
		}
	}

	function dispatchEvent(eventName) {
		adsManager.dispatchEvent(eventName);
	}

	function setStatus(newStatus) {
		return function () {
			status = newStatus;
		};
	}

	function getStatus() {
		return status;
	}

	function getAdsManager() {
		return adsManager;
	}

	adsLoader.addEventListener('adsManagerLoaded', adsManagerLoadedCallback, false);
	adsLoader.requestAds(GoogleImaSetup.createRequest(params));
	if (params.autoPlay) {
		setAutoPlay(true);
	}

	addEventListener('resume', setStatus('playing'));
	addEventListener('start', setStatus('playing'));
	addEventListener('pause', setStatus('paused'));

	return {
		addEventListener,
		dispatchEvent,
		getAdsManager,
		getStatus,
		playVideo,
		reload,
		resize,
		setAutoPlay
	};
}

export default {
	create
};

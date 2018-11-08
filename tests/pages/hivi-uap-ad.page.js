import { timeouts } from '../common/timeouts';

class HiviUap {
	constructor() {
		this.pageLink = 'templates/hivi-uap/';
		this.videoPlayer = '.video-player';
		this.playerFullscreen = `${this.videoPlayer}.video-player-fullscreen`;
		this.playerFullscreenButton = `${this.videoPlayer} .toggle-fullscreen-button`;
		this.volumeButton = `${this.videoPlayer} .volume-button`;
		this.playPauseButton = `${this.videoPlayer} .play-pause-button`;
		this.topPlayerFrame = 'iframe[id="google_ads_iframe_/5441/wka.life/_project43//article/test/top_leaderboard_0"]';
		this.bottomPlayerFrame = 'iframe[id="google_ads_iframe_/5441/wka.life/_project43//article/test/bottom_leaderboard_0"]';
		this.replayOverlay = '.replay-overlay';
		this.buttonIsOnClass = '.is-on';
		this.closeLeaderboardButton = 'button';
		this.fullScreen = '.stop-scrolling';
		this.slotResult = 'data-slot-result';
		this.slotCollapsed = 'collapse';
		this.firstCall = '4466763538'; // applies only to top leaderboard
		this.secondCall = '4511050296'; // top and incontent boxad and bottom leaderboard
		this.videoLength = 45000;
		this.resolvedHeight = 192;
	}

	/**
	 * Waits for the video to finish playing.
	 */
	waitForVideoToFinish() {
		browser.pause(this.videoLength);
	}

	/**
	 * Takes slot size and its ratio and waits for the desired dimensions.
	 * @param adSlot Slot to take dimensions from
	 */
	waitForResolved(adSlot) {
		browser.waitUntil(() => browser.getElementSize(adSlot, 'height') === this.resolvedHeight,
			timeouts.standard,
			'Dimensions not changed',
			timeouts.interval);
	}
}

export default new HiviUap();

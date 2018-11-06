import helpers from '../common/helpers';
import { timeouts } from '../common/timeouts';

class HiviUap {
	constructor() {
		this.pageLink = 'templates/hivi-uap/';
		this.videoPlayer = '.video-player.video-player-right';
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
		this.topLineItemId = '4466763538'; // top leaderboard and top boxad share the same ID
		this.bottomLineItemId = '4511050296'; // bottom leaderboard and incontent boxad share the same ID
		this.videoLength = 45000;
	}

	/**
	 * Waits for the video to finish playing.
	 */
	waitForVideoToFinish() {
		browser.pause(this.videoLength);
	}

	/**
	 * Returns current slot size if it equals the one we desire based on ratio.
	 * @param adSlot slot to take dimensions from
	 * @param ratio desired slot ratio
	 * @returns {boolean}
	 */
	checkUapSize(adSlot, ratio) {
		return browser.getElementSize(adSlot) === helpers.checkUAPSizeSlotRatio(adSlot, ratio);
	}

	/**
	 * Takes slot size and its ratio and waits for the desired dimensions.
	 * @param adSlot Slot to take dimensions from
	 * @param ratio desired slot ratio
	 */
	waitForResolved(adSlot, ratio) {
		browser.waitUntil(() => this.checkUapSize(adSlot, ratio), timeouts.standard, 'Dimensions not changed', timeouts.interval);
	}
}

export default new HiviUap();

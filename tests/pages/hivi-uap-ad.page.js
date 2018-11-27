import helpers from '../common/helpers';
import { timeouts } from '../common/timeouts';

export class HiviUap {
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
		this.buttonIsOn = '.is-on';
		this.closeLeaderboardButton = 'button';
		this.fullScreen = '.stop-scrolling';
		this.firstCall = '4466763538'; // applies only to top leaderboard
		this.secondCall = '4511050296'; // top and incontent boxad and bottom leaderboard
		this.videoLength = 45000;
		this.qsDefaultState = 'resolved_state=0';
		this.qsResolvedState = 'resolved_state=1';
	}

	/**
	 * Waits for the video to finish playing.
	 */
	waitForVideoToFinish() {
		browser.pause(this.videoLength);
	}

	openUapWithState(resolved, url = browser.getUrl(), adSlot = null) {
		if (resolved) {
			browser.url(helpers.addParametersToUrl(url, [this.qsResolvedState]));
		} else {
			browser.url(helpers.addParametersToUrl(url, [this.qsDefaultState]));
		}
		if (adSlot) {
			browser.waitForVisible(adSlot, timeouts.standard);
		}
	}
}

export default new HiviUap();

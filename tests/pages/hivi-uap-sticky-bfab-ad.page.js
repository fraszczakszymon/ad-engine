class HiviUapStickyBfab {
	constructor() {
		this.pageLink = 'templates/hivi-uap-sticky-bfab/';
		this.videoPlayer = '.video-player.video-player-right';
		this.fullScreen = '.stop-scrolling';
		this.slotResult = 'data-slot-result';
		this.closeLeaderboardButton = 'button';
		this.bottomLineItemId = '4511050296'; // bottom leaderboard and incontent boxad share the same ID
		this.videoLength = 45000;
	}

	/**
	 * Waits for the video to finish playing.
	 */
	waitForVideoToFinish() {
		browser.pause(this.videoLength);
	}
}

export default new HiviUapStickyBfab();

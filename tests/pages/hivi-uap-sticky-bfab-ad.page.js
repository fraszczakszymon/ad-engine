class HiviUapStickyBfab {
	constructor() {
		this.pageLink = 'templates/hivi-uap-sticky-bfab/';
		this.videoPlayer = '.video-player.video-player-right';
		this.fullScreen = '.stop-scrolling';
		this.slotResult = 'data-slot-result';
		this.firstCall = '4466763538'; // applies only to top leaderboard
		this.secondCall = '4511050296'; // top and incontent boxad and bottom leaderboard
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

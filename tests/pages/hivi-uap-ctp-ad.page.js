class HiviUapCtp {
	constructor() {
		this.pageLink = 'templates/hivi-uap-ctp/';
		this.topPlayerFrame = 'iframe[id="google_ads_iframe_/5441/wka.life/_project43//article/test/top_leaderboard_0"]';
		this.bottomPlayerFrame = 'iframe[id="google_ads_iframe_/5441/wka.life/_project43//article/test/bottom_leaderboard_0"]';
		this.videoContainer = '#videoContainer';
		this.videoPlayer = '.video-player';
		this.playerFullscreen = `${this.videoPlayer}.video-player-fullscreen`;
		this.playerFullscreenButton = '.toggle-fullscreen-button';
		this.volumeButton = '.volume-button';
		this.playPauseButton = '.play-pause-button';
		this.closeLeaderboardButton = 'button';
		this.videoLength = 25000;
		this.firstCall = '4555494179'; // applies only to top leaderboard
		this.secondCall = '4555501605'; // top and incontent boxad and bottom leaderboard
	}

	/**
	 * Waits for the video to finish playing.
	 */
	waitForVideoToFinish() {
		browser.pause(this.videoLength);
	}
}

export default new HiviUapCtp();

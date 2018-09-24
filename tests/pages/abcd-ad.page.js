const timeToLoadMovie = 1000;

class AbcdAd {
	constructor() {
		this.pageLink = 'templates/abcd/';
		this.videoPlayer = '.video-player.video-player-right';
		this.unmuteButton = '.volume-button';
		this.buttonIsOnClass = '.is-on';
		this.topLeaderboardLineItemId = '4376117186';
		this.topBoxadLineItemId = '271491732';
	}

	/**
	 * Pauses actions so the movie can start playing before executing other actions.
	 */
	waitToStartPlaying() {
		browser.pause(timeToLoadMovie);
	}
}

export default new AbcdAd();

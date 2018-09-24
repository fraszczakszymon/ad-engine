const timeToLoadMovie = 2000;

class AbcdAd {
	constructor() {
		this.pageLink = 'templates/abcd/';
		this.videoPlayer = '.video-player.video-player-right';
		this.unmuteButton = '.volume-button';
		this.buttonIsOnClass = '.is-on';
		this.topLeaderboardLineItemId = '4376117186';
		this.topLeaderboardCreativeId = '138207566841';
		this.topBoxadLineItemId = '271491732';
		this.topBoxadCreativeId = '108391930812';
	}

	/**
	 * Pauses actions so the movie can start playing before executing other actions.
	 */
	waitToStartPlaying() {
		browser.pause(timeToLoadMovie);
	}
}

export default new AbcdAd();

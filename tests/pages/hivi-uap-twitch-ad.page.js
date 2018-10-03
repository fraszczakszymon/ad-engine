class TwitchAd {
	constructor() {
		this.pageLink = 'templates/hivi-uap-twitch/';
		// this.playerFrame = $('iframe[name="google_ads_iframe_/5441/wka.life/_project43//article/test/top_leaderboard_0"]').value;
		this.twitchPlayer = '#player';
		this.unmuteButton = '.player-button.player-button--volume.qa-control-volume';
		this.playPauseButton = '.player-button.qa-pause-play-button';
		this.topLeaderboardLineItemId = '4791224091';
		this.topBoxadLineItemId = '271491732';
		this.buttonPressedParam = 'data-whatclasses';
	}
}

export default new TwitchAd();

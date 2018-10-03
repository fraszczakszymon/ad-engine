class TwitchAd {
	constructor() {
		this.pageLink = 'templates/hivi-uap-twitch/';
		this.twitchPlayer = '#player';
		this.playerFrame = $('iframe[name="google_ads_iframe_/5441/wka.life/_project43//article/test/top_leaderboard_0"]').value;
		this.unmuteButton = '';
		this.playPauseButton = '';
		this.fullscreenButton = '';
		this.topLeaderboardLineItemId = '4791224091';
		this.topBoxadLineItemId = '271491732';
	}
}

export default new TwitchAd();

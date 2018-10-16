class TwitchAd {
	constructor() {
		this.pageLink = 'templates/hivi-uap-twitch/';
		this.playerFrame = 'iframe[id="google_ads_iframe_/5441/wka.life/_project43//article/test/top_leaderboard_0__container__"]';
		this.twitchPlayer = '#player';
		this.playerClass = 'twitch-player';
		this.topLeaderboardLineItemId = '4791224091';
		this.playPauseButton = '.qa-pause-play-button';
		this.unmuteButton = '.qa-control-volume';
		this.buttonPressedAttribute = 'data-whatclasses';
	}
}

export default new TwitchAd();

class TwitchAd {
	constructor() {
		this.pageLink = 'templates/hivi-uap-twitch/';
		this.twitchFrame = '#twitchPlayerContainer';
		this.twitchPlayer = '#player';
		this.playerClass = '.twitch-player';
		this.topLeaderboardLineItemId = '4791224091';
		this.playPauseButton = '.qa-pause-play-button';
		this.unmuteButton = '.qa-control-volume';
		this.twitchButton = '.qa-watch-twitch-button';
		this.buttonPressedAttribute = 'data-whatclasses';
		this.twitchWord = 'twitch';
		this.twitchLeaderboardRatio = 3.88;
	}
}

export default new TwitchAd();

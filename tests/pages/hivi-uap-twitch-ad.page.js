class TwitchAd {
	constructor() {
		this.pageLink = 'templates/hivi-uap-twitch/';
		this.twitchFrame = '#twitchPlayerContainer';
		this.twitchPlayer = '#player';
		this.playerClass = 'twitch-player';
		this.topLeaderboardLineItemId = '4791224091';
		this.playPauseButton = '.qa-pause-play-button';
		this.unmuteButton = '.qa-control-volume';
		this.buttonPressedAttribute = 'data-whatclasses';
	}
}

export default new TwitchAd();

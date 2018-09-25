class HiviUap {
	constructor() {
		this.pageLink = 'templates/hivi-uap/';
		this.videoPlayer = '.video-player.video-player-right';
		this.uiVisibleClass = 'ui-visible';
		this.playerFullscreenButton = '.toggle-fullscreen-button';
		this.volumeButton = '.volume-button';
		this.playPauseButton = '.play-pause-button';
		this.buttonIsOnClass = '.is-on';
		this.closeLeaderboardButton = 'button';
		this.fullScreen = '.stop-scrolling';
		this.slotResult = 'data-slot-result';
		this.slotCollapsed = 'collapse';
		this.topLineItemId = '4466763538'; // top leaderboard and top boxad share the same ID
		this.bottomLineItemId = '4511050296'; // bottom leaderboard and incontent boxad share the same ID
	}
}

export default new HiviUap();

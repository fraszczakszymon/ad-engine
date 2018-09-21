const timeForAction = 500;
const timeToLoadMovie = 2000;

class UapHivi {
	constructor() {
		this.pageLink = 'templates/hivi-uap/';
		this.pageBody = 'body';
		this.videoPlayer = '.video-player.video-player-right';
		this.classProperty = 'class';
		this.uiVisibleClass = 'ui-visible';
		this.playerFullscreenButton = '.toggle-fullscreen-button';
		this.volumeButton = '.volume-button';
		this.playPauseButton = '.play-pause-button';
		this.buttonIsOnClass = '.is-on';
		this.closeLeaderboardButton = 'button';
		this.fullScreen = '.stop-scrolling';
		this.slotResult = 'data-slot-result';
		this.slotCollapsed = 'collapse';
		this.topLeaderboardlineItemId = '4466763538';
		this.topLeaderboardcreativeId = '138219890299';
		this.topBoxadLineItemId = '4466763538';
		this.topBoxadCreativeId = '138218899722';
		this.incontentBoxadLineItemId = '4511050296';
		this.incontentBoxadCreativeId = '138218899722';
		this.bottomLeaderboardLineItemId = '4511050296';
		this.bottomLeaderboardCreativeId = '138218898006';
	}

	waitForAction() {
		browser.pause(timeForAction);
	}
	waitToStartPlaying() {
		browser.pause(timeToLoadMovie);
	}
}

export default new UapHivi();

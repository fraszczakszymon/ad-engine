const timeForAction = 500;
const timeToLoadMovie = 2000;

class UapHivi {
	constructor() {
		this.pageLink = 'templates/hivi-uap/';
		this.pageBody = 'body';
		this.videoPlayer = '.video-player.video-player-right';
		this.classProperty = 'class'; // TODO change the name of the variable
		this.uiVisibleClass = 'ui-visible';
		this.closeLeaderboardButton = 'button';
		this.slotResult = 'data-slot-result'; // TODO change variable name
		this.slotCollapsed = 'collapse';
	}

	waitForAction() {
		browser.pause(timeForAction);
	}
	waitToStartPlaying() {
		browser.pause(timeToLoadMovie);
	}
}

export default new UapHivi();

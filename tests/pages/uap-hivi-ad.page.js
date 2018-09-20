const unstickTime = 500;

class UapHivi {
	constructor() {
		this.pageLink = 'templates/hivi-uap/';
		this.pageBody = 'body';
		this.videoPlayer = '.video-player.video-player-right';
		this.uiVisibleClass = '.ui-visible';
		this.closeLeaderboardButton = '.button-control';
		this.slotResult = 'data-slot-result'; // TODO change variable name
		this.slotVisible = 'success';
		this.slotCollapsed = 'collapse';
		this.uapClass = 'class';
	}

	waitToUnstick() {
		browser.pause(unstickTime);
	}
}

export default new UapHivi();

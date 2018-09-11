class Porvata {
	constructor() {
		this.pageLink = 'video/porvata/';
		this.autoplayLink = 'autoplay';
		this.porvataPlayer = '#player';
		this.playerWidth = 300;
		this.playerHeight = 250;
		this.unmuteButton = '#player-unmute';
		this.fullscreenButton = '#player-fullscreen';
		this.closePlayerButton = '#player-close';
		this.stopScrolling = '.stop-scrolling';
		this.videoPlayerHidden = '.video-player.hide';
		this.iconHidden = '.icon.hide';
	}

	/**
	 * Pauses the test for 5 seconds (required for porvata toolbar tests to work)
	 */
	waitForVideoOverlay() {
		browser.pause(5000);
	}

	/**
	 * Returns autoplay on or off
	 * @param {boolean} autoplay - true/false
	 * @returns {string}
	 */
	turnAutoplay = (autoplay) => {
		if (autoplay) {
			return `${this.autoplayLink}=1`;
		}
		return `${this.autoplayLink}=0`;
	}
}

export default new Porvata();

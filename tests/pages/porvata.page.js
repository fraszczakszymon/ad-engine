class Porvata {
	constructor() {
		this.pageLink = 'video/porvata/';
		this.autoplayLink = 'autoplay';
		this.player = '#player';
		this.playerWidth = 300;
		this.playerHeight = 250;
		this.unmuteButton = '#player-unmute';
		this.fullscreenButton = '#player-fullscreen';
		this.closePlayerButton = '#player-close';
		this.fullscreenPlayer = '.video-player-fullscreen';
		this.videoPlayerHidden = '.video-player.hide';
		this.iconHidden = '.icon.hide';
		this.videoLength = 45000;
	}

	/**
	 * Waits for the video to finish playing.
	 */
	waitForVideoToFinish() {
		browser.pause(this.videoLength);
	}

	/**
	 * Provides query param with autoplay.
	 * @param {boolean} autoplay - sets autoplay to 1 if true
	 * @returns {string} link with correct parameter
	 */
	turnAutoplay = (autoplay) => {
		if (autoplay) {
			return `${this.autoplayLink}=1`;
		}
		return `${this.autoplayLink}=0`;
	};
}

export default new Porvata();

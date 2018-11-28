import { timeouts } from '../common/timeouts';

class JWPlayer {
	constructor() {
		this.pageLink = 'video/jwplayer/';
		this.player = '.featured-video';

		this.playButton = '.jw-icon-playback';
		this.soundToggle = '.jw-icon-volume';
		this.soundToggleOff = '.jw-off';
		this.soundToggleOn = '.jw-full';
		this.fullscreenButton = '.jw-icon-fullscreen';
		this.fullscreenPlayer = '.jw-flag-fullscreen';

		this.adLength = 30000;
		this.videoLength = 75000;
	}

	isAudioOn() {
		browser.waitForExist(this.player, timeouts.standard);
		if (browser.isExisting(`${this.soundToggle}${this.soundToggleOn}`)) {
			return true;
		}
		browser.waitForExist(`${this.soundToggle}${this.soundToggleOff}`, timeouts.standard);
		return false;
	}
}

export default new JWPlayer();

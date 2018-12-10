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
		this.videoIdle = '.jw-state-idle';
		this.playerAdContainer = '#playerContainer_googima';

		this.prerollDuration = 30000;
		this.midrollDuration = 30000;
		this.postrollDuration = 30000;
		this.f15nDuration = 15000;
		this.videoDuration = 75000;
		this.playerWidth = 628;
		this.playerHeight = 353;
	}

	isAudioOn() {
		browser.waitForExist(this.player, timeouts.standard);
		if (browser.isExisting(`${this.soundToggle}${this.soundToggleOn}`)) {
			return true;
		}
		browser.waitForExist(`${this.soundToggle}${this.soundToggleOff}`, timeouts.standard);
		return false;
	}

	isAdVisible() {
		browser.waitForExist(this.playerAdContainer, timeouts.standard);
		if (browser.getAttribute(this.playerAdContainer, 'style').includes('visibility: visible')) {
			return true;
		} else if (
			browser.getAttribute(this.playerAdContainer, 'style').includes('visibility: hidden')
		) {
			return false;
		}
		return undefined;
	}

	waitForAdToChangeState(shouldAdBeVisible) {
		browser.waitUntil(() => this.isAdVisible() === shouldAdBeVisible, timeouts.standard);
	}
}

export const jwPlayer = new JWPlayer();

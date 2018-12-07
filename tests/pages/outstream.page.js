class Outstream {
	constructor() {
		this.pageLink = 'templates/outstream/';
		this.player = '#player';
		this.playerWidth = 300;
		this.playerHeight = 250;
		this.unmuteButton = '#player-unmute';
		this.fullscreenButton = '#player-fullscreen';
		this.closePlayerButton = '#player-close';
		this.fullscreenPlayer = '.video-player-fullscreen';
		this.videoPlayerHidden = '.video-player.hide';
		this.iconHidden = '.icon.hide';
		this.videoDuration = 45000;
		this.pageLength = 3800;
	}
}

export const outstream = new Outstream();

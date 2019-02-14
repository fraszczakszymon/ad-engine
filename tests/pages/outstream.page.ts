class Outstream {
	constructor() {
		this.pageLink = 'templates/outstream/';
		this.player = '.porvata-outstream';
		this.floatingPlayer = '.outstream-floating';
		this.playerWidth = 300;
		this.playerHeight = 250;
		this.closePlayerButton = '#player-close';
		this.videoDuration = 45000;
		this.pageLength = 3800;
	}
}

export const outstream = new Outstream();

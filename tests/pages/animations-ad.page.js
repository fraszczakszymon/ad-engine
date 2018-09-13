class AnimationsAd {
	constructor() {
		this.pageLink = 'slots/animations/';
		this.topLeaderboard = '#top_leaderboard';
		this.topBoxad = '#top_boxad';
		this.topLeaderboardWidth = 728;
		this.topLeaderboardHeight = 90;
		this.topLeaderboardHeightHidden = 0;
		this.topBoxadWidth = 300;
		this.topBoxadHeight = 250;
		this.style = 'style';
		this.collapsedAdValue = 'max-height: 0px;';
	}

	/**
	 * Pauses everything so animation can finish its action.
	 */
	waitToScroll() {
		browser.pause(500);
	}
}

export default new AnimationsAd();

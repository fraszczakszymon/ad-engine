class AnimationsAd {
	constructor() {
		this.pageLink = 'slots/animations/';
		this.topLeaderboardHeightHidden = 0;
		this.topLeaderboardStyle = 'style';
		this.collapsedAdValue = 'max-height: 0px;';
		this.waitForAnimationsTime = 10000; // currently added only for animations ad, as top leaderboard hides after 6 seconds
	}

	/**
	 * Pauses everything so animation can finish its action.
	 */
	waitToScroll() {
		browser.pause(500);
	}
}

export default new AnimationsAd();

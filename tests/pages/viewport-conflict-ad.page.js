class ViewportConflictAd {
	constructor() {
		this.pageLink = 'slots/viewport-conflicts/';
		this.topLeaderboard = '#top_leaderboard';
		this.topBoxad = '#top_boxad';
		this.bottomLeaderboard = '#bottom_leaderboard';
		this.topLeaderboardWidth = 728;
		this.topLeaderboardHeight = 90;
		this.topBoxadWidth = 300;
		this.topBoxadHeight = 250;
		this.hideBoxadButton = '#hideTopBoxad';
		this.addParagraphButton = '#addParagraph';
		this.dataSlotResult = 'data-slot-result';
		this.maxNewParagraphs = 10;
	}

	/**
	 * Provides the parameter of paragraphs to add to the page.
	 * @param {number} paragraphs - number of paragraphs to load
	 */
	addParagraphs(paragraphs) {
		if (paragraphs > this.maxNewParagraphs) {
			paragraphs = this.maxNewParagraphs;
		}
		for (let i = 0; i < paragraphs; i += 1) {
			browser.click(this.addParagraphButton);
		}
	}
}

export default new ViewportConflictAd();

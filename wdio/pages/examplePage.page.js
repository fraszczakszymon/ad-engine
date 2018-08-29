class FloatingAd {
	get topLeaderboard() {
		return '#top_leaderboard';
	}

	returnSize(wantedElement) {
		const width = browser.element(wantedElement).getElementSize('width');
		const height = browser.element(wantedElement).getElementSize('height');
		return (`width: ${width} + height: ${height}`);
	}
}

export default new FloatingAd();

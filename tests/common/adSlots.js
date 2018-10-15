class AdSlots {
	constructor() {
		this.topLeaderboard = '#top_leaderboard';
		this.bottomLeaderboard = '#bottom_leaderboard';
		this.topBoxad = '#top_boxad';
		this.incontentBoxad = '#incontent_boxad';
		this.repeatableBoxad = '#repeatable_boxad_';
		this.railModule = '.rail-module';
		this.leaderboardWidth = 728; // shared between leaderboards; fixed value
		this.leaderboardHeight = 90; // shared between leaderboards; fixed value
		this.adProductsTopLeaderboardWidth = 1920; // UAP and ABCD leaderboards have the same width; scalable, will be removed
		this.uapTopLeaderboardHeight = 480;
		this.uapTopLeaderboardHeightResolved = 192;
		this.uapBottomLeaderboardWidth = 1024;
		this.uapBottomLeaderboardHeight = 102;
		this.boxadWidth = 300; // shared between boxads; fixed value
		this.boxadHeight = 250; // shared between boxads; fixed value
		this.railModuleWidth = 300;
		this.railModuleHeight = 600;
		this.lineItemIdAttribute = 'data-gpt-line-item-id';
		this.resultAttribute = 'data-slot-result';
		this.viewedAttribute = 'data-slot-viewed';
		this.adLoaded = 'success';
		this.adViewed = 'true';
		this.adCollapsed = 'collapse';
		this.inhouseLineItemId = '271491732';
	}
}

export default new AdSlots();

class Prebid {
	constructor() {
		this.pageLink = 'bidders/prebid/';

		this.availableSlots = {
			topLeaderboard: 'top_leaderboard',
			topBoxad: 'top_boxad',
			incontentBoxad: 'incontent_boxad',
			bottomLeaderboard: 'bottom_leaderboard',
		};
	}
}

export const prebid = new Prebid();

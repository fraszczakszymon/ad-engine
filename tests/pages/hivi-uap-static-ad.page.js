const timeForAction = 500;

class HiviUapStatic {
	constructor() {
		this.pageLink = 'templates/hivi-uap-static/';
		this.closeLeaderboardButton = 'button';
		this.slotResult = 'data-slot-result';
		this.slotCollapsed = 'collapse';
		this.topLeaderboardlineItemId = '4562423718';
		this.topLeaderboardcreativeId = '138223765886';
		this.topBoxadLineItemId = '4562423718';
		this.topBoxadCreativeId = '138223788340';
		this.incontentBoxadLineItemId = '4562425893';
		this.incontentBoxadCreativeId = '138223788340';
		this.bottomLeaderboardLineItemId = '4562425893';
		this.bottomLeaderboardCreativeId = '138223765886';
	}

	waitForAction() {
		browser.pause(timeForAction);
	}
}

export default new HiviUapStatic();

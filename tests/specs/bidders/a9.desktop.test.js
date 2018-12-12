import { expect } from 'chai';
import { asserts } from '../../common/asserts';
import { adSlots } from '../../common/ad-slots';
import { helpers } from '../../common/helpers';
import { a9 } from '../../pages/a9.page';
import { queryStrings } from '../../common/query-strings';

describe('A9', () => {
	it('Check if wikia adapter creative is not rendered when there are no bids', () => {
		browser.url(a9.pageLink);
		asserts.assertInhouseCampaign(adSlots.topLeaderboard);
	});

	it('Check if wikia adapter creative is rendered', () => {
		browser.url(a9.pageLink);
		helpers.navigateToUrl(a9.pageLink, queryStrings.getPrice(2000));
		asserts.assertWikiaAdapterCampaign(adSlots.topLeaderboard);
	});

	it('Check disabling top leaderboard', () => {
		browser.url(a9.pageLink);
		helpers.navigateToUrl(
			a9.pageLink,
			queryStrings.getTurnedOffSlots(a9.availableSlots.topLeaderboard),
		);
		expect(helpers.isLineItemExisting(adSlots.topLeaderboard)).to.be.false;
	});

	it('Check disabling top boxad', () => {
		browser.url(a9.pageLink);
		helpers.navigateToUrl(a9.pageLink, queryStrings.getTurnedOffSlots(a9.availableSlots.topBoxad));
		expect(helpers.isLineItemExisting(adSlots.topBoxad)).to.be.false;
	});

	it('Check if a9 bid is rendered', () => {
		browser.url(a9.pageLink);
		a9.enableA9Debug();
		asserts.assertAmazonCampaign(adSlots.topLeaderboard);
	});
});

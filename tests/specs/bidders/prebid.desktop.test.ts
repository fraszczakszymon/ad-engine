import { expect } from 'chai';
import { asserts } from '../../common/asserts';
import { adSlots } from '../../common/ad-slots';
import { helpers } from '../../common/helpers';
import { prebid } from '../../pages/prebid.page';
import { queryStrings } from '../../common/query-strings';

describe('Bidders: Prebid template', () => {
	it('Check if wikia adapter creative is not rendered when there are no bids', () => {
		browser.url(prebid.pageLink);
		asserts.assertInhouseCampaign(adSlots.topLeaderboard);
	});

	it('Check if wikia adapter creative is rendered', () => {
		helpers.navigateToUrl(prebid.pageLink, queryStrings.getPrice(2000));
		asserts.assertWikiaAdapterCampaign(adSlots.topLeaderboard);
	});

	it('Check disabling top leaderboard', () => {
		helpers.navigateToUrl(
			prebid.pageLink,
			queryStrings.getTurnedOffSlots(prebid.availableSlots.topLeaderboard),
		);
		expect(helpers.isLineItemExisting(adSlots.topLeaderboard)).to.be.false;
	});

	it('Check disabling top boxad', () => {
		helpers.navigateToUrl(
			prebid.pageLink,
			queryStrings.getTurnedOffSlots(prebid.availableSlots.topBoxad),
		);
		expect(helpers.isLineItemExisting(adSlots.topBoxad)).to.be.false;
	});
});

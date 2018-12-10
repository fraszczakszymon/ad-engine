import { expect } from 'chai';
import { asserts } from '../../common/asserts';
import { adSlots } from '../../common/ad-slots';
import { helpers } from '../../common/helpers';
import { prebid } from '../../pages/prebid.page';
import { queryStrings } from '../../common/query-strings';

describe('Prebid', () => {
	it('Check if wikia adapter creative is not rendered when there are no bids', () => {
		browser.url(prebid.pageLink);

		asserts.assertInhouseCampaign(adSlots.topLeaderboard);
	});

	it('Check if wikia adapter creative is rendered', () => {
		browser.url(prebid.pageLink);
		helpers.navigateToUrl(prebid.pageLink, queryStrings.getPrice(2000));
		asserts.assertWikiaAdapterCampaign(adSlots.topLeaderboard);
	});

	it('Check disabling top leaderboard', () => {
		browser.url(prebid.pageLink);
		helpers.navigateToUrl(prebid.pageLink, queryStrings.getTurnedOffSlots(prebid.availableSlots.topLeaderboard));
		expect(helpers.isLineItemExisitng(adSlots.topLeaderboard)).to.be.false;
	});

	it('Check disabling top boxad', () => {
		browser.url(prebid.pageLink);
		helpers.navigateToUrl(prebid.pageLink, queryStrings.getTurnedOffSlots(prebid.availableSlots.topBoxad));
		expect(helpers.isLineItemExisitng(adSlots.topBoxad)).to.be.false;
	});
});

import { expect } from 'chai';
import { outstream } from '../../../pages/outstream.page';
import { adSlots } from '../../../common/ad-slots';
import { timeouts } from '../../../common/timeouts';
import { helpers } from '../../../common/helpers';
import { queryStrings } from '../../../common/query-strings';

describe('Outstream ads', () => {
	let adStatus;

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if video is visible in viewport', () => {
		browser.url(outstream.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		helpers.waitForViewabillityCounted();
		helpers.slowScroll(outstream.pageLength);
		adStatus = adSlots.getSlotStatus(adSlots.incontentPlayer, true);
		expect(adStatus.inViewport, 'Not in viewport').to.be.true;
	});

	it('Check if video is visible is floating', () => {
		browser.url(outstream.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		helpers.waitForViewabillityCounted();
		helpers.slowScroll(outstream.pageLength);
		adStatus = adSlots.getSlotStatus(adSlots.incontentPlayer, true);
		expect(adStatus.inViewport, 'Not in viewport').to.be.true;
		helpers.waitForViewabillityCounted();
		browser.scroll(0, 0).pause(timeouts.actions);
		expect(browser.isVisible(outstream.floatingPlayer)).to.be.true;
	});

	it('Check video with empty response', () => {
		helpers.navigateToUrl(outstream.pageLink, queryStrings.getEmptyResponse(true));
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		helpers.waitForViewabillityCounted();
		helpers.slowScroll(outstream.pageLength);
		adStatus = adSlots.getSlotStatus(adSlots.incontentPlayer, true);
		expect(adStatus.inViewport, 'Not in viewport').to.be.false;
	});
});

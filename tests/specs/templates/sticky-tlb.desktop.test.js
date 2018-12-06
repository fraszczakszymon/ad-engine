import { expect } from 'chai';
import { stickyTlb } from '../../pages/sticky-tlb.page';
import { adSlots } from '../../common/ad-slots';
import { timeouts } from '../../common/timeouts';
import { helpers } from '../../common/helpers';
import { queryStrings } from '../../common/query-strings';

describe('sticky-ad template', () => {
	beforeEach(() => {
		helpers.navigateToUrl(stickyTlb.pageLink, queryStrings.constructSingleGeoInstantGlobal('XX', 99));
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('should stick and unstick', () => {
		helpers.slowScroll(500);
		expect(stickyTlb.isAdSticked()).to.be.true;
		helpers.waitForViewabillityCounted(timeouts.unstickTime);
		helpers.slowScroll(1000);
		expect(stickyTlb.isAdSticked()).to.be.false;
	});

	it('should not stick if viewability is counted', () => {
		helpers.waitForViewabillityCounted(timeouts.unstickTime);
		helpers.slowScroll(500);
		expect(stickyTlb.isAdSticked()).to.be.false;
	});

	it('should unstick if close button is clicked', () => {
		helpers.slowScroll(200);
		expect(stickyTlb.isAdSticked()).to.be.true;
		browser.click(`${stickyTlb.classUnstickButton}`).pause(timeouts.actions);
		expect(stickyTlb.isAdSticked()).to.be.false;
	});
});


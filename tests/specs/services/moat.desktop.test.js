import { expect } from 'chai';
import { moat } from '../../pages/moat.page';
import { timeouts } from '../../common/timeouts';
import { helpers } from '../../common/helpers';
import { queryStrings } from '../../common/query-strings';
import { adSlots } from '../../common/ad-slots';

describe('It will test krux page', () => {
	it('will test if cached value is stored', () => {
		browser.url(moat.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		expect(moat.getPageLevelParams()).to.equal('{"m_safety":"safe","m_categories":["moat_safe"],"m_data":"0"}');
	});

	it('will test disabled moat', () => {
		helpers.navigateToUrl(moat.pageLink, queryStrings.getMoat(false));
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		helpers.waitForViewabillityCounted();
		expect(moat.getPageLevelParams()).to.include('Waiting');
	});

	it('will test delayed moat', () => {
		helpers.navigateToUrl(moat.pageLink, queryStrings.getAdEngineDelay(1000));
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		helpers.waitForViewabillityCounted();
		expect(moat.getPageLevelParams()).to.equal('{"m_safety":"safe","m_categories":["moat_safe"],"m_data":"0"}');
	});
});

import floatingAdPage from '../pages/floatingAd.page'
import helpers from '../common/helpers'

const { expect } = require('chai');
const timeout = 5000;

describe('It will test floating ad page', () => {
		beforeEach(() => {
				browser.url('templates/floating-ad/');
		});

		const testName = 'Floating Ad';

		it(`${testName} top leaderboard visibility` , () => {
				browser.waitForVisible(floatingAdPage.topLeaderboard, timeout);
				const topSize = browser.getElementSize(floatingAdPage.topLeaderboard);
				expect(topSize.width).to.equal(728, 'Width incorrect');
				expect(topSize.height).to.equal(90, 'Height incorrect');
		});

		it(`will test ${testName} rail module visibility` , () => {
				browser.waitForVisible(floatingAdPage.topBoxad, timeout);
				const topSize = browser.getElementSize(floatingAdPage.topBoxad);
				expect(topSize.width).to.equal(300, 'Width incorrect');
				expect(topSize.height).to.equal(1200, 'Height incorrect');
		});

		it(`${testName} incontent box ad visibility and unpinning` , () => {
				browser.scroll(0,1000);
				browser.waitForVisible(floatingAdPage.incontentBoxad, timeout);
				browser.scroll(0, 5000);
				const topSize = browser.getElementSize(floatingAdPage.incontentBoxad);
				expect(topSize.width).to.equal(300, 'Width incorrect');
				expect(topSize.height).to.equal(250, 'Height incorrect');
				expect(browser.isVisible('.incontent-boxad.floating')).to.be.true;
		});

		it(`${testName} top leaderboard and the redirection after clicking it` , () => {
				browser.waitForVisible(floatingAdPage.topLeaderboard, timeout);
				browser.element(floatingAdPage.topLeaderboard).click();
				const tabIds = browser.getTabIds();
				browser.switchTab(tabIds[1]);
				try {
						browser.waitForVisible('[data-tracking-opt-in-overlay="true"]', timeout);
				} catch (err) {
						console.log(err.message);
				}
				helpers.gdprModal();
				browser.waitForVisible('.feed-layout');
				expect(browser.getUrl()).to.equal('http://www.wikia.com/fandom');
		});
});

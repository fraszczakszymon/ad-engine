import floatingAdPage from '../pages/floating-ad.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test floating ad page', () => {
	beforeEach(() => {
		browser.url('templates/floating-ad/');
	});


	xit('will test visibility of floating ad', () => {
		browser.scroll(0, 1000);
		browser.waitForVisible(floatingAdPage.incontentBoxad, timeouts.standard);
		browser.scroll(0, 5000);
		const size = browser.getElementSize(floatingAdPage.incontentBoxad);
		expect(size.width)
			.to
			.equal(300, 'Width incorrect');
		expect(size.height)
			.to
			.equal(250, 'Height incorrect');
		expect(browser.isVisible(floatingAdPage.incontentBoxadFloating)).to.be.true;
	});


	xit('floating ad and the redirection after clicking it', () => {
		browser.waitForVisible(floatingAdPage.incontentBoxad, timeouts.standard);
		browser.element(floatingAdPage.incontentBoxad)
			.click();

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl('http://www.wikia.com/fandom');
		expect(browser.getUrl())
			.to
			.equal('http://www.wikia.com/fandom');
	});
});

import btfOnlyAd from '../pages/btf-only-ad.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test btf ads', () => {
	beforeEach(() => {
		browser.url(btfOnlyAd.pageLink);
	});

	xit('will test the visibility of btf ad after manually finishing the queue', () => {
		browser.waitForVisible(btfOnlyAd.finishQueueButton, timeouts.standard);
		browser.click(btfOnlyAd.finishQueueButton);
		helpers.slowScroll(2500);
		browser.waitForVisible(btfOnlyAd.btfAd, timeouts.standard);

		const size = browser.getElementSize(btfOnlyAd.btfAd);

		expect(size.width)
			.to
			.equal(300, 'Width incorrect');
		expect(size.height)
			.to
			.equal(250, 'Height incorrect');
		expect(browser.isVisibleWithinViewport(btfOnlyAd.btfAd))
			.to
			.be
			.true;
	});
});

import topBoxad from '../pages/top-boxad-ad.page';
import { timeouts } from '../common/timeouts';

const { expect } = require('chai');

describe('It will test top boxad page', () => {
	beforeEach(() => {
		browser.url(topBoxad.pageLink);
	});

	it('will test visibility of top boxad', () => {
		browser.waitForVisible(topBoxad.topBoxadRail, timeouts.standard);

		const size = browser.getElementSize(topBoxad.topBoxadRail);

		expect(size.width)
			.to
			.equal(topBoxad.topBoxadWidth, 'Width incorrect');
		expect(size.height)
			.to
			.equal(topBoxad.topBoxadHeight, 'Height incorrect');
	});
});

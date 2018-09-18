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
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(topBoxad.topBoxadWidth, 'Top boxad width incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(size.height)
				.to
				.equal(topBoxad.topBoxadHeight, 'Top boxad height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, `Errors found: ${tableOfErrors.toString()}`)
			.to
			.be
			.empty;
	});
});

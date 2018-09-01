import topBoxad from '../pages/top-boxad-ad.page'
import {timeouts} from '../common/timeouts';

const { expect } = require('chai');

describe('It will test top boxad page', () => {
	beforeEach(() => {
		browser.url('templates/floating-ad/');
	});

	it('will test visibility of top boxad' , () => {
		browser.waitForVisible(topBoxad.topBoxadRail, timeouts.standard);

		const topSize = browser.getElementSize(topBoxad.topBoxadRail);

		expect(topSize.width).to.equal(300, 'Width incorrect');
		expect(topSize.height).to.equal(1200, 'Height incorrect');
	});

});

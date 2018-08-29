import floatingAdPage from '../pages/examplePage.page'

const { expect } = require('chai');

describe('It will test Floating Ad', () => {


		beforeEach(() => {
				browser.url('templates/floating-ad/');
		});

		const testName = 'Floating Ad';

		it(`will test ${testName} top leaderboard` , () => {
				browser.waitForVisible(floatingAdPage.topLeaderboard, 10000);
				let topSize = floatingAdPage.returnSize(floatingAdPage.topLeaderboard);
				expect(topSize).to.include('width: 728', 'Width incorrect');
				expect(topSize).to.include('height: 90', 'Height incorrect');
		});

});

/**/import { expect } from 'chai';
import { outstream } from '../../pages/outstream.page';
import { adSlots } from '../../common/ad-slots';
import { timeouts } from '../../common/timeouts';
import { helpers } from '../../common/helpers';

describe('Outstream ads', () => {
	let adStatus;

	it('Check if video is visible in viewport', () => {
		browser.url(outstream.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		helpers.waitForViewabillityCounted();
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if video is visible is floating', () => {
		browser.url(outstream.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		helpers.waitForViewabillityCounted();
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check video with empty response', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check direct video', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check InDirect video', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});
});


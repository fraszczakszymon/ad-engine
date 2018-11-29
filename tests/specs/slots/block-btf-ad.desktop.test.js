import { expect } from 'chai';
import { blockBtfAd } from '../../pages/block-btf-ad.page';
import { adSlots } from '../../common/ad-slots';
import { timeouts } from '../../common/timeouts';
import { helpers } from '../../common/helpers';


describe('Block BTF ads page: incontent boxad', () => {
	let adStatus;

	before(() => {
		browser.url(blockBtfAd.pageLink, timeouts.standard);
		adStatus = adSlots.getSlotStatus(adSlots.incontentBoxad);
	});

	it('Check if slot is hidden on the page', () => {
		helpers.slowScroll(2000);
		expect(adStatus.inViewport, 'Visible in viewport')
			.to
			.be
			.false;
	});
});

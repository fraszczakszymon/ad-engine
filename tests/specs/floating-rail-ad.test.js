import floatingRailAd from '../pages/floating-rail-ad.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';
import adSlots from '../common/adSlots';

const { expect } = require('chai');


xdescribe('Floating rail ads page: floating rail', () => {
	beforeEach(() => {
		browser.url(floatingRailAd.pageLink);
		browser.waitForVisible(adSlots.railModule, timeouts.standard);
	});


	it('Check if rail scrolls with the content', () => {
		helpers.slowScroll(500);
		expect(browser.element(floatingRailAd.rail).getAttribute(helpers.classProperty))
			.to
			.equal(floatingRailAd.attributeRailScrolling, 'Rail did not scroll');
		expect(browser.isVisibleWithinViewport(floatingRailAd.rail, 'Rail not in viewport'))
			.to
			.be
			.true;
	});
});

describe('Floating rail ads page: top boxad requests', () => {
	let fetchedUrl;
	const gatheredUrls = [];
	let i = 0;

	before(() => {
		const pattern = RegExp('.*gampad\\/ads\\?.*top_boxad');
		global.clientSelenium.on('Network.responseReceived', (params) => {
			const { url, status } = params.response;
			if (pattern.test(url)) {
				fetchedUrl = url.replace(/.*gampad\/ads\?/, '');
				gatheredUrls[i] = fetchedUrl;
				i += 1;
			}
		});
		browser.url(floatingRailAd.pageLink);
		browser.waitForVisible(adSlots.railModule, timeouts.standard);
		browser.pause(timeouts.viewabillity);
	});

	it('Check position of the slot', () => {
		expect(gatheredUrls[0])
			.to
			.include('pos%3Dtop_boxad');
	});

	it('Check if ad is not from UAP', () => {
		expect(gatheredUrls[0])
			.to
			.include('uap%3Dnone');
	});

	it('Check slot size in response', () => {
		expect(gatheredUrls[0])
			.to
			.include('prev_iu_szs=300x250');
	});

	it('Check positioning of the slot', () => {
		expect(gatheredUrls[0])
			.to
			.include('prev_scp=loc%3Dtop');
	});
});

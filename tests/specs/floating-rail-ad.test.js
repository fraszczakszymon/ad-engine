import floatingRailAd from '../pages/floating-rail-ad.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';
import adSlots from '../common/adSlots';

const { expect } = require('chai');

let fetchedUrl;
const gatheredUrls = [];
let i = 0;

describe('Floating rail ads page: floating rail', () => {
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

describe('Floating rail ads page: floating rail', () => {
	beforeEach(() => {
		global.clientSelenium.on('Network.responseReceived', (params) => {
			const { url, status } = params.response;
			if (url.includes('gampad/ads?gdfp')) {
				fetchedUrl = url.replace(/.*ads\\?/, '');
				gatheredUrls[i] = fetchedUrl;
				i += 1;
			}
		});
		browser.url(floatingRailAd.pageLink);
		browser.waitForVisible(adSlots.railModule, timeouts.standard);
	});

	afterEach(() => {
		i = 0;
		gatheredUrls.length = 0;
	});

	it('Check if rail scrolls with the content', () => {
		helpers.slowScroll(500);
		expect(browser.element(floatingRailAd.rail).getAttribute(helpers.classProperty))
			.to
			.equal(floatingRailAd.attributeRailScrolling, 'Rail did not scroll');
		expect(gatheredUrls[1]).to.include('cookie');
		expect(browser.isVisibleWithinViewport(floatingRailAd.rail, 'Rail not in viewport'))
			.to
			.be
			.true;
	});

	it('Check if rail scrolls with the content', () => {
		helpers.slowScroll(500);
		expect(browser.element(floatingRailAd.rail).getAttribute(helpers.classProperty))
			.to
			.equal(floatingRailAd.attributeRailScrolling, 'Rail did not scroll');
		expect(gatheredUrls[1]).to.include('cookie');
		expect(browser.isVisibleWithinViewport(floatingRailAd.rail, 'Rail not in viewport'))
			.to
			.be
			.true;
	});
});

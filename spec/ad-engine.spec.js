'use strict';

import sinon from 'sinon';
import AdSlot from '../src/ad-slot';
import AdEngine from '../src/ad-engine';

function getAdSlot(platform = '') {
	return new AdSlot({
		id: platform ? 'gpt-top-leaderboard-' + platform : 'gpt-top-leaderboard',
		pageType: 'article'
	});
}

QUnit.test('shouldLoadAd on mobile', function (assert) {
	assert.expect(3);

	let mobileInstance = new AdEngine([], {}, true);

	assert.strictEqual(
		mobileInstance.shouldLoadAd(getAdSlot('mobile')),
		true,
		'mobile-only ad should be loaded on mobile screen size'
	);
	assert.strictEqual(
		mobileInstance.shouldLoadAd(getAdSlot('desktop')),
		false,
		'desktop-only ad should not be loaded on mobile screen size'
	);
	assert.strictEqual(
		mobileInstance.shouldLoadAd(getAdSlot()),
		true,
		'Screen size agnostic ads should be loaded on mobile'
	);
});

QUnit.test('shouldLoadAd on desktop', function (assert) {
	assert.expect(3);

	let desktopInstance = new AdEngine([], {}, false);

	assert.strictEqual(
		desktopInstance.shouldLoadAd(getAdSlot('mobile')),
		false,
		'mobile-only ad should not be loaded on desktop screen size'
	);
	assert.strictEqual(
		desktopInstance.shouldLoadAd(getAdSlot('desktop')),
		true,
		'desktop-only ad should be loaded on desktop screen size'
	);
	assert.strictEqual(
		desktopInstance.shouldLoadAd(getAdSlot()),
		true,
		'Screen size agnostic ads should be loaded on desktop'
	);
});

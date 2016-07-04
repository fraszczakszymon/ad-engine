'use strict';

import AdSlot from '../../src/models/ad-slot';
import Context from '../../src/services/context-service';
import ConfigMock from '../config-mock';

QUnit.module('AdSlot test', {
	beforeEach: () => {
		Context.extend(ConfigMock);
	}
});

QUnit.test('exception when id is wrong', function (assert) {
	assert.expect(1);

	assert.throws(
		() => {
			new AdSlot({
				id: 'gpt-foo',
				pageType: 'home'
			});
		},
		'Invalid id should throw error'
	);
});

QUnit.test('base properties', function (assert) {
	assert.expect(4);

	let adSlot = new AdSlot({
		id: 'gpt-top-leaderboard',
		pageType: 'home'
	});

	assert.equal('gpt-top-leaderboard', adSlot.getId());
	assert.equal('TOP_LEADERBOARD', adSlot.getSlotName());
	assert.equal(true, adSlot.getSizes().length > 0);
	assert.equal(true, adSlot.getDefaultSizes().length > 0);
});

QUnit.test('home ad unit', function (assert) {
	assert.expect(1);

	let adSlot = new AdSlot({
		id: 'gpt-top-leaderboard',
		pageType: 'home'
	});

	assert.equal('/5441/wka.fandom/_home/HOME_TOP_LEADERBOARD', adSlot.getAdUnit());
});

QUnit.test('vertical ad unit', function (assert) {
	assert.expect(1);

	let adSlot = new AdSlot({
		id: 'gpt-top-leaderboard',
		pageType: 'hub'
	});

	assert.equal('/5441/wka.fandom/_vertical/VERTICAL_TOP_LEADERBOARD', adSlot.getAdUnit());
});

QUnit.test('with article ad unit', function (assert) {
	assert.expect(1);

	let adSlot = new AdSlot({
		id: 'gpt-top-boxad',
		pageType: 'article'
	});

	assert.equal('/5441/wka.fandom/_article/ARTICLE_TOP_BOXAD', adSlot.getAdUnit());
});

QUnit.test('with other ad unit', function (assert) {
	assert.expect(1);

	let adSlot = new AdSlot({
		id: 'gpt-top-skin',
		pageType: 'other'
	});

	assert.equal('/5441/wka.fandom/_other/OTHER_INVISIBLE_SKIN', adSlot.getAdUnit());
});

QUnit.test('mobile ad', function (assert) {
	assert.expect(2);

	let mobileAd = new AdSlot({
		id: 'gpt-top-leaderboard-mobile',
		pageType: 'other'
	});

	Context.set('state.isMobile', true);
	assert.strictEqual(
		mobileAd.shouldLoad(),
		true,
		'mobile-only ad should be loaded on mobile screen size'
	);

	Context.set('state.isMobile', false);
	assert.strictEqual(
		mobileAd.shouldLoad(),
		false,
		'desktop-only ad should not be loaded on mobile screen size'
	);
});

QUnit.test('desktop ad', function (assert) {
	assert.expect(2);

	let desktopAd = new AdSlot({
		id: 'gpt-top-leaderboard-desktop',
		pageType: 'other'
	});

	Context.set('state.isMobile', true);
	assert.strictEqual(
		desktopAd.shouldLoad(),
		false,
		'desktop-only ad should not be loaded on mobile screen size'
	);

	Context.set('state.isMobile', false);
	assert.strictEqual(
		desktopAd.shouldLoad(),
		true,
		'desktop-only ad should be loaded on desktop screen size'
	);
});

QUnit.test('ad for all screen sizes', function (assert) {
	assert.expect(2);

	let adSlot = new AdSlot({
		id: 'gpt-top-leaderboard',
		pageType: 'other'
	});

	Context.set('state.isMobile', true);
	assert.strictEqual(
		adSlot.shouldLoad(),
		true,
		'ad should be loaded on mobile screen size'
	);

	Context.set('state.isMobile', false);
	assert.strictEqual(
		adSlot.shouldLoad(),
		true,
		'ad should be loaded on desktop screen size'
	);
});

'use strict';

import AdSlot from '../src/ad-slot';

QUnit.module('AdSlot test', {});

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
	assert.expect(5);

	let adSlot = new AdSlot({
		id: 'gpt-top-leaderboard',
		pageType: 'home'
	});

	assert.equal('gpt-top-leaderboard', adSlot.getId());
	assert.equal('TOP_LEADERBOARD', adSlot.getSlotName());
	assert.equal('both', adSlot.getSupportedScreen());
	assert.equal(true, adSlot.getSizes().length > 0);
	assert.equal(true, adSlot.getDefaultSizes().length > 0);
});

QUnit.test('desktop screen size', function (assert) {
	assert.expect(1);

	let adSlot = new AdSlot({
		id: 'gpt-top-leaderboard-desktop',
		pageType: 'home'
	});

	assert.equal('desktop', adSlot.getSupportedScreen());
});

QUnit.test('mobile screen size', function (assert) {
	assert.expect(1);

	let adSlot = new AdSlot({
		id: 'gpt-top-leaderboard-mobile',
		pageType: 'home'
	});

	assert.equal('mobile', adSlot.getSupportedScreen());
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

'use strict';

import sinon from 'sinon';
import GptTargeting from '../../src/providers/gpt-targeting';
import googletagMock from './../googletag-mock';

QUnit.module('GptTargeting test', {
	beforeEach: function( assert ) {
		window.googletag = googletagMock;
		window.upstream = {
			isMobileScreenSize: false
		};
	}
});

QUnit.test('setup targeting on the home page', function (assert) {
	sinon.spy(window.googletag.pubads(), 'setTargeting');
	GptTargeting.setup({
		adsPageType: 'home'
	});
	assert.ok(window.googletag.pubads().setTargeting.calledWith('vertical', 'home'));

	window.googletag.pubads().setTargeting.restore();
});

QUnit.test('setup targeting on a hub page', function (assert) {
	sinon.spy(window.googletag.pubads(), 'setTargeting');
	GptTargeting.setup({
		adsPageType: 'hub',
		verticals: ['vertical_name']
	});
	assert.ok(window.googletag.pubads().setTargeting.calledWith('hub', 'vertical_name'));

	window.googletag.pubads().setTargeting.restore();
});

QUnit.test('setup fandom skin targeting', function (assert) {
	sinon.spy(window.googletag.pubads(), 'setTargeting');
	GptTargeting.setup({});
	assert.ok(window.googletag.pubads().setTargeting.calledWith('skin', 'fandom_desktop'));
});

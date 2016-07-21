'use strict';

import sinon from 'sinon';
import Playwire from '../../src/video/playwire';
import Context from '../../src/services/context-service';

QUnit.module('Playwire test', {
	beforeEach: () => {
		Context.extend({
			vast: {
				adUnitId: '/0000/HELLO/world',
				size: [300, 250]
			},
			targeting: {
				uno: 'foo',
				due: 15,
				tre: [ 'bar', 'zero' ],
				quattro: null
			}
		});
	}
});

QUnit.test('get config URL', function (assert) {
	assert.equal(Playwire.getConfigUrl(1, 2), '//config.playwire.com/1/videos/v2/2/zeus.json');
});

QUnit.test('get config URL', function (assert) {
	assert.equal(Playwire.getConfigUrl(123, 789), '//config.playwire.com/123/videos/v2/789/zeus.json');
});

QUnit.test('inject player with given config url', function (assert) {
	let container = {
		appendChild: function () {}
	};
	sinon.spy(container, 'appendChild');

	Playwire.inject('//fake.url', container);

	assert.equal(container.appendChild.getCall(0).args[0].getAttribute('data-config'), '//fake.url');
});

QUnit.test('inject player with given config url', function (assert) {
	let container = {
		appendChild: function () {}
	};
	sinon.spy(container, 'appendChild');

	Playwire.inject('//fake.url', container, '//custom-vast.url');

	assert.equal(container.appendChild.getCall(0).args[0].getAttribute('data-ad-tag'), '//custom-vast.url');
});

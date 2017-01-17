import sinon from 'sinon';
import Playwire from '../../../../src/video/player/playwire/playwire';
import Context from '../../../../src/services/context-service';

let container = null;

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
				tre: ['bar', 'zero'],
				quattro: null
			}
		});
		container = {
			appendChild: () => {},
			ownerDocument: {
				defaultView: {}
			}
		};
	}
});

QUnit.test('get config URL', (assert) => {
	assert.equal(Playwire.getConfigUrl(1, 2), '//config.playwire.com/1/videos/v2/2/zeus.json');
});

QUnit.test('get config URL', (assert) => {
	assert.equal(Playwire.getConfigUrl(123, 789), '//config.playwire.com/123/videos/v2/789/zeus.json');
});

QUnit.test('inject player with given config url', (assert) => {
	sinon.spy(container, 'appendChild');

	Playwire.inject({ configUrl: '//fake.url', container });

	assert.equal(container.appendChild.getCall(0).args[0].getAttribute('data-config'), '//fake.url');
});

QUnit.test('inject player with given config url', (assert) => {
	sinon.spy(container, 'appendChild');

	Playwire.inject({ configUrl: '//fake.url', container, vastUrl: '//custom-vast.url' });

	assert.equal(container.appendChild.getCall(0).args[0].getAttribute('data-ad-tag'), '//custom-vast.url');
});

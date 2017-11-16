import Client from '../../src/utils/client';
import Context from '../../src/services/context-service';

QUnit.module('Client test', {
	beforeEach: () => {
		Context.extend({
			state: {
				isMobile: false
			}
		});
		window.navigator.userAgent = 'Chrome Foo';
	}
});

QUnit.test('Desktop ', (assert) => {
	assert.expect(2);

	assert.ok(Client.isDesktop());
	assert.equal(Client.getDeviceType(), 'desktop');
});

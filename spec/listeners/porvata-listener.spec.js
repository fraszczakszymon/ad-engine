import sinon from 'sinon';
import Context from '../../src/services/context-service';
import PorvataListener from '../../src/listeners/porvata-listener';

function getListener() {
	return {
		dispatchedEvents: [],
		onEvent(eventName, data) {
			this.dispatchedEvents.push({
				eventName,
				data
			})
		}
	}
}

function mockImaVideo() {
	return {
		ima: {
			getAdsManager() {
				return {
					getCurrentAd() {
						return {
							getAdId() {
								return 765;
							},
							getCreativeId() {
								return 123;
							},
							getContentType() {
								return 'video/mp4';
							},
							getWrapperAdIds() {},
							getWrapperCreativeIds() {}
						};
					}
				}
			}
		}
	};
}

let customListener;

QUnit.module('Context service test', {
	beforeEach: () => {
		customListener = getListener();
		Context.extend({
			listeners: {
				porvata: [
					customListener
				]
			}
		});
	}
});

QUnit.test('dispatch Porvata event with all basic data', (assert) => {
	assert.expect(11);

	new PorvataListener('test-video').init();

	assert.equal(customListener.dispatchedEvents.length, 1);

	const {eventName, data} = customListener.dispatchedEvents[0];

	assert.equal(eventName, 'init');
	assert.equal(data.ad_error_code, 0);
	assert.equal(data.ad_product, 'test-video');
	assert.equal(typeof data.browser, 'string');
	assert.equal(data.content_type, '(none)');
	assert.equal(data.creative_id, 0);
	assert.equal(data.event_name, 'init');
	assert.equal(data.line_item_id, 0);
	assert.equal(data.player, 'porvata');
	assert.equal(typeof data.timestamp, 'number');
});

QUnit.test('dispatch Porvata event with video data', (assert) => {
	assert.expect(4);

	const listener = new PorvataListener('test-video');
	listener.video = mockImaVideo();
	listener.init();

	assert.equal(customListener.dispatchedEvents.length, 1);

	const {data} = customListener.dispatchedEvents[0];

	assert.equal(data.content_type, 'video/mp4');
	assert.equal(data.creative_id, 123);
	assert.equal(data.line_item_id, 765);
});

import Context from '../../src/services/context-service';
import VastParser from '../../src/video/vast-parser';

const dummyVast = 'dummy.vast?sz=640x480&foo=bar&cust_params=foo1%3Dbar1%26foo2%3Dbar2&vpos=preroll';

function getImaAd(wrapperIds = [], wrapperCreativeIds = []) {
	return {
		getAdId: () => '000',
		getContentType: () => 'text/javascript',
		getCreativeId: () => '999',
		getWrapperAdIds: () => wrapperIds,
		getWrapperCreativeIds: () => wrapperCreativeIds
	};
}

QUnit.module('VastUrlBuilder test', {
	beforeEach: () => {
		Context.extend({
			vast: {
				adUnitId: '/5441/wka.fandom/{src}/{pos}'
			},
			targeting: {
				uno: 'foo',
				due: 15,
				tre: ['bar', 'zero'],
				quattro: null,
				wsi: 'xxxx'
			}
		});
	}
});

QUnit.test('parse custom parameters from VAST url', (assert) => {
	const adInfo = VastParser.parse(dummyVast);

	assert.equal(adInfo.customParams.foo1, 'bar1');
	assert.equal(adInfo.customParams.foo2, 'bar2');
});

QUnit.test('parse size from VAST url', (assert) => {
	const adInfo = VastParser.parse(dummyVast);

	assert.equal(adInfo.size, '640x480');
});

QUnit.test('parse position from VAST url', (assert) => {
	const adInfo = VastParser.parse(dummyVast);

	assert.equal(adInfo.position, 'preroll');
});

QUnit.test('current ad info is not set by default', (assert) => {
	const adInfo = VastParser.parse(dummyVast);

	assert.equal(adInfo.contentType, undefined);
	assert.equal(adInfo.creativeId, undefined);
	assert.equal(adInfo.lineItemId, undefined);
});

QUnit.test('current ad info is passed from base object', (assert) => {
	const adInfo = VastParser.parse(dummyVast, {
		contentType: 'video/mp4',
		creativeId: '123',
		lineItemId: '456'
	});

	assert.equal(adInfo.contentType, 'video/mp4');
	assert.equal(adInfo.creativeId, '123');
	assert.equal(adInfo.lineItemId, '456');
});

QUnit.test('current ad info from IMA object', (assert) => {
	const adInfo = VastParser.parse(dummyVast, {
		contentType: 'video/mp4',
		creativeId: '123',
		imaAd: getImaAd(),
		lineItemId: '456'
	});

	assert.equal(adInfo.contentType, 'text/javascript');
	assert.equal(adInfo.creativeId, '999');
	assert.equal(adInfo.lineItemId, '000');
});

QUnit.test('current ad info from IMA object', (assert) => {
	const adInfo = VastParser.parse(dummyVast, {
		contentType: 'video/mp4',
		creativeId: '123',
		imaAd: getImaAd(['222', '333'], ['555', '666']),
		lineItemId: '456'
	});

	assert.equal(adInfo.contentType, 'text/javascript');
	assert.equal(adInfo.creativeId, '555');
	assert.equal(adInfo.lineItemId, '222');
});

import AdSlot from '../../src/models/ad-slot';
import Context from '../../src/services/context-service';
import SlotService from '../../src/services/slot-service';
import { build as buildVastUrl } from '../../src/video/vast-url-builder';

QUnit.module('VastUrlBuilder test', {
	beforeEach: () => {
		Context.extend({
			src: 'test',
			vast: {
				adUnitId: '/5441/wka.fandom/{src}/{slotConfig.slotName}'
			},
			slots: {
				'top-leaderboard': {
					slotName: 'TOP_LEADERBOARD'
				}
			},
			targeting: {
				uno: 'foo',
				due: 15,
				tre: ['bar', 'zero'],
				quattro: null,
				wsi: 'xxxx'
			}
		});
		SlotService.add(new AdSlot({ id: 'gpt-top-leaderboard' }));
	}
});

QUnit.test('build URL with DFP domain', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

	assert.ok(vastUrl.match(/^https:\/\/pubads\.g\.doubleclick\.net\/gampad\/ads/g));
});

QUnit.test('build URL with required DFP parameters', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

	assert.ok(vastUrl.match(/output=vast&/g));
	assert.ok(vastUrl.match(/&env=vp&/g));
	assert.ok(vastUrl.match(/&gdfp_req=1&/g));
	assert.ok(vastUrl.match(/&impl=s&/g));
	assert.ok(vastUrl.match(/&unviewed_position_start=1&/g));
});

QUnit.test('build URL with configured ad unit', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

	assert.ok(vastUrl.match(/&iu=\/5441\/wka\.fandom\/test\/TOP_LEADERBOARD&/g));
});

QUnit.test('build URL with vertical ad size', (assert) => {
	const vastUrl = buildVastUrl(0.5, 'TOP_LEADERBOARD');

	assert.ok(vastUrl.match(/&sz=320x480&/g));
});

QUnit.test('build URL with horizontal ad size', (assert) => {
	const vastUrl = buildVastUrl(1.5, 'TOP_LEADERBOARD');

	assert.ok(vastUrl.match(/&sz=640x480&/g));
});

QUnit.test('build URL with referrer', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

	assert.ok(vastUrl.match(/&url=http%3A%2F%2Flocalhost/g));
});

QUnit.test('build URL with description_url', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

	assert.ok(vastUrl.match(/&description_url=http%3A%2F%2Flocalhost/g));
});

QUnit.test('build URL with numeric correlator', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

	assert.ok(vastUrl.match(/&correlator=\d+&/g));
});

QUnit.test('build URL with page level targeting anp default wsi param', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

	assert.ok(vastUrl.match(/&cust_params=uno%3Dfoo%26due%3D15%26tre%3Dbar%2Czero%26wsi%3Dxxxx/g));
});

QUnit.test('build URL with page, slotName level targeting and default wsi param', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

	const custParams =
		/&cust_params=uno%3Dfoo%26due%3D15%26tre%3Dbar%2Czero%26wsi%3Dxxxx%26src%3Dtest%26pos%3DTOP_LEADERBOARD/;

	assert.ok(vastUrl.match(custParams));
});

QUnit.test('build URL with restricted number of ads', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', { numberOfAds: 1 });

	const custParams = /&pmad=1/;

	assert.ok(vastUrl.match(custParams));
});

QUnit.test('build URL with content source and video ids', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', {
		contentSourceId: '123',
		videoId: 'abc'
	});

	const custParams = /&cmsid=123&vid=abc/;

	assert.ok(vastUrl.match(custParams));
});

QUnit.test('build URL without content source and video ids when at least one is missing', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', {
		contentSourceId: '123'
	});

	const custParams = /&cmsid=123/;

	assert.notOk(vastUrl.match(custParams));
});

QUnit.test('build URL without content source and video ids when at least one is missing', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', {
		videoId: 'abc'
	});

	const custParams = /&vid=abc/;

	assert.notOk(vastUrl.match(custParams));
});

QUnit.test('build URL with preroll video position', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', {
		vpos: 'preroll'
	});

	const custParams = /&vpos=preroll/;

	assert.ok(vastUrl.match(custParams));
});

QUnit.test('build URL with midroll video position', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', {
		vpos: 'midroll'
	});

	const custParams = /&vpos=midroll/;

	assert.ok(vastUrl.match(custParams));
});

QUnit.test('build URL with postroll video position', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', {
		vpos: 'postroll'
	});

	const custParams = /&vpos=postroll/;

	assert.ok(vastUrl.match(custParams));
});

QUnit.test('build URL without video position', (assert) => {
	const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', {
		vpos: 'invalid'
	});

	const custParams = /&vpos=/;

	assert.notOk(vastUrl.match(custParams));
});

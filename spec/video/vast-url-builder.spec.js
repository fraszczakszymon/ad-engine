import Context from '../../src/services/context-service';
import SlotService from '../../src/services/slot-service';
import adSlotFake from '../ad-slot-fake';
import { build as buildVastUrl } from '../../src/video/vast-url-builder';

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
				wsi: 'xxxx',
			}
		});
	}
});

QUnit.test('build URL with DFP domain', (assert) => {
	const vastUrl = buildVastUrl(1);

	assert.ok(vastUrl.match(/^https:\/\/pubads\.g\.doubleclick\.net\/gampad\/ads/g));
});

QUnit.test('build URL with required DFP parameters', (assert) => {
	const vastUrl = buildVastUrl(1);

	assert.ok(vastUrl.match(/output=vast&/g));
	assert.ok(vastUrl.match(/&env=vp&/g));
	assert.ok(vastUrl.match(/&gdfp_req=1&/g));
	assert.ok(vastUrl.match(/&impl=s&/g));
	assert.ok(vastUrl.match(/&unviewed_position_start=1&/g));
});

QUnit.test('build URL with configured ad unit', (assert) => {
	const vastUrl = buildVastUrl(1, { src: 'playwire', pos: 'TOP_LEADERBOARD' });
	assert.ok(vastUrl.match(/&iu=\/5441\/wka\.fandom\/playwire\/TOP_LEADERBOARD&/g));
});

QUnit.test('build URL with vertical ad size', (assert) => {
	const vastUrl = buildVastUrl(0.5);

	assert.ok(vastUrl.match(/&sz=320x480&/g));
});

QUnit.test('build URL with horizontal ad size', (assert) => {
	const vastUrl = buildVastUrl(1.5);

	assert.ok(vastUrl.match(/&sz=640x480&/g));
});

QUnit.test('build URL with referrer', (assert) => {
	const vastUrl = buildVastUrl(1);

	assert.ok(vastUrl.match(/&url=http:\/\/localhost/g));
});

QUnit.test('build URL with numeric correlator', (assert) => {
	const vastUrl = buildVastUrl(1);

	assert.ok(vastUrl.match(/&correlator=\d+&/g));
});

QUnit.test('build URL with page level targeting anp default wsi param', (assert) => {
	const vastUrl = buildVastUrl(1);

	assert.ok(vastUrl.match(/&cust_params=uno%3Dfoo%26due%3D15%26tre%3Dbar%2Czero%26wsi%3Dxxxx$/g));
});

QUnit.test('build URL with page, slotName level targeting and default wsi param', (assert) => {
	const vastUrl = buildVastUrl(1, { src: 'playwire', pos: 'TEST_SLOT' });

	const custParams =
		/&cust_params=uno%3Dfoo%26due%3D15%26tre%3Dbar%2Czero%26wsi%3Dxxxx%26src%3Dplaywire%26pos%3DTEST_SLOT$/;

	assert.ok(vastUrl.match(custParams));
});

QUnit.test('build URL with page, slotName level targeting and slot wsi param', (assert) => {
	SlotService.add(adSlotFake);
	const vastUrl = buildVastUrl(1, { pos: 'FAKE_AD' });

	const custParams = /&cust_params=uno%3Dfoo%26due%3D15%26tre%3Dbar%2Czero%26wsi%3Dyyyy%26pos%3DFAKE_AD$/;

	assert.ok(vastUrl.match(custParams));
});

import { expect } from 'chai';
import { AdSlot } from '../../src/models/ad-slot';
import { context } from '../../src/services/context-service';
import { slotService } from '../../src/services/slot-service';
import { buildVastUrl } from '../../src/video/vast-url-builder';

describe('vast-url-builder', () => {
	beforeEach(() => {
		context.extend({
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
			},
			options: {
				trackingOptOut: false,
				trackingOptOutBlacklist: {
					gpt: true
				}
			}
		});
		slotService.add(new AdSlot({ id: 'gpt-top-leaderboard' }));
	});

	it('build URL with DFP domain', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

		expect(vastUrl.match(/^https:\/\/pubads\.g\.doubleclick\.net\/gampad\/ads/g)).to.be.ok;
	});

	it('build URL with required DFP parameters', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

		expect(vastUrl.match(/output=vast&/g)).to.be.ok;
		expect(vastUrl.match(/&env=vp&/g)).to.be.ok;
		expect(vastUrl.match(/&gdfp_req=1&/g)).to.be.ok;
		expect(vastUrl.match(/&impl=s&/g)).to.be.ok;
		expect(vastUrl.match(/&unviewed_position_start=1&/g)).to.be.ok;
	});

	it('build URL with configured ad unit', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

		expect(vastUrl.match(/&iu=\/5441\/wka\.fandom\/test\/TOP_LEADERBOARD&/g)).to.be.ok;
	});

	it('build URL with vertical ad size', () => {
		const vastUrl = buildVastUrl(0.5, 'TOP_LEADERBOARD');

		expect(vastUrl.match(/&sz=320x480&/g)).to.be.ok;
	});

	it('build URL with horizontal ad size', () => {
		const vastUrl = buildVastUrl(1.5, 'TOP_LEADERBOARD');

		expect(vastUrl.match(/&sz=640x480&/g)).to.be.ok;
	});

	it('build URL with referrer', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

		expect(vastUrl.match(/&url=about%3Ablank/g)).to.be.ok;
	});

	it('build URL with description_url', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

		expect(vastUrl.match(/&description_url=about%3Ablank/g)).to.be.ok;
	});

	it('build URL with numeric correlator', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

		expect(vastUrl.match(/&correlator=\d+&/g)).to.be.ok;
	});

	it('build URL with page level targeting anp default wsi param', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

		expect(vastUrl.match(/&cust_params=uno%3Dfoo%26due%3D15%26tre%3Dbar%2Czero%26wsi%3Dxxxx/g)).to.be.ok;
	});

	it('build URL with page, slotName level targeting and default wsi param', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

		const custParams =
			/&cust_params=uno%3Dfoo%26due%3D15%26tre%3Dbar%2Czero%26wsi%3Dxxxx%26src%3Dtest%26pos%3DTOP_LEADERBOARD/;

		expect(vastUrl.match(custParams)).to.be.ok;
	});

	it('build URL with restricted number of ads', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', { numberOfAds: 1 });

		const custParams = /&pmad=1/;

		expect(vastUrl.match(custParams)).to.be.ok;
	});

	it('build URL with content source and video ids', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', {
			contentSourceId: '123',
			videoId: 'abc'
		});

		const custParams = /&cmsid=123&vid=abc/;

		expect(vastUrl.match(custParams)).to.be.ok;
	});

	it('build URL without content source and video ids when at least one is missing', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', {
			contentSourceId: '123'
		});

		const custParams = /&cmsid=123/;

		expect(vastUrl.match(custParams)).to.not.be.ok;
	});

	it('build URL without content source and video ids when at least one is missing', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', {
			videoId: 'abc'
		});

		const custParams = /&vid=abc/;

		expect(vastUrl.match(custParams)).to.not.be.ok;
	});

	it('build URL with preroll video position', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', {
			vpos: 'preroll'
		});

		const custParams = /&vpos=preroll/;

		expect(vastUrl.match(custParams)).to.be.ok;
	});

	it('build URL with midroll video position', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', {
			vpos: 'midroll'
		});

		const custParams = /&vpos=midroll/;

		expect(vastUrl.match(custParams)).to.be.ok;
	});

	it('build URL with postroll video position', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', {
			vpos: 'postroll'
		});

		const custParams = /&vpos=postroll/;

		expect(vastUrl.match(custParams)).to.be.ok;
	});

	it('build URL without video position', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD', {
			vpos: 'invalid'
		});

		const custParams = /&vpos=/;

		expect(vastUrl.match(custParams)).to.not.be.ok;
	});

	it('build URL with non personalized ads set to false if tracking opt out is disabled', () => {
		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

		const custParams = /&npa=0/;

		expect(vastUrl.match(custParams)).to.be.ok;
	});

	it('build URL with non personalized ads set to true if tracking opt out is disabled', () => {
		context.set('options.trackingOptOut', true);

		const vastUrl = buildVastUrl(1, 'TOP_LEADERBOARD');

		const custParams = /&npa=1/;

		expect(vastUrl.match(custParams)).to.be.ok;
	});
});

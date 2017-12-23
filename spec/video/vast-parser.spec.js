import { expect } from 'chai';
import { context } from '../../src/services/context-service';
import { vastParser } from '../../src/video/vast-parser';

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

describe('vast-parser', () => {
	beforeEach(() => {
		context.extend({
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
	});

	it('parse custom parameters from VAST url', () => {
		const adInfo = vastParser.parse(dummyVast);

		expect(adInfo.customParams.foo1).to.equal('bar1');
		expect(adInfo.customParams.foo2).to.equal('bar2');
	});

	it('parse size from VAST url', () => {
		const adInfo = vastParser.parse(dummyVast);

		expect(adInfo.size).to.equal('640x480');
	});

	it('parse position from VAST url', () => {
		const adInfo = vastParser.parse(dummyVast);

		expect(adInfo.position).to.equal('preroll');
	});

	it('current ad info is not set by default', () => {
		const adInfo = vastParser.parse(dummyVast);

		expect(adInfo.contentType).to.equal(undefined);
		expect(adInfo.creativeId).to.equal(undefined);
		expect(adInfo.lineItemId).to.equal(undefined);
	});

	it('current ad info is passed from base object', () => {
		const adInfo = vastParser.parse(dummyVast, {
			contentType: 'video/mp4',
			creativeId: '123',
			lineItemId: '456'
		});

		expect(adInfo.contentType).to.equal('video/mp4');
		expect(adInfo.creativeId).to.equal('123');
		expect(adInfo.lineItemId).to.equal('456');
	});

	it('current ad info from IMA object', () => {
		const adInfo = vastParser.parse(dummyVast, {
			contentType: 'video/mp4',
			creativeId: '123',
			imaAd: getImaAd(),
			lineItemId: '456'
		});

		expect(adInfo.contentType).to.equal('text/javascript');
		expect(adInfo.creativeId).to.equal('999');
		expect(adInfo.lineItemId).to.equal('000');
	});

	it('current ad info from IMA object', () => {
		const adInfo = vastParser.parse(dummyVast, {
			contentType: 'video/mp4',
			creativeId: '123',
			imaAd: getImaAd(['222', '333'], ['555', '666']),
			lineItemId: '456'
		});

		expect(adInfo.contentType).to.equal('text/javascript');
		expect(adInfo.creativeId).to.equal('555');
		expect(adInfo.lineItemId).to.equal('222');
	});
});

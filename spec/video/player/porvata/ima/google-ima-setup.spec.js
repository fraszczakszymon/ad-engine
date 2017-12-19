import { expect } from 'chai';
import AdSlot from '../../../../../src/models/ad-slot';
import Context from '../../../../../src/services/context-service';
import ConfigMock from '../../../../config-mock';
import GoogleImaSetup from '../../../../../src/video/player/porvata/ima/google-ima-setup';
import SlotService from '../../../../../src/services/slot-service';

describe('google-ima-setup', () => {
	beforeEach(() => {
		window.google = {
			ima: {
				AdsRenderingSettings: function () {},
				AdsRequest: function () {},
				ViewMode: {
					NORMAL: 0
				}
			}
		};
		Context.extend(ConfigMock);
		SlotService.add(new AdSlot({ id: 'gpt-top-leaderboard' }));
	});

	it('create request', () => {
		const request = GoogleImaSetup.createRequest({
			vastUrl: '/foo/bar',
			height: 25,
			slotName: 'TOP_LEADERBOARD',
			width: 50
		});

		expect(request.adTagUrl).to.equal('/foo/bar');
		expect(request.linearAdSlotWidth).to.equal(50);
		expect(request.linearAdSlotHeight).to.equal(25);
	});

	it('get rendering settings', () => {
		const settings = GoogleImaSetup.getRenderingSettings();

		expect(settings.enablePreloading).to.equal(true);
		expect(settings.uiElements.length).to.equal(0);
		expect(settings.loadVideoTimeout).to.equal(15000);
		expect(settings.bitrate).to.equal(68000);
	});

	it('get rendering settings with different load timeout', () => {
		const settings = GoogleImaSetup.getRenderingSettings({
			loadVideoTimeout: 10000
		});

		expect(settings.loadVideoTimeout).to.equal(10000);
	});
});

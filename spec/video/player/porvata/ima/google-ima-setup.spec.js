import GoogleImaSetup from '../../../../../src/video/player/porvata/ima/google-ima-setup';

QUnit.module('GoogleImaSetup test', {
	beforeEach: () => {
		window.google = {
			ima: {
				AdsRenderingSettings: () => {},
				AdsRequest: () => {},
				ViewMode: {
					NORMAL: 0
				}
			}
		};
	}
});

QUnit.test('Create request', (assert) => {
	const request = GoogleImaSetup.createRequest({
		vastUrl: '/foo/bar',
		height: 25,
		slotName: 'TOP_LEADERBOARD',
		width: 50
	});

	assert.equal(request.adTagUrl, '/foo/bar');
	assert.equal(request.linearAdSlotWidth, 50);
	assert.equal(request.linearAdSlotHeight, 25);
});

QUnit.test('Get rendering settings', (assert) => {
	const settings = GoogleImaSetup.getRenderingSettings();

	assert.equal(settings.enablePreloading, true);
	assert.equal(settings.uiElements.length, 0);
	assert.equal(settings.loadVideoTimeout, 15000);
	assert.equal(settings.bitrate, 68000);
});

QUnit.test('Get rendering settings with different load timeout', (assert) => {
	const settings = GoogleImaSetup.getRenderingSettings({
		loadVideoTimeout: 10000
	});

	assert.equal(settings.loadVideoTimeout, 10000);
});

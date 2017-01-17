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
		width: 50,
		height: 25
	});

	assert.equal(request.adTagUrl, '/foo/bar');
	assert.equal(request.linearAdSlotWidth, 50);
	assert.equal(request.linearAdSlotHeight, 25);
});

QUnit.test('Get rendering settings', (assert) => {
	const settings = GoogleImaSetup.getRenderingSettings();

	assert.equal(settings.enablePreloading, true);
	assert.equal(settings.uiElements.length, 0);
});

import GoogleIma from '../../../../../src/video/player/porvata/ima/google-ima';

let mocks;

QUnit.module('GoogleIma test', {
	beforeEach: () => {
		mocks = {
			adDisplayContainer: {
				initialize: () => {}
			},
			adsLoader: {
				addEventListener: () => {},
				contentComplete: () => {},
				removeEventListener: () => {},
				requestAds: () => {}
			},
			domElement: {
				style: {},
				classList: {
					add: () => {}
				}
			},
			params: {
				width: 100,
				height: 100,
				container: {
					querySelector: () => mocks.domElement
				}
			}
		};
		window.google = {
			ima: {
				AdDisplayContainer: () => mocks.adDisplayContainer,
				AdsLoader: () => mocks.adsLoader,
				AdsRequest: () => {}
			}
		};
	}
});

QUnit.test('Create player using factory', (assert) => {
	const player = GoogleIma.getPlayer(mocks.params);

	assert.equal(typeof player.playVideo, 'function');
});

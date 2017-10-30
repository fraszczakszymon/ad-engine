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
				},
				contentWindow: {
					location: {}
				}
			},
			videoParams: {
				container: {
					classList: {
						add: () => {}
					},
					querySelector: () => mocks.domElement
				},
				height: 100,
				width: 100
			},
			videoSettings: {
				get(key) {
					return mocks.videoParams[key];
				},
				getParams() {
					return mocks.videoParams;
				},
				getContainer() {
					return mocks.videoParams.container;
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
	const player = GoogleIma.getPlayer(mocks.videoSettings);

	assert.equal(typeof player.playVideo, 'function');
});

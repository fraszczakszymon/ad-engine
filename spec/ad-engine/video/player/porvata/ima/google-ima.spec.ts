import { expect } from 'chai';
import { googleIma } from '../../../../../../src/ad-engine/video/player/porvata/ima/google-ima';

let mocks;

describe('google-ima', () => {
	beforeEach(() => {
		mocks = {
			adDisplayContainer: {
				initialize: () => {},
			},
			adsLoader: {
				addEventListener: () => {},
				contentComplete: () => {},
				getSettings: () => ({
					setVpaidMode: () => {},
				}),
				removeEventListener: () => {},
				requestAds: () => {},
			},
			domElement: {
				style: {},
				classList: {
					add: () => {},
				},
				contentWindow: {
					location: {},
				},
			},
			videoParams: {
				container: {
					classList: {
						add: () => {},
					},
					querySelector: () => mocks.domElement,
				},
				height: 100,
				slotName: 'top_leaderboard',
				width: 100,
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
				},
				getVpaidMode() {
					return 2;
				},
			},
		};
		window.google = {
			ima: {
				// tslint:disable-next-line
				AdDisplayContainer: function() {
					return mocks.adDisplayContainer;
				},
				// tslint:disable-next-line
				AdsLoader: function() {
					return mocks.adsLoader;
				},
				// tslint:disable-next-line
				AdsRequest: function() {},
			},
		};
	});

	it('create player using factory', () => {
		const player = googleIma.getPlayer(mocks.videoSettings);

		expect(typeof player.playVideo).to.equal('function');
	});
});

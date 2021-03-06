import { AdSlot, Dictionary } from '@wikia/ad-engine';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { context } from '../../../../../../src/ad-engine/services/context-service';
import { slotService } from '../../../../../../src/ad-engine/services/slot-service';
import { googleImaPlayerFactory } from '../../../../../../src/ad-products/video/player/porvata/ima/google-ima-player-factory';
import { VideoSettings } from '../../../../../../src/ad-products/video/player/porvata/video-settings';
import ConfigMock from '../../../../config-mock';
import { getIma } from '../ima-factory';

let mocks: Dictionary = {};

describe('google-ima-player', () => {
	beforeEach(() => {
		mocks = {
			adDisplayContainer: {
				initialize: () => {},
			},
			adsLoader: {
				addEventListener: () => {},
				contentComplete: () => {},
				removeEventListener: () => {},
				requestAds: () => {},
			},
			adsManager: {
				destroy: () => {},
				dispatchEvent: () => {},
				init: () => {},
				start: () => {},
				resize: () => {},
			},
			domElement: {
				style: {},
				classList: {
					add: () => {},
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
				isMoatTrackingEnabled() {
					return false;
				},
				isIasTrackingEnabled() {
					return false;
				},
			},
		};
		window.google = {
			ima: getIma(),
		};

		context.extend(ConfigMock);
		slotService.add(new AdSlot({ id: 'top_leaderboard' }));
	});

	it('request ads on create', () => {
		sinon.spy(mocks.adsLoader, 'requestAds');

		googleImaPlayerFactory.create(mocks.adDisplayContainer, mocks.adsLoader, mocks.videoSettings);

		expect(mocks.adsLoader.requestAds.calledOnce).to.be.ok;
	});

	it('set auto play flags when autoPlay is enabled', () => {
		sinon.spy(mocks.adsLoader, 'requestAds');

		mocks.videoParams.autoPlay = true;
		const player = googleImaPlayerFactory.create(
			mocks.adDisplayContainer,
			mocks.adsLoader,
			new VideoSettings(mocks.videoParams),
		);

		expect(player.videoAd.autoplay).to.be.ok;
		expect(player.videoAd.muted).to.be.ok;
	});

	it('destroy ad and request new when reload is called', () => {
		sinon.spy(mocks.adsManager, 'destroy');
		sinon.spy(mocks.adsLoader, 'contentComplete');
		sinon.spy(mocks.adsLoader, 'requestAds');

		const player = googleImaPlayerFactory.create(
			mocks.adDisplayContainer,
			mocks.adsLoader,
			mocks.videoSettings,
		);

		player.setAdsManager(mocks.adsManager);

		player.reload();
		expect(mocks.adsManager.destroy.calledOnce).to.be.ok;
		expect(mocks.adsLoader.contentComplete.calledOnce).to.be.ok;
		expect(mocks.adsLoader.requestAds.calledTwice).to.be.ok; // 1x reload, 1x on factory::create
	});

	it('initialize adsManager and adDisplayContainer on video play', () => {
		sinon.spy(mocks.adDisplayContainer, 'initialize');
		sinon.spy(mocks.adsManager, 'init');
		sinon.spy(mocks.adsManager, 'start');

		const player = googleImaPlayerFactory.create(
			mocks.adDisplayContainer,
			mocks.adsLoader,
			mocks.videoSettings,
		);

		player.setAdsManager(mocks.adsManager);

		player.playVideo(640, 480);
		expect(mocks.adDisplayContainer.initialize.calledOnce).to.be.ok;
		expect(mocks.adsManager.init.calledOnce).to.be.ok;
		expect(mocks.adsManager.start.calledOnce).to.be.ok;
	});

	it('resize player using adsManager', () => {
		sinon.spy(mocks.adsManager, 'resize');

		const player = googleImaPlayerFactory.create(
			mocks.adDisplayContainer,
			mocks.adsLoader,
			mocks.videoSettings,
		);

		player.setAdsManager(mocks.adsManager);

		player.resize(640, 480);
		expect(mocks.adsManager.resize.calledOnce).to.be.ok;
	});
});

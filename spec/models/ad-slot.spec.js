import { expect } from 'chai';
import { AdSlot } from '../../src/models/ad-slot';
import { context } from '../../src/services/context-service';
import ConfigMock from '../config-mock';


describe('ad-slot', () => {
	beforeEach(() => {
		context.extend(ConfigMock);
	});

	it('exception when id is wrong', () => {
		expect(
			() => {
				new AdSlot({
					id: 'gpt-foo'
				});
			}
		).to.throw('Invalid GPT id passed to parseId (gpt-foo)');
	});

	it('base properties', () => {
		const adSlot = new AdSlot({
			id: 'gpt-top-leaderboard'
		});

		expect(adSlot.getId()).to.equal('gpt-top-leaderboard');
		expect(adSlot.getSlotName()).to.equal('TOP_LEADERBOARD');
		expect(adSlot.getSizes().length > 0).to.equal(true);
		expect(adSlot.getDefaultSizes().length > 0).to.equal(true);
	});

	it('home ad unit', () => {
		context.set('custom.pageType', 'home');
		const adSlot = new AdSlot({
			id: 'gpt-top-leaderboard'
		});

		expect(adSlot.getAdUnit()).to.equal('/5441/something/_home/TOP_LEADERBOARD');
	});

	it('vertical ad unit', () => {
		context.set('custom.pageType', 'vertical');
		const adSlot = new AdSlot({
			id: 'gpt-top-leaderboard'
		});

		expect(adSlot.getAdUnit()).to.equal('/5441/something/_vertical/TOP_LEADERBOARD');
	});

	it('with article ad unit', () => {
		context.set('custom.pageType', 'article');
		const adSlot = new AdSlot({
			id: 'gpt-top-boxad'
		});

		expect(adSlot.getAdUnit()).to.equal('/5441/something/_article/TOP_BOXAD');
	});

	it('with other ad unit', () => {
		context.set('custom.pageType', 'other');
		const adSlot = new AdSlot({
			id: 'gpt-top-skin'
		});

		expect(adSlot.getAdUnit()).to.equal('/5441/something/_other/INVISIBLE_SKIN');
	});

	it('mobile ad', () => {
		const mobileAd = new AdSlot({
			id: 'gpt-top-leaderboard-mobile'
		});

		context.set('state.isMobile', true);
		expect(mobileAd.shouldLoad()).to.be.true;

		context.set('state.isMobile', false);
		expect(mobileAd.shouldLoad()).to.be.false;
	});

	it('desktop ad', () => {
		const desktopAd = new AdSlot({
			id: 'gpt-top-leaderboard-desktop'
		});

		context.set('state.isMobile', true);
		expect(desktopAd.shouldLoad()).to.be.false;

		context.set('state.isMobile', false);
		expect(desktopAd.shouldLoad()).to.be.true;
	});

	it('ad for all screen sizes', () => {
		const adSlot = new AdSlot({
			id: 'gpt-top-leaderboard'
		});

		context.set('state.isMobile', true);
		expect(adSlot.shouldLoad()).to.be.true;

		context.set('state.isMobile', false);
		expect(adSlot.shouldLoad()).to.be.true;
	});
});

import { expect } from 'chai';
import { AdSlot } from '../../src/models/ad-slot';
import { context } from '../../src/services/context-service';
import ConfigMock from '../config-mock';


describe('ad-slot', () => {
	beforeEach(() => {
		context.extend(ConfigMock);
	});

	it('base properties', () => {
		const adSlot = new AdSlot({
			id: 'top_leaderboard'
		});

		expect(adSlot.getSlotName()).to.equal('top_leaderboard');
		expect(adSlot.getSizes().length > 0).to.equal(true);
		expect(adSlot.getDefaultSizes().length > 0).to.equal(true);
	});

	it('home ad unit', () => {
		context.set('custom.pageType', 'home');
		const adSlot = new AdSlot({
			id: 'top_leaderboard'
		});

		expect(adSlot.getAdUnit()).to.equal('/5441/something/_home/top_leaderboard');
	});

	it('vertical ad unit', () => {
		context.set('custom.pageType', 'vertical');
		const adSlot = new AdSlot({
			id: 'top_leaderboard'
		});

		expect(adSlot.getAdUnit()).to.equal('/5441/something/_vertical/top_leaderboard');
	});

	it('with article ad unit', () => {
		context.set('custom.pageType', 'article');
		const adSlot = new AdSlot({
			id: 'top_boxad'
		});

		expect(adSlot.getAdUnit()).to.equal('/5441/something/_article/top_boxad');
	});

	it('with other ad unit', () => {
		context.set('custom.pageType', 'other');
		const adSlot = new AdSlot({
			id: 'INVISIBLE_SKIN'
		});

		expect(adSlot.getAdUnit()).to.equal('/5441/something/_other/INVISIBLE_SKIN');
	});
});

import { expect } from 'chai';
import { AdSlot } from '../../../src/ad-engine/models/ad-slot';
import { context } from '../../../src/ad-engine/services/context-service';
import ConfigMock from '../config-mock';

/**
 * Create empty slot with given id.
 *
 * @param {string} id Slot id
 * @returns {AdSlot}
 */
function createAdSlot(id) {
	return new AdSlot({ id });
}

describe('ad-slot', () => {
	beforeEach(() => {
		context.extend(ConfigMock);
	});

	it('base properties', () => {
		const adSlot = createAdSlot('top_leaderboard');

		expect(adSlot.getSlotName()).to.equal('top_leaderboard');
		expect(adSlot.getSizes().length > 0).to.equal(true);
		expect(adSlot.getDefaultSizes().length > 0).to.equal(true);
	});

	it('home ad unit', () => {
		context.set('custom.pageType', 'home');
		const adSlot = createAdSlot('top_leaderboard');

		expect(adSlot.getAdUnit()).to.equal('/5441/something/_home/top_leaderboard');
	});

	it('vertical ad unit', () => {
		context.set('custom.pageType', 'vertical');
		const adSlot = createAdSlot('top_leaderboard');

		expect(adSlot.getAdUnit()).to.equal('/5441/something/_vertical/top_leaderboard');
	});

	it('with article ad unit', () => {
		context.set('custom.pageType', 'article');
		const adSlot = createAdSlot('top_boxad');

		expect(adSlot.getAdUnit()).to.equal('/5441/something/_article/top_boxad');
	});

	it('with other ad unit', () => {
		context.set('custom.pageType', 'other');
		const adSlot = createAdSlot('INVISIBLE_SKIN');

		expect(adSlot.getAdUnit()).to.equal('/5441/something/_other/INVISIBLE_SKIN');
	});

	describe('isFirstCall', () => {
		/** @type {AdSlot} */
		let adSlot;

		beforeEach(() => {
			adSlot = createAdSlot('top_leaderboard');
		});

		it('should return false if "firstCall" is undefined', () => {
			adSlot.config.firstCall = undefined;
			expect(adSlot.isFirstCall({})).to.equal(false);
		});

		it('should return false if "firstCall" is false', () => {
			adSlot.config.firstCall = false;
			expect(adSlot.isFirstCall()).to.equal(false);
		});

		it('should return true if "firstCall" is true', () => {
			adSlot.config.firstCall = true;
			expect(adSlot.isFirstCall()).to.equal(true);
		});
	});
});

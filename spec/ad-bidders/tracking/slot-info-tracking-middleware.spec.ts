import { expect } from 'chai';
import * as sinon from 'sinon';
import { slotBiddersTracking } from '../../../src/ad-bidders/tracking';
import { AdSlot } from '../../../src/ad-engine/models';

describe('slot-bidders-tracking-middleware', () => {
	const sandbox = sinon.createSandbox();
	let adSlot;

	beforeEach(() => {
		adSlot = new AdSlot({ id: 'foo' });
		adSlot.winningBidderDetails = {
			name: 'rubicon',
			price: '20.00',
		};
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('returns bidders info for tracking', () => {
		const data = slotBiddersTracking((data) => data)({ previous: 'value' }, adSlot);

		expect(Object.keys(data)).to.deep.equal([
			'previous',
			'bidder_won',
			'bidder_won_price',
			'bidder_0',
			'bidder_1',
			'bidder_2',
			'bidder_4',
			'bidder_5',
			'bidder_6',
			'bidder_8',
			'bidder_9',
			'bidder_10',
			'bidder_11',
			'bidder_12',
			'bidder_13',
			'bidder_14',
			'bidder_15',
			'bidder_17',
			'bidder_18',
		]);
		expect(data['previous']).to.equal('value');
		expect(data['bidder_won']).to.equal('rubicon');
		expect(data['bidder_won_price']).to.equal('20.00');
	});
});

import { expect } from 'chai';
import { trackingOptOut } from '../../src/services/tracking-opt-out';
import { context } from '../../src/services/context-service';

describe('tracking-opt-out', () => {
	beforeEach(() => {
		context.extend({
			options: {
				trackingOptOut: false,
				trackingOptOutBlacklist: {
					'foo': true,
					'bar': false
				}
			}
		});
	});

	it('is not opted out when main flag is disabled', () => {
		expect(trackingOptOut.isOptedOut('foo')).to.not.be.ok;
	});

	it('is not opted out when main flag is enabled but feature is not blacklisted', () => {
		context.set('options.trackingOptOut', true);

		expect(trackingOptOut.isOptedOut('bar')).to.not.be.ok;
	});

	it('is not opted out when main flag is enabled but feature is not listed in blacklist', () => {
		context.set('options.trackingOptOut', true);

		expect(trackingOptOut.isOptedOut('not-defined')).to.not.be.ok;
	});

	it('is opted out when main flag is enabled', () => {
		context.set('options.trackingOptOut', true);

		expect(trackingOptOut.isOptedOut('foo')).to.be.ok;
	});
});

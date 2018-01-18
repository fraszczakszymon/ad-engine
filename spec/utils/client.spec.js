import { expect } from 'chai';
import { client } from '../../src/utils/client';

const getMockObject = () => {
	let adsBlocked = false,
		notBlocked = false;

	client.checkBlocking(() => { adsBlocked = true; }, () => { notBlocked = true; });

	return {
		adsBlocked: adsBlocked,
		notBlocked: notBlocked,
	};
};

let object;

describe('client', () => {
	beforeEach(() => {
		object = getMockObject();
	});

	it('check blocked ads by disabled plugin import', () => {
		expect(object.adsBlocked).to.equal(true);
		expect(object.notBlocked).to.equal(false);
	});
});

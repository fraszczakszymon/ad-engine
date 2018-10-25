import adSlots from '../common/adSlots';
import helpers from './helpers';

const { expect } = require('chai');

class Asserts {
	assertSlotLineItemId(slotName, expectedLineItemId) {
		helpers.waitForLineItemIdAttribute(slotName);
		expect(helpers.getLineItemId(slotName))
			.to
			.equal(expectedLineItemId, 'Line item ID mismatch');
	}

	assertInhouseCreative(slotName) {
		this.assertSlotLineItemId(slotName, adSlots.inhouseLineItemId);
	}

	assertWikiaAdapterCreative(slotName) {
		this.assertSlotLineItemId(slotName, adSlots.wikiaAdapterLineItemId);
	}
}

export default new Asserts();

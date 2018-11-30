import { expect } from 'chai';
import { adSlots } from './ad-slots';
import { helpers } from './helpers';

class Asserts {
	assertSlotLineItemId(slotName, expectedLineItemId) {
		helpers.waitForLineItemIdAttribute(slotName);
		expect(helpers.getLineItemId(slotName))
			.to
			.equal(expectedLineItemId, 'Line item ID mismatch');
	}

	assertInhouseCampaign(slotName) {
		this.assertSlotLineItemId(slotName, adSlots.inhouseLineItemId);
	}

	assertWikiaAdapterCampaign(slotName) {
		this.assertSlotLineItemId(slotName, adSlots.wikiaAdapterLineItemId);
	}
}

export const asserts = new Asserts();

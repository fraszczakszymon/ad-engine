import { expect } from 'chai';
import sinon from 'sinon';
import adSlotFake from '../ad-slot-fake';
import SlotTweaker from '../../src/services/slot-tweaker';

describe('slot-tweaker', () => {
	beforeEach(() => {
		sinon.stub(document, 'getElementById').withArgs(adSlotFake.getId()).returns({
			dataset: {}
		});
	});

	afterEach(() => {
		document.getElementById.restore();
	});

	it('setDataParam accepts a string', () => {
		const mockedValue = 'qunitParamValue';

		SlotTweaker.setDataParam(adSlotFake, 'qunitParam', mockedValue);

		expect(SlotTweaker.getContainer(adSlotFake).dataset.qunitParam).to.equal(mockedValue);
	});

	it('setDataParam accepts an object', () => {
		const mockedValue = {
			param1: 'value1',
			param2: 'value2'
		};

		SlotTweaker.setDataParam(adSlotFake, 'qunitParam', mockedValue);

		expect(SlotTweaker.getContainer(adSlotFake).dataset.qunitParam).to.equal('{"param1":"value1","param2":"value2"}');
	});

	it('setDataParam accepts an array', () => {
		const mockedValue = ['value1', 'value2'];

		SlotTweaker.setDataParam(adSlotFake, 'qunitParam', mockedValue);

		expect(SlotTweaker.getContainer(adSlotFake).dataset.qunitParam).to.equal('["value1","value2"]');
	});

	it('setDataParam accepts a boolean', () => {
		SlotTweaker.setDataParam(adSlotFake, 'qunitParam', true);

		expect(SlotTweaker.getContainer(adSlotFake).dataset.qunitParam).to.equal('true');
	});

	it('setDataParam accepts a boolean', () => {
		SlotTweaker.setDataParam(adSlotFake, 'qunitParam', false);

		expect(SlotTweaker.getContainer(adSlotFake).dataset.qunitParam).to.equal('false');
	});
});

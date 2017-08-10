import sinon from 'sinon';
import adSlotFake from '../ad-slot-fake';
import SlotTweaker from '../../src/services/slot-tweaker';

QUnit.module('SlotTweaker test', {
	beforeEach: () => {
		sinon.stub(document, 'getElementById').withArgs(adSlotFake.getId()).returns({
			dataset: {}
		});
	},
	afterEach: () => {
		document.getElementById.restore();
	}
});

QUnit.test('setDataParam accepts a string', (assert) => {
	const mockedValue = 'qunitParamValue';

	SlotTweaker.setDataParam(adSlotFake, 'qunitParam', mockedValue);

	assert.equal(SlotTweaker.getContainer(adSlotFake).dataset.qunitParam, mockedValue);
});

QUnit.test('setDataParam accepts an object', (assert) => {
	const mockedValue = {
		param1: 'value1',
		param2: 'value2'
	};

	SlotTweaker.setDataParam(adSlotFake, 'qunitParam', mockedValue);

	assert.equal(SlotTweaker.getContainer(adSlotFake).dataset.qunitParam, '{"param1":"value1","param2":"value2"}');
});

QUnit.test('setDataParam accepts an array', (assert) => {
	const mockedValue = ['value1', 'value2'];

	SlotTweaker.setDataParam(adSlotFake, 'qunitParam', mockedValue);

	assert.equal(SlotTweaker.getContainer(adSlotFake).dataset.qunitParam, '["value1","value2"]');
});

QUnit.test('setDataParam accepts a boolean', (assert) => {
	SlotTweaker.setDataParam(adSlotFake, 'qunitParam', true);

	assert.equal(SlotTweaker.getContainer(adSlotFake).dataset.qunitParam, 'true');
});

QUnit.test('setDataParam accepts a boolean', (assert) => {
	SlotTweaker.setDataParam(adSlotFake, 'qunitParam', false);

	assert.equal(SlotTweaker.getContainer(adSlotFake).dataset.qunitParam, 'false');
});

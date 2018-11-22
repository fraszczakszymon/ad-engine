import { expect } from 'chai';
import { context } from '../../../src/ad-engine/index';
import { moatYi } from '../../../src/ad-services/moat-yi';

describe('MOAT YI service', () => {
	let moatPageLevelData = {};

	beforeEach(() => {
		context.set('targeting.m_data', -1);
		window.moatPrebidApi = {
			getMoatTargetingForPage: () => moatPageLevelData
		};
	});

	afterEach(() => {
		moatPageLevelData = {};
		delete window.moatYieldReady;
	});

	it('targeting.m_data has -1 value by default', () => {
		moatYi.call();

		expect(context.get('targeting.m_data')).to.equal(-1);
	});

	it('targeting.m_data has -2 value when moatPrebidApi has missing data', () => {
		moatYi.importPageParams();

		expect(context.get('targeting.m_data')).to.equal(-2);
	});

	it('targeting.m_data has value from moatPrebidApi', () => {
		moatPageLevelData.m_data = 1;
		moatYi.importPageParams();

		expect(context.get('targeting.m_data')).to.equal(1);
	});
});

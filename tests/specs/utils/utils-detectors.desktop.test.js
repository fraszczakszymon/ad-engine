import { expect } from 'chai';
import { blockDetect } from '../../pages/block-detect.page';
import { deviceDetect } from '../../pages/device-detect.page';
import { browserDetect } from '../../pages/browser-detect.page';

describe('It will test utils - detectors', () => {
	it('will check block detect', () => {
		browser.url(blockDetect.pageLink);
		expect(blockDetect.getDetectorResponse()).to.include('disabled');
	});

	it('will check browser detect', () => {
		browser.url(browserDetect.pageLink);
		expect(browserDetect.getDetectorResponse()).to.include('Chrome');
	});

	it('will check device detect', () => {
		browser.url(deviceDetect.pageLink);
		expect(deviceDetect.getDetectorResponse()).to.include('desktop');
	});
});

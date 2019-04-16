import { expect } from 'chai';
import { VideoSettings } from '../../../../packages/ad-products/templates/uap/video-settings';

describe('VideoSettings', () => {
	it('returns correct autoplay value', () => {
		const settings = new VideoSettings({ autoPlay: true });

		expect(settings.isAutoPlay()).to.equal(true);
	});
});

import { HiviUap } from './hivi-uap-ad.page';

class HiviUapStickyBfab extends HiviUap {
	constructor() {
		super();
		this.pageLink = 'templates/hivi-uap-sticky-bfab/';
		this.videoPlayer = '.video-player.video-player-right';
	}
}

export default new HiviUapStickyBfab();

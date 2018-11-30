import { HiviUap } from './hivi-uap-ad.page';

class HiviUapCtp extends HiviUap {
	constructor() {
		super();
		this.pageLink = 'templates/hivi-uap-ctp/';
		this.videoContainer = '#videoContainer';
		this.videoLength = 25000;
		this.firstCall = '4555494179'; // applies only to top leaderboard
		this.secondCall = '4555501605'; // top and incontent boxad and bottom leaderboard
	}
}

export const hiviUapCtp = new HiviUapCtp();

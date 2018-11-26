import { HiviUap } from './hivi-uap-ad.page';

class HiviUapStatic extends HiviUap {
	constructor() {
		super();
		this.pageLink = 'templates/hivi-uap-static/';
		this.firstCall = '4562423718'; // applies only to top leaderboard
		this.secondCall = '4562425893'; // top and incontent boxad and bottom leaderboard
	}
}

export default new HiviUapStatic();

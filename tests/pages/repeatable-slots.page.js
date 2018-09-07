import helpers from '../common/helpers';

class RepeatableSlots {
	constructor() {
		this.pageLink = 'slots/repeatable-slots/';
		this.boxadWidth = 300;
		this.boxadHeight = 250;
		this.firstRepeatableBoxad = '#repeatable_boxad_1';
		this.secondRepeatableBoxad = '#repeatable_boxad_2';
	}

	scrollBetweenBoxads(distance = 500) {
		helpers.slowScroll(distance);
	}
}

export default new RepeatableSlots();

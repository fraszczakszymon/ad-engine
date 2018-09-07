import helpers from '../common/helpers';

class RepeatableSlots {
	constructor() {
		this.pageLink = 'slots/repeatable-slots/';
		this.firstRepeatableBoxad = '#repeatable_boxad_1';
		this.secondRepeatableBoxad = '#incontent_player';
	}

	scrollBetweenBoxads(distance = 500) {
		helpers.slowScroll(distance);
	}
}

export default new RepeatableSlots();

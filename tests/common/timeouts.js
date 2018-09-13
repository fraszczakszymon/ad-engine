class Timeouts {
	constructor() {
		this.standard = 5000;
		this.extended = 10000; // currently added only for animations ad, as top leaderboard hides after 6 seconds
	}
}

export const timeouts = new Timeouts();

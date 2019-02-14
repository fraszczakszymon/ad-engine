class Timeouts {
	constructor() {
		this.standard = 5000;
		this.interval = 500;
		this.viewabillity = 1500;
		this.newUrlTimeout = 10000;
		this.unstickTime = this.viewabillity + 3000;
		this.hover = 500;
		this.actions = 500;
	}
}

export const timeouts = new Timeouts();

class Timeouts {
	constructor() {
		this.standard = 5000;
		this.pageReload = 2500;
		this.interval = 500;
		this.extended = 45000;
	}
}

export const timeouts = new Timeouts();

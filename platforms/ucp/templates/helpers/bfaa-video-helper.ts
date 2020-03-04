import { AdSlot, DomManipulator, UapParams } from '@wikia/ad-engine';

export class BfaaVideoHelper {
	constructor(
		private manipulator: DomManipulator,
		private params: UapParams,
		private adSlot: AdSlot,
	) {
		console.error(this.manipulator);
		console.error(this.params);
		console.error(this.adSlot);
	}
}

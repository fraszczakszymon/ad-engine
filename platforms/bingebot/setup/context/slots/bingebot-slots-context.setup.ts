import { SlotsContextSetup } from '@platforms/shared';
import { context } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';

@Injectable()
export class BingeBotSlotsContextSetup implements SlotsContextSetup {
	constructor() {}

	execute(): void {
		const slots = {
			promoted_recs: {
				firstCall: true,
				adProduct: 'promoted-recs',
				group: 'PX',
				slotNameSuffix: '',
				defaultSizes: [[1, 1]],
				targeting: {
					pos: ['promoted_recs'],
				},
			},
			sponsored_logo: {
				adProduct: 'sponsored-logo',
				group: 'PX',
				slotNameSuffix: '',
				defaultSizes: [
					[100, 46],
					[120, 120],
				],
				targeting: {
					pos: ['sponsored_logo'],
				},
			},
		};

		context.set('slots', slots);
	}
}

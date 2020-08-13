import { SlotsContextSetup } from '@platforms/shared';
import { context } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';

@Injectable()
export class BingeBotSlotsContextSetup implements SlotsContextSetup {
	constructor() {}

	execute(): void {
		const slots = {
			sponsored_logo: {
				adProduct: 'sponsored-logo',
				group: 'PX',
				insertBeforeSelector: '',
				outOfPage: true,
				slotNameSuffix: '',
				targeting: {
					pos: ['sponsored_logo'],
				},
			},
		};

		context.set('slots', slots);
	}
}
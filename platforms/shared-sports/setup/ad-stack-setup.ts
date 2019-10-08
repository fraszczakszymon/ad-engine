import { AdStackSetup } from '@platforms/shared';
import { context } from '@wikia/ad-engine';

export class SportsAdStackSetup implements AdStackSetup {
	setAdStack(): void {
		context.push('state.adStack', { id: 'cdm-zone-01' });
		context.push('state.adStack', { id: 'cdm-zone-02' });
		context.push('state.adStack', { id: 'cdm-zone-03' });
		context.push('state.adStack', { id: 'cdm-zone-06' });
		context.push('events.pushOnScroll.ids', 'cdm-zone-04');
	}
}

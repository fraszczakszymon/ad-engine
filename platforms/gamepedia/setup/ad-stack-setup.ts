import { AdStackSetup } from '@platforms/shared';
import { context } from '@wikia/ad-engine';

export class GamepediaAdStackSetup implements AdStackSetup {
	setAdStack(): void {
		context.push('state.adStack', { id: 'cdm-zone-01' });
		context.push('state.adStack', { id: 'cdm-zone-02' });
		context.push('state.adStack', { id: 'cdm-zone-03' });
		context.push('state.adStack', { id: 'cdm-zone-04' });
		context.push('state.adStack', { id: 'cdm-zone-06' });
	}
}

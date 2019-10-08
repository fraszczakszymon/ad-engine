import { babDetection, biddersDelay, DelayModulesSetup } from '@platforms/shared';
import { context } from '@wikia/ad-engine';

export class SportsDelayModulesSetup implements DelayModulesSetup {
	setupDelayModules(): void {
		context.push('delayModules', babDetection);
		context.push('delayModules', biddersDelay);
	}
}

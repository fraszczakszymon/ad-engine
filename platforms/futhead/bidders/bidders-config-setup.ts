import { BiddersConfigSetup } from '@platforms/shared';
import { setA9AdapterConfig } from '@platforms/shared-sports';
import { context } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';
import { setPrebidAdaptersConfig } from './prebid';

@Injectable()
export class SportsBiddersConfigSetup implements BiddersConfigSetup {
	setBiddersConfigContext(): void {
		setA9AdapterConfig();
		setPrebidAdaptersConfig(context.get('targeting.s1'));
	}
}

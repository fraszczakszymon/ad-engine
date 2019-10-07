import { BiddersConfigSetup } from '@platforms/shared';
import { context } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';
import { setA9AdapterConfig } from './a9';
import { setPrebidAdaptersConfig } from './prebid';

@Injectable()
export class SportsBiddersConfigSetup implements BiddersConfigSetup {
	setBiddersConfigContext(): void {
		setA9AdapterConfig();
		setPrebidAdaptersConfig(context.get('targeting.s1'));
	}
}

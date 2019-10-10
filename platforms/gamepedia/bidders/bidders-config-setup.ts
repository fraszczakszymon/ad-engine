import { BiddersConfigSetup } from '@platforms/shared';
import { Injectable } from '@wikia/dependency-injection';
import { setA9AdapterConfig } from './a9';
import { setPrebidAdaptersConfig } from './prebid';

@Injectable()
export class GamepediaBiddersConfigSetup implements BiddersConfigSetup {
	setBiddersConfigContext(): void {
		setA9AdapterConfig();
		setPrebidAdaptersConfig();
	}
}
import { BiddersSetup } from '@platforms/shared';
import { Injectable } from '@wikia/dependency-injection';
import { setA9AdapterConfig } from './a9';
import { setPrebidAdaptersConfig } from './prebid';

@Injectable()
export class GamepediaBiddersSetup implements BiddersSetup {
	setBiddersContext(): void {
		setA9AdapterConfig();
		setPrebidAdaptersConfig();
	}
}

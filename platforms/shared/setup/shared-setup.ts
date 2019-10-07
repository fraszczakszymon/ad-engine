import { SharedContextSetup } from '@platforms/shared';
import { setupNpaContext } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';
import { TrackingRegistry } from '../tracking/tracking-registry';
import { TargetingSetup } from './targeting-setup';
import { WikiContextSetup } from './wiki-context-setup';

@Injectable()
export class SharedSetup {
	constructor(
		private trackingRegistry: TrackingRegistry,
		private wikiContextSetup: WikiContextSetup,
		private targetingSetup: TargetingSetup,
		private sharedContextSetup: SharedContextSetup,
	) {}

	configure({ isOptedIn = false, isMobile = false } = {}): void {
		this.wikiContextSetup.setWikiContext();
		this.targetingSetup.setTargeting();
		this.sharedContextSetup.setup({ isOptedIn, isMobile });
		setupNpaContext();
		// templateRegistry.registerTemplates();
		this.trackingRegistry.registerTrackers();

		// setA9AdapterConfig();
		// setPrebidAdaptersConfig();
	}
}

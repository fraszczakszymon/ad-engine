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

	configure(isOptedIn: boolean): void {
		this.wikiContextSetup.setWikiContext();
		this.targetingSetup.setTargeting();
		// context.set('state.isMobile', !utils.client.isDesktop());
		this.sharedContextSetup.setup({ isOptedIn });
		setupNpaContext();
		// templateRegistry.registerTemplates();
		this.trackingRegistry.registerTrackers();

		// setA9AdapterConfig();
		// setPrebidAdaptersConfig();
	}
}

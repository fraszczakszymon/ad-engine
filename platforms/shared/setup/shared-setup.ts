import { BiddersSetup, SharedContextSetup, TemplateRegistry } from '@platforms/shared';
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
		private biddersSetup: BiddersSetup,
		private templateRegistry: TemplateRegistry,
	) {}

	configure({ isOptedIn = false, isMobile = false } = {}): void {
		this.wikiContextSetup.setWikiContext();
		this.targetingSetup.setTargeting();
		this.sharedContextSetup.setup({ isOptedIn, isMobile });
		setupNpaContext();
		this.templateRegistry.registerTemplates();
		this.trackingRegistry.registerTrackers();
		this.biddersSetup.setBiddersContext();
	}
}

import { BiddersConfigSetup, PlatformContextSetup, TemplateRegistry } from '@platforms/shared';
import { BiddersStateSetup, setupNpaContext } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';
import { TrackingRegistry } from '../tracking/tracking-registry';
import { TargetingSetup } from './targeting-setup';
import { WikiContextSetup } from './wiki-context-setup';

@Injectable()
export class PlatformSetup {
	constructor(
		private trackingRegistry: TrackingRegistry,
		private wikiContextSetup: WikiContextSetup,
		private targetingSetup: TargetingSetup,
		private sharedContextSetup: PlatformContextSetup,
		private biddersConfigSetup: BiddersConfigSetup,
		private biddersStateSetup: BiddersStateSetup,
		private templateRegistry: TemplateRegistry,
	) {}

	configure({ isOptedIn = false, isMobile = false }): void {
		this.wikiContextSetup.setWikiContext();
		this.targetingSetup.setTargeting();
		this.sharedContextSetup.setup();
		this.sharedContextSetup.setState(isMobile);
		this.biddersStateSetup.setBiddersStateContext();
		this.sharedContextSetup.setOptions(isOptedIn);
		this.sharedContextSetup.setServices();
		this.sharedContextSetup.setMisc();
		this.biddersConfigSetup.setBiddersConfigContext();
		setupNpaContext();
		this.templateRegistry.registerTemplates();
		this.trackingRegistry.registerTrackers();
	}
}

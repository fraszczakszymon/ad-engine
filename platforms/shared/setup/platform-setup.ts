import {
	BiddersConfigSetup,
	DelayModulesSetup,
	PlatformContextSetup,
	TemplateRegistry,
} from '@platforms/shared';
import { BiddersStateSetup, setupNpaContext } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';
import { SlotsSetup } from '../slots/slots-setup';
import { UapSetup } from '../templates/uap-setup';
import { TrackingRegistry } from '../tracking/tracking-registry';
import { IncontentPlayerInjector } from './inject-incontent-player';
import { TargetingSetup } from './targeting-setup';
import { WikiContextSetup } from './wiki-context-setup';

@Injectable()
export class PlatformSetup {
	constructor(
		private trackingRegistry: TrackingRegistry,
		private wikiContextSetup: WikiContextSetup,
		private targetingSetup: TargetingSetup,
		private platformContextSetup: PlatformContextSetup,
		private biddersStateSetup: BiddersStateSetup,
		private biddersConfigSetup: BiddersConfigSetup,
		private templateRegistry: TemplateRegistry,
		private uapSetup: UapSetup,
		private slotsSetup: SlotsSetup,
		private incontentPlayerInjector: IncontentPlayerInjector,
		private delayModulesSetup: DelayModulesSetup,
	) {}

	configure({ isOptedIn = false, isMobile = false }): void {
		this.wikiContextSetup.setWikiContext();
		this.platformContextSetup.setStateContext(isMobile);
		this.platformContextSetup.setOptionsContext(isOptedIn);
		this.platformContextSetup.setServicesContext();
		this.platformContextSetup.setMiscContext();
		this.targetingSetup.setTargetingContext();
		this.slotsSetup.setSlotsContext();
		this.slotsSetup.setSlotsState();
		this.incontentPlayerInjector.injectIncontentPlayer();
		this.uapSetup.configureUap();
		this.biddersStateSetup.setBiddersStateContext();
		this.biddersConfigSetup.setBiddersConfigContext();
		setupNpaContext();
		this.templateRegistry.registerTemplates();
		this.trackingRegistry.registerTrackers();
		this.delayModulesSetup.setupDelayModules();
	}
}

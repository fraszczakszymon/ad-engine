import {
	AdEngine,
	AdSlot,
	bidders,
	BiddersStateSetup,
	btRec,
	context,
	events,
	eventService,
	setupNpaContext,
	utils,
} from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';
import { BiddersConfigSetup } from '../bidders/bidders-config-setup';
import { SlotsSetup } from '../slots/slots-setup';
import { TemplateSetup } from '../templates/template-setup';
import { trackBab } from '../tracking/bab-tracker';
import { LabradorTracker } from '../tracking/labrador-tracker';
import { TrackingRegistry } from '../tracking/tracking-registry';
import { babDetection } from '../wad/bab-detection';
import { AdEnginePreStarter } from './ad-engine-prestarter';
import { AdStackSetup } from './ad-stack-setup';
import { DelayModulesSetup } from './delay-modules-setup';
import { IncontentPlayerInjector } from './inject-incontent-player';
import { NoAdsHandler } from './no-ads-handler';
import { PlatformContextSetup } from './platform-context-setup';
import { TargetingSetup } from './targeting-setup';
import { UapSetup } from './uap-setup';
import { WikiContextSetup } from './wiki-context-setup';

const logGroup = 'ad-engine';

@Injectable()
export class PlatformStartup {
	constructor(
		private trackingRegistry: TrackingRegistry,
		private wikiContextSetup: WikiContextSetup,
		private targetingSetup: TargetingSetup,
		private platformContextSetup: PlatformContextSetup,
		private biddersStateSetup: BiddersStateSetup,
		private biddersConfigSetup: BiddersConfigSetup,
		private templateSetup: TemplateSetup,
		private uapSetup: UapSetup,
		private slotsSetup: SlotsSetup,
		private incontentPlayerInjector: IncontentPlayerInjector,
		private delayModulesSetup: DelayModulesSetup,
		private labradorTracker: LabradorTracker,
		private adStackSetup: AdStackSetup,
		private adEnginePreStarter: AdEnginePreStarter,
		private noAdsHandler: NoAdsHandler,
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
		this.templateSetup.registerTemplates();
		this.trackingRegistry.registerTrackers();
		this.labradorTracker.trackLabradorValues();
		this.delayModulesSetup.setupDelayModules();
		this.configureEventService();
	}

	private configureEventService(): void {
		eventService.on(events.AD_SLOT_CREATED, (slot) => {
			utils.logger(logGroup, `Created ad slot ${slot.getSlotName()}`);
			bidders.updateSlotTargeting(slot.getSlotName());
		});
	}

	run(): void {
		if (context.get('state.showAds')) {
			this.adEnginePreStarter.runPreStartActions();
			this.startAdEngine();
			this.adStackSetup.setAdStack();
		} else {
			this.noAdsHandler.handleNoAdsScenario();
		}
	}

	private startAdEngine(): void {
		const GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';

		utils.scriptLoader.loadScript(GPT_LIBRARY_URL);

		const engine = new AdEngine();

		engine.init();

		if (babDetection.isEnabled()) {
			babDetection.run().then((isBabDetected) => {
				trackBab(isBabDetected);

				if (isBabDetected) {
					btRec.run();
				}
			});
		}

		eventService.on(AdSlot.SLOT_RENDERED_EVENT, (slot) => {
			slot.removeClass('default-height');
		});
	}
}

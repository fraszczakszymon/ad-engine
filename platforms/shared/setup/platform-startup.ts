import {
	AdEnginePreStarter,
	AdStackSetup,
	babDetection,
	BiddersConfigSetup,
	DelayModulesSetup,
	NoAdsHandler,
	PlatformContextSetup,
	TemplateRegistry,
	trackBab,
} from '@platforms/shared';
import {
	AdEngine,
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
import { SlotsSetup } from '../slots/slots-setup';
import { UapSetup } from '../templates/uap-setup';
import { TrackingRegistry } from '../tracking/tracking-registry';
import { IncontentPlayerInjector } from './inject-incontent-player';
import { TargetingSetup } from './targeting-setup';
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
		private templateRegistry: TemplateRegistry,
		private uapSetup: UapSetup,
		private slotsSetup: SlotsSetup,
		private incontentPlayerInjector: IncontentPlayerInjector,
		private delayModulesSetup: DelayModulesSetup,
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
		this.templateRegistry.registerTemplates();
		this.trackingRegistry.registerTrackers();
		this.delayModulesSetup.setupDelayModules();
		this.configureEventService();
		// labrador tacker
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

		context.push('listeners.slot', {
			onRenderEnded: (slot) => {
				slot.getElement().classList.remove('default-height');
			},
		});
	}
}

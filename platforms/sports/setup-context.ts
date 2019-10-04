import {
	getDeviceMode,
	injectIncontentPlayer,
	registerPorvataTracker,
	registerPostmessageTrackingTracker,
	registerSlotTracker,
	registerViewabilityTracker,
	setWadContext,
	slotsContext,
	uapHelper,
} from '@platforms/shared';
import {
	context,
	InstantConfigService,
	setupBidders,
	setupNpaContext,
	utils,
} from '@wikia/ad-engine';
import { set } from 'lodash';
import { setA9AdapterConfig } from './bidders/a9';
import { setPrebidAdaptersConfig } from './bidders/prebid';
import * as fallbackInstantConfig from './fallback-config.json';
import { getPageLevelTargeting } from './targeting';
import { templateRegistry } from './templates/templates-registry';

class ContextSetup {
	private instantConfig: InstantConfigService;

	async configure(isOptedIn: boolean): Promise<void> {
		set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);
		this.instantConfig = await InstantConfigService.init();

		await this.setupAdContext(isOptedIn);
		setupNpaContext();
		templateRegistry.registerTemplates();

		registerPorvataTracker();
		registerSlotTracker();
		registerViewabilityTracker();
		registerPostmessageTrackingTracker();
	}

	private async setupAdContext(isOptedIn = false): Promise<void> {
		const isMobile = getDeviceMode() === 'mobile';

		// context.set('wiki', wikiContext);
		context.set('state.showAds', !utils.client.isSteamPlatform());
		context.set('state.isMobile', isMobile);
		// context.set('state.isLogged', !!wikiContext.wgUserId);
		context.set('state.deviceType', utils.client.getDeviceType());

		context.set('options.tracking.kikimora.player', true);
		context.set('options.tracking.slot.status', true);
		context.set('options.tracking.slot.viewability', true);
		context.set('options.tracking.postmessage', this.instantConfig.get('icPostmessageTracking'));
		context.set('options.trackingOptIn', isOptedIn);
		context.set('options.maxDelayTimeout', this.instantConfig.get('wgAdDriverDelayTimeout', 2000));

		context.set(
			'options.video.isOutstreamEnabled',
			this.instantConfig.isGeoEnabled('wgAdDriverOutstreamSlotCountries'),
		);
		this.instantConfig.isGeoEnabled('wgAdDriverLABradorTestCountries');

		setA9AdapterConfig();
		setPrebidAdaptersConfig(context.get('targeting.s1'));
		setupBidders(context, this.instantConfig);

		context.set('slots', slotsContext.generate());
		context.set('targeting', getPageLevelTargeting());

		// context.set('services.taxonomy.enabled', this.instantConfig.get('icTaxonomyAdTags'));
		// context.set('services.taxonomy.communityId', context.get('wiki.dsSiteKey'));
		//
		// if (this.instantConfig.get('wgAdDriverTestCommunities', []).includes(wikiContext.wgDBname)) {
		// 	context.set('src', 'test');
		// }
		//
		// context.set('services.confiant.enabled', this.instantConfig.get('icConfiant'));
		// context.set('services.durationMedia.enabled', this.instantConfig.get('icDurationMedia'));

		injectIncontentPlayer();

		await uapHelper.configureUap();
		slotsContext.setupStates();

		await setWadContext();
	}
}

export const adsSetup = new ContextSetup();

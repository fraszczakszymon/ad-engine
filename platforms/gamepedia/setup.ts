import { context, instantConfig, setupNpaContext, utils } from '@wikia/ad-engine';
import * as Cookies from 'js-cookie';
import { get, set } from 'lodash';
import { biddersContext } from './bidders/bidders-context';
import { cmpWrapper } from './cmp/cmp-wrapper';
import { slotsContext } from './slots';
import { targeting } from './targeting';
import { templateRegistry } from './templates/templates-registry';
import { registerSlotTracker, registerViewabilityTracker } from './tracking/tracker';

const fallbackInstantConfig = {
	wgAdDriverA9BidderCountries: ['XX'],
	wgAdDriverA9DealsCountries: ['XX'],
	wgAdDriverAppNexusBidderCountries: ['XX'],
	wgAdDriverBabDetection: ['XX'],
	wgAdDriverDelayTimeout: 2000,
	wgAdDriverIndexExchangeBidderCountries: ['XX'],
	wgAdDriverLABradorTestCountries: ['PL/40-cached'],
	wgAdDriverOpenXPrebidBidderCountries: ['XX'],
	wgAdDriverPrebidBidderCountries: ['XX'],
	wgAdDriverPubMaticBidderCountries: ['XX'],
	wgAdDriverRubiconDisplayPrebidCountries: ['XX'],
	wgAdDriverTestCommunities: ['cdm_gamepedia', 'project43'],
	wgAdDriverUapCountries: ['XX'],
	wgAdDriverUapRestriction: 1,
};

class AdsSetup {
	private instantGlobals = {};

	async configure(wikiContext, isOptedIn): Promise<void> {
		set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);
		this.instantGlobals = await instantConfig.getConfig();

		this.setupAdContext(wikiContext, isOptedIn);
		setupNpaContext();
		templateRegistry.registerTemplates();

		registerSlotTracker();
		registerViewabilityTracker();
	}

	private setupAdContext(wikiContext, isOptedIn = false): void {
		const isMobile = !utils.client.isDesktop();

		this.setUpGeoData();

		context.set('wiki', wikiContext);
		context.set('state.showAds', true);
		context.set('state.isMobile', isMobile);
		context.set('state.deviceType', utils.client.getDeviceType());

		context.set('options.tracking.slot.status', true);
		context.set('options.tracking.slot.viewability', true);

		context.set('bidders', biddersContext.generate());

		if (this.isGeoEnabled('wgAdDriverA9BidderCountries')) {
			context.set('bidders.a9.enabled', true);
			context.set('bidders.a9.dealsEnabled', this.isGeoEnabled('wgAdDriverA9DealsCountries'));
		}

		if (this.isGeoEnabled('wgAdDriverPrebidBidderCountries')) {
			context.set('bidders.prebid.enabled', true);
			context.set(
				'bidders.prebid.appnexus.enabled',
				this.isGeoEnabled('wgAdDriverAppNexusBidderCountries'),
			);
			context.set(
				'bidders.prebid.indexExchange.enabled',
				this.isGeoEnabled('wgAdDriverIndexExchangeBidderCountries'),
			);
			context.set(
				'bidders.prebid.openx.enabled',
				this.isGeoEnabled('wgAdDriverOpenXPrebidBidderCountries'),
			);
			context.set(
				'bidders.prebid.pubmatic.enabled',
				this.isGeoEnabled('wgAdDriverPubMaticBidderCountries'),
			);
			context.set(
				'bidders.prebid.rubicon_display.enabled',
				this.isGeoEnabled('wgAdDriverRubiconDisplayPrebidCountries'),
			);
		}

		context.set(
			'bidders.enabled',
			context.get('bidders.prebid.enabled') || context.get('bidders.a9.enabled'),
		);

		this.isGeoEnabled('wgAdDriverLABradorTestCountries');

		context.set('slots', slotsContext.generate());

		if (get(this.instantGlobals, 'wgAdDriverTestCommunities', []).includes(wikiContext.wgDBname)) {
			context.set('src', 'test');
		}

		this.setupPageLevelTargeting(context.get('wiki'));

		if (this.isUapAllowed()) {
			const uapSize: [number, number] = isMobile ? [2, 2] : [3, 3];
			slotsContext.addSlotSize('cdm-zone-01', uapSize);
		}

		// ToDo: rest of context

		context.set(
			'options.maxDelayTimeout',
			get(this.instantGlobals, 'wgAdDriverDelayTimeout', 2000),
		);

		const country = context.get('targeting.geo');

		context.set('options.geoRequiresConsent', cmpWrapper.geoRequiresConsent(country));
		context.set('options.trackingOptIn', isOptedIn);

		slotsContext.setupStates();

		this.updateWadContext();
	}

	private setupPageLevelTargeting(wikiContext): void {
		const pageLevelParams = targeting.getPageLevelTargeting(wikiContext);

		Object.keys(pageLevelParams).forEach((key) => {
			context.set(`targeting.${key}`, pageLevelParams[key]);
		});
	}

	private updateWadContext(): void {
		// BlockAdBlock detection
		context.set('options.wad.enabled', this.isGeoEnabled('wgAdDriverBabDetection'));
	}

	private isGeoEnabled(key: string): boolean {
		return utils.geoService.isProperGeo(this.instantGlobals[key], key);
	}

	private isUapAllowed(): boolean {
		let uapRestriction = this.instantGlobals['wgAdDriverUapRestriction'];
		const queryParam = utils.queryString.get('uap-pv-restriction');

		if (typeof queryParam !== 'undefined') {
			uapRestriction = parseInt(queryParam, 10);
		}

		const isUapAllowed =
			uapRestriction === window.pvNumber || uapRestriction === 0 || context.get('src') === 'test';

		return isUapAllowed && this.isGeoEnabled('wgAdDriverUapCountries');
	}

	private setUpGeoData(): void {
		const country: string = decodeURIComponent(Cookies.get('cdmgeo'));

		context.set('geo.country', country.toUpperCase());
	}
}

export const adsSetup = new AdsSetup();
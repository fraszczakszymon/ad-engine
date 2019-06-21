import { context, instantConfig, setupNpaContext, utils } from '@wikia/ad-engine';
import { get, set } from 'lodash';
import { biddersContext } from './bidders/bidders-context';
import { slotsContext } from './slots';
import { targeting } from './targeting';
import { templateRegistry } from './templates/templates-registry';
import { SlotTracker } from './tracking/slot-tracker';
import { ViewabilityTracker } from './tracking/viewability-tracker';

const fallbackInstantConfig = {
	wgAdDriverA9BidderCountries: ['XX'],
	wgAdDriverA9DealsCountries: ['XX'],
	wgAdDriverAppNexusBidderCountries: ['XX'],
	wgAdDriverBabDetection: ['XX'],
	wgAdDriverDelayTimeout: 2000,
	wgAdDriverIndexExchangeBidderCountries: ['XX'],
	wgAdDriverLABradorTestCountries: ['PL/40-cached'],
	wgAdDriverPrebidBidderCountries: ['XX'],
	wgAdDriverPubMaticBidderCountries: ['XX'],
	wgAdDriverTestCommunities: ['cdm_gamepedia', 'project43'],
	wgAdDriverUapCountries: ['XX'],
	wgAdDriverUapRestriction: 1,
};

class AdsSetup {
	private instantGlobals = {};

	async configure(wikiContext, isOptedIn): Promise<void> {
		set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);
		this.instantGlobals = await instantConfig.getConfig();

		const slotTracker = new SlotTracker();
		const viewabilityTracker = new ViewabilityTracker();

		this.setupAdContext(wikiContext, isOptedIn);
		setupNpaContext();
		templateRegistry.registerTemplates();

		context.push('listeners.slot', slotTracker);
		context.push('listeners.slot', viewabilityTracker);
	}

	private setupAdContext(wikiContext, isOptedIn = false): void {
		context.set('wiki', wikiContext);
		context.set('state.showAds', true);

		const isMobile = !utils.client.isDesktop();

		context.set('state.isMobile', isMobile);
		context.set('state.deviceType', utils.client.getDeviceType());

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
				'bidders.prebid.pubmatic.enabled',
				this.isGeoEnabled('wgAdDriverPubMaticBidderCountries'),
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
}

export const adsSetup = new AdsSetup();

import { Context } from '@ad-engine/core';
import { InstantConfigService } from '@ad-engine/services';

export function setupBidders(context: Context, instantConfig: InstantConfigService): void {
	const hasFeaturedVideo = context.get('custom.hasFeaturedVideo');

	context.set('bidders.a9.enabled', instantConfig.get('icA9Bidder'));
	context.set('bidders.a9.dealsEnabled', instantConfig.get('icA9Deals'));
	context.set('bidders.a9.videoEnabled', instantConfig.get('icA9VideoBidder') && hasFeaturedVideo);
	context.set('bidders.a9.bidsRefreshing.enabled', instantConfig.get('icA9BidRefreshing'));

	if (instantConfig.get('icPrebid')) {
		context.set('bidders.prebid.enabled', true);
		context.set('bidders.prebid.libraryUrl', instantConfig.get('icPrebidVersion'));
		context.set(
			'bidders.prebid.libraryUrl',
			'//origin-images.wikia.com/fandom-ae-assets/prebid.js/v2.44.1/20191219.min.js',
		);
		context.set('bidders.prebid.33across.enabled', instantConfig.get('icPrebid33Across'));
		context.set('bidders.prebid.aol.enabled', instantConfig.get('icPrebidAol'));
		context.set('bidders.prebid.appnexus.enabled', instantConfig.get('icPrebidAppNexus'));
		context.set('bidders.prebid.appnexusAst.enabled', instantConfig.get('icPrebidAppNexusAst'));
		context.set('bidders.prebid.beachfront.enabled', instantConfig.get('icPrebidBeachfront'));
		context.set('bidders.prebid.criteo.enabled', instantConfig.get('icPrebidCriteo'));
		context.set('bidders.prebid.gumgum.enabled', instantConfig.get('icPrebidGumGum'));
		context.set('bidders.prebid.indexExchange.enabled', instantConfig.get('icPrebidIndexExchange'));
		context.set('bidders.prebid.kargo.enabled', instantConfig.get('icPrebidKargo'));
		context.set('bidders.prebid.lkqd.enabled', instantConfig.get('icPrebidLkqd'));
		context.set('bidders.prebid.onemobile.enabled', instantConfig.get('icPrebidOneMobile'));
		context.set('bidders.prebid.openx.enabled', instantConfig.get('icPrebidOpenX'));
		context.set('bidders.prebid.pubmatic.enabled', instantConfig.get('icPrebidPubmatic'));
		context.set(
			'bidders.prebid.rubicon_display.enabled',
			instantConfig.get('icPrebidRubiconDisplay'),
		);
		context.set('bidders.prebid.rubicon.enabled', instantConfig.get('icPrebidRubicon'));
		context.set('bidders.prebid.teads.enabled', instantConfig.get('icPrebidTeads'));
		context.set('bidders.prebid.triplelift.enabled', instantConfig.get('icPrebidTriplelift'));
		context.set('bidders.prebid.vmg.enabled', instantConfig.get('icPrebidVmg'));

		context.set('custom.rubiconInFV', instantConfig.get('icPrebidRubicon') && hasFeaturedVideo);
	}

	context.set(
		'bidders.enabled',
		context.get('bidders.prebid.enabled') || context.get('bidders.a9.enabled'),
	);
}

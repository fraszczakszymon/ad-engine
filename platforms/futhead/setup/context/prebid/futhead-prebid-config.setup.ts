import { DeviceMode, getDeviceMode, getWikiaContext } from '@platforms/shared';
import { context, DiProcess } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';
import { getAppNexusContext } from '../../../bidders/prebid/app-nexus';
import { getIndexExchangeContext } from '../../../bidders/prebid/index-exchange';
import { getNobidContext } from '../../../bidders/prebid/nobid';
import { getPubmaticContext } from '../../../bidders/prebid/pubmatic';
import { getRubiconContext } from '../../../bidders/prebid/rubicon';
import { getTripleliftContext } from '../../../bidders/prebid/triplelift';

@Injectable()
export class FutheadPrebidConfigSetup implements DiProcess {
	execute(): void {
		const mode: DeviceMode = getDeviceMode();

		context.set('bidders.prebid.appnexus', getAppNexusContext(mode));
		context.set('bidders.prebid.indexExchange', getIndexExchangeContext(mode));
		context.set('bidders.prebid.nobid', getNobidContext(mode));
		context.set('bidders.prebid.pubmatic', getPubmaticContext(mode));
		context.set('bidders.prebid.rubicon_display', getRubiconContext(mode));
		context.set('bidders.prebid.triplelift', getTripleliftContext(mode));
		context.set('bidders.prebid.wikia', getWikiaContext(mode));
	}
}

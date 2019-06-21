import { utils } from '@wikia/ad-engine';
import { DeviceMode } from '../models/device-mode';
import { getA9Context } from './repository/a9';
import { getAppNexusContext } from './repository/app-nexus';
import { getIndexExchangeContext } from './repository/index-exchange';
import { getPubmaticContext } from './repository/pubmatic';
import { getWikiaContext } from './repository/wikia';

class BiddersContext {
	private mode: DeviceMode = utils.client.isDesktop() ? 'desktop' : 'mobile';

	generate(): any {
		return {
			enabled: false,
			timeout: 2000,
			a9: {
				enabled: false,
				dealsEnabled: false,
				videoEnabled: false,
				amazonId: '3115',
				slots: getA9Context(this.mode),
			},
			prebid: {
				enabled: false,
				libraryUrl:
					'https://slot1.fandom.com/__am/155542168020822/one/minify%3D1/extensions/wikia/AdEngine3/dist/vendors/prebid.js',
				lazyLoadingEnabled: false,
				bidsRefreshing: {
					enabled: false,
					slots: [],
				},
				appnexus: getAppNexusContext(this.mode),
				indexExchange: getIndexExchangeContext(this.mode),
				pubmatic: getPubmaticContext(this.mode),
				wikia: getWikiaContext(this.mode),
			},
		};
	}
}

export const biddersContext = new BiddersContext();

import { Aol } from './aol';
import { Appnexus } from './appnexus';
import { AppnexusAst } from './appnexus-ast';
import { AudienceNetwork } from './audience-network';
import { Aliases, BaseAdapter } from './base-adapter';
import { Beachfront } from './beachfront';
import { IndexExchange } from './index-exchange';
import { Kargo } from './kargo';
import { Lkqd } from './lkqd';
import { Onemobile } from './onemobile';
import { Openx } from './openx';
import { Pubmatic } from './pubmatic';
import { Rubicon } from './rubicon';
import { RubiconDisplay } from './rubicon-display';
import { Vmg } from './vmg';
import { Wikia } from './wikia';
import { WikiaVideo } from './wikia-video';

const availableAdapters = [
	Aol,
	Appnexus,
	AppnexusAst,
	AudienceNetwork,
	Beachfront,
	IndexExchange,
	Kargo,
	Lkqd,
	Onemobile,
	Openx,
	Pubmatic,
	RubiconDisplay,
	Rubicon,
	Vmg,
	Wikia,
	WikiaVideo,
];

function configureAliases(aliasMap: Aliases): void {
	window.pbjs.que.push(() => {
		Object.keys(aliasMap).forEach((bidderName) => {
			aliasMap[bidderName].forEach((alias) => {
				window.pbjs.aliasBidder(bidderName, alias);
			});
		});
	});
}

function configureCustomAdapter(bidderName: string, instance): void {
	window.pbjs.que.push(() => {
		window.pbjs.registerBidAdapter(instance.create, bidderName);
	});
}

export const adapters = new Map<string, BaseAdapter>();

export function configureAdapters(biddersConfig): void {
	availableAdapters.forEach((adapter) => {
		const adapterConfig = adapter && biddersConfig[adapter.bidderName];

		if (adapterConfig) {
			const instance = new adapter(adapterConfig);
			const aliasMap = adapter.aliases;

			adapters.set(adapter.bidderName, instance);

			if (aliasMap) {
				configureAliases(aliasMap);
			}

			if (adapter.isCustomBidAdapter) {
				configureCustomAdapter(adapter.bidderName, instance);
			}
		}
	});
}

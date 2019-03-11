import {
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
	Rubicon,
	RubiconDisplay,
	Vmg,
	Wikia,
	WikiaVideo,
} from './adapters';

const adapters = [];
const customAdapters = [];
const availableAdapters = {
	aol: Aol,
	appnexus: Appnexus,
	appnexusAst: AppnexusAst,
	audienceNetwork: AudienceNetwork,
	beachfront: Beachfront,
	indexExchange: IndexExchange,
	kargo: Kargo,
	lkqd: Lkqd,
	onemobile: Onemobile,
	openx: Openx,
	pubmatic: Pubmatic,
	rubicon: Rubicon,
	rubiconDisplay: RubiconDisplay,
	vmg: Vmg,
};

function registerAliases() {
	adapters
		.filter((adapter) => adapter.aliases)
		.forEach((adapter) => {
			window.pbjs.que.push(() => {
				const aliasMap = adapter.aliases;

				Object.keys(aliasMap).forEach((bidderName) => {
					aliasMap[bidderName].forEach((alias) => {
						window.pbjs.aliasBidder(bidderName, alias);
					});
				});
			});
		});
}

function setupAdapters(bidders) {
	Object.keys(availableAdapters).forEach((key) => {
		if (bidders[key]) {
			const adapter = new availableAdapters[key](bidders[key]);

			adapters.push(adapter);
		}
	});

	setupCustomAdapters(bidders);
}

function setupCustomAdapters(bidders) {
	if (bidders.wikia) {
		customAdapters.push(new Wikia(bidders.wikia));
	}

	if (bidders.wikiaVideo) {
		customAdapters.push(new WikiaVideo(bidders.wikiaVideo));
	}

	customAdapters.forEach((adapter) => {
		adapters.push(adapter);

		window.pbjs.que.push(() => {
			window.pbjs.registerBidAdapter(adapter.create, adapter.bidderName);
		});
	});
}

export function getPriorities() {
	const priorities = {};

	adapters.forEach((adapter) => {
		priorities[adapter.bidderName] = adapter.priority || 1;
	});

	return priorities;
}

export function getAdapters(config) {
	if (adapters.length === 0 && config) {
		setupAdapters(config);
		registerAliases();
	}

	return adapters;
}

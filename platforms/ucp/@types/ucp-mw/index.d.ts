interface MediaWikiAdsContext {
	targeting: {
		esrbRating: string;
		pageArticleId: number;
		mappedVerticalName: string;
		pageName: string;
		pageType: string;
		wikiDbName: string;
		wikiLanguage: string;
	};
}

interface MediaWikiAds {
	context?: MediaWikiAdsContext;
	runtime: Runtime;
}

interface MediaWiki {
	config: {
		values: {};
	};

	loader: {
		using: (input: string) => Promise<void>;
	};

	hook(eventName: string): Hook;
}

/**
 * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.hook
 */
interface Hook {
	add(handler: () => void): void;

	fire(data: any): void;

	remove(handler: () => void): void;
}

import { Dictionary, utils } from '@wikia/ad-engine';

function getPageType(wg): string {
	if (wg.wgIsMainPage) {
		return 'main';
	}

	if (wg.wgIsArticle) {
		return 'article';
	}

	return 'unknown';
}

function getSkin(wikiContext): string {
	let wikiSkin = wikiContext.skin;
	const skins = ['hydra', 'minerva'];

	skins.forEach((skin) => {
		if (wikiContext.skin.includes(skin)) {
			wikiSkin = skin;
		}
	});

	return wikiSkin;
}

export const targeting = {
	getPageLevelTargeting(wikiContext: any = {}): any {
		const pageTargeting: Dictionary<string> = {
			articleId: wikiContext.wgArticleId,
			pName: wikiContext.wgPageName,
			s2: getPageType(wikiContext),
			sdName: wikiContext.wgDBname,
			skin: getSkin(wikiContext),
			userLanguage: wikiContext.wgUserLanguage,
			wikiId: wikiContext.dsSiteKey,
			pv: window.pvNumber.toString(),
		};

		const cid = utils.queryString.get('cid');

		if (cid !== undefined) {
			pageTargeting.cid = cid;
		}

		return pageTargeting;
	},
};

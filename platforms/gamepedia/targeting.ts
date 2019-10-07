import { TargetingSetup } from '@platforms/shared';
import { context, Dictionary, Targeting, utils } from '@wikia/ad-engine';

export class GamepediaTargetingSetup implements TargetingSetup {
	setTargeting(): void {
		context.set('targeting', this.getPageLevelTargeting());
	}

	private getPageLevelTargeting(): Partial<Targeting> {
		const wikiContext = context.get('wiki') || {};
		const pageTargeting: Dictionary<string> = {
			ae3: '1',
			uap: 'none',
			uap_c: 'none',
			artid: wikiContext.wgArticleId && wikiContext.wgArticleId.toString(),
			dmn: this.getDomain(),
			pName: wikiContext.wgPageName,
			pv: window.pvNumber && window.pvNumber.toString(),
			s0: 'gaming',
			s1: wikiContext.wgDBname,
			s2: this.getPageType(wikiContext),
			sdName: wikiContext.wgDBname,
			skin: this.getSkin(wikiContext),
		};

		const cid = utils.queryString.get('cid');

		if (cid !== undefined) {
			pageTargeting.cid = cid;
		}

		return pageTargeting;
	}

	private getPageType(wg): string {
		if (wg.wgIsMainPage) {
			return 'main';
		}

		if (wg.wgIsArticle) {
			return 'article';
		}

		return 'unknown';
	}

	private getSkin(wikiContext): string {
		let wikiSkin = wikiContext.skin;
		const skins = ['hydra', 'minerva'];

		skins.forEach((skin) => {
			if (wikiContext.skin.includes(skin)) {
				wikiSkin = skin;
			}
		});

		return wikiSkin;
	}

	private getDomain(): string {
		const hostname = window.location.hostname.toLowerCase();
		const pieces = hostname.split('.');
		const np = pieces.length;

		return `${pieces[np - 2]}${pieces[np - 1]}`;
	}
}

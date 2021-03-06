import { context, DiProcess } from '@wikia/ad-engine';

export class WikiContextSetup implements DiProcess {
	execute(): void {
		const wikiContext = {
			beaconId: window.beaconId || window.beacon_id,
			pvNumber: window.pvNumber,
			pvNumberGlobal: window.pvNumberGlobal,
			pvUID: window.pvUID,
			sessionId: window.sessionId || window.session_id,

			...(window.mw && window.mw.config ? window.mw.config.values : {}),
			...(window.ads ? window.ads.context : {}),
		};

		context.set('wiki', wikiContext);
	}
}

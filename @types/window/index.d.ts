// tslint:disable-next-line:no-reference
///<reference path="../../node_modules/@alugha/ima/typings/ima.d.ts"/>

interface Window {
	AdEngine_adType?: any;
	ads?: Ads;
	buildAdUnitString?: (arg0: string, arg1: any) => string;
	confiant?: Confiant;
	google: {
		ima: typeof google.ima;
	};
	googletag: googletag.Googletag;
	moatPrebidApi?: MoatPrebidApi;
	moatYieldReady?: MoatYieldReady;
	Krux?: KruxQueue;
	moatjw?: MoatJW;
	// No types available for Twitch embedded player.
	Twitch?: any;
	// No types easily available for pbjs.
	pbjs?: any;
	pvNumber?: number;
}

declare var NOLBUNDLE: any;

interface Window {
	__cmp?: any;
	__cmpStored?: any;
	// ads: Ads;
	adsQueue?: any;
	mw?: any;
	pbjs?: any;
	RLQ?: any;
	XMLHttpRequest?: any;
	sessionId?: string;
	pvNumber?: number;
	pvNumberGlobal?: number;
	pvUID?: string;
	wgWikiaCookieDomain?: string;
	wgCookiePath?: string;
	beacon_id?: string;
	session_id?: string;
	wikiaSessionId?: string;
}

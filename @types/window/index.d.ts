// tslint:disable-next-line:no-reference
///<reference path="../../node_modules/@alugha/ima/typings/ima.d.ts"/>

interface Window {
	ads?: Ads;
	google: {
		ima: typeof google.ima;
	};
}

declare var NOLBUNDLE: any;

import GoogleImaPlayerFactory from './google-ima-player-factory';
import ScriptLoader from '../../../utils/script-loader';

const imaLibraryUrl = '//imasdk.googleapis.com/js/sdkloader/ima3.js';

function load() {
	if (window.google && window.google.ima) {
		return new Promise((resolve) => {
			resolve();
		});
	}

	return ScriptLoader.loadScript(imaLibraryUrl);
}

function getPlayer(params) {
	const adDisplayContainer = new window.google.ima.AdDisplayContainer(params.container),
		adsLoader = new window.google.ima.AdsLoader(adDisplayContainer);

	return GoogleImaPlayerFactory.create(adDisplayContainer, adsLoader, params);
}

export default {
	load,
	getPlayer
};

'use strict';

import VastBuilder from './vast-builder';

const playerUrl = '//cdn.playwire.com/bolt/js/zeus/embed.js';

export default class Playwire {
	static getConfigUrl(publisherId, videoId) {
		return `//config.playwire.com/${publisherId}/videos/v2/${videoId}/zeus.json`;
	}

	static inject(params) {
		const configUrl = params.configUrl,
			  container = params.container,
			  height = params.height,
			  slotName = params.slotName,
			  width = params.width;

		var script = document.createElement('script'),
			vastUrl = params.vastUrl;

		if (!vastUrl) {
			vastUrl = VastBuilder.build('playwire', slotName, width/height);
		}

		script.setAttribute('data-config', configUrl);
		script.setAttribute('data-ad-tag', vastUrl);

		script.setAttribute('type', 'text/javascript');
		script.src = playerUrl;

		container.appendChild(script);
	}
}

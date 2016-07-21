'use strict';

import VastBuilder from './vast-builder';

const playerUrl = '//cdn.playwire.com/bolt/js/zeus/embed.js';

export default class Playwire {
	static getConfigUrl(publisherId, videoId) {
		return `//config.playwire.com/${publisherId}/videos/v2/${videoId}/zeus.json`;
	}

	static inject(configUrl, parent, vastUrl = null) {
		var script = document.createElement('script');

		if (!vastUrl) {
			vastUrl = VastBuilder.build();
		}

		script.setAttribute('data-config', configUrl);
		script.setAttribute('data-ad-tag', vastUrl);

		script.setAttribute('type', 'text/javascript');
		script.src = playerUrl;

		parent.appendChild(script);
	}
}

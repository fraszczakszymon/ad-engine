'use strict';

import VastBuilder from './vast-builder';

const playerUrl = '//cdn.playwire.com/bolt/js/zeus/embed.js';

export default class Playwire {
	static getConfigUrl(publisherId, videoId) {
		return `//config.playwire.com/${publisherId}/videos/v2/${videoId}/zeus.json`;
	}

	static inject(params = {}) {
		var configUrl = params.configUrl,
			container = params.container,
			playerId = 'playwire_' + Math.floor((1 + Math.random()) * 0x10000),
			script = document.createElement('script'),
			win = container.ownerDocument.defaultView || container.ownerDocument.parentWindow;

		if (!params.vastUrl) {
			params.vastUrl = VastBuilder.build();
		}

		win.onReady = function () {
			params.onReady(win.Bolt, playerId)
		};

		script.setAttribute('data-id', playerId);
		script.setAttribute('data-config', configUrl);
		script.setAttribute('data-ad-tag', params.vastUrl);

		if (params.onReady) {
			script.setAttribute('data-onready', 'onReady');
		}

		script.setAttribute('type', 'text/javascript');
		script.src = playerUrl;

		container.appendChild(script);
	}
}

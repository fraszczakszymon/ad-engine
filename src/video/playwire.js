'use strict';

import VastBuilder from './vast-builder';
import { logger } from '../utils/logger';

const logGroup = 'playwire',
	playerUrl = '//cdn.playwire.com/bolt/js/zeus/embed.js';

export default class Playwire {
	static getConfigUrl(publisherId, videoId) {
		return `//config.playwire.com/${publisherId}/videos/v2/${videoId}/zeus.json`;
	}

	static inject(params) {
		const configUrl = params.configUrl,
			container = params.container,
			height = params.height,
			playerId = 'playwire_' + Math.floor((1 + Math.random()) * 0x10000),
			slotName = params.slotName,
			width = params.width,
			win = container.ownerDocument.defaultView || container.ownerDocument.parentWindow;

		var script = document.createElement('script'),
			vastUrl = params.vastUrl;

		if (!vastUrl) {
			vastUrl = VastBuilder.build('playwire', slotName, width / height);
		}

		win.onReady = function () {
			params.onReady(win.Bolt, playerId)
		};

		script.setAttribute('data-id', playerId);
		script.setAttribute('data-config', configUrl);
		script.setAttribute('data-ad-tag', vastUrl);

		if (params.onReady) {
			script.setAttribute('data-onready', 'onReady');
		}

		script.setAttribute('type', 'text/javascript');
		script.src = playerUrl;

		container.appendChild(script);
		logger(logGroup, 'Inject player', params);
	}
}

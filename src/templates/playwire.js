'use strict';

import Player from '../video/playwire';

export default class Playwire {
	init(params) {
		if (!params.configUrl) {
			params.configUrl = Player.getConfigUrl(params.publisherId, params.videoId);
		}

		if (params.container) {
			Player.inject(params.configUrl, params.container, params.vastUrl);
		}
	}
}

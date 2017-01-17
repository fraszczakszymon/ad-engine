import Player from '../video/player/playwire/playwire';

export default class Playwire {
	init(params) {
		if (!params.configUrl) {
			params.configUrl = Player.getConfigUrl(params.publisherId, params.videoId);
		}

		if (params.container) {
			Player.inject(params);
		}
	}
}

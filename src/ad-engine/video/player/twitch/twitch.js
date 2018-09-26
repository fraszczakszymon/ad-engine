import { twitchEmbed } from './embed/twitch-embed';

export class TwitchPlayer {
	constructor(identifier, videoSettings) {
		this.identifier = identifier;
		this.videoSettings = videoSettings;
	}

	async getPlayer() {
		this.player = await Twitch.inject(this.identifier, this.videoSettings);

		return this.player;
	}

	addEventListener(eventName, callback) {
		this.player.addEventListener(eventName, callback);
	}

	getIdentifier() {
		return this.identifier;
	}

	getVideoSettings() {
		return this.videoSettings;
	}
}

export class Twitch {
	static inject(identifier, videoSettings) {
		return twitchEmbed.load()
			.then((player) => {
				twitchEmbed.getPlayer(identifier, videoSettings);

				return player;
			});
	}
}

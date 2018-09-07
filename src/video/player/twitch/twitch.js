import { twitchEmbed } from './embed/twitch-embed';

export class TwitchPlayer {
	constructor(identifier, videoSettings) {
		this.identifier = identifier;
		this.videoSettings = videoSettings;

		this.player = Twitch.inject(identifier, videoSettings);
	}

	getIdentifier() {
		return this.identifier;
	}

	setVolume(volume) {
		this.player.setVolume(volume);
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

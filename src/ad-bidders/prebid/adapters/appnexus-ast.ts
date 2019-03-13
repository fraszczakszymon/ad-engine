import { utils } from '@wikia/ad-engine';
import { AdUnitConfig, Aliases, BaseAdapter } from './base-adapter';

export class AppnexusAst extends BaseAdapter {
	static bidderName = 'appnexusAst';
	aliases: Aliases;
	debugPlacementId: string;
	isDebugMode: boolean;

	constructor(options) {
		super(options);

		this.aliases = {
			appnexus: [this.bidderName],
		};
		this.debugPlacementId = options.debugPlacementId;
		this.isDebugMode = utils.queryString.get('appnexusast_debug_mode') === '1';
	}

	get bidderName(): string {
		return AppnexusAst.bidderName;
	}

	prepareConfigForAdUnit(code, { placementId }): AdUnitConfig {
		return {
			code,
			mediaTypes: {
				video: {
					context: 'instream',
					playerSize: [640, 480],
				},
			},
			bids: [
				{
					bidder: this.bidderName,
					params: {
						placementId: this.isDebugMode ? this.debugPlacementId : placementId,
						video: {
							skippable: false,
							playback_method: ['auto_play_sound_off'],
						},
					},
				},
			],
		};
	}
}

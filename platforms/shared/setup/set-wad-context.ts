import { context, InstantConfigService } from '@wikia/ad-engine';

export async function setWadContext(): Promise<void> {
	const instantConfig = await InstantConfigService.init();
	const babEnabled = instantConfig.get('icBabDetection');

	// BlockAdBlock detection
	context.set('options.wad.enabled', babEnabled);

	if (!context.get('state.isLogged') && babEnabled) {
		// BT rec
		context.set('options.wad.btRec.enabled', this.instantConfig.get('icBTRec'));
	}
}

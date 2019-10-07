import { context, InstantConfigService, setupBidders, utils } from '@wikia/ad-engine';
import { slotsContext } from '../slots';
import { UapHelper } from '../templates/uap-helper';
import { injectIncontentPlayer } from './inject-incontent-player';

export class SharedContextSetup {
	constructor(private instantConfig: InstantConfigService) {}

	setup({ isOptedIn = false } = {}): void {
		this.setState();
		this.setOptions(isOptedIn);
		this.setServices();
		this.setMisc();
		setupBidders(context, this.instantConfig);
		context.set('slots', slotsContext.generate());
		injectIncontentPlayer();
		new UapHelper(this.instantConfig).configureUap();
		slotsContext.setupStates();
	}

	private setState(): void {
		context.set('state.showAds', !utils.client.isSteamPlatform());
		context.set('state.deviceType', utils.client.getDeviceType());
		context.set('state.isLogged', !!context.get('wiki.wgUserId'));
	}

	private setOptions(isOptedIn: boolean): void {
		context.set('options.tracking.kikimora.player', true);
		context.set('options.tracking.slot.status', true);
		context.set('options.tracking.slot.viewability', true);
		context.set('options.tracking.postmessage', this.instantConfig.get('icPostmessageTracking'));
		context.set('options.trackingOptIn', isOptedIn);
		context.set('options.maxDelayTimeout', this.instantConfig.get('wgAdDriverDelayTimeout', 2000));
		context.set(
			'options.video.isOutstreamEnabled',
			this.instantConfig.isGeoEnabled('wgAdDriverOutstreamSlotCountries'),
		);
		this.setWadContext();
	}

	private setWadContext(): void {
		const babEnabled = this.instantConfig.get('icBabDetection');

		// BlockAdBlock detection
		context.set('options.wad.enabled', babEnabled);

		if (!context.get('state.isLogged') && babEnabled) {
			// BT rec
			context.set('options.wad.btRec.enabled', this.instantConfig.get('icBTRec'));
		}
	}

	private setServices(): void {
		context.set('services.taxonomy.enabled', this.instantConfig.get('icTaxonomyAdTags'));
		context.set('services.taxonomy.communityId', context.get('wiki.dsSiteKey'));
		context.set('services.confiant.enabled', this.instantConfig.get('icConfiant'));
		context.set('services.durationMedia.enabled', this.instantConfig.get('icDurationMedia'));
	}

	private setMisc(): void {
		if (
			this.instantConfig.get('wgAdDriverTestCommunities', []).includes(context.get('wiki.wgDBname'))
		) {
			context.set('src', 'test');
		}

		this.instantConfig.isGeoEnabled('wgAdDriverLABradorTestCountries');
	}
}

export default {
	src: 'test',
	adUnitId: '/{networkId}/wka.life/_project43//article/gpt/{slotConfig.slotName}',
	events: {
		pushOnScroll: {
			ids: [
				'gpt-incontent-boxad'
			],
			threshold: 100
		}
	},
	options: {
		maxDelayTimeout: 2000,
		porvata: {
			audio: {
				exposeToSlot: true,
				segment: '-audio',
				key: 'audio'
			}
		},
		customAdLoader: {
			globalMethodName: 'loadCustomAd'
		}
	},
	listeners: {
		porvata: [
			{
				onEvent(eventName, params, data) {
					console.log('🗣 Custom listener: onEvent', eventName, data);
				}
			}
		],
		slot: [
			{
				onRenderEnded(adSlot) {
					console.log('💸 Custom listener: onRenderEnded', adSlot.getId());
				},
				onImpressionViewable(adSlot) {
					console.log('👁 Custom listener: onImpressionViewable', adSlot.getId());
				}
			}
		]
	},
	networkId: '5441',
	slots: {
		'top-leaderboard': {
			slotName: 'TOP_LEADERBOARD',
			aboveTheFold: true,
			sizes: [
				{
					viewportSize: [728, 0],
					sizes: [[728, 90]]
				}
			],
			defaultSizes: [[300, 250]],
			targeting: {
				loc: 'top'
			}
		},
		'top-boxad': {
			slotName: 'TOP_BOXAD',
			aboveTheFold: true,
			sizes: [
				{
					viewportSize: [768, 0],
					sizes: [[300, 250], [300, 600]]
				}
			],
			defaultSizes: [[300, 250]],
			targeting: {
				loc() {
					return window.innerWidth < 800 ? 'middle' : 'top';
				}
			}
		},
		'incontent-boxad': {
			slotName: 'INCONTENT_BOXAD',
			sizes: [
				{
					viewportSize: [768, 0],
					sizes: [[300, 250], [300, 600]]
				}
			],
			defaultSizes: [[300, 250]],
			defaultTemplate: 'floating-ad',
			targeting: {
				loc: 'hivi'
			}
		},
		'top-video': {
			lowerSlotName: 'outstream',
			slotGroup: 'VIDEO',
			slotName: 'OUTSTREAM',
			targeting: {},
			videoAdUnit: '/{networkId}/wka1a.{slotConfig.slotGroup}/{slotConfig.lowerSlotName}' +
			'{slotConfig.audioSegment}/{custom.device}/ae-{custom.adLayout}/_example'
		}
	},
	state: {
		adStack: window.adsQueue,
		isMobile: false
	},
	targeting: {
		s1: '_project43'
	},
	vast: {
		size: [640, 480],
		adUnitId: '/{networkId}/wka.life/_project43//article/{src}/{slotConfig.slotName}'
	}
};

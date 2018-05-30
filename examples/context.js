export default {
	src: 'test',
	adUnitId: '/{networkId}/wka.life/_project43//article/gpt/{slotConfig.slotName}',
	events: {
		pushOnScroll: {
			ids: [
				'incontent_boxad',
				'bottom_leaderboard'
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
		video: {
			moatTracking: {
				enabled: true,
				partnerCode: 'wikiaimajsint377461931603',
				sampling: 1
			}
		},
		customAdLoader: {
			globalMethodName: 'loadCustomAd'
		},
		slotRepeater: true,
		trackingOptIn: false
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
					console.log('💸 Custom listener: onRenderEnded', adSlot.getSlotName());
				},
				onImpressionViewable(adSlot) {
					console.log('👁 Custom listener: onImpressionViewable', adSlot.getSlotName());
				}
			}
		]
	},
	networkId: '5441',
	slots: {
		top_leaderboard: {
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
		top_boxad: {
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
		incontent_boxad: {
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
		repeatable_boxad_1: {
			defaultSizes: [[300, 250]],
			repeat: {
				additionalClasses: 'hide',
				index: 1,
				insertBeforeSelector: '.main p',
				limit: null,
				slotNamePattern: 'repeatable_boxad_{slotConfig.repeat.index}',
				updateProperties: {
					'targeting.rv': '{slotConfig.repeat.index}'
				}
			},
			sizes: [
				{
					viewportSize: [768, 0],
					sizes: [[300, 250], [300, 600]]
				}
			],
			targeting: {
				loc: 'hivi',
				pos: 'repeatable_boxad',
				rv: 1
			}
		},
		bottom_leaderboard: {
			sizes: [
				{
					viewportSize: [728, 0],
					sizes: [[728, 90]]
				}
			],
			defaultSizes: [[300, 250]],
			targeting: {
				loc: 'footer'
			},
			viewportConflicts: [
				'top_boxad'
			]
		},
		outstream: {
			lowerSlotName: 'outstream',
			slotGroup: 'VIDEO',
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

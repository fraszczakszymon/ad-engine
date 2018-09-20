import { slotService, utils } from '@wikia/ad-engine';

const disabledSlots = utils.queryString.get('disabled-slots');

if (disabledSlots) {
	disabledSlots.split(',').forEach(slotName => slotService.disable(slotName));
}

export default {
	src: 'test',
	adUnitId: '/5441/wka.life/_project43//{custom.namespace}/{slotConfig.targeting.src}/{slotConfig.slotName}',
	bidders: {
		timeout: 2000,
		a9: {
			enabled: true,
			videoEnabled: false,
			amazonId: '3115',
			slots: {
				top_leaderboard: [
					[728, 90]
				],
				top_boxad: [
					[300, 250]
				]
			},
			slotsVideo: []
		},
		prebid: {
			enabled: true,
			libraryUrl: '../../vendor/dist/prebid.min.js',
			lazyLoadingEnabled: false,
			bidsRefreshing: {
				enabled: true,
				slots: ['top_boxad']
			},
			wikia: {
				enabled: true,
				slots: {
					top_leaderboard: {
						sizes: [
							[728, 90]
						]
					},
					top_boxad: {
						sizes: [
							[300, 250]
						]
					},
					bottom_leaderboard: {
						sizes: [
							[728, 90]
						]
					}
				}
			},
			wikiaVideo: {
				enabled: true,
				slots: {
					featured: {},
					incontent_player: {}
				}
			}
		}
	},
	custom: {
		namespace: 'article'
	},
	events: {
		pushOnScroll: {
			ids: [
				'incontent_boxad',
				'bottom_leaderboard'
			],
			threshold: 100
		},
		pushAfterRendered: {
			repeatable_boxad_1: [
				'incontent_player'
			]
		}
	},
	options: {
		customAdLoader: {
			globalMethodName: 'loadCustomAd'
		},
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
					sizes: [[728, 90], [3, 3]]
				}
			],
			defaultSizes: [[300, 250], [2, 2]],
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
		incontent_player: {
			avoidConflictWith: '.repeatable-boxad',
			defaultSizes: [[1, 1]],
			insertBeforeSelector: '.main p',
			targeting: {
				loc: 'hivi'
			}
		},
		invisible_skin: {
			sizes: [
				{
					viewportSize: [768, 0],
					sizes: [[1000, 1000]]
				}
			],
			defaultSizes: [[1000, 1000]]
		},
		repeatable_boxad_1: {
			bidderAlias: 'top_boxad',
			defaultSizes: [[300, 250]],
			avoidConflictWith: '.repeatable-boxad,#incontent_player',
			insertBeforeSelector: '.main p',
			repeat: {
				additionalClasses: 'hide',
				index: 1,
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
			disabled: true,
			sizes: [
				{
					viewportSize: [728, 0],
					sizes: [[728, 90], [3, 3]]
				}
			],
			defaultSizes: [[300, 250], [2, 2]],
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
	services: {
		billTheLizard: {
			enabled: true,
			host: 'https://services.wikia-dev.pl',
			endpoint: 'bill-the-lizard/predict',
			projects: {
				queen_of_hearts: [
					{
						name: 'ctp_desktop:1.0.0',
						countries: ['XX/50'],
						on_0: ['logResult'],
						on_1: ['logResult']
					},
					{
						name: 'queen_of_hearts:0.0.1',
						countries: ['XX'],
						dfp_targeting: true,
						on_1: ['logResult']
					}
				],
				cheshire_cat: [
					{
						name: 'cheshirecat:0.0.1',
						countries: ['XX'],
						is_lazy_called: true,
						on_0: ['logResult'],
						on_1: ['logResult']
					}
				]
			},
			parameters: {
				queen_of_hearts: {
					device: 'tablet',
					v1: 'Fgas3ooM',
					geo: 'PL',
					wiki_id: 245424,
					vtags: 'Twin Peaks',
					esrb: 'mature',
					s0v: 'tv',
					ref: 'direct',
					top_1k: 0,
					s2: 'article',
				},
				cheshire_cat: {
					bids: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1].join(';'),
				}
			},
			timeout: 2000
		},
		krux: {
			enabled: true,
			id: 'KPSUiAKl'
		}
	},
	state: {
		adStack: window.adsQueue,
		isMobile: false
	},
	targeting: {
		ae3: '1',
		outstream: 'none',
		s1: '_project43',
		uap: 'none'
	},
	vast: {
		size: [640, 480],
		adUnitId: '/{networkId}/wka.life/_project43//{custom.namespace}/' +
		'{slotConfig.targeting.src}/{slotConfig.slotName}'
	}
};

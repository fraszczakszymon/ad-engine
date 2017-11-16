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
			lowerSlotName: 'video',
			slotGroup: 'VIDEO',
			slotName: 'VIDEO',
			targeting: {}
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
		adUnitId: '/{networkId}/wka.life/_project43//article/{src}/{slotConfig.slotName}',
		megaAdUnitId: '/{networkId}/wka1a.{slotConfig.slotGroup}/{slotConfig.lowerSlotName}' +
			'/{custom.device}/fandom-{custom.adLayout}/fandom-{targeting.vertical}'
	}
};

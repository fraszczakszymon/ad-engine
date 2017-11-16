export default {
	adUnitId: '/5441/something/_{custom.pageType}/{slotConfig.slotName}',
	events: {
		pushOnScroll: {
			ids: [
				'gpt-incontent-boxad-desktop',
				'gpt-incontent-boxad-mobile',
				'gpt-bottom-leaderboard',
				'gpt-bottom-leaderboard-desktop',
				'gpt-bottom-leaderboard-mobile'
			],
			threshold: 100
		}
	},
	slots: {
		'top-leaderboard': {
			slotName: 'TOP_LEADERBOARD',
			aboveTheFold: true,
			sizes: [
				{
					viewportSize: [1440, 350],
					sizes: [[728, 90], [970, 250], [1024, 416], [1440, 585]]
				},
				{
					viewportSize: [1024, 300],
					sizes: [[728, 90], [970, 250], [1024, 416]]
				},
				{
					viewportSize: [970, 200],
					sizes: [[728, 90], [970, 250]]
				},
				{
					viewportSize: [728, 200],
					sizes: [[728, 90]]
				},
				{
					viewportSize: [320, 200],
					sizes: [[300, 250], [320, 480]]
				},
				{
					viewportSize: [0, 0],
					sizes: [[300, 250]]
				}
			],
			defaultSizes: [[728, 90], [970, 250], [1024, 416], [1440, 585]],
			targeting: {
				loc: 'top'
			}
		},
		'bottom-leaderboard': {
			disabled: true,
			slotName: 'BOTTOM_LEADERBOARD',
			sizes: [
				{
					viewportSize: [1024, 300],
					sizes: [[728, 90], [1024, 416]]
				},
				{
					viewportSize: [728, 100],
					sizes: [[728, 90]]
				},
				{
					viewportSize: [320, 200],
					sizes: [[320, 480]]
				}
			],
			defaultSizes: [],
			targeting: {
				loc: 'bottom'
			}
		},
		'top-boxad': {
			slotName: 'TOP_BOXAD',
			aboveTheFold: true,
			sizes: [
				{
					viewportSize: [0, 0],
					sizes: [[300, 250]]
				},
				{
					viewportSize: [768, 200],
					sizes: [[300, 250], [300, 600], [300, 1050]]
				}
			],
			defaultSizes: [[300, 250], [300, 600], [300, 1050]],
			targeting: {
				loc: 'top'
			}
		},
		'incontent-boxad': {
			disabled: true,
			slotName: 'INCONTENT_BOXAD',
			sizes: [
				{
					viewportSize: [0, 0],
					sizes: [[300, 250]]
				},
				{
					viewportSize: [768, 200],
					sizes: [[300, 250], [300, 600]]
				}
			],
			defaultSizes: [[300, 250], [300, 600]],
			defaultTemplate: 'floating-ad',
			targeting: {
				loc: 'hivi'
			}
		},
		'bottom-boxad': {
			slotName: 'BOTTOM_BOXAD',
			sizes: [
				{
					viewportSize: [0, 0],
					sizes: [[300, 250]]
				},
				{
					viewportSize: [768, 200],
					sizes: [[300, 250], [300, 600], [300, 1050]]
				}
			],
			defaultSizes: [[300, 250], [300, 1050], [300, 600]],
			targeting: {
				loc: 'bottom'
			}
		},
		'top-skin': {
			slotName: 'INVISIBLE_SKIN',
			aboveTheFold: true,
			sizes: [
				{
					viewportSize: [1064, 600],
					sizes: [[1000, 1000]]
				},
				{
					viewportSize: [0, 0],
					sizes: []
				}
			],
			defaultSizes: [[1000, 1000]],
			targeting: {
				loc: 'top'
			}
		}
	}
};

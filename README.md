# AdEngine

## Installation

```bash
npm install github:Wikia/ad-engine#v10.0.0
```

## Usage (ES6)

### Load GPT library

Follow [DoubleClick for Publishers instructions](https://support.google.com/dfp_premium/answer/1638622?hl=en).

### Prepare configuration

Create context.js module with local config:

```javascript
'use strict';

import Context from 'wikia/ad-engine/src/services/context-service';

Context.extend({
	adUnitId: '/5441/name/_{custom.namespace}/{slotName}',
	events: {
		pushOnScroll: {
			ids: [
				'bottom_leaderboard'
			],
			threshold: 100
		}
	},
	listeners: {
		porvata: [],
		slot: []
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
				enabled: false,
				partnerCode: 'foo',
				sampling: 1
			}
		},
		customAdLoader: {
			globalMethodName: 'loadCustomAd'
		}
	},
	slots: {
		top_leaderboard: {
			aboveTheFold: true,
			sizes: [
				{
					viewportSize: [970, 200],
					sizes: [[728, 90], [970, 250]]
				},
				{
					viewportSize: [728, 200],
					sizes: [[728, 90]]
				},
				{
					viewportSize: [0, 0],
					sizes: [[300, 250]]
				}
			],
			defaultSizes: [[728, 90], [970, 250]],
			targeting: {
				loc: 'top'
			}
		},
		incontent_boxad_1: {
			defaultSizes: [[300, 250]],
			repeatable: {
				additionalClasses: 'hide',
				appendBeforeSelector: '.main p',
				limit: null,
				slotNamePattern: 'incontent_boxad_{slotConfig.targeting.rv}',
				targetingKey: 'rv'
			},
			sizes: [
				{
					viewportSize: [768, 0],
					sizes: [[300, 250], [300, 600]]
				}
			],
			targeting: {
				loc: 'hivi',
				pos: 'incontent_boxad',
				rv: 1
			}
		},
		bottom_leaderboard: {
			disabled: true,
			sizes: [
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
			},
			viewportConflicts: [
				'top_leaderboard'
			]
		}
	}
});

export default Context;

```

### Run AdEngine module

Setup custom page level targeting and initialize AdEngine.

```javascript
import AdEngine from 'wikia/ad-engine/src/ad-engine';
import Context from './context';

// ...

window.adsQueue = window.adsQueue || [];

// Setup adStack so slots can be pushed to window.* from DOM/other JS scripts
Context.set('state.adStack', window.adsQueue);

// Setup screen size
Context.set('state.isMobile', true);

// Setup custom variables so they can be used in adUnitId configuration
Context.set('custom.namespace', 'article');

// Setup gpt targeting
Context.set('targeting.post_id', 123);

new AdEngine().init();
```

### Request ad slot

Request immediately:

```html
<div id="top_leaderboard">
	<script>
		window.adsQueue.push({
			id: 'top_leaderboard'
		});
	</script>
</div>
```

or prepare on scroll container (check above context configuration):

```html
<div id="bottom_leaderboard"></div>
```

### Debug mode

Add `adengine_debug=1` to see all logged events in console.
In order to get logs from specified groups use `?adengine_debug=<group_name_1>,<group_name_2>,...`.

## Example pages

* [Browser detect](examples/utils/browser-detect)
* [AdBlock detect](examples/utils/block-detect)
* [Floating ad template](examples/templates/floating-ad)
* [Slot animations](examples/slots/animations)
* [Block BTF](examples/slots/block-btf)
* [BTF only (skip ATF slots)](examples/slots/btf-only)
* [AdEngine start delay](examples/slots/delay)
* [Ad empty response](examples/slots/empty-response)
* [Repeatable slots](examples/slots/repeatable-slots)
* [Viewport conflicts](examples/slots/viewport-conflicts)
* [Porvata video player](examples/video/porvata)

### Access examples

Build bundle package

```bash
npm run build
```

Build bundle package and start http server by running

```bash
npm run serve
```

Navigate to <http://localhost:8081/> (you may have different port)

## Run tests

```bash
npm run test
```

## Lint all files

```bash
npm run lint
```

## Publish new version

:warning: Make sure you're using latest version of node/npm (preferably node@9.x.x and npm@5.x.x)
1. Use your regular workflow. Push changes to branch, test them and create pull request to dev.
2. Switch to dev branch once you merge all changes and pull new changes from github
3. Bump version (remember to follow Semantic Versioning)
```
npm version patch
```
This command runs preversion script which:

* run all tests
* lint all files
* build dist directory with output files for "client's" repositories
* adds built files to commited version
4. Push changes to github
```
git push --follow-tags
```

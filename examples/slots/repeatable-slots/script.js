import adContext from '../../context';
import { AdEngine, btfBlockerService, context, utils } from '@wikia/ad-engine';

new AdEngine(adContext).init();

const contentTemplate = document.querySelector('.content-template').innerHTML;
const mainContainer = document.getElementById('main-container');
const limit = utils.queryString.get('limit') || null;
const contentLength = utils.queryString.get('content_length') || 1;

function loadContent() {
	var newContent = document.createElement('div');

	newContent.innerHTML = contentTemplate;

	mainContainer.appendChild(newContent);
	console.log("📖 Load content");
}

context.set('slots.REPEATABLE_BOXAD_1.repeatable.limit', limit);

for (let i = 0; i < contentLength; i++ ) {
	loadContent();
}

btfBlockerService.finishAboveTheFold();

window.adsQueue.push({
	id: 'REPEATABLE_BOXAD_1'
});

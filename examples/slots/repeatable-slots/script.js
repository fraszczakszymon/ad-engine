import { AdEngine, btfBlockerService, context, utils } from '@wikia/ad-engine';
import adContext from '../../context';

new AdEngine(adContext).init();

const contentTemplate = document.querySelector('.content-template').innerHTML;
const mainContainer = document.getElementById('main-container');
const limit = utils.queryString.get('limit') || null;
const contentLength = utils.queryString.get('content_length') || 1;

function loadContent() {
	const newContent = document.createElement('div');

	newContent.innerHTML = contentTemplate;

	mainContainer.appendChild(newContent);
}

context.set('slots.REPEATABLE_BOXAD_1.repeatable.limit', limit);

for (let i = 0; i < contentLength; i += 1) {
	loadContent();
}

btfBlockerService.finishAboveTheFold();

window.adsQueue.push({
	id: 'REPEATABLE_BOXAD_1'
});

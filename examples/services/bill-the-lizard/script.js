import { AdEngine, context, utils } from '@wikia/ad-engine';
import { billTheLizard } from '@wikia/ad-services';
import adContext from '../../context';

const predictionsElement = document.getElementById('predictions');
const serializedElement = document.getElementById('serialized');
const enabledProjects = utils.queryString.get('enabled-project');

function makeCall(lazyCallProject = null) {
	billTheLizard.call(lazyCallProject)
		.then((predictions) => {
			predictionsElement.innerText = 'Model name\t\tPrediction\n';
			predictionsElement.innerText += Object.keys(predictions).map(key => `${key}\t\t${predictions[key]}`).join('\n');
			serializedElement.innerText = billTheLizard.serialize();
		}, (response) => {
			predictionsElement.innerText = response.message;
			serializedElement.innerText = billTheLizard.serialize();
		});
}

context.extend(adContext);

if (enabledProjects) {
	enabledProjects.split(',').forEach(name => billTheLizard.projectsHandler.enable(name));
} else {
	billTheLizard.projectsHandler.enable('queen_of_hearts');
}

billTheLizard.executor.register('logResult', (model, prediction) => {
	console.log(`🦎 %c${model.name}`, 'font-weight: bold', `predicted ${prediction}`);
});

makeCall(['queen_of_hearts']);

setTimeout(() => {
	new AdEngine(context).init();
}, 1000);

document.getElementById('lazyCallCat').addEventListener('click', () => {
	makeCall('cheshirecat');
});

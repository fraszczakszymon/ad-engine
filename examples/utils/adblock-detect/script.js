import { utils } from '@wikia/ad-engine';

const preElement = document.getElementById('checked');

utils.client.checkBlocking(
	() => { preElement.innerText = 'AdBlock enabled'; }, 
	() => { preElement.innerText = 'AdBlock disabled'; }
);

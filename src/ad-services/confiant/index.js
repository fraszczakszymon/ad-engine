import { context, utils } from '@wikia/ad-engine';

const logGroup = 'confiant';
const scriptDomain = 'clarium.global.ssl.fastly.net';

/**
 * Injects Confiant script
 * @returns {Promise}
 */
function loadScript() {
	const confiantLibraryUrl = `//${scriptDomain}/gpt/a/wrap.js`;

	return utils.scriptLoader.loadScript(confiantLibraryUrl, 'text/javascript', true, 'first');
}

/**
 * Confiant service handler
 */
class Confiant {
	/**
	 * Requests service and injects script tag
	 * @returns {Promise}
	 */
	call() {
		const propertyId = context.get('services.confiant.propertyId');
		const mapping = context.get('services.confiant.mapping');
		const activation = context.get('services.confiant.activation');

		if (!context.get('services.confiant.enabled') || !propertyId || !mapping || !activation) {
			utils.logger(logGroup, 'disabled');

			return Promise.resolve();
		}

		utils.logger(logGroup, 'loading');

		/* eslint-disable */
		window._clrm = window._clrm || {};
		window._clrm.gpt = {
			propertyId: propertyId,
			confiantCdn: scriptDomain,
			sandbox: 0,
			mapping: mapping,
			activation: activation,
			callback: function(blockingType, blockingId, isBlocked, wrapperId, tagId, impressionData) {
				console.log('w00t one more bad ad nixed.', arguments);
			},
		};
		/* eslint-enable */

		return loadScript().then(() => {
			utils.logger(logGroup, 'ready');
		});
	}
}

export const confiant = new Confiant();

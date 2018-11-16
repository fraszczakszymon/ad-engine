import { context, utils } from '@wikia/ad-engine';

const logGroup = 'geo-edge';
const scriptDomainId = 'd3b02estmut877';

/**
 * Injects Geo Edge Site Side Protection script
 * @returns {Promise}
 */
function loadScript() {
	const firstScript = document.getElementsByTagName('script')[0];
	const geoEdgeScript = document.createElement('script');

	return new Promise((resolve) => {
		geoEdgeScript.type = 'text/javascript';
		geoEdgeScript.src = `//${scriptDomainId}.cloudfront.net/grumi-ip.js`;
		geoEdgeScript.async = true;
		geoEdgeScript.onload = resolve;
		firstScript.parentNode.insertBefore(geoEdgeScript, firstScript);
	});
}

/**
 * GeoEdge service handler
 */
class GeoEdge {
	/**
	 * Requests service and injects script tag
	 * @returns {Promise}
	 */
	call() {
		const geoEdgeKey = context.get('services.geoEdge.id');

		if (!context.get('services.geoEdge.enabled') || !geoEdgeKey) {
			utils.logger(logGroup, 'disabled');

			return Promise.resolve();
		}

		utils.logger(logGroup, 'loading');
		window.grumi = {
			/* ToDo: advertiser ids
			cfg: {
				advs: {
					'12345': true,
					'67890': true
				}
			}, */
			key: geoEdgeKey
		};

		return loadScript().then(() => {
			utils.logger(logGroup, 'ready');
		});
	}
}

export const geoEdge = new GeoEdge();

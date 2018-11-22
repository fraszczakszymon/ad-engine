import { context, events, utils } from '@wikia/ad-engine';

const logGroup = 'moat-yi';

events.registerEvent('MOAT_YI_READY');

/**
 * Injects MOAT YI script
 * @returns {Promise}
 */
function loadScript() {
	const partnerCode = context.get('services.moatYi.partnerCode');
	const url = `//z.moatads.com/${partnerCode}/yi.js`;

	return utils.scriptLoader.loadScript(url, 'text/javascript', true, 'first');
}

/**
 * MOAT YI service handler
 */
class MoatYi {
	/**
	 * Requests MOAT YI service and saves page level data in targeting
	 * @returns {Promise}
	 */
	call() {
		if (!context.get('services.moatYi.enabled') || !context.get('services.moatYi.partnerCode')) {
			utils.logger(logGroup, 'disabled');
			return Promise.resolve();
		}

		let moatYeildReadyResolve;
		const promise = new Promise((resolve) => {
			moatYeildReadyResolve = resolve;
		});
		utils.logger(logGroup, 'loading');
		window.moatYieldReady = () => {
			this.exportPageParams();
			moatYeildReadyResolve();
		};
		context.set('targeting.m_data', -1);

		loadScript().then(() => {
			utils.logger(logGroup, 'ready');
		});

		return promise;
	}

	/**
	 * Export page level params to Krux
	 * @returns {void}
	 */
	exportPageParams() {
		if (window.moatPrebidApi && typeof window.moatPrebidApi.getMoatTargetingForPage === 'function') {
			const pageParams = window.moatPrebidApi.getMoatTargetingForPage() || {};

			context.set('targeting.m_data', pageParams.m_data || -2);
			events.emit(events.MOAT_YI_READY, context.get('targeting.m_data'));
			utils.logger(logGroup, 'moatYieldReady', pageParams);
		}
	}
}

export const moatYi = new MoatYi();

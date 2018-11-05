import { context, events, utils } from '@wikia/ad-engine';
import { Executor } from './executor';
import { ProjectsHandler } from './projects-handler';

/**
 * @typedef {Object} ModelDefinition
 * @property {boolean|undefined} executable
 * @property {string[]} countries
 * @property {string} name
 * @property {function} on_*
 */

const logGroup = 'bill-the-lizard';

events.registerEvent('BILL_THE_LIZARD_REQUEST');

/**
 * Builds query parameters for url
 * @param {Object} queryParameters (key-value pairs for query parameters)
 * @returns {string}
 */
function buildQueryUrl(queryParameters) {
	const params = [];

	Object.keys(queryParameters).forEach((key) => {
		params.push(`${key}=${queryParameters[key]}`);
	});

	return encodeURI(params.join('&'));
}

/**
 * Builds endpoint url
 * @param {string} host
 * @param {string} endpoint
 * @param {string} query
 * @returns {string}
 */
function buildUrl(host, endpoint, query) {
	return `${host}/${endpoint}?${query}`;
}

/**
 * Requests service
 * @param {string} host
 * @param {string} endpoint
 * @param {Object} queryParameters (key-value pairs for query parameters)
 * @param {number} timeout
 * @returns {Promise}
 */
function httpRequest(host, endpoint, queryParameters = {}, timeout = 0) {
	const request = new window.XMLHttpRequest();
	const query = buildQueryUrl(queryParameters);
	const url = buildUrl(host, endpoint, query);

	events.emit(events.BILL_THE_LIZARD_REQUEST, query);

	request.open('GET', url, true);
	request.responseType = 'json';
	request.timeout = timeout;

	utils.logger(logGroup, 'timeout configured to', request.timeout);

	return new Promise((resolve, reject) => {
		request.addEventListener('timeout', () => {
			reject(new Error('timeout'));
			utils.logger(logGroup, 'timed out');
		});
		request.addEventListener('error', () => {
			reject(new Error('error'));
			utils.logger(logGroup, 'errored');
		});
		request.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				utils.logger(logGroup, 'has response');
				resolve(this.response);
			}
		};
		request.send();
	});
}

/**
 * Builds key-value pairs for query parameters
 * @param {ModelDefinition[]} models
 * @param {Object} parameters (key-value pairs)
 * @returns {Object}
 */
function getQueryParameters(models, parameters) {
	const now = new Date();
	const day = now.getDay() - 1;

	return Object.assign({}, {
		models: models.map(model => model.name),
		h: now.getHours(),
		dow: day === -1 ? 6 : day
	}, parameters);
}

/**
 * Overrides predictions based on response
 * @param {Object} response
 * @returns {Object}
 */
function overridePredictions(response) {
	Object.keys(response).forEach((name) => {
		const newValue = utils.queryString.get(`bill.${name}`);

		if (newValue) {
			response[name].result = parseInt(newValue, 10);
		}
	});

	return response;
}

/**
 * Bill the Lizard service handler
 */
class BillTheLizard {
	static FAILURE = 'failure';
	static NOT_USED = 'not_used';
	static ON_TIME = 'on_time';
	static TIMEOUT = 'timeout';
	static TOO_LATE = 'too_late';

	constructor() {
		this.executor = new Executor();
		this.projectsHandler = new ProjectsHandler();
		this.predictions = {};
		this.status = null;
	}

	/**
	 * Requests service, executes defined methods and parses response
	 * @param {string[]} projectNames
	 * @returns {Promise}
	 */
	call(projectNames) {
		if (!context.get('services.billTheLizard.enabled')) {
			utils.logger(logGroup, 'disabled');
			return new Promise((resolve, reject) => reject(new Error('Disabled')));
		}

		const host = context.get('services.billTheLizard.host');
		const endpoint = context.get('services.billTheLizard.endpoint');
		const timeout = context.get('services.billTheLizard.timeout');
		const { models, parameters } = this.projectsHandler.getEnabledModelsWithParams(projectNames);

		if (!models || models.length < 1) {
			utils.logger(logGroup, 'no models to predict');
			this.status = BillTheLizard.NOT_USED;

			return Promise.resolve({});
		}

		const queryParameters = getQueryParameters(models, parameters);
		utils.logger(logGroup, 'calling service', host, endpoint, queryParameters);

		this.status = BillTheLizard.TOO_LATE;

		return httpRequest(host, endpoint, queryParameters, timeout)
			.catch((error) => {
				if (error.message === 'timeout') {
					this.status = BillTheLizard.TIMEOUT;
				} else {
					this.status = BillTheLizard.FAILURE;
				}
				return Promise.reject(error);
			})
			.then(response => overridePredictions(response))
			.then((response) => {
				const predictions = this.parsePredictions(models, response);
				this.status = BillTheLizard.ON_TIME;

				this.executor.executeMethods(models, response);

				return predictions;
			})
			.catch((error) => {
				utils.logger(logGroup, 'service response', error.message);
				return {};
			});
	}

	/**
	 * Parses predictions based on response
	 * @param {ModelDefinition[]} models
	 * @param {Object} response
	 * @returns {Object}
	 */
	parsePredictions(models, response) {
		const targeting = [];
		this.predictions = {};

		Object.keys(response).forEach((key) => {
			const model = models.find(definition => definition.name === key);
			const { result, version } = response[key];
			const suffix = key.indexOf(version) > 0 ? '' : `:${version}`;

			if (typeof result !== 'undefined') {
				this.predictions[`${key}${suffix}`] = result;

				if (model && model.dfp_targeting) {
					targeting.push(`${key}${suffix}_${result}`);
				}
			}
		});

		if (targeting.length > 0) {
			context.set('targeting.btl', targeting);
		}

		utils.logger(logGroup, 'predictions', this.predictions);

		return this.predictions;
	}

	/**
	 * Returns prediction for given model name
	 * @param {string} modelName
	 * @returns {number|undefined}
	 */
	getPrediction(modelName) {
		return this.predictions[modelName];
	}

	/**
	 * Returns all (parsed) predictions
	 * @returns {Object}
	 */
	getPredictions() {
		return this.predictions;
	}

	/**
	 * Returns response status (one of: failure, not_used, on_time, timeout, too_late)
	 * @returns {null|string}
	 */
	getResponseStatus() {
		return this.status;
	}

	/**
	 * Serializes all predictions
	 * @returns {string}
	 */
	serialize() {
		return Object.keys(this.predictions).map(key => `${key}=${this.predictions[key]}`).join(';');
	}
}

export const billTheLizard = new BillTheLizard();

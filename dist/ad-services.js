module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@wikia/ad-engine");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "babel-runtime/helpers/classCallCheck"
var classCallCheck_ = __webpack_require__(3);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck_);

// EXTERNAL MODULE: external "babel-runtime/helpers/createClass"
var createClass_ = __webpack_require__(2);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass_);

// EXTERNAL MODULE: external "babel-runtime/core-js/object/assign"
var assign_ = __webpack_require__(5);
var assign_default = /*#__PURE__*/__webpack_require__.n(assign_);

// EXTERNAL MODULE: external "babel-runtime/core-js/promise"
var promise_ = __webpack_require__(4);
var promise_default = /*#__PURE__*/__webpack_require__.n(promise_);

// EXTERNAL MODULE: external "babel-runtime/core-js/object/keys"
var keys_ = __webpack_require__(1);
var keys_default = /*#__PURE__*/__webpack_require__.n(keys_);

// EXTERNAL MODULE: external "@wikia/ad-engine"
var ad_engine_ = __webpack_require__(0);

// CONCATENATED MODULE: ./src/ad-services/bill-the-lizard/executor.js





var logGroup = 'executor';

/**
 * Bill the Lizard methods executor
 */
var executor_Executor = function () {
	function Executor() {
		classCallCheck_default()(this, Executor);

		this.methods = {};
	}

	/**
  * Registeres new method
  * @param {string} name
  * @param {function} callback
  */


	createClass_default()(Executor, [{
		key: 'register',
		value: function register(name, callback) {
			ad_engine_["utils"].logger(logGroup, 'method ' + name + ' registered');
			this.methods[name] = callback;
		}

		/**
   * Executes method by name
   * @param {string} methodName
   * @param {ModelDefinition} model
   * @param {number|undefined} prediction
   */

	}, {
		key: 'execute',
		value: function execute(methodName, model, prediction) {
			var callback = this.methods[methodName];

			if (typeof callback !== 'function') {
				throw Error(methodName + ' is not executable');
			}

			ad_engine_["utils"].logger(logGroup, 'executing ' + methodName + ' method', model.name, prediction);
			callback(model, prediction);
		}

		/**
   * Executes all methods defined in given model based on service response
   * @param {ModelDefinition[]} models
   * @param {Object} response
   */

	}, {
		key: 'executeMethods',
		value: function executeMethods(models, response) {
			var _this = this;

			keys_default()(response).forEach(function (modelName) {
				var result = response[modelName].result;


				var executableModel = models.find(function (model) {
					return model.name === modelName && model.executable;
				});
				if (!executableModel) {
					return;
				}

				var definedMethods = executableModel['on_' + result];
				if (!definedMethods) {
					return;
				}

				definedMethods.forEach(function (methodName) {
					return _this.execute(methodName, executableModel, result);
				});
			});
		}
	}]);

	return Executor;
}();
// CONCATENATED MODULE: ./src/ad-services/bill-the-lizard/projects-handler.js






var projects_handler_logGroup = 'project-handler';

/**
 * Bill the Lizard projects handler
 */
var projects_handler_ProjectsHandler = function () {
	function ProjectsHandler() {
		classCallCheck_default()(this, ProjectsHandler);

		this.projects = {};
	}

	/**
  * Enables project by name
  * @param {string} name
  */


	createClass_default()(ProjectsHandler, [{
		key: 'enable',
		value: function enable(name) {
			ad_engine_["utils"].logger(projects_handler_logGroup, 'project ' + name + ' enabled');
			this.projects[name] = true;
		}

		/**
   * Checks whether project is enabled
   * @param {string} name
   * @returns {boolean}
   */

	}, {
		key: 'isEnabled',
		value: function isEnabled(name) {
			return !!this.projects[name];
		}

		/**
   * Returns all geo-enabled models' definitions based on enabled projects
   * @param {string[]} projectNames
   * @returns {{models: ModelDefinition[], parameters: Object}}
   */

	}, {
		key: 'getEnabledModelsWithParams',
		value: function getEnabledModelsWithParams(projectNames) {
			var _this = this;

			var projects = ad_engine_["context"].get('services.billTheLizard.projects');
			var projectParameters = ad_engine_["context"].get('services.billTheLizard.parameters');
			var enabledProjectNames = keys_default()(projects).filter(function (name) {
				return _this.isEnabled(name) && projectNames.includes(name);
			});
			var models = [];
			var parameters = {};

			enabledProjectNames.forEach(function (name) {
				// Only first enabled model in project is executable
				var isNextModelExecutable = true;

				projects[name].forEach(function (model) {
					if (ad_engine_["utils"].isProperGeo(model.countries, model.name)) {
						model.executable = isNextModelExecutable;
						isNextModelExecutable = false;
						models.push(model);
						assign_default()(parameters, projectParameters[name]);
					} else {
						model.executable = false;
					}
				});
			});

			return {
				models: models,
				parameters: parameters
			};
		}
	}]);

	return ProjectsHandler;
}();
// CONCATENATED MODULE: ./src/ad-services/bill-the-lizard/index.js









/**
 * @typedef {Object} ModelDefinition
 * @property {boolean|undefined} executable
 * @property {string[]} countries
 * @property {string} name
 * @property {function} on_*
 */

var bill_the_lizard_logGroup = 'bill-the-lizard';

ad_engine_["events"].registerEvent('BILL_THE_LIZARD_REQUEST');

/**
 * Builds query parameters for url
 * @param {Object} queryParameters (key-value pairs for query parameters)
 * @returns {string}
 */
function buildQueryUrl(queryParameters) {
	var params = [];

	keys_default()(queryParameters).forEach(function (key) {
		params.push(key + '=' + queryParameters[key]);
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
	return host + '/' + endpoint + '?' + query;
}

/**
 * Requests service
 * @param {string} host
 * @param {string} endpoint
 * @param {Object} queryParameters (key-value pairs for query parameters)
 * @param {number} timeout
 * @returns {Promise}
 */
function httpRequest(host, endpoint) {
	var queryParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	var request = new window.XMLHttpRequest();
	var query = buildQueryUrl(queryParameters);
	var url = buildUrl(host, endpoint, query);

	ad_engine_["events"].emit(ad_engine_["events"].BILL_THE_LIZARD_REQUEST, query);

	request.open('GET', url, true);
	request.responseType = 'json';
	request.timeout = timeout;

	ad_engine_["utils"].logger(bill_the_lizard_logGroup, 'timeout configured to', request.timeout);

	return new promise_default.a(function (resolve, reject) {
		request.addEventListener('timeout', function () {
			reject(new Error('timeout'));
			ad_engine_["utils"].logger(bill_the_lizard_logGroup, 'timed out');
		});
		request.addEventListener('error', function () {
			reject(new Error('error'));
			ad_engine_["utils"].logger(bill_the_lizard_logGroup, 'errored');
		});
		request.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				ad_engine_["utils"].logger(bill_the_lizard_logGroup, 'has response');
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
	var now = new Date();
	var day = now.getDay() - 1;

	return assign_default()({}, {
		models: models.map(function (model) {
			return model.name;
		}),
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
	keys_default()(response).forEach(function (name) {
		var newValue = ad_engine_["utils"].queryString.get('bill.' + name);

		if (newValue) {
			response[name].result = parseInt(newValue, 10);
		}
	});

	return response;
}

/**
 * Bill the Lizard service handler
 */

var bill_the_lizard_BillTheLizard = function () {
	function BillTheLizard() {
		classCallCheck_default()(this, BillTheLizard);

		this.executor = new executor_Executor();
		this.projectsHandler = new projects_handler_ProjectsHandler();
		this.predictions = {};
		this.status = null;
	}

	/**
  * Requests service, executes defined methods and parses response
  * @param {string[]} projectNames
  * @returns {Promise}
  */


	createClass_default()(BillTheLizard, [{
		key: 'call',
		value: function call(projectNames) {
			var _this = this;

			if (!ad_engine_["context"].get('services.billTheLizard.enabled')) {
				ad_engine_["utils"].logger(bill_the_lizard_logGroup, 'disabled');
				return new promise_default.a(function (resolve, reject) {
					return reject(new Error('Disabled'));
				});
			}

			var host = ad_engine_["context"].get('services.billTheLizard.host');
			var endpoint = ad_engine_["context"].get('services.billTheLizard.endpoint');
			var timeout = ad_engine_["context"].get('services.billTheLizard.timeout');

			var _projectsHandler$getE = this.projectsHandler.getEnabledModelsWithParams(projectNames),
			    models = _projectsHandler$getE.models,
			    parameters = _projectsHandler$getE.parameters;

			if (!models || models.length < 1) {
				ad_engine_["utils"].logger(bill_the_lizard_logGroup, 'no models to predict');
				this.status = BillTheLizard.NOT_USED;

				return promise_default.a.resolve({});
			}

			var queryParameters = getQueryParameters(models, parameters);
			ad_engine_["utils"].logger(bill_the_lizard_logGroup, 'calling service', host, endpoint, queryParameters);

			this.status = BillTheLizard.TOO_LATE;

			return httpRequest(host, endpoint, queryParameters, timeout).catch(function (error) {
				if (error.message === 'timeout') {
					_this.status = BillTheLizard.TIMEOUT;
				} else {
					_this.status = BillTheLizard.FAILURE;
				}
				return promise_default.a.reject(error);
			}).then(function (response) {
				return overridePredictions(response);
			}).then(function (response) {
				var predictions = _this.parsePredictions(models, response);
				_this.status = BillTheLizard.ON_TIME;

				_this.executor.executeMethods(models, response);

				return predictions;
			}).catch(function (error) {
				ad_engine_["utils"].logger(bill_the_lizard_logGroup, 'service response', error.message);
				return {};
			});
		}

		/**
   * Parses predictions based on response
   * @param {ModelDefinition[]} models
   * @param {Object} response
   * @returns {Object}
   */

	}, {
		key: 'parsePredictions',
		value: function parsePredictions(models, response) {
			var _this2 = this;

			var targeting = [];
			this.predictions = {};

			keys_default()(response).forEach(function (key) {
				var model = models.find(function (definition) {
					return definition.name === key;
				});
				var _response$key = response[key],
				    result = _response$key.result,
				    version = _response$key.version;

				var suffix = key.indexOf(version) > 0 ? '' : ':' + version;

				if (typeof result !== 'undefined') {
					_this2.predictions['' + key + suffix] = result;

					if (model && model.dfp_targeting) {
						targeting.push('' + key + suffix + '_' + result);
					}
				}
			});

			if (targeting.length > 0) {
				ad_engine_["context"].set('targeting.btl', targeting);
			}

			ad_engine_["utils"].logger(bill_the_lizard_logGroup, 'predictions', this.predictions);

			return this.predictions;
		}

		/**
   * Returns prediction for given model name
   * @param {string} modelName
   * @returns {number|undefined}
   */

	}, {
		key: 'getPrediction',
		value: function getPrediction(modelName) {
			return this.predictions[modelName];
		}

		/**
   * Returns all (parsed) predictions
   * @returns {Object}
   */

	}, {
		key: 'getPredictions',
		value: function getPredictions() {
			return this.predictions;
		}

		/**
   * Returns response status (one of: failure, not_used, on_time, timeout, too_late)
   * @returns {null|string}
   */

	}, {
		key: 'getResponseStatus',
		value: function getResponseStatus() {
			return this.status;
		}

		/**
   * Serializes all predictions
   * @returns {string}
   */

	}, {
		key: 'serialize',
		value: function serialize() {
			var _this3 = this;

			return keys_default()(this.predictions).map(function (key) {
				return key + '=' + _this3.predictions[key];
			}).join(';');
		}
	}]);

	return BillTheLizard;
}();

bill_the_lizard_BillTheLizard.FAILURE = 'failure';
bill_the_lizard_BillTheLizard.NOT_USED = 'not_used';
bill_the_lizard_BillTheLizard.ON_TIME = 'on_time';
bill_the_lizard_BillTheLizard.TIMEOUT = 'timeout';
bill_the_lizard_BillTheLizard.TOO_LATE = 'too_late';


var billTheLizard = new bill_the_lizard_BillTheLizard();
// CONCATENATED MODULE: ./src/ad-services/krux/index.js






var krux_logGroup = 'krux';

/**
 * Injects Krux script
 * @returns {Promise}
 */
function loadScript() {
	var firstScript = document.getElementsByTagName('script')[0];
	var kruxId = ad_engine_["context"].get('services.krux.id');
	var kruxScript = document.createElement('script');

	return new promise_default.a(function (resolve) {
		kruxScript.type = 'text/javascript';
		kruxScript.id = 'krux-control-tag';
		kruxScript.async = true;
		kruxScript.onload = resolve;
		kruxScript.src = '//cdn.krxd.net/controltag?confid=' + kruxId;
		firstScript.parentNode.insertBefore(kruxScript, firstScript);
	});
}

/**
 * Gets Krux data from localStorage
 * @param {string} key
 * @returns {string}
 */
function getKruxData(key) {
	if (window.localStorage) {
		return window.localStorage[key];
	} else if (window.navigator.cookieEnabled) {
		var match = document.cookie.match(key + '=([^;]*)');

		return match && decodeURI(match[1]) || '';
	}

	return '';
}

window.Krux = window.Krux || function () {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	window.Krux.q.push(args);
};
window.Krux.q = window.Krux.q || [];

/**
 * Krux service handler
 */

var krux_Krux = function () {
	function Krux() {
		classCallCheck_default()(this, Krux);
	}

	createClass_default()(Krux, [{
		key: 'call',

		/**
   * Requests service, saves user id and segments in context and exports page level params
   * @returns {Promise}
   */
		value: function call() {
			var _this = this;

			if (!ad_engine_["context"].get('services.krux.enabled') || !ad_engine_["context"].get('options.trackingOptIn')) {
				ad_engine_["utils"].logger(krux_logGroup, 'disabled');
				return promise_default.a.resolve();
			}

			ad_engine_["utils"].logger(krux_logGroup, 'loading');
			return loadScript().then(function () {
				_this.exportPageParams();
				_this.importUserData();
			});
		}

		/**
   * Export page level params to Krux
   * @returns {void}
   */

	}, {
		key: 'exportPageParams',
		value: function exportPageParams() {
			keys_default()(ad_engine_["context"].get('targeting')).forEach(function (key) {
				var value = ad_engine_["context"].get('targeting.' + key);

				if (value) {
					window['kruxDartParam_' + key] = value;
				}
			});
		}

		/**
   * Imports Krux data from localStorage
   * @returns {void}
   */

	}, {
		key: 'importUserData',
		value: function importUserData() {
			var user = getKruxData('kxuser');
			var segments = getKruxData('kxsegs');

			ad_engine_["context"].set('targeting.kuid', user || null);
			ad_engine_["context"].set('targeting.ksg', segments ? segments.split(',') : []);
			ad_engine_["utils"].logger(krux_logGroup, 'data set', user, segments);
		}

		/**
   * Returns Krux user ID
   * @returns {string}
   */

	}, {
		key: 'getUserId',
		value: function getUserId() {
			return ad_engine_["context"].get('targeting.kuid') || null;
		}

		/**
   * Returns Krux segments
   * @returns {string[]}
   */

	}, {
		key: 'getSegments',
		value: function getSegments() {
			return ad_engine_["context"].get('targeting.ksg') || [];
		}
	}]);

	return Krux;
}();

var krux = new krux_Krux();
// CONCATENATED MODULE: ./src/ad-services/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "billTheLizard", function() { return billTheLizard; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "krux", function() { return krux; });



/***/ })
/******/ ]);
//# sourceMappingURL=ad-services.js.map
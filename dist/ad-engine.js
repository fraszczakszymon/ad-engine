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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var utils_namespaceObject = {};
__webpack_require__.d(utils_namespaceObject, "client", function() { return client; });
__webpack_require__.d(utils_namespaceObject, "getTopOffset", function() { return getTopOffset; });
__webpack_require__.d(utils_namespaceObject, "isInViewport", function() { return isInViewport; });
__webpack_require__.d(utils_namespaceObject, "wait", function() { return flow_control_wait; });
__webpack_require__.d(utils_namespaceObject, "defer", function() { return flow_control_defer; });
__webpack_require__.d(utils_namespaceObject, "once", function() { return once; });
__webpack_require__.d(utils_namespaceObject, "makeLazyQueue", function() { return makeLazyQueue; });
__webpack_require__.d(utils_namespaceObject, "logger", function() { return logger; });
__webpack_require__.d(utils_namespaceObject, "queryString", function() { return query_string_queryString; });
__webpack_require__.d(utils_namespaceObject, "sampler", function() { return sampler; });
__webpack_require__.d(utils_namespaceObject, "scriptLoader", function() { return scriptLoader; });
__webpack_require__.d(utils_namespaceObject, "stringBuilder", function() { return stringBuilder; });
__webpack_require__.d(utils_namespaceObject, "whichProperty", function() { return whichProperty; });
__webpack_require__.d(utils_namespaceObject, "tryProperty", function() { return tryProperty; });
__webpack_require__.d(utils_namespaceObject, "viewportObserver", function() { return viewportObserver; });

// EXTERNAL MODULE: external "lodash/set"
var set_ = __webpack_require__(7);
var set__default = /*#__PURE__*/__webpack_require__.n(set_);

// EXTERNAL MODULE: external "lodash/get"
var get_ = __webpack_require__(8);
var get__default = /*#__PURE__*/__webpack_require__.n(get_);

// EXTERNAL MODULE: external "babel-runtime/helpers/classCallCheck"
var classCallCheck_ = __webpack_require__(0);
var classCallCheck__default = /*#__PURE__*/__webpack_require__.n(classCallCheck_);

// EXTERNAL MODULE: external "babel-runtime/helpers/createClass"
var createClass_ = __webpack_require__(1);
var createClass__default = /*#__PURE__*/__webpack_require__.n(createClass_);

// EXTERNAL MODULE: external "ismobilejs"
var external__ismobilejs_ = __webpack_require__(9);
var external__ismobilejs__default = /*#__PURE__*/__webpack_require__.n(external__ismobilejs_);

// EXTERNAL MODULE: external "blockadblock"
var external__blockadblock_ = __webpack_require__(10);
var external__blockadblock__default = /*#__PURE__*/__webpack_require__.n(external__blockadblock_);

// CONCATENATED MODULE: ./src/utils/client.js


/* global BlockAdBlock */



var blockAdBlock = null,
    browser = null,
    client_isMobile = null,
    operatingSystem = null;

function getIsMobile() {
	if (client_isMobile === null) {
		var userAgent = window.navigator.userAgent;

		client_isMobile = typeof external__ismobilejs__default.a === 'function' ? external__ismobilejs__default()(userAgent) : external__ismobilejs__default.a;
	}

	return client_isMobile;
}

var client_Client = function () {
	function Client() {
		classCallCheck__default()(this, Client);
	}

	createClass__default()(Client, [{
		key: 'isSmartphone',
		value: function isSmartphone() {
			var device = getIsMobile();

			return device.phone;
		}
	}, {
		key: 'isTablet',
		value: function isTablet() {
			var device = getIsMobile();

			return device.tablet;
		}
	}, {
		key: 'isDesktop',
		value: function isDesktop() {
			return !this.isSmartphone() && !this.isTablet();
		}
	}, {
		key: 'checkBlocking',
		value: function checkBlocking() {
			var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var disabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			if (blockAdBlock === null) {
				if (typeof external__blockadblock__default.a === 'undefined' || typeof BlockAdBlock === 'undefined') {
					if (enabled !== null) enabled();

					return;
				}

				blockAdBlock = new BlockAdBlock({
					checkOnLoad: false,
					resetOnEnd: true,
					loopCheckTime: 50,
					loopMaxNumber: 5
				});
			}

			if (enabled !== null) blockAdBlock.onDetected(enabled);
			if (disabled !== null) blockAdBlock.onNotDetected(disabled);

			blockAdBlock.check(true);
		}
	}, {
		key: 'getDeviceType',
		value: function getDeviceType() {
			if (this.isTablet()) {
				return 'tablet';
			} else if (this.isSmartphone()) {
				return 'smartphone';
			}

			return 'desktop';
		}
	}, {
		key: 'getOperatingSystem',
		value: function getOperatingSystem() {
			if (operatingSystem !== null) {
				return operatingSystem;
			}

			var userAgent = window.navigator.userAgent;

			operatingSystem = 'unknown';
			if (userAgent.indexOf('Win') !== -1) {
				operatingSystem = 'Windows';
			}
			if (userAgent.indexOf('Mac') !== -1) {
				operatingSystem = 'OSX';
			}
			if (userAgent.indexOf('Linux') !== -1) {
				operatingSystem = 'Linux';
			}
			if (userAgent.indexOf('Android') !== -1) {
				operatingSystem = 'Android';
			}
			if (userAgent.indexOf('like Mac') !== -1) {
				operatingSystem = 'iOS';
			}

			return operatingSystem;
		}
	}, {
		key: 'getBrowser',
		value: function getBrowser() {
			if (browser !== null) {
				return browser;
			}

			var appName = window.navigator.appName,
			    appVersion = window.navigator.appVersion,
			    userAgent = window.navigator.userAgent;

			var temp = void 0,
			    matches = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

			if (/trident/i.test(matches[1])) {
				temp = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
				browser = 'IE ' + (temp[1] || '');
				return browser;
			}
			if (matches[1] === 'Chrome') {
				temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
				if (temp !== null) {
					browser = temp.slice(1).join(' ').replace('OPR', 'Opera');
					return browser;
				}
			}

			matches = matches[2] ? [matches[1], matches[2]] : [appName, appVersion, '-?'];
			temp = userAgent.match(/version\/(\d+)/i);
			if (temp !== null) {
				matches.splice(1, 1, temp[1]);
			}
			browser = matches.join(' ');

			return browser;
		}
	}]);

	return Client;
}();

var client = new client_Client();
// CONCATENATED MODULE: ./src/utils/dimensions.js
function getTopOffset(element) {
	var elementWindow = element.ownerDocument.defaultView;

	var currentElement = element,
	    hideAgain = false,
	    topPos = 0;

	if (element.classList.contains('hide')) {
		hideAgain = true;
		element.classList.remove('hide');
	}

	do {
		topPos += currentElement.offsetTop;
		currentElement = currentElement.offsetParent;
	} while (currentElement !== null);

	if (hideAgain) {
		element.classList.add('hide');
	}

	if (elementWindow && elementWindow.frameElement) {
		topPos += getTopOffset(elementWindow.frameElement);
	}

	return topPos;
}

function isInViewport(element) {
	var topOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	var bottomOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	var alwaysInViewportPositions = ['fixed', 'sticky'],
	    elementPosition = window.getComputedStyle(element).position;

	if (alwaysInViewportPositions.includes(elementPosition)) {
		return true;
	}

	var elementHeight = element.offsetHeight,
	    elementTop = getTopOffset(element),
	    elementBottom = elementTop + elementHeight,
	    scrollPosition = window.scrollY,
	    viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
	    viewportTop = topOffset + scrollPosition,
	    viewportBottom = bottomOffset + scrollPosition + viewportHeight;

	return elementTop >= viewportTop - elementHeight / 2 && elementBottom <= viewportBottom + elementHeight / 2;
}
// EXTERNAL MODULE: external "babel-runtime/core-js/object/assign"
var assign_ = __webpack_require__(3);
var assign__default = /*#__PURE__*/__webpack_require__.n(assign_);

// EXTERNAL MODULE: external "babel-runtime/helpers/typeof"
var typeof_ = __webpack_require__(11);
var typeof__default = /*#__PURE__*/__webpack_require__.n(typeof_);

// EXTERNAL MODULE: external "babel-runtime/core-js/promise"
var promise_ = __webpack_require__(4);
var promise__default = /*#__PURE__*/__webpack_require__.n(promise_);

// CONCATENATED MODULE: ./src/utils/flow-control.js



var flow_control_wait = function wait() {
	var milliseconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	return new promise__default.a(function (resolve, reject) {
		if (typeof milliseconds !== 'number') {
			reject('Delay value must be a number.');
			return;
		}

		setTimeout(resolve, milliseconds);
	});
};

var flow_control_defer = function defer(fn) {
	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		args[_key - 1] = arguments[_key];
	}

	return new promise__default.a(function (resolve, reject) {
		if (typeof fn !== 'function') {
			reject('Expected a function.');
			return;
		}

		setTimeout(function () {
			return resolve(fn.apply(undefined, args));
		}, 0);
	});
};

function once(emitter, eventName) {
	var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	var isObject = (typeof emitter === 'undefined' ? 'undefined' : typeof__default()(emitter)) === 'object';
	var hasAddEventListener = isObject && typeof emitter.addEventListener === 'function';
	var hasOnce = isObject && typeof emitter.once === 'function';

	return new promise__default.a(function (resolve, reject) {
		if (typeof options === 'boolean') {
			options = { capture: options };
		}

		if (hasOnce) {
			emitter.once(eventName, resolve);
		} else if (hasAddEventListener) {
			emitter.addEventListener(eventName, resolve, assign__default()({}, options, { once: true }));
		} else {
			reject('Emitter does not have `addEventListener` nor `once` method.');
		}
	});
}
// CONCATENATED MODULE: ./src/utils/lazy-queue.js
function makeLazyQueue(queue, callback) {
	if (typeof callback !== 'function') {
		throw new Error('LazyQueue used with callback not being a function');
	} else if (queue instanceof Array) {
		queue.start = function () {
			while (queue.length > 0) {
				callback(queue.shift());
			}
			queue.push = function (item) {
				callback(item);
			};
		};
	} else {
		throw new Error('LazyQueue requires an array as the first parameter');
	}
}
// EXTERNAL MODULE: external "babel-runtime/helpers/slicedToArray"
var slicedToArray_ = __webpack_require__(12);
var slicedToArray__default = /*#__PURE__*/__webpack_require__.n(slicedToArray_);

// CONCATENATED MODULE: ./src/utils/query-string.js




var query_string_QueryString = function () {
	function QueryString() {
		classCallCheck__default()(this, QueryString);
	}

	createClass__default()(QueryString, [{
		key: 'getValues',
		value: function getValues() {
			var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			var path = input || window.location.search.substr(1),
			    queryParameters = {},
			    queryString = path.split('&');

			if (queryString === '') {
				return null;
			}

			queryString.forEach(function (pair) {
				var _pair$split = pair.split('='),
				    _pair$split2 = slicedToArray__default()(_pair$split, 2),
				    id = _pair$split2[0],
				    value = _pair$split2[1];

				if (value) {
					queryParameters[id] = decodeURIComponent(value.replace(/\+/g, ' '));
				}
			});

			return queryParameters;
		}
	}, {
		key: 'get',
		value: function get(key) {
			var queryParameters = this.getValues();

			return queryParameters[key];
		}
	}]);

	return QueryString;
}();

var query_string_queryString = new query_string_QueryString();
// CONCATENATED MODULE: ./src/utils/logger.js


var debugGroup = query_string_queryString.get('adengine_debug') || '',
    groups = debugGroup.split(',');

if (debugGroup !== '') {
	window.console.info('AdEngine debug mode - groups:', debugGroup === '1' ? 'all' : groups);
}

function logger(logGroup) {
	if (debugGroup === '') {
		return;
	}

	if (debugGroup === '1' || groups.indexOf(logGroup) !== -1) {
		for (var _len = arguments.length, logValues = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			logValues[_key - 1] = arguments[_key];
		}

		window.console.info(logGroup, logValues);
	}
}
// CONCATENATED MODULE: ./src/utils/sampler.js




function isSamplingIgnored(name) {
	var ignored = (query_string_queryString.get('ignored_samplers') || '').split(',');

	return ignored.indexOf(name) !== -1;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

var sampler_Sampler = function () {
	function Sampler() {
		classCallCheck__default()(this, Sampler);
	}

	createClass__default()(Sampler, [{
		key: 'sample',
		value: function sample(name, sampling) {
			var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

			return isSamplingIgnored(name) ? true : getRandomInt(0, max) < sampling;
		}
	}]);

	return Sampler;
}();

var sampler = new sampler_Sampler();
// CONCATENATED MODULE: ./src/utils/script-loader.js




var script_loader_ScriptLoader = function () {
	function ScriptLoader() {
		classCallCheck__default()(this, ScriptLoader);
	}

	createClass__default()(ScriptLoader, [{
		key: 'createScript',
		value: function createScript(src) {
			var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'text/javascript';
			var isAsync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
			var node = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

			var script = document.createElement('script');

			node = node || document.body.lastChild;
			script.async = isAsync;
			script.type = type;
			script.src = src;
			node.parentNode.insertBefore(script, node);

			return script;
		}
	}, {
		key: 'loadScript',
		value: function loadScript(src) {
			var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'text/javascript';

			var _this = this;

			var isAsync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
			var node = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

			return new promise__default.a(function (resolve, reject) {
				var script = _this.createScript(src, type, isAsync, node);

				script.onload = resolve;
				script.onerror = reject;
			});
		}
	}]);

	return ScriptLoader;
}();

var scriptLoader = new script_loader_ScriptLoader();
// EXTERNAL MODULE: external "babel-runtime/core-js/object/keys"
var keys_ = __webpack_require__(2);
var keys__default = /*#__PURE__*/__webpack_require__.n(keys_);

// CONCATENATED MODULE: ./src/services/context-service.js



var contextObject = {
	adUnitId: '',
	events: {},
	listeners: {
		porvata: [],
		slot: []
	},
	options: {
		customAdLoader: {
			globalMethodName: 'loadCustomAd'
		},
		video: {
			moatTracking: {
				enabled: true,
				partnerCode: 'wikiaimajsint377461931603',
				sampling: 1
			}
		}
	},
	slots: {},
	src: 'gpt',
	state: {
		adStack: [],
		isMobile: false
	},
	targeting: {},
	vast: {
		size: [640, 480],
		adUnitId: ''
	}
},
    onChangeCallbacks = {};

function runCallbacks(trigger, key, newValue) {
	if (!onChangeCallbacks[trigger]) {
		return;
	}

	onChangeCallbacks[trigger].forEach(function (callback) {
		callback(key, newValue);
	});
}

function triggerOnChange(key, segments, newValue) {
	var trigger = '';
	segments.forEach(function (seg) {
		trigger += (trigger === '' ? '' : '.') + seg;
		runCallbacks(trigger, key, newValue);
	});
}

function context_service_segment(key, newValue) {
	var segments = key.split('.'),
	    segmentsCount = segments.length;
	var seg = contextObject,
	    lastKey = null;

	for (var i = 0; i < segmentsCount; i += 1) {
		lastKey = segments[i];
		if (i < segmentsCount - 1) {
			seg[lastKey] = seg[lastKey] || {};
			seg = seg[lastKey];
		}
	}

	if (newValue !== undefined) {
		seg[lastKey] = newValue;
		triggerOnChange(key, segments, newValue);
	}

	return seg[lastKey];
}

var context_service_Context = function () {
	function Context() {
		classCallCheck__default()(this, Context);

		this.__useDefault = true;
	}

	createClass__default()(Context, [{
		key: 'extend',
		value: function extend(newContext) {
			assign__default()(contextObject, newContext);
		}
	}, {
		key: 'set',
		value: function set(key, value) {
			context_service_segment(key, value);
		}
	}, {
		key: 'get',
		value: function get(key) {
			return context_service_segment(key);
		}
	}, {
		key: 'push',
		value: function push(key, value) {
			var array = context_service_segment(key);

			if (array) {
				array.push(value);
			}
		}
	}, {
		key: 'onChange',
		value: function onChange(key, callback) {
			onChangeCallbacks[key] = onChangeCallbacks[key] || [];
			onChangeCallbacks[key].push(callback);
		}
	}]);

	return Context;
}();

var context = new context_service_Context();
// CONCATENATED MODULE: ./src/services/slot-service.js



var slotNameMapping = {};
var slot_service_slots = {};
var slotStates = {};

var slot_service_SlotService = function () {
	function SlotService() {
		classCallCheck__default()(this, SlotService);
	}

	createClass__default()(SlotService, [{
		key: "add",
		value: function add(adSlot) {
			var slotName = adSlot.getSlotName();

			slot_service_slots[adSlot.getId()] = adSlot;
			slotNameMapping[slotName] = adSlot.getId();

			if (slotStates[slotName] === false) {
				adSlot.disable();
			}
			if (slotStates[slotName] === true) {
				adSlot.enable();
			}
		}
	}, {
		key: "get",
		value: function get(id) {
			return slot_service_slots[id];
		}
	}, {
		key: "getBySlotName",
		value: function getBySlotName(slotName) {
			var id = slotNameMapping[slotName];

			return this.get(id);
		}
	}, {
		key: "forEach",
		value: function forEach(callback) {
			keys__default()(slot_service_slots).forEach(function (id) {
				callback(slot_service_slots[id]);
			});
		}
	}, {
		key: "enable",
		value: function enable(slotName) {
			setState(slotName, true);
		}
	}, {
		key: "disable",
		value: function disable(slotName) {
			setState(slotName, false);
		}
	}]);

	return SlotService;
}();

var slotService = new slot_service_SlotService();

function setState(slotName, state) {
	var slot = slotService.getBySlotName(slotName);
	slotStates[slotName] = state;

	if (slot) {
		if (state) {
			slot.enable();
		} else {
			slot.disable();
		}
	}
}
// CONCATENATED MODULE: ./src/services/btf-blocker-service.js







var logGroup = 'btf-blocker';

function finishQueue() {
	var _this = this;

	this.atfEnded = true;

	if (window.ads.runtime.disableBtf) {
		var slots = context.get('slots');

		keys__default()(slots).forEach(function (adSlotKey) {
			var adSlot = slots[adSlotKey];

			if (!adSlot.aboveTheFold && _this.unblockedSlots.indexOf(adSlot.slotName) === -1) {
				slotService.disable(adSlot.slotName);
			}
		});
	}

	this.slotsQueue.start();
}

var btf_blocker_service_BtfBlockerService = function () {
	function BtfBlockerService() {
		classCallCheck__default()(this, BtfBlockerService);

		this.slotsQueue = [];
		this.atfEnded = false;
		this.unblockedSlots = [];
	}

	createClass__default()(BtfBlockerService, [{
		key: 'init',
		value: function init() {
			var _this2 = this;

			makeLazyQueue(this.slotsQueue, function (_ref) {
				var adSlot = _ref.adSlot,
				    fillInCallback = _ref.fillInCallback;

				logger(logGroup, adSlot.getId(), 'Filling delayed BTF slot');
				fillInCallback(adSlot);
			});

			context.push('listeners.slot', { onRenderEnded: function onRenderEnded(adSlot) {
					logger(logGroup, adSlot.getId(), 'Slot rendered');
					if (!_this2.atfEnded && adSlot.isAboveTheFold()) {
						finishQueue.bind(_this2)();
					}
				} });
		}
	}, {
		key: 'push',
		value: function push(adSlot, fillInCallback) {
			if (!this.atfEnded && !adSlot.isAboveTheFold()) {
				this.slotsQueue.push({ adSlot: adSlot, fillInCallback: fillInCallback });
				logger(logGroup, adSlot.getId(), 'BTF slot pushed to queue');
				return;
			}

			if (this.atfEnded && !adSlot.isEnabled()) {
				logger(logGroup, adSlot.getId(), 'BTF slot blocked');
				return;
			}

			logger(logGroup, adSlot.getId(), 'Filling in slot');
			fillInCallback(adSlot);
		}
	}, {
		key: 'unblock',
		value: function unblock(slotName) {
			logger(logGroup, slotName, 'Unblocking slot');

			this.unblockedSlots.push(slotName);
			slotService.enable(slotName);
		}
	}]);

	return BtfBlockerService;
}();

var btfBlockerService = new btf_blocker_service_BtfBlockerService();
// CONCATENATED MODULE: ./src/services/template-service.js






var template_service_logGroup = 'template-service',
    templates = {};

var template_service_TemplateService = function () {
	function TemplateService() {
		classCallCheck__default()(this, TemplateService);
	}

	createClass__default()(TemplateService, [{
		key: 'register',
		value: function register(template) {
			var customConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			if (typeof template.getName !== 'function') {
				throw new Error('Template does not implement getName method.');
			}
			var name = template.getName();

			var config = {};

			if (typeof template.getDefaultConfig === 'function') {
				config = template.getDefaultConfig();
			}

			if (customConfig) {
				config = assign__default()(config, customConfig);
			}

			context.set('templates.' + name, config);
			templates[name] = template;
		}
	}, {
		key: 'init',
		value: function init(name) {
			var slot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
			var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			logger(template_service_logGroup, 'Load template', name, slot, params);
			if (!templates[name]) {
				throw new Error('Template ' + name + ' does not exist.');
			}

			return new templates[name](slot).init(params);
		}
	}]);

	return TemplateService;
}();

var templateService = new template_service_TemplateService();
// CONCATENATED MODULE: ./src/services/custom-ad-loader.js



function registerCustomAdLoader(methodName) {
	window[methodName] = function (params) {
		var slot = slotService.getBySlotName(params.slotName);

		templateService.init(params.type, slot, params);
	};
}
// EXTERNAL MODULE: external "babel-runtime/core-js/json/stringify"
var stringify_ = __webpack_require__(5);
var stringify__default = /*#__PURE__*/__webpack_require__.n(stringify_);

// CONCATENATED MODULE: ./src/services/local-cache.js



/* global Storage */


var local_cache_logGroup = 'local-cache';

var _canUseStorage = void 0;

var local_cache_LocalCache = function () {
	function LocalCache() {
		classCallCheck__default()(this, LocalCache);
	}

	createClass__default()(LocalCache, [{
		key: 'canUseStorage',
		value: function canUseStorage() {
			if (typeof _canUseStorage === 'undefined') {
				_canUseStorage = false;
				if (window.localStorage) {
					try {
						window.localStorage.setItem('test', '1');
						window.localStorage.removeItem('test');
						_canUseStorage = true;
					} catch (e) {
						/* There are two known possibilities here:
       *
       * 1) The browser isn't allowing access due to a
       * privacy setting (which can happen in Safari).
       *
       * 2) The allowed disk space for storage is used
       * up. However, this is more likely to happen in
       * calls to LocalCache.set().
       */
						try {
							LocalCache.createPolyfill();
							_canUseStorage = true;
						} catch (exception) {
							logger(local_cache_logGroup, 'Local Storage polyfill error: ', exception);
						}
					}
				}
			}

			return _canUseStorage;
		}
	}, {
		key: 'createPolyfill',
		value: function createPolyfill() {
			logger(local_cache_logGroup, 'Local Storage polyfill being created');
			Storage.prototype.data = {};

			Storage.prototype.setItem = function setItem(id, val) {
				this.data[id] = String(val);
			};

			Storage.prototype.getItem = function getItem(id) {
				return this.data[id] ? this.data[id] : null;
			};

			Storage.prototype.removeItem = function removeItem(id) {
				delete this.data[id];
			};

			Storage.prototype.clear = function clear() {
				this.data = {};
			};
		}
	}, {
		key: 'get',
		value: function get(key) {
			if (!this.canUseStorage()) {
				return false;
			}

			var cacheItem = window.localStorage.getItem(key);

			if (cacheItem) {
				// De-serialize
				cacheItem = JSON.parse(cacheItem);

				// Check if item has expired
				if (this.isExpired(cacheItem)) {
					this.delete(key);
					return false;
				}

				return cacheItem.data;
			}

			return false;
		}
	}, {
		key: 'set',
		value: function set(key, value) {
			var expires = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			if (!this.canUseStorage() || !this.isStorable(value)) {
				return false;
			}

			var cacheItem = { data: value };
			var expiresValue = parseInt(expires, 10);

			if (!isNaN(expiresValue)) {
				// Set expiration as a JS timestamp
				cacheItem.expires = expiresValue * 1000 + Date.now();
			}

			try {
				window.localStorage.setItem(key, stringify__default()(cacheItem));
			} catch (e) {
				// Local Storage is at capacity
				return false;
			}

			return true;
		}
	}, {
		key: 'delete',
		value: function _delete(key) {
			if (!this.canUseStorage()) {
				return;
			}

			window.localStorage.removeItem(key);
		}
	}, {
		key: 'isStorable',
		value: function isStorable(value) {
			if (
			// Functions might be a security risk
			typeof value === 'function' ||
			// NaN
			typeof value === 'number' && isNaN(value) ||
			// undefined
			typeof value === 'undefined') {
				return false;
			}

			return true;
		}
	}, {
		key: 'isExpired',
		value: function isExpired(cacheItem) {
			return cacheItem.expires && Date.now() >= parseInt(cacheItem.expires, 10);
		}
	}]);

	return LocalCache;
}();

var localCache = new local_cache_LocalCache();
// CONCATENATED MODULE: ./src/services/message-bus.js




var callbacks = [],
    message_bus_logGroup = 'message-bus';

function isAdEngineMessage(message) {
	try {
		return !!JSON.parse(message.data).AdEngine;
	} catch (e) {
		return false;
	}
}

function messageMatch(match, message) {
	var matching = true;

	if (match.keys) {
		var data = JSON.parse(message.data).AdEngine;
		match.keys.forEach(function (key) {
			matching = matching && data[key];
		});
	}

	return matching;
}

function onMessage(message) {
	var i = 0,
	    callback = void 0;

	if (isAdEngineMessage(message)) {
		logger(message_bus_logGroup, 'Message received', message);

		for (i = 0; i < callbacks.length; i += 1) {
			callback = callbacks[i];
			if (messageMatch(callback.match, message)) {
				logger(message_bus_logGroup, 'Matching message', message, callback);

				callback.fn(JSON.parse(message.data).AdEngine);

				if (!callback.match.infinite) {
					callbacks.splice(i, 1);
				}
				return;
			}
		}
	}
}

var message_bus_MessageBus = function () {
	function MessageBus() {
		classCallCheck__default()(this, MessageBus);
	}

	createClass__default()(MessageBus, [{
		key: 'init',
		value: function init() {
			logger(message_bus_logGroup, 'Register message listener');
			window.addEventListener('message', onMessage);
		}
	}, {
		key: 'register',
		value: function register(match, callback) {
			callbacks.push({
				match: match,
				fn: callback
			});
		}
	}]);

	return MessageBus;
}();

var messageBus = new message_bus_MessageBus();
// CONCATENATED MODULE: ./src/services/slot-tweaker.js








var slot_tweaker_logGroup = 'slot-tweaker';

var slot_tweaker_SlotTweaker = function () {
	function SlotTweaker() {
		classCallCheck__default()(this, SlotTweaker);
	}

	createClass__default()(SlotTweaker, [{
		key: 'forceRepaint',
		value: function forceRepaint(domElement) {
			return domElement.offsetWidth;
		}
	}, {
		key: 'getContainer',
		value: function getContainer(adSlot) {
			var container = document.getElementById(adSlot.getId());

			if (!container) {
				logger(slot_tweaker_logGroup, 'cannot find container', adSlot.getId());
			}

			return container;
		}
	}, {
		key: 'hide',
		value: function hide(adSlot) {
			var container = this.getContainer(adSlot);

			if (container) {
				logger(slot_tweaker_logGroup, 'hide', adSlot.getId());
				container.classList.add('hide');
			}
		}
	}, {
		key: 'show',
		value: function show(adSlot) {
			var container = this.getContainer(adSlot);

			if (container) {
				logger(slot_tweaker_logGroup, 'show', adSlot.getId());
				container.classList.remove('hide');
			}
		}
	}, {
		key: 'collapse',
		value: function collapse(adSlot) {
			var container = this.getContainer(adSlot);

			container.style.maxHeight = container.scrollHeight + 'px';
			this.forceRepaint(container);
			container.classList.add('slot-animation');
			container.style.maxHeight = '0';
		}
	}, {
		key: 'expand',
		value: function expand(adSlot) {
			var container = this.getContainer(adSlot);

			container.style.maxHeight = container.offsetHeight + 'px';
			container.classList.remove('hide');
			container.classList.add('slot-animation');
			container.style.maxHeight = container.scrollHeight + 'px';
		}
	}, {
		key: 'makeResponsive',
		value: function makeResponsive(adSlot) {
			var aspectRatio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			var slotContainer = this.getContainer(adSlot);

			slotContainer.classList.add('slot-responsive');

			return this.onReady(adSlot).then(function (iframe) {
				var container = iframe.parentElement;
				if (!aspectRatio) {
					var height = iframe.contentWindow.document.body.scrollHeight,
					    width = iframe.contentWindow.document.body.scrollWidth;

					aspectRatio = width / height;
				}

				logger(slot_tweaker_logGroup, 'make responsive', adSlot.getId());
				container.style.paddingBottom = 100 / aspectRatio + '%';
				return iframe;
			});
		}
	}, {
		key: 'onReady',
		value: function onReady(adSlot) {
			var container = this.getContainer(adSlot),
			    iframe = container.querySelector('div[id*="_container_"] iframe');

			return new promise__default.a(function (resolve, reject) {
				if (!iframe) {
					reject('Cannot find iframe element');
				}

				if (iframe.contentWindow.document.readyState === 'complete') {
					resolve(iframe);
				} else {
					iframe.addEventListener('load', function () {
						return resolve(iframe);
					});
				}
			});
		}
	}, {
		key: 'registerMessageListener',
		value: function registerMessageListener() {
			var _this = this;

			messageBus.register({
				keys: ['action', 'slotName'],
				infinite: true
			}, function (data) {
				if (!data.slotName) {
					logger(slot_tweaker_logGroup, 'Missing slot name');
					return;
				}

				var adSlot = slotService.getBySlotName(data.slotName);

				switch (data.action) {
					case 'expand':
						_this.expand(adSlot);
						break;
					case 'collapse':
						_this.collapse(adSlot);
						break;
					case 'hide':
						_this.hide(adSlot);
						break;
					case 'show':
						_this.show(adSlot);
						break;
					case 'make-responsive':
						_this.makeResponsive(adSlot, data.aspectRatio);
						break;
					default:
						logger(slot_tweaker_logGroup, 'Unknown action', data.action);
				}
			});
		}
	}, {
		key: 'setDataParam',
		value: function setDataParam(adSlot, attrName, data) {
			var container = this.getContainer(adSlot);

			container.dataset[attrName] = typeof data === 'string' ? data : stringify__default()(data);
		}
	}]);

	return SlotTweaker;
}();

var slotTweaker = new slot_tweaker_SlotTweaker();
// CONCATENATED MODULE: ./src/services/slot-data-params-updater.js






var slot_data_params_updater_SlotDataParamsUpdater = function () {
	function SlotDataParamsUpdater() {
		classCallCheck__default()(this, SlotDataParamsUpdater);
	}

	createClass__default()(SlotDataParamsUpdater, [{
		key: 'getSlotSizes',
		value: function getSlotSizes(adSlot) {
			var result = {};

			adSlot.getSizes().forEach(function (s) {
				result[s.viewportSize[0] + 'x' + s.viewportSize[1]] = s.sizes;
			});

			return stringify__default()(result);
		}
	}, {
		key: 'updateOnCreate',
		value: function updateOnCreate(adSlot, targeting) {
			slotTweaker.setDataParam(adSlot, 'gptPageParams', context.get('targeting'));
			slotTweaker.setDataParam(adSlot, 'gptSlotParams', targeting);
			slotTweaker.setDataParam(adSlot, 'sizes', this.getSlotSizes(adSlot));
		}
	}, {
		key: 'updateOnRenderEnd',
		value: function updateOnRenderEnd(adSlot, event) {
			slotTweaker.setDataParam(adSlot, 'gptLineItemId', event.lineItemId);
			slotTweaker.setDataParam(adSlot, 'gptCreativeId', event.creativeId);
			slotTweaker.setDataParam(adSlot, 'gptCreativeSize', event.size);
		}
	}]);

	return SlotDataParamsUpdater;
}();

var slotDataParamsUpdater = new slot_data_params_updater_SlotDataParamsUpdater();
// CONCATENATED MODULE: ./src/services/index.js









// CONCATENATED MODULE: ./src/utils/string-builder.js




var string_builder_StringBuilder = function () {
	function StringBuilder() {
		classCallCheck__default()(this, StringBuilder);
	}

	createClass__default()(StringBuilder, [{
		key: 'build',
		value: function build(string) {
			var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var matches = string.match(/{(.+?)}/g);

			if (matches) {
				matches.forEach(function (match) {
					var key = match.replace('{', '').replace('}', ''),
					    fallbackValue = context.get(key),
					    keySegments = key.split('.');

					var index = void 0,
					    segment = void 0,
					    value = parameters[keySegments[0]];

					if (value) {
						for (index = 1; index < keySegments.length; index += 1) {
							segment = keySegments[index];
							if (typeof value[segment] === 'undefined') {
								value = undefined;
								break;
							}
							value = value[segment];
						}
					}

					if (typeof value === 'undefined') {
						value = fallbackValue;
					}
					if (typeof value !== 'undefined') {
						string = string.replace(match, value);
					}
				});
			}

			return string;
		}
	}]);

	return StringBuilder;
}();

var stringBuilder = new string_builder_StringBuilder();
// CONCATENATED MODULE: ./src/utils/try-property.js
function whichProperty(obj) {
	var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	for (var i = 0; i < properties.length; i += 1) {
		var property = properties[i];

		if (typeof property !== 'string') {
			throw new Error('property name must be a string');
		}

		if (property in obj) {
			return property;
		}
	}

	return null;
}

function tryProperty(obj) {
	var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	var property = whichProperty(obj, properties);

	if (property !== null) {
		var propertyValue = obj[property];
		return typeof propertyValue === 'function' ? propertyValue.bind(obj) : propertyValue;
	}

	return null;
}
// EXTERNAL MODULE: external "babel-runtime/core-js/object/get-prototype-of"
var get_prototype_of_ = __webpack_require__(13);
var get_prototype_of__default = /*#__PURE__*/__webpack_require__.n(get_prototype_of_);

// EXTERNAL MODULE: external "babel-runtime/helpers/possibleConstructorReturn"
var possibleConstructorReturn_ = __webpack_require__(14);
var possibleConstructorReturn__default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn_);

// EXTERNAL MODULE: external "babel-runtime/helpers/inherits"
var inherits_ = __webpack_require__(15);
var inherits__default = /*#__PURE__*/__webpack_require__.n(inherits_);

// EXTERNAL MODULE: external "events"
var external__events_ = __webpack_require__(16);
var external__events__default = /*#__PURE__*/__webpack_require__.n(external__events_);

// CONCATENATED MODULE: ./src/models/ad-slot.js









var ad_slot_AdSlot = function (_EventEmitter) {
	inherits__default()(AdSlot, _EventEmitter);

	/**
  * Parse the object that's passed from the template to extract more details
  * @param {object} ad Object containing an ad id and page type
  *      Format of id is:
  *           gpt-<location>-<ad-type>[-<screen-size>]
  *      Examples:
  *           gpt-top-leaderboard
  *           gpt-bottom-boxad-mobile
  *           gpt-bottom-leaderboard-desktop
  */
	function AdSlot(ad) {
		classCallCheck__default()(this, AdSlot);

		var _this = possibleConstructorReturn__default()(this, (AdSlot.__proto__ || get_prototype_of__default()(AdSlot)).call(this));

		var segments = ad.id.split('-');

		if (segments.length < 3) {
			throw new Error('Invalid GPT id passed to parseId (' + ad.id + ').');
		}

		_this.id = ad.id;
		_this.location = segments[1];
		_this.screenSize = segments[3] ? segments[3] : 'both';
		_this.type = segments[2];
		_this.config = context.get('slots.' + _this.location + '-' + _this.type) || {};
		_this.enabled = !_this.config.disabled;
		_this.viewed = false;
		_this.element = null;

		_this.config.targeting = _this.config.targeting || {};
		_this.config.targeting.src = _this.config.targeting.src || context.get('src');
		_this.config.targeting.pos = _this.config.targeting.pos || _this.getSlotName();

		_this.once(AdSlot.SLOT_VIEWED_EVENT, function () {
			_this.viewed = true;
		});
		return _this;
	}

	createClass__default()(AdSlot, [{
		key: 'getId',
		value: function getId() {
			return this.id;
		}
	}, {
		key: 'getAdUnit',
		value: function getAdUnit() {
			if (!this.adUnit) {
				this.adUnit = stringBuilder.build(this.config.adUnit || context.get('adUnitId'), {
					slotConfig: this.config
				});
			}

			return this.adUnit;
		}
	}, {
		key: 'getVideoAdUnit',
		value: function getVideoAdUnit() {
			return stringBuilder.build(this.config.videoAdUnit || context.get('vast.adUnitId'), {
				slotConfig: this.config
			});
		}
	}, {
		key: 'getElement',
		value: function getElement() {
			if (!this.element) {
				this.element = document.getElementById(this.id);
			}

			return this.element;
		}
	}, {
		key: 'getSlotName',
		value: function getSlotName() {
			return this.config.slotName;
		}
	}, {
		key: 'getSizes',
		value: function getSizes() {
			return this.config.sizes;
		}
	}, {
		key: 'getTargeting',
		value: function getTargeting() {
			return this.config.targeting;
		}
	}, {
		key: 'getDefaultSizes',
		value: function getDefaultSizes() {
			return this.config.defaultSizes;
		}
	}, {
		key: 'shouldLoad',
		value: function shouldLoad() {
			var isMobile = context.get('state.isMobile'),
			    shouldLoad = this.screenSize === 'both',
			    shouldLoadDesktop = !isMobile && this.screenSize === 'desktop',
			    shouldLoadMobile = isMobile && this.screenSize === 'mobile';

			return shouldLoad || shouldLoadDesktop || shouldLoadMobile;
		}
	}, {
		key: 'isAboveTheFold',
		value: function isAboveTheFold() {
			return !!this.config.aboveTheFold;
		}
	}, {
		key: 'isEnabled',
		value: function isEnabled() {
			return this.enabled;
		}
	}, {
		key: 'isViewed',
		value: function isViewed() {
			return this.viewed;
		}
	}, {
		key: 'enable',
		value: function enable() {
			this.enabled = true;
		}
	}, {
		key: 'disable',
		value: function disable() {
			this.enabled = false;
		}
	}, {
		key: 'setConfigProperty',
		value: function setConfigProperty(key, value) {
			context.set('slots.' + this.location + '-' + this.type + '.' + key, value);
		}
	}, {
		key: 'success',
		value: function success() {
			slotTweaker.show(this);
			slotTweaker.setDataParam(this, 'slotResult', 'success');

			if (this.config.defaultTemplate) {
				templateService.init(this.config.defaultTemplate, this);
			}
		}
	}, {
		key: 'collapse',
		value: function collapse() {
			slotTweaker.hide(this);
			slotTweaker.setDataParam(this, 'slotResult', 'collapse');
		}
	}]);

	return AdSlot;
}(external__events_["EventEmitter"]);
ad_slot_AdSlot.PROPERTY_CHANGED_EVENT = 'propertyChanged';
ad_slot_AdSlot.SLOT_VIEWED_EVENT = 'slotViewed';
ad_slot_AdSlot.VIDEO_VIEWED_EVENT = 'videoViewed';
// CONCATENATED MODULE: ./src/models/index.js

// CONCATENATED MODULE: ./src/video/vast-parser.js




var vast_parser_VastParser = function () {
	function VastParser() {
		classCallCheck__default()(this, VastParser);
	}

	createClass__default()(VastParser, [{
		key: 'getAdInfo',
		value: function getAdInfo(imaAd) {
			var adInfo = {};

			var wrapperCreativeIds = void 0,
			    wrapperIds = void 0;

			if (imaAd) {
				adInfo.lineItemId = imaAd.getAdId();
				adInfo.creativeId = imaAd.getCreativeId();
				adInfo.contentType = imaAd.getContentType();

				wrapperIds = imaAd.getWrapperAdIds();
				if (wrapperIds && wrapperIds.length) {
					adInfo.lineItemId = wrapperIds[0];
				}

				wrapperCreativeIds = imaAd.getWrapperCreativeIds();
				if (wrapperCreativeIds && wrapperCreativeIds.length) {
					adInfo.creativeId = wrapperCreativeIds[0];
				}
			}

			return adInfo;
		}
	}, {
		key: 'parse',
		value: function parse(vastUrl) {
			var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var currentAd = this.getAdInfo(extra.imaAd),
			    vastParams = query_string_queryString.getValues(vastUrl.substr(1 + vastUrl.indexOf('?'))),
			    customParams = query_string_queryString.getValues(encodeURI(vastParams.cust_params));

			return {
				contentType: currentAd.contentType || extra.contentType,
				creativeId: currentAd.creativeId || extra.creativeId,
				customParams: customParams,
				lineItemId: currentAd.lineItemId || extra.lineItemId,
				position: vastParams.vpos,
				size: vastParams.sz
			};
		}
	}]);

	return VastParser;
}();

var vastParser = new vast_parser_VastParser();
// CONCATENATED MODULE: ./src/video/vast-debugger.js





function setAttribute(element, attribute, value) {
	if (!element || !value) {
		return;
	}

	element.setAttribute(attribute, value);
}

var vast_debugger_VastDebugger = function () {
	function VastDebugger() {
		classCallCheck__default()(this, VastDebugger);
	}

	createClass__default()(VastDebugger, [{
		key: 'setVastAttributes',
		value: function setVastAttributes(element, vastUrl, status, imaAd) {
			var vastParams = vastParser.parse(vastUrl, {
				imaAd: imaAd
			});

			setAttribute(element, 'data-vast-content-type', vastParams.contentType);
			setAttribute(element, 'data-vast-creative-id', vastParams.creativeId);
			setAttribute(element, 'data-vast-line-item-id', vastParams.lineItemId);
			setAttribute(element, 'data-vast-position', vastParams.position);
			setAttribute(element, 'data-vast-size', vastParams.size);
			setAttribute(element, 'data-vast-status', status);
			setAttribute(element, 'data-vast-params', stringify__default()(vastParams.customParams));
		}
	}]);

	return VastDebugger;
}();

var vastDebugger = new vast_debugger_VastDebugger();
// CONCATENATED MODULE: ./src/video/vast-url-builder.js




var availableVideoPositions = ['preroll', 'midroll', 'postroll'],
    baseUrl = 'https://pubads.g.doubleclick.net/gampad/ads?',
    correlator = Math.round(Math.random() * 10000000000);

function getCustomParameters(slot) {
	var extraTargeting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var params = assign__default()({}, context.get('targeting'), slot.getTargeting(), extraTargeting);

	return encodeURIComponent(keys__default()(params).filter(function (key) {
		return params[key];
	}).map(function (key) {
		return key + '=' + params[key];
	}).join('&'));
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function buildVastUrl(aspectRatio, slotName) {
	var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	var params = ['output=vast', 'env=vp', 'gdfp_req=1', 'impl=s', 'unviewed_position_start=1', 'sz=' + (aspectRatio > 1 || !isNumeric(aspectRatio) ? '640x480' : '320x480'), 'url=' + encodeURIComponent(window.location.href), 'description_url=' + encodeURIComponent(window.location.href), 'correlator=' + correlator],
	    slot = slotService.getBySlotName(slotName);

	if (slot) {
		params.push('iu=' + slot.getVideoAdUnit());
		params.push('cust_params=' + getCustomParameters(slot, options.targeting));
	} else {
		throw Error('Slot does not exist!');
	}

	if (options.contentSourceId && options.videoId) {
		params.push('cmsid=' + options.contentSourceId);
		params.push('vid=' + options.videoId);
	}

	if (options.vpos && availableVideoPositions.indexOf(options.vpos) > -1) {
		params.push('vpos=' + options.vpos);
	}

	if (options.numberOfAds !== undefined) {
		params.push('pmad=' + options.numberOfAds);
	}

	return baseUrl + params.join('&');
}
// CONCATENATED MODULE: ./src/video/player/porvata/ima/google-ima-setup.js




var google_ima_setup_logGroup = 'google-ima-setup';

function getOverriddenVast() {
	if (query_string_queryString.get('porvata_override_vast') === '1') {
		var vastXML = window.localStorage.getItem('porvata_vast');
		logger(google_ima_setup_logGroup, 'Overridden VAST', vastXML);

		return vastXML;
	}

	return null;
}

function createRequest(params) {
	var adSlot = slotService.getBySlotName(params.slotName),
	    adsRequest = new window.google.ima.AdsRequest(),
	    overriddenVast = getOverriddenVast();

	if (params.vastResponse || overriddenVast) {
		adsRequest.adsResponse = overriddenVast || params.vastResponse;
	}

	if (context.get('options.porvata.audio.exposeToSlot')) {
		var key = context.get('options.porvata.audio.key'),
		    segment = context.get('options.porvata.audio.segment');

		adSlot.setConfigProperty('audioSegment', params.autoPlay ? '' : segment);
		adSlot.setConfigProperty('targeting.' + key, params.autoPlay ? 'no' : 'yes');
	}

	adsRequest.adTagUrl = params.vastUrl || buildVastUrl(params.width / params.height, params.slotName, {
		targeting: params.vastTargeting
	});
	adsRequest.linearAdSlotWidth = params.width;
	adsRequest.linearAdSlotHeight = params.height;

	return adsRequest;
}

function getRenderingSettings() {
	var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var adsRenderingSettings = new window.google.ima.AdsRenderingSettings(),
	    maximumRecommendedBitrate = 68000; // 2160p High Frame Rate

	if (!context.get('state.isMobile')) {
		adsRenderingSettings.bitrate = maximumRecommendedBitrate;
	}

	adsRenderingSettings.loadVideoTimeout = params.loadVideoTimeout || 15000;
	adsRenderingSettings.enablePreloading = true;
	adsRenderingSettings.uiElements = [];

	return adsRenderingSettings;
}

var googleImaSetup = {
	createRequest: createRequest,
	getRenderingSettings: getRenderingSettings
};
// CONCATENATED MODULE: ./src/video/player/porvata/moat/moat-video-tracker-script.js
// Fixes for MOAT script incompatibility
var eventMapping = {},
    listeners = [],
    moatapi = {};

// MOAT CODE START
/* Copyright (c) 2011-2016 Moat Inc. All Rights Reserved. */
// eslint-disable-next-line
function initMoatTracking(a, f, c) {
	if (!1 === f.hasOwnProperty("partnerCode")) return !1;var g = document.createElement("script");c = c || a && ("undefined" !== typeof a.O ? a.O.parentNode : document.body) || document.body;listeners = [];moatapi = { adsManager: a, ids: f, imaSDK: !0, events: [] };eventMapping = { complete: "AdVideoComplete", firstquartile: "AdVideoFirstQuartile", impression: "AdImpression", loaded: "AdLoaded", midpoint: "AdVideoMidpoint", pause: "AdPaused", skip: "AdSkipped", start: "AdVideoStart", thirdquartile: "AdVideoThirdQuartile", volumeChange: "AdVolumeChange" };if (google && google.ima && a) {
		var d = "_moatApi" + Math.floor(1E8 * Math.random()),
		    h;for (h in google.ima.AdEvent.Type) {
			var l = function l(b) {
				if (moatapi.sendEvent) {
					for (b = listeners.length - 1; 0 <= b; b--) {
						a.removeEventListener(listeners[b].type, listeners[b].func);
					}moatapi.sendEvent(moatapi.events);
				} else moatapi.events.push({ type: eventMapping[b.type] || b.type, adVolume: a.getVolume() });
			};a.addEventListener(google.ima.AdEvent.Type[h], l);listeners.push({ type: google.ima.AdEvent.Type[h], func: l });
		}
	}var d = "undefined" !== typeof d ? d : "",
	    e,
	    k;try {
		e = c.ownerDocument, k = e.defaultView || e.parentWindow;
	} catch (m) {
		e = document, k = window;
	}k[d] = moatapi;g.type = "text/javascript";c && c.appendChild(g);g.src = "https://z.moatads.com/" + f.partnerCode + "/moatvideo.js#" + d;
};
// MOAT CODE END
// CONCATENATED MODULE: ./src/video/player/porvata/moat/moat-video-tracker.js






var moat_video_tracker_logGroup = 'moat-video-tracker';

var moat_video_tracker_MoatVideoTracker = function () {
	function MoatVideoTracker() {
		classCallCheck__default()(this, MoatVideoTracker);
	}

	createClass__default()(MoatVideoTracker, [{
		key: 'init',
		value: function init(adsManager, container, viewMode, slicer1, slicer2) {
			var ids = {
				partnerCode: context.get('options.video.moatTracking.partnerCode'),
				viewMode: viewMode,
				slicer1: slicer1,
				slicer2: slicer2
			};

			try {
				initMoatTracking(adsManager, ids, container);
				logger(moat_video_tracker_logGroup, 'MOAT video tracking initialized');
			} catch (error) {
				logger(moat_video_tracker_logGroup, 'MOAT video tracking initalization error', error);
			}
		}
	}]);

	return MoatVideoTracker;
}();

var moatVideoTracker = new moat_video_tracker_MoatVideoTracker();
// CONCATENATED MODULE: ./src/video/player/porvata/ima/google-ima-player-factory.js






function getVideoElement() {
	var videoElement = document.createElement('video');

	videoElement.setAttribute('preload', 'none');

	return videoElement;
}

var google_ima_player_factory_GoogleImaPlayer = function () {
	function GoogleImaPlayer(adDisplayContainer, adsLoader, params) {
		classCallCheck__default()(this, GoogleImaPlayer);

		this.isAdsManagerLoaded = false;
		this.status = '';
		this.adDisplayContainer = adDisplayContainer;
		this.adsLoader = adsLoader;
		this.adsManager = null;
		this.params = params;
		this.mobileVideoAd = params.container.querySelector('video');
		this.eventListeners = {};
		this.vastUrl = '';
	}

	createClass__default()(GoogleImaPlayer, [{
		key: 'setVastUrl',
		value: function setVastUrl(vastUrl) {
			this.vastUrl = vastUrl;
		}
	}, {
		key: 'setAdsManager',
		value: function setAdsManager(adsManager) {
			this.adsManager = adsManager;
			this.isAdsManagerLoaded = true;
		}
	}, {
		key: 'addEventListener',
		value: function addEventListener(eventName, callback) {
			var _this = this;

			if (eventName.indexOf('wikia') !== -1) {
				this.eventListeners[eventName] = this.eventListeners[eventName] || [];
				this.eventListeners[eventName].push(callback);
				return;
			}

			if (this.isAdsManagerLoaded) {
				this.adsManager.addEventListener(eventName, callback);
			} else {
				this.adsLoader.addEventListener('adsManagerLoaded', function () {
					_this.adsManager.addEventListener(eventName, callback);
				});
			}
		}
	}, {
		key: 'setVastAttributes',
		value: function setVastAttributes(status) {
			var currentAd = this.adsManager && this.adsManager.getCurrentAd && this.adsManager.getCurrentAd(),
			    playerElement = this.params.container.querySelector('.video-player');

			vastDebugger.setVastAttributes(playerElement, this.vastUrl, status, currentAd);
		}
	}, {
		key: 'setAutoPlay',
		value: function setAutoPlay(value) {
			// mobileVideoAd DOM element is present on mobile only
			if (this.mobileVideoAd) {
				this.mobileVideoAd.autoplay = value;
				this.mobileVideoAd.muted = value;
			}
			this.params.autoPlay = value;
		}
	}, {
		key: 'playVideo',
		value: function playVideo(width, height) {
			var _this2 = this;

			var callback = function callback() {
				_this2.dispatchEvent('wikiaAdPlayTriggered');
				// https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdDisplayContainer.initialize
				_this2.adDisplayContainer.initialize();
				_this2.adsManager.init(Math.round(width), Math.round(height), window.google.ima.ViewMode.NORMAL);
				_this2.adsManager.start();
				_this2.adsLoader.removeEventListener('adsManagerLoaded', callback);
			};

			if (this.isAdsManagerLoaded) {
				callback();
			} else {
				// When adsManager is not loaded yet video can't start without click on mobile
				// Muted auto play is workaround to run video on adsManagerLoaded event
				this.setAutoPlay(true);
				this.adsLoader.addEventListener('adsManagerLoaded', callback, false);
			}
		}
	}, {
		key: 'reload',
		value: function reload() {
			var adRequest = googleImaSetup.createRequest(this.params);

			this.adsManager.destroy();
			this.adsLoader.contentComplete();
			this.setVastUrl(adRequest.adTagUrl);
			this.adsLoader.requestAds(adRequest);
		}
	}, {
		key: 'resize',
		value: function resize(width, height) {
			var isFullscreen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			var viewMode = window.google.ima.ViewMode;

			if (this.adsManager) {
				this.adsManager.resize(Math.round(width), Math.round(height), isFullscreen ? viewMode.FULLSCREEN : viewMode.NORMAL);
			}
		}
	}, {
		key: 'dispatchEvent',
		value: function dispatchEvent(eventName) {
			if (this.eventListeners[eventName] && this.eventListeners[eventName].length > 0) {
				this.eventListeners[eventName].forEach(function (callback) {
					callback({});
				});
			}
		}
	}, {
		key: 'setStatus',
		value: function setStatus(newStatus) {
			var _this3 = this;

			return function () {
				_this3.status = newStatus;
			};
		}
	}, {
		key: 'getStatus',
		value: function getStatus() {
			return this.status;
		}
	}, {
		key: 'getAdsManager',
		value: function getAdsManager() {
			return this.adsManager;
		}
	}]);

	return GoogleImaPlayer;
}();

var googleImaPlayerFactory = {
	create: function create(adDisplayContainer, adsLoader, videoSettings) {
		var adRequest = googleImaSetup.createRequest(videoSettings.getParams()),
		    player = new google_ima_player_factory_GoogleImaPlayer(adDisplayContainer, adsLoader, videoSettings.getParams()),
		    videoElement = getVideoElement();

		if (player.mobileVideoAd) {
			videoSettings.getContainer().classList.add('mobile-porvata');
		}

		adsLoader.addEventListener('adsManagerLoaded', function (adsManagerLoadedEvent) {
			var renderingSettings = googleImaSetup.getRenderingSettings(videoSettings),
			    adsManager = adsManagerLoadedEvent.getAdsManager(videoElement, renderingSettings);
			player.setAdsManager(adsManager);

			if (videoSettings.isMoatTrackingEnabled()) {
				moatVideoTracker.init(adsManager, videoSettings.getContainer(), window.google.ima.ViewMode.NORMAL, videoSettings.get('src'), videoSettings.get('adProduct') + '/' + videoSettings.get('slotName'));
			}

			player.dispatchEvent('wikiaAdsManagerLoaded');

			adsManager.addEventListener('loaded', function () {
				return player.setVastAttributes('success');
			});
			adsManager.addEventListener('adError', function () {
				return player.setVastAttributes('error');
			});
		}, false);

		adsLoader.addEventListener('adError', function () {
			return player.setVastAttributes('error');
		});

		player.setVastUrl(adRequest.adTagUrl);
		adsLoader.requestAds(adRequest);
		if (videoSettings.get('autoPlay')) {
			player.setAutoPlay(true);
		}

		player.addEventListener('resume', player.setStatus('playing'));
		player.addEventListener('start', player.setStatus('playing'));
		player.addEventListener('pause', player.setStatus('paused'));
		player.addEventListener('wikiaAdStop', player.setStatus('stopped'));
		player.addEventListener('allAdsCompleted', player.setStatus('stopped'));

		return player;
	}
};
// CONCATENATED MODULE: ./src/video/player/porvata/ima/google-ima.js




var imaLibraryUrl = '//imasdk.googleapis.com/js/sdkloader/ima3.js';

function load() {
	if (window.google && window.google.ima) {
		return new promise__default.a(function (resolve) {
			resolve();
		});
	}

	return scriptLoader.loadScript(imaLibraryUrl);
}

function getPlayer(videoSettings) {
	var adDisplayContainer = new window.google.ima.AdDisplayContainer(videoSettings.getContainer()),
	    iframe = videoSettings.getContainer().querySelector('div > iframe');

	// Reload iframe in order to make IMA work when user is moving back/forward to the page with player
	// https://groups.google.com/forum/#!topic/ima-sdk/Q6Y56CcXkpk
	// https://github.com/googleads/videojs-ima/issues/110
	if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
		iframe.contentWindow.location.href = iframe.src;
	}

	var adsLoader = new window.google.ima.AdsLoader(adDisplayContainer);

	return googleImaPlayerFactory.create(adDisplayContainer, adsLoader, videoSettings);
}

var googleIma = {
	load: load,
	getPlayer: getPlayer
};
// CONCATENATED MODULE: ./src/video/player/porvata/video-settings.js





function getMoatTrackingStatus(params) {
	var sampling = context.get('options.video.moatTracking.sampling');

	if (typeof params.moatTracking === 'boolean') {
		return params.moatTracking;
	}

	if (!context.get('options.video.moatTracking.enabled')) {
		return false;
	}

	if (sampling === 100) {
		return true;
	}

	if (sampling > 0) {
		return sampler.sample('moat_video_tracking', sampling);
	}

	return false;
}

var video_settings_VideoSettings = function () {
	function VideoSettings() {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		classCallCheck__default()(this, VideoSettings);

		this.params = params;
		this.moatTracking = getMoatTrackingStatus(params);
	}

	createClass__default()(VideoSettings, [{
		key: 'get',
		value: function get(key) {
			return this.params[key];
		}
	}, {
		key: 'getContainer',
		value: function getContainer() {
			return this.get('container');
		}
	}, {
		key: 'getParams',
		value: function getParams() {
			return this.params;
		}
	}, {
		key: 'isMoatTrackingEnabled',
		value: function isMoatTrackingEnabled() {
			return this.moatTracking;
		}
	}]);

	return VideoSettings;
}();
// CONCATENATED MODULE: ./src/video/player/porvata/porvata.js







var VIDEO_FULLSCREEN_CLASS_NAME = 'video-player-fullscreen';
var STOP_SCROLLING_CLASS_NAME = 'stop-scrolling';

var prepareVideoAdContainer = function prepareVideoAdContainer(params) {
	var videoAdContainer = params.container.querySelector('div');

	videoAdContainer.classList.add('video-player');
	videoAdContainer.classList.add('hide');

	return videoAdContainer;
};

var porvata_nativeFullscreenOnElement = function nativeFullscreenOnElement(element) {
	var enter = tryProperty(element, ['webkitRequestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen', 'requestFullscreen']);
	var exit = tryProperty(document, ['webkitExitFullscreen', 'mozCancelFullScreen', 'msExitFullscreen', 'exitFullscreen']);
	var fullscreenChangeEvent = (whichProperty(document, ['onwebkitfullscreenchange', 'onmozfullscreenchange', 'MSFullscreenChange', 'onfullscreenchange']) || '').replace(/^on/, '');
	var addChangeListener = function addChangeListener() {
		var _document;

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return (_document = document).addEventListener.apply(_document, [fullscreenChangeEvent].concat(args));
	};
	var removeChangeListener = function removeChangeListener() {
		var _document2;

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return (_document2 = document).removeEventListener.apply(_document2, [fullscreenChangeEvent].concat(args));
	};
	var isSupported = function isSupported() {
		return Boolean(enter && exit);
	};

	return {
		enter: enter,
		exit: exit,
		addChangeListener: addChangeListener,
		removeChangeListener: removeChangeListener,
		isSupported: isSupported
	};
};

var porvata_PorvataPlayer = function () {
	function PorvataPlayer(ima, params) {
		var _this = this;

		classCallCheck__default()(this, PorvataPlayer);

		this.ima = ima;
		this.container = prepareVideoAdContainer(params);
		this.mobileVideoAd = params.container.querySelector('video');
		this.params = params;

		var nativeFullscreen = porvata_nativeFullscreenOnElement(this.container);

		this.fullscreen = Boolean(params.isFullscreen);
		this.nativeFullscreen = nativeFullscreen;
		this.width = params.width;
		this.height = params.height;
		this.muteProtect = false;
		this.volumeValue = 0.75;

		if (nativeFullscreen.isSupported()) {
			nativeFullscreen.addChangeListener(function () {
				return _this.onFullscreenChange();
			});
		}
	}

	createClass__default()(PorvataPlayer, [{
		key: 'addEventListener',
		value: function addEventListener(eventName, callback) {
			this.ima.addEventListener(eventName, callback);
		}
	}, {
		key: 'getRemainingTime',
		value: function getRemainingTime() {
			return this.ima.getAdsManager().getRemainingTime();
		}
	}, {
		key: 'isFullscreen',
		value: function isFullscreen() {
			return this.fullscreen;
		}
	}, {
		key: 'isMuted',
		value: function isMuted() {
			return this.ima.getAdsManager().getVolume() === 0;
		}
	}, {
		key: 'isMobilePlayerMuted',
		value: function isMobilePlayerMuted() {
			var mobileVideoAd = this.container.querySelector('video');
			return mobileVideoAd && mobileVideoAd.autoplay && mobileVideoAd.muted;
		}
	}, {
		key: 'isPaused',
		value: function isPaused() {
			return this.ima.getStatus() === 'paused';
		}
	}, {
		key: 'isPlaying',
		value: function isPlaying() {
			return this.ima.getStatus() === 'playing';
		}
	}, {
		key: 'pause',
		value: function pause() {
			this.ima.getAdsManager().pause();
		}
	}, {
		key: 'play',
		value: function play(newWidth, newHeight) {
			if (newWidth !== undefined && newHeight !== undefined) {
				this.width = newWidth;
				this.height = newHeight;
			}
			if (!this.width || !this.height || this.isFullscreen()) {
				this.width = this.params.container.offsetWidth;
				this.height = this.params.container.offsetHeight;
			}

			this.ima.playVideo(this.width, this.height);
		}
	}, {
		key: 'reload',
		value: function reload() {
			this.ima.reload();
		}
	}, {
		key: 'resize',
		value: function resize(newWidth, newHeight) {
			if (isFinite(newWidth) && isFinite(newHeight)) {
				this.width = newWidth;
				this.height = newHeight;
			}

			if (this.isFullscreen()) {
				this.ima.resize(window.innerWidth, window.innerHeight, true);
			} else {
				this.ima.resize(this.width, this.height, false);
			}
		}
	}, {
		key: 'resume',
		value: function resume() {
			this.ima.getAdsManager().resume();
		}
	}, {
		key: 'rewind',
		value: function rewind() {
			this.params.autoPlay = false;
			this.ima.setAutoPlay(false);
			this.ima.dispatchEvent('wikiaAdRestart');
			this.play();
		}
	}, {
		key: 'setVolume',
		value: function setVolume(volume) {
			this.updateVideoDOMElement(volume);
			this.ima.getAdsManager().setVolume(volume);

			// This is hack for Safari, because it can't dispatch original IMA event (volumeChange)
			this.ima.dispatchEvent('wikiaVolumeChange');
		}
	}, {
		key: 'toggleFullscreen',
		value: function toggleFullscreen() {
			var isFullscreen = this.isFullscreen();
			var nativeFullscreen = this.nativeFullscreen;

			this.muteProtect = true;

			if (nativeFullscreen.isSupported()) {
				var toggleNativeFullscreen = isFullscreen ? nativeFullscreen.exit : nativeFullscreen.enter;
				toggleNativeFullscreen();
			} else {
				this.onFullscreenChange();
			}
		}
	}, {
		key: 'onFullscreenChange',
		value: function onFullscreenChange() {
			this.fullscreen = !this.fullscreen;

			if (this.isFullscreen()) {
				this.container.classList.add(VIDEO_FULLSCREEN_CLASS_NAME);
				document.documentElement.classList.add(STOP_SCROLLING_CLASS_NAME);
			} else {
				this.container.classList.remove(VIDEO_FULLSCREEN_CLASS_NAME);
				document.documentElement.classList.remove(STOP_SCROLLING_CLASS_NAME);

				if (this.muteProtect) {
					this.muteProtect = false;
				} else if (this.isPlaying() && !this.isMuted()) {
					this.mute();
				}
			}

			this.resize();
			this.ima.dispatchEvent('wikiaFullscreenChange');
		}
	}, {
		key: 'updateVideoDOMElement',
		value: function updateVideoDOMElement(volume) {
			if (this.mobileVideoAd) {
				this.mobileVideoAd.muted = volume === 0;
				this.mobileVideoAd.volume = volume;
			}
		}
	}, {
		key: 'mute',
		value: function mute() {
			this.setVolume(0);
		}
	}, {
		key: 'unmute',
		value: function unmute() {
			this.setVolume(this.volumeValue);

			if (this.params.autoPlay && this.params.restartOnUnmute) {
				this.rewind();
			}
		}
	}, {
		key: 'volumeToggle',
		value: function volumeToggle() {
			if (this.isMuted()) {
				this.unmute();
				this.ima.dispatchEvent('wikiaAdUnmute');
			} else {
				this.mute();
				this.ima.dispatchEvent('wikiaAdMute');
			}
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.ima.getAdsManager().stop();
			this.ima.dispatchEvent('wikiaAdStop');
		}
	}]);

	return PorvataPlayer;
}();

var porvata_Porvata = function () {
	function Porvata() {
		classCallCheck__default()(this, Porvata);
	}

	createClass__default()(Porvata, null, [{
		key: 'addOnViewportChangeListener',


		/**
   * @private
   * @returns listener id
   */
		value: function addOnViewportChangeListener(params, listener) {
			return viewportObserver.addListener(params.container, listener, {
				offsetTop: params.viewportOffsetTop || 0,
				offsetBottom: params.viewportOffsetBottom || 0
			});
		}
	}, {
		key: 'inject',
		value: function inject(params) {
			var porvataListener = new porvata_listener_PorvataListener({
				adProduct: params.adProduct,
				position: params.slotName,
				src: params.src,
				withAudio: !params.autoPlay
			});

			var isFirstPlay = true,
			    autoPaused = false,
			    autoPlayed = false,
			    viewportListenerId = null;

			function muteFirstPlay(video) {
				video.addEventListener('loaded', function () {
					if (isFirstPlay) {
						video.mute();
					}
				});
			}

			params.vastTargeting = params.vastTargeting || {
				passback: 'porvata'
			};

			var videoSettings = new video_settings_VideoSettings(params);

			porvataListener.init();

			return googleIma.load().then(function () {
				return googleIma.getPlayer(videoSettings);
			}).then(function (ima) {
				return new porvata_PorvataPlayer(ima, params);
			}).then(function (video) {
				function inViewportCallback(isVisible) {
					// Play video automatically only for the first time
					if (isVisible && !autoPlayed && params.autoPlay) {
						video.play();
						autoPlayed = true;
						// Don't resume when video was paused manually
					} else if (isVisible && autoPaused) {
						video.resume();
						// Pause video once it's out of viewport and set autoPaused to distinguish manual and auto pause
					} else if (!isVisible && video.isPlaying() && !params.blockOutOfViewportPausing) {
						video.pause();
						autoPaused = true;
					}
				}

				function setupAutoPlayMethod() {
					if (params.blockOutOfViewportPausing) {
						if (params.autoPlay && !autoPlayed) {
							autoPlayed = true;
							video.play();
						}
					} else {
						viewportListenerId = Porvata.addOnViewportChangeListener(params, inViewportCallback);
					}
				}

				porvataListener.registerVideoEvents(video);

				video.addEventListener('adCanPlay', function () {
					video.ima.dispatchEvent('wikiaAdStarted');
				});
				video.addEventListener('allAdsCompleted', function () {
					if (video.isFullscreen()) {
						video.toggleFullscreen();
					}

					video.ima.setAutoPlay(false);
					video.ima.dispatchEvent('wikiaAdCompleted');
					if (viewportListenerId) {
						viewportObserver.removeListener(viewportListenerId);
						viewportListenerId = null;
					}
					isFirstPlay = false;
					porvataListener.params.withAudio = true;
				});
				video.addEventListener('wikiaAdRestart', function () {
					isFirstPlay = false;
				});
				video.addEventListener('start', function () {
					video.ima.dispatchEvent('wikiaAdPlay');
					if (!viewportListenerId && !autoPlayed) {
						setupAutoPlayMethod();
					}
				});
				video.addEventListener('resume', function () {
					video.ima.dispatchEvent('wikiaAdPlay');
					autoPaused = false;
				});
				video.addEventListener('pause', function () {
					video.ima.dispatchEvent('wikiaAdPause');
				});

				if (params.autoPlay) {
					muteFirstPlay(video);
				}

				if (params.onReady) {
					params.onReady(video);
				}

				video.addEventListener('wikiaAdsManagerLoaded', function () {
					setupAutoPlayMethod();
				});

				return video;
			});
		}
	}]);

	return Porvata;
}();
// CONCATENATED MODULE: ./src/video/player/porvata/index.js




// CONCATENATED MODULE: ./src/video/index.js




// CONCATENATED MODULE: ./src/listeners/porvata-listener.js








function getListeners() {
	return context.get('listeners.porvata');
}

var porvata_listener_PorvataListener = function () {
	function PorvataListener(params) {
		classCallCheck__default()(this, PorvataListener);

		this.params = params;
		this.listeners = getListeners().filter(function (listener) {
			return !listener.isEnabled || listener.isEnabled();
		});
		this.logger = function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return logger.apply(undefined, [PorvataListener.LOG_GROUP].concat(args));
		};
	}

	createClass__default()(PorvataListener, [{
		key: 'init',
		value: function init() {
			this.dispatch('init');
		}
	}, {
		key: 'registerVideoEvents',
		value: function registerVideoEvents(video) {
			var _this = this;

			this.video = video;
			this.dispatch('ready');

			keys__default()(PorvataListener.EVENTS).forEach(function (eventKey) {
				video.addEventListener(eventKey, function (event) {
					var errorCode = event.getError && event.getError().getErrorCode();

					_this.dispatch(PorvataListener.EVENTS[eventKey], errorCode);
				});
			});
		}
	}, {
		key: 'dispatch',
		value: function dispatch(eventName) {
			var _this2 = this;

			var errorCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			var data = this.getData(eventName, errorCode);

			this.logger(eventName, data);
			this.listeners.forEach(function (listener) {
				listener.onEvent(eventName, _this2.params, data);
			});

			if (this.params.position && eventName === PorvataListener.EVENTS.viewable_impression) {
				var adSlot = slotService.getBySlotName(this.params.position);
				adSlot.emit(ad_slot_AdSlot.VIDEO_VIEWED_EVENT);
			}
		}
	}, {
		key: 'getData',
		value: function getData(eventName, errorCode) {
			var imaAd = this.video && this.video.ima.getAdsManager() && this.video.ima.getAdsManager().getCurrentAd(),
			    _vastParser$getAdInfo = vastParser.getAdInfo(imaAd),
			    contentType = _vastParser$getAdInfo.contentType,
			    creativeId = _vastParser$getAdInfo.creativeId,
			    lineItemId = _vastParser$getAdInfo.lineItemId;


			return {
				ad_error_code: errorCode,
				ad_product: this.params.adProduct,
				browser: client.getOperatingSystem() + ' ' + client.getBrowser(),
				content_type: contentType || '(none)',
				creative_id: creativeId || 0,
				event_name: eventName,
				line_item_id: lineItemId || 0,
				player: PorvataListener.PLAYER_NAME,
				position: this.params.position || '(none)',
				timestamp: new Date().getTime(),
				audio: this.params.withAudio ? 1 : 0
			};
		}
	}]);

	return PorvataListener;
}();
porvata_listener_PorvataListener.EVENTS = {
	adCanPlay: 'ad_can_play',
	complete: 'completed',
	click: 'clicked',
	firstquartile: 'first_quartile',
	impression: 'impression',
	loaded: 'loaded',
	midpoint: 'midpoint',
	pause: 'paused',
	resume: 'resumed',
	start: 'started',
	thirdquartile: 'third_quartile',
	viewable_impression: 'viewable_impression',
	adError: 'error',
	wikiaAdPlayTriggered: 'play_triggered',
	wikiaAdStop: 'closed',
	wikiaAdMute: 'mute',
	wikiaAdUnmute: 'unmute'
};
porvata_listener_PorvataListener.LOG_GROUP = 'porvata-listener';
porvata_listener_PorvataListener.PLAYER_NAME = 'porvata';
// CONCATENATED MODULE: ./src/listeners/scroll-listener.js





var scroll_listener_callbacks = {};

function getUniqueId() {
	return ((1 + Math.random()) * 0x1000000).toString(16).substring(1);
}

function pushSlot(adStack, node) {
	adStack.push({
		id: node.id
	});
}

var scroll_listener_ScrollListener = function () {
	function ScrollListener() {
		classCallCheck__default()(this, ScrollListener);
	}

	createClass__default()(ScrollListener, [{
		key: 'init',
		value: function init() {
			var requestAnimationFrameHandleAdded = false;

			document.addEventListener('scroll', function (event) {
				if (!requestAnimationFrameHandleAdded) {
					window.requestAnimationFrame(function () {
						requestAnimationFrameHandleAdded = false;
						keys__default()(scroll_listener_callbacks).forEach(function (id) {
							if (typeof scroll_listener_callbacks[id] === 'function') {
								scroll_listener_callbacks[id](event, id);
							}
						});
					});
					requestAnimationFrameHandleAdded = true;
				}
			});
		}
	}, {
		key: 'addSlot',
		value: function addSlot(adStack, id) {
			var _this = this;

			var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

			var node = document.getElementById(id);

			if (!node) {
				return;
			}

			this.addCallback(function (event, callbackId) {
				var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop,
				    slotPosition = getTopOffset(node),
				    viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

				if (scrollPosition + viewPortHeight > slotPosition - threshold) {
					_this.removeCallback(callbackId);
					pushSlot(adStack, node);
				}
			});
		}
	}, {
		key: 'addCallback',
		value: function addCallback(callback) {
			var id = getUniqueId();
			scroll_listener_callbacks[id] = callback;

			return id;
		}
	}, {
		key: 'removeCallback',
		value: function removeCallback(id) {
			delete scroll_listener_callbacks[id];
		}
	}]);

	return ScrollListener;
}();

var scrollListener = new scroll_listener_ScrollListener();
// CONCATENATED MODULE: ./src/listeners/slot-listener.js






var slot_listener_logGroup = 'slot-listener';

var slot_listener_listeners = null;

function getIframe(adSlot) {
	return adSlot.getElement().querySelector('div[id*="_container_"] iframe');
}

function getAdType(event, adSlot) {
	var iframe = getIframe(adSlot);

	var isIframeAccessible = false;

	if (event.isEmpty) {
		return 'collapse';
	}

	try {
		isIframeAccessible = !!iframe.contentWindow.document.querySelector;
	} catch (e) {
		logger(slot_listener_logGroup, 'getAdType', 'iframe is not accessible');
	}

	if (isIframeAccessible && iframe.contentWindow.AdEngine_adType) {
		return iframe.contentWindow.AdEngine_adType;
	}

	return 'success';
}

function slot_listener_getData(_ref) {
	var adType = _ref.adType,
	    event = _ref.event;

	var data = {
		browser: client.getOperatingSystem() + ' ' + client.getBrowser(),
		status: adType,
		page_width: window.document.body.scrollWidth || '',
		time_bucket: new Date().getHours(),
		timestamp: new Date().getTime(),
		viewport_height: window.innerHeight || 0
	};

	if (event) {
		if (event.slot) {
			var response = event.slot.getResponseInformation();

			if (response) {
				data.creative_id = response.creativeId;
				data.line_item_id = response.lineItemId;
			}
		}

		if (event.size && event.size.length) {
			data.creative_size = event.size.join('x');
		}
	}

	return data;
}

function slot_listener_dispatch(methodName, adSlot) {
	var adInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	if (!slot_listener_listeners) {
		slot_listener_listeners = context.get('listeners.slot').filter(function (listener) {
			return !listener.isEnabled || listener.isEnabled();
		});
	}

	var data = slot_listener_getData(adInfo);

	slot_listener_listeners.forEach(function (listener) {
		if (typeof listener[methodName] !== 'function') {
			return;
		}

		listener[methodName](adSlot, data);
	});
	logger(slot_listener_logGroup, methodName, adSlot, adInfo, data);
}

var slot_listener_SlotListener = function () {
	function SlotListener() {
		classCallCheck__default()(this, SlotListener);
	}

	createClass__default()(SlotListener, [{
		key: 'emitRenderEnded',
		value: function emitRenderEnded(event, adSlot) {
			var adType = getAdType(event, adSlot);

			switch (adType) {
				case 'collapse':
					adSlot.collapse();
					break;
				default:
					adSlot.success();
					break;
			}

			slot_listener_dispatch('onRenderEnded', adSlot, { adType: adType, event: event });
			slotDataParamsUpdater.updateOnRenderEnd(adSlot, event);
		}
	}, {
		key: 'emitImpressionViewable',
		value: function emitImpressionViewable(event, adSlot) {
			adSlot.emit(ad_slot_AdSlot.SLOT_VIEWED_EVENT);
			slot_listener_dispatch('onImpressionViewable', adSlot, { event: event });
			slotTweaker.setDataParam(adSlot, 'slotViewed', true);
		}
	}]);

	return SlotListener;
}();

var slotListener = new slot_listener_SlotListener();
// CONCATENATED MODULE: ./src/listeners/index.js



// CONCATENATED MODULE: ./src/utils/viewport-observer.js



function updateInViewport(listener) {
	var newInViewport = isInViewport(listener.element);

	if (newInViewport !== listener.inViewport) {
		listener.callback(newInViewport);
		listener.inViewport = newInViewport;
	}
}

function addListener(element, callback) {
	var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	var listener = {
		element: element,
		callback: callback,
		offsetTop: params.offsetTop || 0,
		offsetBottom: params.offsetBottom || 0,
		inViewport: false
	},
	    updateCallback = function updateCallback() {
		updateInViewport(listener);
	};

	listener.id = scrollListener.addCallback(updateCallback);
	updateCallback();

	return listener.id;
}

function removeListener(listenerId) {
	scrollListener.removeCallback(listenerId);
}

var viewportObserver = {
	addListener: addListener,
	removeListener: removeListener
};
// CONCATENATED MODULE: ./src/utils/index.js











// CONCATENATED MODULE: ./src/templates/floating-ad.js





var floating_ad_FloatingAd = function () {
	createClass__default()(FloatingAd, null, [{
		key: 'getName',
		value: function getName() {
			return 'floating-ad';
		}
	}]);

	function FloatingAd(adSlot) {
		classCallCheck__default()(this, FloatingAd);

		this.adSlot = adSlot;
	}

	createClass__default()(FloatingAd, [{
		key: 'init',
		value: function init() {
			var slotNode = document.getElementById(this.adSlot.getId());

			var container = void 0,
			    containerOffset = void 0,
			    end = void 0,
			    slotHeight = void 0,
			    space = void 0,
			    start = 0;

			if (!slotNode || !slotNode.classList.contains('floating')) {
				return;
			}

			scrollListener.addCallback(function () {
				var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

				container = slotNode.parentNode;
				containerOffset = getTopOffset(container);
				slotHeight = slotNode.offsetHeight;
				end = containerOffset + container.offsetHeight - slotHeight;

				start = containerOffset;
				if (slotNode.previousElementSibling) {
					start = getTopOffset(slotNode.previousElementSibling) + slotNode.previousElementSibling.offsetHeight;
				}

				space = end - start;
				if (space <= slotHeight) {
					slotNode.classList.add('pinned-top');
					slotNode.classList.remove('pinned-bottom');
					return;
				}

				if (scrollPosition <= start) {
					slotNode.classList.add('pinned-top');
					slotNode.classList.remove('pinned-bottom');
				} else if (scrollPosition >= end) {
					slotNode.classList.add('pinned-bottom');
					slotNode.classList.remove('pinned-top');
				} else {
					slotNode.classList.remove('pinned-top');
					slotNode.classList.remove('pinned-bottom');
				}
			});
		}
	}]);

	return FloatingAd;
}();
// CONCATENATED MODULE: ./src/templates/index.js

// CONCATENATED MODULE: ./src/providers/gpt-targeting.js



function setupGptTargeting() {
	var tag = window.googletag.pubads(),
	    targeting = context.get('targeting');

	function setTargetingValue(key, value) {
		if (typeof value === 'function') {
			tag.setTargeting(key, value());
		} else {
			tag.setTargeting(key, value);
		}
	}

	keys__default()(targeting).forEach(function (key) {
		setTargetingValue(key, targeting[key]);
	});

	context.onChange('targeting', function (trigger, value) {
		var segments = trigger.split('.'),
		    key = segments[segments.length - 1];

		setTargetingValue(key, value);
	});
}
// CONCATENATED MODULE: ./src/providers/gpt-provider.js








var gpt_provider_logGroup = 'gpt-provider';

var definedSlots = [],
    initialized = false;

function configure() {
	var tag = window.googletag.pubads();

	tag.enableSingleRequest();
	tag.disableInitialLoad();
	tag.addEventListener('slotRenderEnded', function (event) {
		var id = event.slot.getSlotElementId(),
		    slot = slotService.get(id);

		// IE doesn't allow us to inspect GPT iframe at this point.
		// Let's launch our callback in a setTimeout instead.
		setTimeout(function () {
			slotListener.emitRenderEnded(event, slot);
		}, 0);
	});

	tag.addEventListener('impressionViewable', function (event) {
		var id = event.slot.getSlotElementId(),
		    slot = slotService.get(id);

		slotListener.emitImpressionViewable(event, slot);
	});
	window.googletag.enableServices();
}

var gpt_provider_GptProvider = function () {
	function GptProvider() {
		var _this = this;

		classCallCheck__default()(this, GptProvider);

		window.googletag = window.googletag || {};
		window.googletag.cmd = window.googletag.cmd || [];

		window.googletag.cmd.push(function () {
			_this.init();
		});
	}

	createClass__default()(GptProvider, [{
		key: 'init',
		value: function init() {
			if (initialized) {
				return;
			}

			setupGptTargeting();
			configure();
			initialized = true;
		}
	}, {
		key: 'fillIn',
		value: function fillIn(adSlot) {
			var _this2 = this;

			window.googletag.cmd.push(function () {
				var sizeMapping = window.googletag.sizeMapping(),
				    targeting = _this2.parseTargetingParams(adSlot.getTargeting());

				adSlot.getSizes().forEach(function (item) {
					sizeMapping.addSize(item.viewportSize, item.sizes);
				});

				var gptSlot = window.googletag.defineSlot(adSlot.getAdUnit(), adSlot.getDefaultSizes(), adSlot.getId()).addService(window.googletag.pubads()).setCollapseEmptyDiv(true).defineSizeMapping(sizeMapping.build());

				_this2.applyTargetingParams(gptSlot, targeting);
				slotDataParamsUpdater.updateOnCreate(adSlot, targeting);

				window.googletag.display(adSlot.getId());
				definedSlots.push(gptSlot);

				if (!adSlot.isAboveTheFold()) {
					_this2.flush();
				}

				logger(gpt_provider_logGroup, adSlot.getId(), 'slot added');
			});
		}
	}, {
		key: 'applyTargetingParams',
		value: function applyTargetingParams(gptSlot, targeting) {
			keys__default()(targeting).forEach(function (key) {
				return gptSlot.setTargeting(key, targeting[key]);
			});
		}
	}, {
		key: 'parseTargetingParams',
		value: function parseTargetingParams(targeting) {
			var result = {};

			keys__default()(targeting).forEach(function (key) {
				var value = targeting[key];

				if (typeof value === 'function') {
					value = value();
				}
				result[key] = value;
			});

			return result;
		}
	}, {
		key: 'flush',
		value: function flush() {
			window.googletag.cmd.push(function () {
				if (definedSlots.length) {
					window.googletag.pubads().refresh(definedSlots);
					definedSlots = [];
				}
			});
		}
	}]);

	return GptProvider;
}();
// CONCATENATED MODULE: ./src/providers/index.js


// CONCATENATED MODULE: ./src/ad-engine.js









function fillInUsingProvider(ad, provider) {
	var adSlot = new ad_slot_AdSlot(ad);

	if (adSlot.shouldLoad()) {
		slotService.add(adSlot);
		btfBlockerService.push(adSlot, provider.fillIn.bind(provider));
	}
}

var ad_engine_AdEngine = function () {
	function AdEngine() {
		var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

		classCallCheck__default()(this, AdEngine);

		context.extend(config);
		this.adStack = context.get('state.adStack');

		window.ads = window.ads || {};
		window.ads.runtime = window.ads.runtime || {};

		templateService.register(floating_ad_FloatingAd);
	}

	createClass__default()(AdEngine, [{
		key: 'init',
		value: function init() {
			var _this = this;

			var provider = new gpt_provider_GptProvider();
			btfBlockerService.init();

			makeLazyQueue(this.adStack, function (ad) {
				fillInUsingProvider(ad, provider);

				if (_this.adStack.length === 0) {
					provider.flush();
				}
			});
			registerCustomAdLoader(context.get('options.customAdLoader.globalMethodName'));
			messageBus.init();
			slotTweaker.registerMessageListener();
			this.adStack.start();

			scrollListener.init();

			if (context.get('events.pushOnScroll')) {
				context.get('events.pushOnScroll.ids').forEach(function (id) {
					scrollListener.addSlot(_this.adStack, id, context.get('events.pushOnScroll.threshold'));
				});
			}
		}
	}]);

	return AdEngine;
}();
// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "AdEngine", function() { return ad_engine_AdEngine; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PorvataListener", function() { return porvata_listener_PorvataListener; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scrollListener", function() { return scrollListener; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "slotListener", function() { return slotListener; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "AdSlot", function() { return ad_slot_AdSlot; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "GptProvider", function() { return gpt_provider_GptProvider; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "setupGptTargeting", function() { return setupGptTargeting; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "btfBlockerService", function() { return btfBlockerService; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "context", function() { return context; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "registerCustomAdLoader", function() { return registerCustomAdLoader; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "localCache", function() { return localCache; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "messageBus", function() { return messageBus; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "slotDataParamsUpdater", function() { return slotDataParamsUpdater; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "slotService", function() { return slotService; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "slotTweaker", function() { return slotTweaker; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "templateService", function() { return templateService; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "vastDebugger", function() { return vastDebugger; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "vastParser", function() { return vastParser; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "buildVastUrl", function() { return buildVastUrl; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PorvataPlayer", function() { return porvata_PorvataPlayer; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Porvata", function() { return porvata_Porvata; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "VideoSettings", function() { return video_settings_VideoSettings; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "moatVideoTracker", function() { return moatVideoTracker; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "googleImaPlayerFactory", function() { return googleImaPlayerFactory; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utils", function() { return utils_namespaceObject; });





var versionField = 'ads.adEngineVersion';

if (get__default()(window, versionField, null)) {
	window.console.warn('Multiple @wikia/ad-engine initializations. This may cause issues.');
}

set__default()(window, versionField, 'v9.7.2');









/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("lodash/set");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("lodash/get");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("ismobilejs");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("blockadblock");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ })
/******/ ]);
//# sourceMappingURL=ad-engine.js.map
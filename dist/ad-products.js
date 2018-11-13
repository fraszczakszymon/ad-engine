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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@wikia/ad-engine");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/get");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/symbol");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("lodash/mapValues");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("eventemitter3");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {"CROSS":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19.707 4.293a.999.999 0 0 0-1.414 0L12 10.586 5.707 4.293a.999.999 0 1 0-1.414 1.414L10.586 12l-6.293 6.293a.999.999 0 1 0 1.414 1.414L12 13.414l6.293 6.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L13.414 12l6.293-6.293a.999.999 0 0 0 0-1.414\" fill-rule=\"evenodd\"/></svg>","LEARN_MORE":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><g stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\"><g transform=\"translate(-753.000000, -1764.000000)\" fill-rule=\"nonzero\"><g transform=\"translate(153.000000, 1746.000000)\"><g transform=\"translate(5.000000, 0.000000)\"><g transform=\"translate(459.000000, 0.000000)\"><g transform=\"translate(136.000000, 18.000000)\"><polygon points=\"24 0 15 0 18.4395 3.4395 9.033 12.846 11.154 14.967 20.5605 5.5605 24 9\"></polygon><path d=\"M19.5,24 L1.5,24 C0.672,24 0,23.328 0,22.5 L0,4.5 C0,3.672 0.672,3 1.5,3 L10.5,3 L10.5,6 L3,6 L3,21 L18,21 L18,13.5 L21,13.5 L21,22.5 C21,23.328 20.328,24 19.5,24 Z\"></path></g></g></g></g></g></g></svg>","PAUSE":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><g fill-rule=\"evenodd\"><rect width=\"7\" height=\"22\" rx=\"1\" x=\"3\" y=\"1\"></rect><rect x=\"14\" width=\"7\" height=\"22\" rx=\"1\" y=\"1\"></rect></g></svg>","PLAY":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19.69 12.6L5.143 22.867a.722.722 0 0 1-.753.05.733.733 0 0 1-.391-.65V1.733c0-.274.15-.524.391-.65a.724.724 0 0 1 .753.05l14.545 10.266a.734.734 0 0 1 0 1.201z\" fill-rule=\"evenodd\"></path></svg>","REPLAY":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 23c6.065 0 11-4.863 11-10.84a.992.992 0 0 0-1-.985c-.553 0-1 .44-1 .986 0 4.89-4.037 8.868-9 8.868s-9-3.978-9-8.868c0-4.89 4.037-8.869 9-8.869a8.991 8.991 0 0 1 6.975 3.292l-3.794-.501a.996.996 0 0 0-1.124.845.987.987 0 0 0 .858 1.108l5.946.785a.996.996 0 0 0 1.124-.845l.797-5.86a.987.987 0 0 0-.858-1.107.994.994 0 0 0-1.124.846l-.446 3.28A10.997 10.997 0 0 0 12 1.322c-6.065 0-11 4.862-11 10.839C1 18.137 5.935 23 12 23\" fill-rule=\"evenodd\"/></svg>","FULLSCREEN_OFF":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5.5 9H8V2H5v4H1v3h4.5zm13 0H16V2h3v4h4v3h-4.5zm-13 6H8v7H5v-4H1v-3h4.5zm13 0H16v7h3v-4h4v-3h-4.5z\" fill-rule=\"evenodd\"/></svg>","FULLSCREEN_ON":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M21.5 22H23v-7h-3v4h-4v3h5.5zM23 3.5V9h-3V5h-4V2h7v1.5zm-22 17V15h3v4h4v3H1v-1.5zM2.5 2H1v7h3V5h4V2H2.5z\" fill-rule=\"evenodd\"/></svg>","VOLUME_OFF":"<svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\"><defs><style>.cls-1{fill:#fff;opacity:0.4;}.cls-2{fill:#231f20;}</style></defs><title>sound_off_button</title><circle class=\"cls-1\" cx=\"14.06\" cy=\"13.96\" r=\"13.74\"/><path class=\"cls-2\" d=\"M16,2.93A13.07,13.07,0,1,1,2.93,16,13.08,13.08,0,0,1,16,2.93M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z\" transform=\"translate(-2 -2)\"/><g id=\"Page-1\"><g id=\"Video-Player-Skin\"><g id=\"Video-Copy\"><g id=\"volume-off\"><path id=\"Shape\" class=\"cls-2\" d=\"M14.25,9.17l-3.79,4.11H6.84c-.78,0-1,.46-1,.89V17.7a1,1,0,0,0,1,1h3.65l3.79,4.18a1.09,1.09,0,0,0,.53.14,1,1,0,0,0,.5-.14,1,1,0,0,0,.5-.9V10a1,1,0,0,0-.5-.9,1.06,1.06,0,0,0-1,.05Z\" transform=\"translate(-2 -2)\"/><path id=\"Fill-1\" class=\"cls-2\" d=\"M22.91,16.21l3-3a.92.92,0,1,0-1.3-1.3l-3,3-3-3a.92.92,0,1,0-1.3,1.3l3,3-3,3a.92.92,0,1,0,1.3,1.3l3-3,3,3a.92.92,0,1,0,1.3-1.3Z\" transform=\"translate(-2 -2)\"/></g></g></g></g></svg>","VOLUME_ON":"<svg viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\"><defs><style>.cls-1{fill:#fff;opacity:0.4;}.cls-2{fill:#231f20;}</style></defs><title>sound_on_button</title><circle class=\"cls-1\" cx=\"13.96\" cy=\"14.06\" r=\"13.74\"/><path class=\"cls-2\" d=\"M16,2.93A13.07,13.07,0,1,1,2.93,16,13.08,13.08,0,0,1,16,2.93M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z\" transform=\"translate(-2 -2)\"/><g id=\"Page-1\"><g id=\"Video-Player-Skin\"><g id=\"Video-Copy\"><g id=\"volume\"><path id=\"Shape\" class=\"cls-2\" d=\"M14.24,9.17l-3.79,4.11H6.82c-.78,0-1,.46-1,.89V17.7a1,1,0,0,0,1,1h3.65l3.79,4.18a1.09,1.09,0,0,0,.53.14,1,1,0,0,0,.5-.14,1,1,0,0,0,.5-.9V10a1,1,0,0,0-.5-.9,1.06,1.06,0,0,0-1,.05Z\" transform=\"translate(-2 -2)\"/><path id=\"Shape-2\" data-name=\"Shape\" class=\"cls-2\" d=\"M19.18,19.33a4.39,4.39,0,0,0,0-6.19.71.71,0,0,0-1,1,3,3,0,0,1,0,4.19.71.71,0,0,0,1,1Z\" transform=\"translate(-2 -2)\"/><path id=\"Shape-3\" data-name=\"Shape\" class=\"cls-2\" d=\"M23.3,16.23a6.19,6.19,0,0,0-1.81-4.39.71.71,0,1,0-1,1,4.81,4.81,0,0,1,0,6.79.71.71,0,1,0,1,1,6.19,6.19,0,0,0,1.81-4.39Z\" transform=\"translate(-2 -2)\"/></g></g></g></g></svg>","HIVI_VOLUME_OFF":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6 8.007H1.347C.333 8.007 0 8.769 0 9.391v5.032C0 15.045.333 16 1.347 16H6l5.007 5.796c.215.132.454.205.693.205.24 0 .436-.063.65-.196.429-.265.65-.75.65-1.28V3.447c0-.53-.221-1.02-.65-1.284-.429-.265-.935-.187-1.365.078L6 8.007zM20.305 12l2.425-2.425a.922.922 0 1 0-1.306-1.305l-2.425 2.424-2.423-2.424a.923.923 0 0 0-1.306 1.305L17.695 12l-2.425 2.425a.922.922 0 1 0 1.306 1.304L19 13.306l2.425 2.423a.92.92 0 0 0 1.306 0 .922.922 0 0 0 0-1.304L20.305 12z\" fill-rule=\"evenodd\"></path></svg>","HIVI_VOLUME_ON":"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><g fill-rule=\"evenodd\"><path d=\"M6 8.007H1.347C.333 8.007 0 8.769 0 9.391v5.032C0 15.045.333 16 1.347 16H6l5.007 5.796c.215.132.454.205.693.205.24 0 .436-.063.65-.196.429-.265.65-.75.65-1.28V3.447c0-.53-.221-1.02-.65-1.284-.429-.265-.935-.187-1.365.078L6 8.007zm11.612 8.524a5.858 5.858 0 0 0 0-8.253.944.944 0 0 0-1.337 1.332 3.97 3.97 0 0 1 0 5.59.943.943 0 1 0 1.337 1.331z\"></path><path d=\"M23.03 12.135c0-2.21-.859-4.292-2.418-5.857a.943.943 0 1 0-1.337 1.332 6.37 6.37 0 0 1 1.868 4.525 6.37 6.37 0 0 1-1.868 4.525.943.943 0 1 0 1.338 1.332 8.249 8.249 0 0 0 2.418-5.857z\"></path></g></svg>"}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("lodash/throttle");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("lodash/isFunction");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("lodash/debounce");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("lodash/isUndefined");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("lodash/toPlainObject");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/toArray");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var utils_namespaceObject = {};
__webpack_require__.d(utils_namespaceObject, "setupNpaContext", function() { return setupNpaContext; });
var constants_namespaceObject = {};
__webpack_require__.d(constants_namespaceObject, "CSS_CLASSNAME_FADE_IN_ANIMATION", function() { return CSS_CLASSNAME_FADE_IN_ANIMATION; });
__webpack_require__.d(constants_namespaceObject, "CSS_CLASSNAME_SLIDE_OUT_ANIMATION", function() { return CSS_CLASSNAME_SLIDE_OUT_ANIMATION; });
__webpack_require__.d(constants_namespaceObject, "CSS_CLASSNAME_STICKY_BFAA", function() { return CSS_CLASSNAME_STICKY_BFAA; });
__webpack_require__.d(constants_namespaceObject, "CSS_CLASSNAME_STICKY_BFAB", function() { return CSS_CLASSNAME_STICKY_BFAB; });
__webpack_require__.d(constants_namespaceObject, "CSS_CLASSNAME_STICKY_SLOT", function() { return CSS_CLASSNAME_STICKY_SLOT; });
__webpack_require__.d(constants_namespaceObject, "CSS_CLASSNAME_STICKY_TEMPLATE", function() { return CSS_CLASSNAME_STICKY_TEMPLATE; });
__webpack_require__.d(constants_namespaceObject, "CSS_TIMING_EASE_IN_CUBIC", function() { return CSS_TIMING_EASE_IN_CUBIC; });
__webpack_require__.d(constants_namespaceObject, "SLIDE_OUT_TIME", function() { return SLIDE_OUT_TIME; });
__webpack_require__.d(constants_namespaceObject, "FADE_IN_TIME", function() { return FADE_IN_TIME; });
__webpack_require__.d(constants_namespaceObject, "DEFAULT_UAP_ID", function() { return DEFAULT_UAP_ID; });
__webpack_require__.d(constants_namespaceObject, "DEFAULT_UAP_TYPE", function() { return DEFAULT_UAP_TYPE; });
__webpack_require__.d(constants_namespaceObject, "FAN_TAKEOVER_TYPES", function() { return FAN_TAKEOVER_TYPES; });
var themes_classic_namespaceObject = {};
__webpack_require__.d(themes_classic_namespaceObject, "BfaaTheme", function() { return classic_BfaaTheme; });
__webpack_require__.d(themes_classic_namespaceObject, "BfabTheme", function() { return classic_BfabTheme; });
__webpack_require__.d(themes_classic_namespaceObject, "adIsReady", function() { return adIsReady; });
var hivi_namespaceObject = {};
__webpack_require__.d(hivi_namespaceObject, "BfaaTheme", function() { return hivi_bfaa_BfaaTheme; });
__webpack_require__.d(hivi_namespaceObject, "BfabTheme", function() { return hivi_bfab_BfabTheme; });
__webpack_require__.d(hivi_namespaceObject, "adIsReady", function() { return ready_adIsReady; });

// EXTERNAL MODULE: external "@wikia/ad-engine"
var ad_engine_ = __webpack_require__(0);

// CONCATENATED MODULE: ./src/ad-products/utils/npa.js


function setupNpaContext() {
	var optedOut = ad_engine_["trackingOptIn"].isOptedIn() ? 0 : 1;

	ad_engine_["context"].set('targeting.npa', optedOut.toString());
}
// CONCATENATED MODULE: ./src/ad-products/utils/index.js

// EXTERNAL MODULE: ./src/ad-products/styles/styles.scss
var styles = __webpack_require__(26);

// EXTERNAL MODULE: external "babel-runtime/core-js/object/keys"
var keys_ = __webpack_require__(12);
var keys_default = /*#__PURE__*/__webpack_require__.n(keys_);

// CONCATENATED MODULE: ./src/ad-products/common/product-info.js



function findSlotGroup(product) {
	var slotGroups = ad_engine_["context"].get('slotGroups'),
	    result = keys_default()(slotGroups).filter(function (name) {
		return slotGroups[name].indexOf(product) !== -1;
	});

	return result.length === 1 ? result[0] : null;
}

function getGroup(product) {
	return findSlotGroup(product.toUpperCase()) || 'OTHER';
}

function getAdProductInfo(slotName, loadedTemplate, loadedProduct) {
	var product = slotName;

	if (loadedProduct === 'abcd') {
		product = 'ABCD';
	} else if (loadedProduct === 'vuap') {
		product = 'UAP_' + loadedTemplate.toUpperCase();
	} else if (loadedProduct === 'incontent_veles') {
		product = 'OUTSTREAM';
	}

	return {
		adGroup: getGroup(product),
		adProduct: product.toLowerCase()
	};
}
// CONCATENATED MODULE: ./src/ad-products/common/index.js

// EXTERNAL MODULE: external "babel-runtime/helpers/classCallCheck"
var classCallCheck_ = __webpack_require__(3);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck_);

// EXTERNAL MODULE: external "babel-runtime/helpers/createClass"
var createClass_ = __webpack_require__(1);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass_);

// CONCATENATED MODULE: ./src/ad-products/templates/floating-rail.js




var adsInRail = 2;
var biggestAdSize = 600;

var availableSpace = null;

var floating_rail_FloatingRail = function () {
	createClass_default()(FloatingRail, null, [{
		key: 'getName',
		value: function getName() {
			return 'floatingRail';
		}
	}, {
		key: 'getDefaultConfig',
		value: function getDefaultConfig() {
			return {
				enabled: true,
				railSelector: '#rail',
				wrapperSelector: '#rail-wrapper',
				startOffset: 0
			};
		}
	}]);

	function FloatingRail() {
		classCallCheck_default()(this, FloatingRail);

		this.config = ad_engine_["context"].get('templates.floatingRail');
		this.rail = document.querySelector(this.config.railSelector);
		this.railWrapper = document.querySelector(this.config.wrapperSelector);
	}

	createClass_default()(FloatingRail, [{
		key: 'init',
		value: function init(params) {
			var _this = this;

			this.params = params;

			var offset = this.params.offset || 0;

			if (!this.railWrapper || !FloatingRail.isEnabled() || this.getAvailableSpace() === 0) {
				return;
			}

			var floatingSpace = Math.min(offset, this.getAvailableSpace());

			ad_engine_["scrollListener"].addCallback(function () {
				var start = _this.config.startOffset + ad_engine_["utils"].getTopOffset(_this.railWrapper),
				    end = start + floatingSpace,
				    scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

				if (scrollPosition <= start) {
					_this.rail.style.paddingTop = '';
					_this.rail.classList.add('rail-static');
					_this.rail.classList.remove('rail-fixed');
				} else if (scrollPosition >= end) {
					_this.rail.style.paddingTop = floatingSpace + 'px';
					_this.rail.classList.remove('rail-static');
					_this.rail.classList.remove('rail-fixed');
				} else {
					_this.rail.style.paddingTop = '';
					_this.rail.classList.remove('rail-static');
					_this.rail.classList.add('rail-fixed');
				}
			});
		}
	}, {
		key: 'getAvailableSpace',
		value: function getAvailableSpace() {
			if (availableSpace === null) {
				var children = this.railWrapper.lastElementChild,
				    childrenHeight = children.offsetTop + children.offsetHeight,
				    space = this.railWrapper.offsetHeight;

				availableSpace = Math.max(0, space - childrenHeight - adsInRail * biggestAdSize);
			}

			return availableSpace;
		}
	}], [{
		key: 'isEnabled',
		value: function isEnabled() {
			return ad_engine_["context"].get('templates.floatingRail.enabled') && ad_engine_["context"].get('state.isMobile') === false;
		}
	}]);

	return FloatingRail;
}();
// CONCATENATED MODULE: ./src/ad-products/templates/skin.js




var skin_Skin = function () {
	createClass_default()(Skin, null, [{
		key: 'getName',
		value: function getName() {
			return 'skin';
		}
	}, {
		key: 'getDefaultConfig',
		value: function getDefaultConfig() {
			return {
				bodyAdClass: 'has-background-ad',
				onInit: function onInit() {},
				wrapperSelector: '#ad-skin',
				zIndex: 1
			};
		}
	}]);

	function Skin() {
		classCallCheck_default()(this, Skin);

		this.config = ad_engine_["context"].get('templates.skin');
		this.adSkin = document.querySelector(this.config.wrapperSelector);
	}

	/**
  * Initializes the Skin unit
  *
  * @param {Object} params
  * @param {string} params.destUrl - URL to go when the background is clicked
  * @param {string} params.skinImage - URL of the 1700x800 image to show in the background
  * @param {string} params.backgroundColor - background color to use (rrggbb, without leading #)
  * @param {string} [params.middleColor] - color to use in the middle (rrggbb, without leading #)
  * @param {Array} params.pixels - URLs of tracking pixels to append when showing the skin
  */


	createClass_default()(Skin, [{
		key: 'init',
		value: function init(params) {
			this.params = params;
			this.params.adProduct = 'skin';

			document.body.classList.add(this.config.bodyAdClass);
			this.setAdSkinStyle(params.skinImage, params.backgroundColor);

			this.adSkin.onclick = function () {
				window.open(params.destUrl);
			};

			if (params.pixels) {
				this.setTrackingPixels(params.pixels);
			}

			this.adSkin.classList.remove('hide');

			this.config.onInit(this.params);
		}

		/**
   * Sets styles for ad skin wrapper
   *
   * @param params
   */

	}, {
		key: 'setAdSkinStyle',
		value: function setAdSkinStyle(image, color) {
			this.adSkin.style.position = 'fixed';
			this.adSkin.style.height = '100%';
			this.adSkin.style.width = '100%';
			this.adSkin.style.left = 0;
			this.adSkin.style.top = 0;
			this.adSkin.style.zIndex = this.config.zIndex;
			this.adSkin.style.cursor = 'pointer';
			this.adSkin.style.background = 'url("' + image + '") no-repeat top center #' + color;
		}

		/**
   * Goes through pixels array and adds 1x1 pixel images
   *
   * @param pixels
   */

	}, {
		key: 'setTrackingPixels',
		value: function setTrackingPixels(pixels) {
			for (var i = 0, len = pixels.length; i < len; i += 1) {
				var pixelUrl = pixels[i];
				if (pixelUrl) {
					var pixelElement = document.createElement('img');
					pixelElement.src = pixelUrl;
					pixelElement.width = 1;
					pixelElement.height = 1;
					this.adSkin.appendChild(pixelElement);
				}
			}
		}
	}]);

	return Skin;
}();
// EXTERNAL MODULE: external "babel-runtime/regenerator"
var regenerator_ = __webpack_require__(2);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator_);

// EXTERNAL MODULE: external "babel-runtime/core-js/promise"
var promise_ = __webpack_require__(6);
var promise_default = /*#__PURE__*/__webpack_require__.n(promise_);

// EXTERNAL MODULE: external "babel-runtime/helpers/asyncToGenerator"
var asyncToGenerator_ = __webpack_require__(4);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator_);

// EXTERNAL MODULE: external "babel-runtime/core-js/symbol"
var symbol_ = __webpack_require__(13);
var symbol_default = /*#__PURE__*/__webpack_require__.n(symbol_);

// EXTERNAL MODULE: external "babel-runtime/core-js/object/get-prototype-of"
var get_prototype_of_ = __webpack_require__(5);
var get_prototype_of_default = /*#__PURE__*/__webpack_require__.n(get_prototype_of_);

// EXTERNAL MODULE: external "babel-runtime/helpers/possibleConstructorReturn"
var possibleConstructorReturn_ = __webpack_require__(8);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn_);

// EXTERNAL MODULE: external "babel-runtime/helpers/inherits"
var inherits_ = __webpack_require__(7);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits_);

// EXTERNAL MODULE: external "lodash/isFunction"
var isFunction_ = __webpack_require__(18);
var isFunction_default = /*#__PURE__*/__webpack_require__.n(isFunction_);

// EXTERNAL MODULE: external "eventemitter3"
var external_eventemitter3_ = __webpack_require__(15);
var external_eventemitter3_default = /*#__PURE__*/__webpack_require__.n(external_eventemitter3_);

// CONCATENATED MODULE: ./src/ad-products/templates/uap/themes/hivi/stickiness.js














var stickiness_Stickiness = function (_EventEmitter) {
	inherits_default()(Stickiness, _EventEmitter);

	function Stickiness(adSlot) {
		var customWhen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : promise_default.a.resolve();
		var unstickOnResize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		classCallCheck_default()(this, Stickiness);

		var _this = possibleConstructorReturn_default()(this, (Stickiness.__proto__ || get_prototype_of_default()(Stickiness)).call(this));

		_this.adSlot = adSlot;
		_this.customWhen = customWhen;
		_this.sticky = false;
		_this.isStickinessBlocked = false;
		_this.isRevertStickinessBlocked = false;
		_this.logger = function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return ad_engine_["utils"].logger.apply(ad_engine_["utils"], [Stickiness.LOG_GROUP].concat(args));
		};
		_this.unstickOnResize = unstickOnResize;

		if (!isFunction_default()(_this.customWhen)) {
			promise_default.a.all([_this.customWhen]).then(function () {
				if (!_this.sticky) {
					_this.logger('Blocking stickiness');
					_this.isStickinessBlocked = true;
				}
			});
		}
		return _this;
	}

	createClass_default()(Stickiness, [{
		key: 'run',
		value: function () {
			var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
				var _this2 = this;

				return regenerator_default.a.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return ad_engine_["slotTweaker"].onReady(this.adSlot);

							case 2:
								if (!document.hidden) {
									_context.next = 5;
									break;
								}

								_context.next = 5;
								return ad_engine_["utils"].once(window, 'visibilitychange');

							case 5:

								this.adSlot.once('unstickImmediately', function () {
									_this2.logger('Unsticking');
									_this2.emit(Stickiness.UNSTICK_IMMEDIATELY_EVENT);
									_this2.sticky = false;
								});

								if (!this.isStickinessBlocked) {
									this.onAdReady();
								}

							case 7:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function run() {
				return _ref.apply(this, arguments);
			}

			return run;
		}()
	}, {
		key: 'isSticky',
		value: function isSticky() {
			return this.sticky;
		}
	}, {
		key: 'applyStickiness',
		value: function applyStickiness() {
			if (!this.sticky) {
				this.logger('Applying stickiness');
				this.sticky = true;
				this.emit(Stickiness.STICKINESS_CHANGE_EVENT, this.sticky);
			} else {
				this.logger('Stickiness is already applied');
			}
		}
	}, {
		key: 'revertStickiness',
		value: function revertStickiness() {
			if (this.sticky) {
				this.logger('Reverting stickiness');
				this.sticky = false;
				this.emit(Stickiness.STICKINESS_CHANGE_EVENT, this.sticky);
			} else {
				this.logger('Stickiness is already reverted');
			}
		}
	}, {
		key: 'revertStickinessOnResize',
		value: function revertStickinessOnResize() {
			var _this3 = this;

			if (this.unstickOnResize) {
				window.addEventListener('resize', function () {
					_this3.logger('Unsticking');
					_this3.emit(Stickiness.UNSTICK_IMMEDIATELY_EVENT);
					_this3.sticky = false;
				}, { once: true });
			}
		}
	}, {
		key: 'close',
		value: function close() {
			this.logger('Closing and removing stickiness');
			this.emit(Stickiness.CLOSE_CLICKED_EVENT, this.sticky);
			this.sticky = false;
		}
	}, {
		key: 'registerRevertStickiness',
		value: function () {
			var _ref2 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
				return regenerator_default.a.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								this.logger('waiting for user interaction');
								_context2.next = 3;
								return ad_engine_["utils"].once(window, 'scroll');

							case 3:
								_context2.next = 5;
								return ad_engine_["utils"].wait();

							case 5:
								if (!this.isRevertStickinessBlocked) {
									this.revertStickiness();
								} else {
									this.registerRevertStickiness();
								}

							case 6:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function registerRevertStickiness() {
				return _ref2.apply(this, arguments);
			}

			return registerRevertStickiness;
		}()
	}, {
		key: 'blockRevertStickiness',
		value: function blockRevertStickiness() {
			this.isRevertStickinessBlocked = true;
		}
	}, {
		key: 'unblockRevertStickiness',
		value: function unblockRevertStickiness() {
			this.isRevertStickinessBlocked = false;
		}
	}, {
		key: 'onAdReady',
		value: function () {
			var _ref3 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee3() {
				return regenerator_default.a.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								this.applyStickiness();
								this.revertStickinessOnResize();
								this.logger('waiting for viewability and custom condition');

								_context3.next = 5;
								return promise_default.a.all([!this.adSlot.isViewed() ? ad_engine_["utils"].once(this.adSlot, ad_engine_["AdSlot"].SLOT_VIEWED_EVENT) : promise_default.a.resolve(), isFunction_default()(this.customWhen) ? this.customWhen() : this.customWhen]);

							case 5:

								this.registerRevertStickiness();

							case 6:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function onAdReady() {
				return _ref3.apply(this, arguments);
			}

			return onAdReady;
		}()
	}]);

	return Stickiness;
}(external_eventemitter3_default.a);
stickiness_Stickiness.LOG_GROUP = 'stickiness';
stickiness_Stickiness.STICKINESS_CHANGE_EVENT = symbol_default()('stickinessChange');
stickiness_Stickiness.CLOSE_CLICKED_EVENT = symbol_default()('closeClicked');
stickiness_Stickiness.UNSTICK_IMMEDIATELY_EVENT = symbol_default()('unstickImmediately');
// CONCATENATED MODULE: ./src/ad-products/templates/uap/constants.js
var CSS_CLASSNAME_FADE_IN_ANIMATION = 'fade-in';
var CSS_CLASSNAME_SLIDE_OUT_ANIMATION = 'slide-out';
var CSS_CLASSNAME_STICKY_BFAA = 'sticky-bfaa';
var CSS_CLASSNAME_STICKY_BFAB = 'sticky-bfab';
var CSS_CLASSNAME_STICKY_SLOT = 'sticky-slot';
var CSS_CLASSNAME_STICKY_TEMPLATE = 'sticky-template';
var CSS_TIMING_EASE_IN_CUBIC = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';
// Animation time is defined also in CSS, remember to change it in both places
var SLIDE_OUT_TIME = 600;
var FADE_IN_TIME = 400;

var DEFAULT_UAP_ID = 'none';
var DEFAULT_UAP_TYPE = 'none';
var FAN_TAKEOVER_TYPES = ['uap', 'vuap'];
// CONCATENATED MODULE: ./src/ad-products/templates/interface/animate.js




var animate = function () {
	var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee(container, className, duration) {
		return regenerator_default.a.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						container.style.animationDuration = duration + 'ms';
						container.classList.add(className);
						_context.next = 4;
						return ad_engine_["utils"].wait(duration);

					case 4:
						container.classList.remove(className);
						container.style.animationDuration = '';

					case 6:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function animate(_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();
// EXTERNAL MODULE: external "babel-runtime/helpers/toConsumableArray"
var toConsumableArray_ = __webpack_require__(11);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray_);

// EXTERNAL MODULE: external "babel-runtime/helpers/get"
var get_ = __webpack_require__(9);
var get_default = /*#__PURE__*/__webpack_require__.n(get_);

// CONCATENATED MODULE: ./src/ad-products/templates/interface/ui-component.js



var ui_component_UiComponent = function () {
	createClass_default()(UiComponent, [{
		key: "classNames",
		get: function get() {
			return this.props.classNames || [];
		}
	}]);

	function UiComponent() {
		var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		classCallCheck_default()(this, UiComponent);

		this.props = props;
	}

	createClass_default()(UiComponent, [{
		key: "render",
		value: function render() {
			return document.createDocumentFragment();
		}
	}]);

	return UiComponent;
}();


// CONCATENATED MODULE: ./src/ad-products/templates/interface/button.js









var button_Button = function (_UiComponent) {
	inherits_default()(Button, _UiComponent);

	function Button() {
		classCallCheck_default()(this, Button);

		return possibleConstructorReturn_default()(this, (Button.__proto__ || get_prototype_of_default()(Button)).apply(this, arguments));
	}

	createClass_default()(Button, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var buttonElement = document.createElement('button');

			this.classNames.forEach(function (className) {
				return buttonElement.classList.add(className);
			});
			buttonElement.addEventListener('click', function (event) {
				return _this2.onClick(event);
			});

			return buttonElement;
		}
	}, {
		key: 'onClick',
		value: function onClick(event) {
			var onClick = this.props.onClick;


			if (typeof onClick === 'function') {
				return onClick(event);
			}

			return undefined;
		}
	}, {
		key: 'classNames',
		get: function get() {
			return ['button-control'].concat(toConsumableArray_default()(get_default()(Button.prototype.__proto__ || get_prototype_of_default()(Button.prototype), 'classNames', this)));
		}
	}]);

	return Button;
}(ui_component_UiComponent);


// EXTERNAL MODULE: ./src/ad-products/templates/interface/icons.json
var icons = __webpack_require__(16);
var icons_default = /*#__PURE__*/__webpack_require__.n(icons);

// CONCATENATED MODULE: ./src/ad-products/templates/interface/icons.js



var parser = new window.DOMParser();

function createIcon(iconName) {
	var classNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	if (icons_default.a[iconName]) {
		var element = parser.parseFromString(icons_default.a[iconName], 'image/svg+xml').documentElement;

		// IE 11 doesn't support classList nor className on SVG elements
		element.setAttribute('class', classNames.join(' '));

		return element;
	}

	return null;
}

var icons_icons = keys_default()(icons_default.a).reduce(function (map, name) {
	map[name] = name;
	return map;
}, {});
// CONCATENATED MODULE: ./src/ad-products/templates/interface/close-button.js











var close_button_CloseButton = function (_UiComponent) {
	inherits_default()(CloseButton, _UiComponent);

	function CloseButton() {
		classCallCheck_default()(this, CloseButton);

		return possibleConstructorReturn_default()(this, (CloseButton.__proto__ || get_prototype_of_default()(CloseButton)).apply(this, arguments));
	}

	createClass_default()(CloseButton, [{
		key: 'render',
		value: function render() {
			var onClick = this.props.onClick;
			var classNames = this.classNames;

			var button = new button_Button({ onClick: onClick, classNames: classNames }).render();
			var closeIcon = createIcon(icons_icons.CROSS, ['icon']);

			button.appendChild(closeIcon);

			return button;
		}
	}, {
		key: 'classNames',
		get: function get() {
			return ['button-close'].concat(toConsumableArray_default()(get_default()(CloseButton.prototype.__proto__ || get_prototype_of_default()(CloseButton.prototype), 'classNames', this)));
		}
	}]);

	return CloseButton;
}(ui_component_UiComponent);


// CONCATENATED MODULE: ./src/ad-products/templates/sticky-ad.js











var sticky_ad_StickyAd = function () {
	createClass_default()(StickyAd, null, [{
		key: 'getName',
		value: function getName() {
			return 'stickyAd';
		}
	}, {
		key: 'getDefaultConfig',
		value: function getDefaultConfig() {
			return {
				enabled: true,
				stickyAdditionalTime: 0,
				stickyUntilSlotViewed: true,
				handleNavbar: true,
				navbarWrapperSelector: 'body > nav.navigation',
				smartBannerSelector: null,
				slotsIgnoringNavbar: []
			};
		}
	}]);

	function StickyAd(adSlot) {
		classCallCheck_default()(this, StickyAd);

		this.adSlot = adSlot;
		this.lineId = adSlot.lineItemId;
		this.config = ad_engine_["context"].get('templates.' + StickyAd.getName());
		this.lines = ad_engine_["context"].get('templates.' + StickyAd.getName() + '.lineItemIds');
		this.stickiness = null;
		this.scrollListener = null;
		this.topOffset = 0;
		this.leftOffset = 0;
	}

	createClass_default()(StickyAd, [{
		key: 'init',
		value: function init(params) {
			var _this = this;

			this.params = params;

			if (!StickyAd.isEnabled() || !this.lines || !this.lines.length || !this.lineId || this.lines.indexOf(this.lineId.toString()) === -1 && this.lines.indexOf(this.lineId) === -1) {
				return;
			}

			this.adSlot.getElement().classList.add(CSS_CLASSNAME_STICKY_TEMPLATE);

			this.addUnstickLogic();
			this.addUnstickEventsListeners();

			if (this.config.handleNavbar && this.config.slotsIgnoringNavbar.indexOf(this.adSlot.getSlotName()) === -1) {
				var navbarElement = document.querySelector(this.config.navbarWrapperSelector);

				this.topOffset = navbarElement ? navbarElement.offsetHeight : 0;

				if (this.config.smartBannerSelector) {
					var smartBannerElement = document.querySelector(this.config.smartBannerSelector);

					this.topOffset += smartBannerElement ? smartBannerElement.offsetHeight : 0;
				}
			}

			this.leftOffset = ad_engine_["utils"].getLeftOffset(this.adSlot.getElement().querySelector('div').firstChild);

			var startOffset = ad_engine_["utils"].getTopOffset(this.adSlot.getElement().querySelector('div')) - this.topOffset;

			this.scrollListener = ad_engine_["scrollListener"].addCallback(function () {
				var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

				if (scrollPosition >= startOffset) {
					_this.stickiness.run();
					ad_engine_["scrollListener"].removeCallback(_this.scrollListener);
				}
			});
		}
	}, {
		key: 'addUnstickLogic',
		value: function addUnstickLogic() {
			var _this2 = this;

			var _config = this.config,
			    stickyAdditionalTime = _config.stickyAdditionalTime,
			    stickyUntilSlotViewed = _config.stickyUntilSlotViewed;

			var whenSlotViewedOrTimeout = function () {
				var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
					return regenerator_default.a.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									_context.next = 2;
									return stickyUntilSlotViewed && !_this2.adSlot.isViewed() ? ad_engine_["utils"].once(_this2.adSlot, ad_engine_["AdSlot"].SLOT_VIEWED_EVENT) : promise_default.a.resolve();

								case 2:
									_context.next = 4;
									return ad_engine_["utils"].wait(StickyAd.DEFAULT_UNSTICK_DELAY + stickyAdditionalTime);

								case 4:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, _this2);
				}));

				return function whenSlotViewedOrTimeout() {
					return _ref.apply(this, arguments);
				};
			}();

			this.stickiness = new stickiness_Stickiness(this.adSlot, whenSlotViewedOrTimeout(), true);
		}
	}, {
		key: 'addUnstickButton',
		value: function addUnstickButton() {
			var _this3 = this;

			this.closeButton = new close_button_CloseButton({
				classNames: ['button-unstick'],
				onClick: function onClick() {
					return _this3.stickiness.close();
				}
			}).render();

			this.adSlot.getElement().querySelector('div').appendChild(this.closeButton);
		}
	}, {
		key: 'removeUnstickButton',
		value: function removeUnstickButton() {
			this.closeButton.remove();
		}
	}, {
		key: 'removeStickyParameters',
		value: function removeStickyParameters() {
			this.adSlot.getElement().classList.remove(CSS_CLASSNAME_STICKY_SLOT);
			this.adSlot.getElement().style.height = null;
			this.adSlot.getElement().querySelector('div').style.top = null;
			this.adSlot.getElement().querySelector('div').style.left = null;
		}
	}, {
		key: 'addUnstickEventsListeners',
		value: function addUnstickEventsListeners() {
			var _this4 = this;

			this.stickiness.on(stickiness_Stickiness.STICKINESS_CHANGE_EVENT, function (isSticky) {
				return _this4.onStickinessChange(isSticky);
			});
			this.stickiness.on(stickiness_Stickiness.CLOSE_CLICKED_EVENT, this.unstickImmediately.bind(this));
			this.stickiness.on(stickiness_Stickiness.UNSTICK_IMMEDIATELY_EVENT, this.unstickImmediately.bind(this));
		}
	}, {
		key: 'onStickinessChange',
		value: function () {
			var _ref2 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee2(isSticky) {
				return regenerator_default.a.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (isSticky) {
									_context2.next = 8;
									break;
								}

								_context2.next = 3;
								return animate(this.adSlot.getElement().querySelector('div'), CSS_CLASSNAME_SLIDE_OUT_ANIMATION, SLIDE_OUT_TIME);

							case 3:
								this.removeStickyParameters();
								animate(this.adSlot.getElement().querySelector('div'), CSS_CLASSNAME_FADE_IN_ANIMATION, FADE_IN_TIME);

								this.removeUnstickButton();
								_context2.next = 13;
								break;

							case 8:
								this.adSlot.getElement().classList.add(CSS_CLASSNAME_STICKY_SLOT);
								this.adSlot.getElement().style.height = this.adSlot.getElement().querySelector('div').offsetHeight + 'px';
								this.adSlot.getElement().querySelector('div').style.top = this.topOffset + 'px';
								this.adSlot.getElement().querySelector('div').style.left = this.leftOffset + 'px';

								this.addUnstickButton();

							case 13:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function onStickinessChange(_x) {
				return _ref2.apply(this, arguments);
			}

			return onStickinessChange;
		}()
	}, {
		key: 'unstickImmediately',
		value: function unstickImmediately() {
			if (this.stickiness) {
				this.removeStickyParameters();
				this.stickiness.sticky = false;
				this.removeUnstickButton();
			}
		}
	}], [{
		key: 'isEnabled',
		value: function isEnabled() {
			return ad_engine_["context"].get('templates.' + StickyAd.getName() + '.enabled');
		}
	}]);

	return StickyAd;
}();
sticky_ad_StickyAd.DEFAULT_UNSTICK_DELAY = 2000;
// EXTERNAL MODULE: external "babel-runtime/helpers/extends"
var extends_ = __webpack_require__(23);
var extends_default = /*#__PURE__*/__webpack_require__.n(extends_);

// EXTERNAL MODULE: external "lodash/throttle"
var throttle_ = __webpack_require__(17);
var throttle_default = /*#__PURE__*/__webpack_require__.n(throttle_);

// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/close-button.js
function add(video, container) {
	var closeButton = document.createElement('div');

	closeButton.classList.add('close-ad');
	closeButton.addEventListener('click', function (event) {
		video.stop();
		event.preventDefault();
	});

	container.appendChild(closeButton);
}

/* harmony default export */ var close_button = ({
	add: add
});
// CONCATENATED MODULE: ./src/ad-products/common/translations.js
var TRANSLATIONS = {
	labels: {
		en: {
			advertisement: 'Advertisement',
			'learn-more': 'Learn More'
		},
		ar: {
			advertisement: 'إعلان'
		},
		bn: {
			advertisement: 'বিজ্ঞাপন'
		},
		br: {
			advertisement: 'Bomm bruderezh'
		},
		ca: {
			advertisement: 'Anunci'
		},
		cs: {
			advertisement: 'Reklama'
		},
		de: {
			advertisement: 'Anzeige',
			'learn-more': 'Erfahre mehr'
		},
		es: {
			advertisement: 'Anuncio',
			'learn-more': 'Conoce más'
		},
		eu: {
			advertisement: 'Iragarkia'
		},
		fa: {
			advertisement: 'تبلیغات'
		},
		fo: {
			advertisement: 'Lýsing'
		},
		fr: {
			advertisement: 'Publicité',
			'learn-more': 'En savoir plus'
		},
		fy: {
			advertisement: 'Advertinsje'
		},
		gl: {
			advertisement: 'Anuncio'
		},
		gv: {
			advertisement: 'Soilsheen'
		},
		he: {
			advertisement: 'פרסומת'
		},
		hu: {
			advertisement: 'Hirdetés'
		},
		id: {
			advertisement: 'Iklan',
			'learn-more': 'Baca Selengkapnya'
		},
		inh: {
			advertisement: 'дебат'
		},
		it: {
			advertisement: 'Pubblicità',
			'learn-more': 'Ulteriori informazioni'
		},
		ja: {
			advertisement: '広告',
			'learn-more': 'もっと見る'
		},
		ko: {
			advertisement: '광고'
		},
		krc: {
			advertisement: 'Pеклама'
		},
		lb: {
			advertisement: 'Reklamm'
		},
		mk: {
			advertisement: 'Pеклама'
		},
		mr: {
			advertisement: 'जाहिरात'
		},
		ms: {
			advertisement: 'Iklan'
		},
		nl: {
			advertisement: 'Advertentie',
			'learn-more': 'Meer te weten komen'
		},
		no: {
			advertisement: 'Reklame'
		},
		pl: {
			advertisement: 'Reklama',
			'learn-more': 'Czytaj więcej'
		},
		ps: {
			advertisement: 'خبرتيا'
		},
		pt: {
			advertisement: 'Anúncio',
			'learn-more': 'Saiba Mais'
		},
		'roa-tara': {
			advertisement: 'Pubblecetà'
		},
		ru: {
			advertisement: 'Pеклама',
			'learn-more': 'Узнать больше'
		},
		si: {
			advertisement: 'ප්‍රචාරක දැන්වීම'
		},
		sl: {
			advertisement: 'Oglas'
		},
		'sr-ec': {
			advertisement: 'Pеклама'
		},
		sv: {
			advertisement: 'Annons'
		},
		te: {
			advertisement: 'వాణిజ్య ప్రకటన'
		},
		th: {
			advertisement: 'การโฆษณา'
		},
		tr: {
			advertisement: 'Reklam'
		},
		'tt-cyrl': {
			advertisement: 'Pеклама'
		},
		uk: {
			advertisement: 'Pеклама'
		},
		vi: {
			advertisement: 'Quảng cáo'
		},
		'zh-hans': {
			advertisement: '广告',
			'learn-more': '了解更多'
		},
		'zh-hant': {
			advertisement: '廣告',
			'learn-more': '閱讀更多'
		}
	}
};
// CONCATENATED MODULE: ./src/ad-products/common/i18n.js



var defaultLanguage = 'en';

function getTranslation(category, key) {
	var lang = ad_engine_["context"].get('options.contentLanguage'),
	    language = lang && typeof TRANSLATIONS[category][lang] !== 'undefined' ? lang : defaultLanguage;

	return TRANSLATIONS[category][language][key] || TRANSLATIONS[category][defaultLanguage][key];
}
// CONCATENATED MODULE: ./src/ad-products/templates/outstream/porvata-template.js







var DEFAULT_VIDEO_ASPECT_RATIO = 640 / 360;
var IMA_VPAID_INSECURE_MODE = 2;

var porvata_template_PorvataTemplate = function () {
	createClass_default()(PorvataTemplate, null, [{
		key: 'getName',
		value: function getName() {
			return 'porvata3';
		}
	}, {
		key: 'getDefaultConfig',
		value: function getDefaultConfig() {
			return {
				isFloatingEnabled: true,
				inViewportOffsetTop: 0,
				inViewportOffsetBottom: 0,
				onInit: function onInit() {}
			};
		}
	}]);

	function PorvataTemplate(adSlot) {
		classCallCheck_default()(this, PorvataTemplate);

		this.adSlot = adSlot;
		this.config = ad_engine_["context"].get('templates.porvata3');
	}

	createClass_default()(PorvataTemplate, [{
		key: 'init',
		value: function init(params) {
			var _this = this;

			var slotName = this.adSlot.getSlotName();

			if (!this.adSlot.getElement().classList.contains('ad-slot')) {
				this.adSlot.getElement().classList.add('ad-slot');
			}

			this.adSlot.getElement().classList.add('porvata3');
			this.adSlot.getElement().setAttribute('data-label', getTranslation('labels', 'advertisement'));

			this.isInsecureMode = params.vpaidMode === IMA_VPAID_INSECURE_MODE;

			if (!ad_engine_["Porvata"].isVideoAutoplaySupported()) {
				return this.adSlot.collapse();
			}

			params.viewportHookElement = this.adSlot.getElement();
			if (this.isInsecureMode) {
				params.originalContainer = params.container;
				params.container = this.createVideoContainer(slotName);
			}

			ad_engine_["slotTweaker"].collapse(this.adSlot);

			this.config.onInit(this.adSlot, params, this.config);

			return ad_engine_["slotTweaker"].makeResponsive(this.adSlot, DEFAULT_VIDEO_ASPECT_RATIO).then(function () {
				return ad_engine_["Porvata"].inject(params).then(function (video) {
					return _this.onReady(video, params);
				});
			});
		}
	}, {
		key: 'onReady',
		value: function onReady(video, params) {
			var slotElement = this.adSlot.getElement();
			var template = selectTemplate(video.videoSettings);
			var videoContainer = params.container;

			if (this.isInsecureMode) {
				this.adjustVpaidPlayer(video, videoContainer);
			}

			slotElement.classList.add('porvata-outstream');

			video.addEventListener('loaded', function () {
				video.container.classList.remove('hide');
			});

			window.addEventListener('resize', function () {
				if (!video.isFloating) {
					var slotWidth = slotElement.clientWidth;
					video.resize(slotWidth, slotWidth / DEFAULT_VIDEO_ASPECT_RATIO);
				}
			});

			this.handleSlotStatus(video);

			ad_engine_["events"].once(ad_engine_["events"].PAGE_CHANGE_EVENT, function () {
				video.destroy();
			});

			setup(video, template, {
				container: videoContainer,
				inViewportOffsetTop: this.config.inViewportOffsetTop,
				inViewportOffsetBottom: this.config.inViewportOffsetBottom,
				isFloatingEnabled: this.config.isFloatingEnabled && params.enableInContentFloating,
				slotName: params.slotName
			});

			return video;
		}
	}, {
		key: 'handleSlotStatus',
		value: function handleSlotStatus(video) {
			var _this2 = this;

			var resolveStatus = null;
			var statusPromise = new promise_default.a(function (resolve) {
				resolveStatus = resolve;
			});

			video.addEventListener('wikiaAdsManagerLoaded', function () {
				_this2.adSlot.success();
				resolveStatus();
			});

			video.addEventListener('wikiaFirstTimeInViewport', function () {
				statusPromise.then(function () {
					var eventSuffix = _this2.adSlot.getStatus() === 'success' ? 'WithOffer' : 'WithoutOffer';
					video.ima.dispatchEvent('wikiaInViewport' + eventSuffix);
				});
			});

			video.addEventListener('wikiaEmptyAd', function () {
				_this2.adSlot.collapse();
				resolveStatus();
			});
		}
	}, {
		key: 'adjustVpaidPlayer',
		value: function adjustVpaidPlayer(video, container) {
			var videoPlayer = container.querySelector('.video-player');

			video.addEventListener('loaded', function () {
				var ad = video.ima.getAdsManager().getCurrentAd();

				if (ad && ad_engine_["Porvata"].isVpaid(ad.getContentType() || '')) {
					container.classList.add('vpaid-enabled');
					videoPlayer.classList.remove('hide');
				}
			});

			video.addEventListener('allAdsCompleted', function () {
				container.classList.add('hide');
			});
		}
	}, {
		key: 'createVideoContainer',
		value: function createVideoContainer() {
			var container = document.createElement('div');
			var displayWrapper = document.createElement('div');

			container.classList.add('video-overlay');
			displayWrapper.classList.add('video-display-wrapper');

			container.appendChild(displayWrapper);
			this.adSlot.getElement().appendChild(container);

			return displayWrapper;
		}
	}]);

	return PorvataTemplate;
}();
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/dynamic-reveal.js



/**
 * Add UI animations that expands once video ad starts and collapses the slot once video ad finishes
 * @param video Porvata video element
 * @param container Video container
 * @param params videoSettings parameters
 */
function dynamic_reveal_add(video, container, params) {
	var slot = ad_engine_["slotService"].get(params.slotName);

	var slotExpanded = false;

	video.addEventListener('loaded', function () {
		if (!slotExpanded) {
			ad_engine_["slotTweaker"].expand(slot);
			slotExpanded = true;

			// Delay dispatching event so it's run after browser really finish expanding the slot
			// Value 1000ms is related to animation defined in _porvata.scss file
			setTimeout(function () {
				video.ima.dispatchEvent('wikiaSlotExpanded');
			}, 1000);
		}

		if (!video.isFloating) {
			var slotWidth = slot.getElement().scrollWidth;
			video.resize(slotWidth, slotWidth / DEFAULT_VIDEO_ASPECT_RATIO);
		}
	});

	video.addEventListener('allAdsCompleted', function () {
		ad_engine_["slotTweaker"].collapse(slot);
		video.ima.dispatchEvent('wikiaSlotCollapsed');
	});
}

/* harmony default export */ var dynamic_reveal = ({
	add: dynamic_reveal_add
});
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/floating.js




var FLOATING_CLASS_NAME = 'outstream-floating';

/**
 * Makes the video element floating once main container is out of viewport
 * @param video Porvata video element
 * @param container Video container
 * @param params videoSettings parameters
 */
function floating_add(video, container, params) {
	if (!params.isFloatingEnabled) {
		return;
	}

	var slotElement = ad_engine_["slotService"].get(params.slotName).getElement();
	var videoOverlay = slotElement.querySelector('.video-overlay');
	var videoWrapper = slotElement.querySelector('.video-display-wrapper');

	video.addEventListener('wikiaSlotExpanded', function () {
		var observer = ad_engine_["utils"].viewportObserver.addListener(videoOverlay, function (inViewport) {
			if (inViewport) {
				slotElement.classList.remove(FLOATING_CLASS_NAME);
			} else {
				slotElement.classList.add(FLOATING_CLASS_NAME);
			}

			video.isFloating = !inViewport;
			var width = videoWrapper.offsetWidth;
			video.resize(width, width / DEFAULT_VIDEO_ASPECT_RATIO);
		}, {
			offsetTop: params.inViewportOffsetTop,
			offsetBottom: params.inViewportOffsetBottom,
			areaThreshold: 1
		});
		var disableFloating = function disableFloating() {
			video.isFloating = false;
			slotElement.classList.remove(FLOATING_CLASS_NAME);
			ad_engine_["utils"].viewportObserver.removeListener(observer);
			var width = videoWrapper.offsetWidth;
			video.resize(width, width / DEFAULT_VIDEO_ASPECT_RATIO);
		};
		var closeButton = new close_button_CloseButton({
			onClick: disableFloating
		});

		videoWrapper.appendChild(closeButton.render());
		video.addEventListener('wikiaAdCompleted', disableFloating);
	});
}

/* harmony default export */ var floating = ({
	add: floating_add
});
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/learn-more.js



function learn_more_add(video, container, params) {
	var learnMore = document.createElement('div'),
	    icon = createIcon(icons_icons.LEARN_MORE, ['learn-more-icon', 'porvata-icon']),
	    label = document.createElement('div');

	label.innerText = getTranslation('labels', 'learn-more');
	learnMore.appendChild(label);
	learnMore.appendChild(icon);

	learnMore.classList.add('learn-more');
	learnMore.addEventListener('click', function () {
		top.open(params.clickThroughURL, '_blank');
	});

	container.appendChild(learnMore);
}

/* harmony default export */ var learn_more = ({
	add: learn_more_add
});
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/pause-control.js


function pause_control_add(video, container) {
	var pauseButton = document.createElement('div'),
	    pauseIcon = createIcon(icons_icons.PAUSE, ['play-off-icon', 'porvata-icon', 'porvata-off-icon']),
	    playIcon = createIcon(icons_icons.PLAY, ['play-on-icon', 'porvata-icon', 'porvata-on-icon']);

	pauseButton.appendChild(playIcon);
	pauseButton.appendChild(pauseIcon);

	pauseButton.className = 'play-pause-button porvata-switchable-icon';
	pauseButton.addEventListener('click', function () {
		if (video.isPaused()) {
			video.resume();
		} else {
			video.pause();
		}
	});
	video.addEventListener('pause', function () {
		pauseButton.classList.remove('is-on');
	});
	video.addEventListener('resume', function () {
		pauseButton.classList.add('is-on');
	});
	video.addEventListener('start', function () {
		pauseButton.classList.add('is-on');
	});

	container.appendChild(pauseButton);
}

/* harmony default export */ var pause_control = ({
	add: pause_control_add
});
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/pause-overlay.js
function pause_overlay_add(video, container) {
	var overlay = document.createElement('div');

	overlay.classList.add('pause-overlay');
	overlay.addEventListener('click', function () {
		if (video.isPaused()) {
			video.resume();
		} else {
			video.pause();
		}
	});

	container.appendChild(overlay);
}

/* harmony default export */ var pause_overlay = ({
	add: pause_overlay_add
});
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/progress-bar.js


function progress_bar_add(video, container) {
	var progressBar = document.createElement('div'),
	    currentTime = document.createElement('div');

	progressBar.classList.add('progress-bar');
	currentTime.classList.add('current-time');

	progressBar.appendChild(currentTime);

	progressBar.pause = function () {
		currentTime.style.width = currentTime.offsetWidth / progressBar.offsetWidth * 100 + '%';
	};
	progressBar.reset = function () {
		currentTime.style.transitionDuration = '';
		currentTime.style.width = '0';
	};
	progressBar.rewind = function () {
		var remainingTime = currentTime.style.transitionDuration;

		progressBar.reset();
		ad_engine_["slotTweaker"].forceRepaint(currentTime);
		currentTime.style.transitionDuration = remainingTime;
	};
	progressBar.start = function () {
		var remainingTime = video.getRemainingTime();

		if (remainingTime) {
			if (remainingTime > 0) {
				currentTime.style.transitionDuration = remainingTime + 's';
			}
			ad_engine_["slotTweaker"].forceRepaint(currentTime);
			currentTime.style.width = '100%';
		} else {
			currentTime.style.width = '0';
		}
	};

	video.addEventListener('wikiaAdPlay', progressBar.start);
	video.addEventListener('wikiaAdCompleted', progressBar.reset);
	video.addEventListener('wikiaAdRestart', progressBar.rewind);
	video.addEventListener('wikiaAdPause', progressBar.pause);

	container.appendChild(progressBar);
}

/* harmony default export */ var progress_bar = ({
	add: progress_bar_add
});
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/replay-overlay.js


var replayOverlayClass = 'replay-overlay';

function replay_overlay_add(video, container, params) {
	var overlay = document.createElement('div');

	overlay.classList.add(replayOverlayClass);
	overlay.addEventListener('click', function () {
		return video.play();
	});

	if (!params.autoPlay) {
		showOverlay(overlay, params);
	}

	video.addEventListener('wikiaAdCompleted', function () {
		showOverlay(overlay, params);
	});

	if (video.params.theme && video.params.theme === 'hivi') {
		var replayIcon = addReplayIcon(overlay);

		if (!params.autoPlay) {
			var playIcon = addPlayIcon(overlay);
			replayIcon.style.display = 'none';

			video.addEventListener('start', function () {
				replayIcon.style.display = '';
				playIcon.style.display = 'none';
			});
		}

		container = video.params.thumbnail;
		container.appendChild(overlay);
	} else {
		container.parentElement.insertBefore(overlay, container);
	}
}

function showOverlay(overlay, params) {
	if (!params.container.classList.contains('theme-hivi')) {
		overlay.style.width = overlay.style.width || getOverlayWidth(params);
	}
	// make overlay visible after ad finishes
	overlay.style.display = 'block';
}
/**
 * Basing on video width and total ad width compute width (in %)
 * of overlay to make it responsive.
 *
 * offsetWidth won't work in case video container is hidden.
 * @param params
 * @return string in form '55%'
 */
function getOverlayWidth(params) {
	var adWidth = params.container.offsetWidth,
	    videoWidth = params.hideWhenPlaying.offsetWidth;

	return 100 * videoWidth / adWidth + '%';
}

function addReplayIcon(overlay) {
	var replayIcon = createIcon(icons_icons.REPLAY, ['replay-icon', 'overlay-icon']);
	overlay.appendChild(replayIcon);

	return replayIcon;
}

function addPlayIcon(overlay) {
	var playIcon = createIcon(icons_icons.PLAY, ['play-icon', 'overlay-icon']);
	overlay.appendChild(playIcon);

	return playIcon;
}

/* harmony default export */ var replay_overlay = ({
	add: replay_overlay_add
});
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/toggle-animation.js
var toggle_animation_duration = 400,
    onAnimationClassName = 'on-animation';

function resizeContainer(container, finalAspectRatio) {
	container.style.height = container.offsetHeight + 'px';
	container.style.height = container.offsetWidth / finalAspectRatio + 'px';

	setTimeout(function () {
		container.style.height = '';
	}, toggle_animation_duration);
}

function toggle(elementToShow, elementToHide) {
	elementToHide.classList.add('hide');
	elementToShow.classList.remove('hide');
}

function hideVideo(video, params) {
	resizeContainer(params.container, params.aspectRatio);
	setTimeout(function () {
		toggle(params.image, video.container);
		params.container.classList.remove(onAnimationClassName);
	}, toggle_animation_duration);
}

function showVideo(video, params) {
	params.container.classList.add(onAnimationClassName);
	resizeContainer(params.container, params.videoAspectRatio);
	toggle(video.container, params.image);
}

function toggle_animation_add(video, container, params) {
	video.addEventListener('wikiaAdStarted', function () {
		showVideo(video, params);
	});

	video.addEventListener('wikiaAdCompleted', function () {
		hideVideo(video, params);
	});
}

/* harmony default export */ var toggle_animation = ({
	add: toggle_animation_add,
	duration: toggle_animation_duration
});
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/toggle-fullscreen.js


function toggle_fullscreen_add(video, container) {
	var toggleFullscreenButton = document.createElement('div'),
	    offIcon = createIcon(icons_icons.FULLSCREEN_OFF, ['fullscreen-off-icon', 'porvata-icon', 'porvata-off-icon']),
	    onIcon = createIcon(icons_icons.FULLSCREEN_ON, ['fullscreen-on-icon', 'porvata-icon', 'porvata-on-icon']);

	toggleFullscreenButton.appendChild(offIcon);
	toggleFullscreenButton.appendChild(onIcon);

	toggleFullscreenButton.className = 'toggle-fullscreen-button porvata-switchable-icon';
	toggleFullscreenButton.addEventListener('click', function () {
		video.toggleFullscreen();
	});
	video.addEventListener('wikiaFullscreenChange', function () {
		if (video.isFullscreen()) {
			toggleFullscreenButton.classList.add('is-on');
		} else {
			toggleFullscreenButton.classList.remove('is-on');
		}
	});
	video.addEventListener('wikiaAdStop', function () {
		if (video.isFullscreen()) {
			video.toggleFullscreen();
		}
	});

	container.appendChild(toggleFullscreenButton);
}

/* harmony default export */ var toggle_fullscreen = ({
	add: toggle_fullscreen_add
});
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/toggle-thumbnail.js
function toggle_thumbnail_add(video, container, params) {
	video.addEventListener('wikiaAdStarted', function () {
		params.thumbnail.classList.add('hidden-state');
	});

	video.addEventListener('wikiaAdCompleted', function () {
		params.thumbnail.classList.remove('hidden-state');
	});
}

/* harmony default export */ var toggle_thumbnail = ({
	add: toggle_thumbnail_add
});
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/toggle-ui.js


var overlayTimeout = 5000;

function toggle_ui_add(video, container, params) {
	var timeout = null;

	var isMobile = ad_engine_["utils"].client.isSmartphone() || ad_engine_["utils"].client.isTablet(),
	    overlay = document.createElement('div'),
	    setAutomaticToggle = function setAutomaticToggle() {
		timeout = setTimeout(function () {
			if (video.isPlaying()) {
				video.container.classList.remove('ui-visible');
			}
		}, overlayTimeout);
	};

	overlay.classList.add('toggle-ui-overlay');
	if (isMobile) {
		overlay.addEventListener('click', function () {
			video.container.classList.toggle('ui-visible');

			clearTimeout(timeout);
			setAutomaticToggle();
		});
		video.addEventListener('resume', setAutomaticToggle);
	} else {
		video.container.addEventListener('mouseenter', function () {
			video.container.classList.add('ui-visible');
		});
		video.container.addEventListener('mouseleave', function () {
			video.container.classList.remove('ui-visible');
		});
		overlay.addEventListener('click', function () {
			top.open(params.clickThroughURL, '_blank');
		});
	}

	container.appendChild(overlay);
}

/* harmony default export */ var toggle_ui = ({
	add: toggle_ui_add
});
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/toggle-video.js
function toggle_video_add(video, container) {
	video.addEventListener('wikiaAdStarted', function () {
		container.classList.remove('hide');
	});

	video.addEventListener('wikiaAdCompleted', function () {
		container.classList.add('hide');
	});
}

/* harmony default export */ var toggle_video = ({
	add: toggle_video_add
});
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/volume-control.js


function createVolumeControl(params) {
	var iconPrefix = params.theme === 'hivi' ? 'HIVI_' : '',
	    volume = document.createElement('div'),
	    offIcon = createIcon(icons_icons[iconPrefix + 'VOLUME_OFF'], ['volume-off-icon', 'porvata-icon', 'porvata-off-icon']),
	    onIcon = createIcon(icons_icons[iconPrefix + 'VOLUME_ON'], ['volume-on-icon', 'porvata-icon', 'porvata-on-icon']);

	volume.className = 'volume-button porvata-switchable-icon hidden';
	volume.appendChild(offIcon);
	volume.appendChild(onIcon);

	return volume;
}

function updateCurrentState(video, volumeControl) {
	if (video.isMuted() || video.isMobilePlayerMuted()) {
		volumeControl.classList.add('is-on');
	} else {
		volumeControl.classList.remove('is-on');
	}

	if (!video.isMobilePlayerMuted() && video.mobileVideoAd && video.mobileVideoAd.muted) {
		video.updateVideoDOMElement(video.defaultVolume);
	}
}

function volume_control_add(video, container) {
	var volumeControl = createVolumeControl(video.params);

	video.addEventListener('wikiaVolumeChange', function () {
		updateCurrentState(video, volumeControl);
	});

	video.addEventListener('wikiaAdStarted', function () {
		updateCurrentState(video, volumeControl);
		volumeControl.classList.remove('hidden');
	});

	volumeControl.addEventListener('click', function (e) {
		video.volumeToggle();
		e.preventDefault();
	});

	container.appendChild(volumeControl);
}

/* harmony default export */ var volume_control = ({
	add: volume_control_add
});
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/panel.js



var panel_Panel = function () {
	function Panel(className, uiElements) {
		classCallCheck_default()(this, Panel);

		this.uiElements = uiElements;
		this.className = className;
		this.panelContainer = null;
	}

	createClass_default()(Panel, [{
		key: 'add',
		value: function add(video, container, params) {
			var _this = this;

			this.panelContainer = document.createElement('div');
			this.panelContainer.className = this.className;
			this.uiElements.forEach(function (uiElement) {
				if (uiElement) {
					uiElement.add(video, _this.panelContainer, params);
				}
			});
			container.appendChild(this.panelContainer);
		}
	}]);

	return Panel;
}();


// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/ui-template.js
















var ui_template_createBottomPanel = function createBottomPanel(_ref) {
	var _ref$fullscreenAllowe = _ref.fullscreenAllowed,
	    fullscreenAllowed = _ref$fullscreenAllowe === undefined ? true : _ref$fullscreenAllowe,
	    _ref$theme = _ref.theme,
	    theme = _ref$theme === undefined ? null : _ref$theme;

	var isHiVi = theme === 'hivi';
	var panelClassName = 'bottom-panel';

	if (isHiVi) {
		panelClassName += ' dynamic-panel';
	}

	return new panel_Panel(panelClassName, [isHiVi ? pause_control : null, volume_control, isHiVi && fullscreenAllowed ? toggle_fullscreen : null]);
};

var ui_template_getTemplates = function getTemplates(params, videoSettings) {
	return {
		'auto-play': [progress_bar, pause_overlay, ui_template_createBottomPanel(params), toggle_animation],
		default: [progress_bar, pause_overlay, ui_template_createBottomPanel(params), close_button, toggle_animation],
		'split-left': [progress_bar, pause_overlay, ui_template_createBottomPanel(params), toggle_video, replay_overlay, !videoSettings.isAutoPlay() ? close_button : null],
		'split-right': [progress_bar, pause_overlay, ui_template_createBottomPanel(params), toggle_video, replay_overlay, !videoSettings.isAutoPlay() ? close_button : null],
		hivi: [progress_bar, ui_template_createBottomPanel(params), params.videoPlaceholderElement ? toggle_video : toggle_animation, toggle_thumbnail, toggle_ui, learn_more, params.videoPlaceholderElement ? replay_overlay : null],
		'outstream-incontent': [dynamic_reveal, floating, progress_bar, volume_control]
	};
};

function selectTemplate(videoSettings) {
	var params = videoSettings.getParams(),
	    templates = ui_template_getTemplates(params, videoSettings);

	var template = 'default';

	if (params.type && params.type.indexOf('porvata') === 0) {
		template = 'outstream-incontent';
	} else if (params.theme === 'hivi') {
		template = 'hivi';
	} else if (videoSettings.isSplitLayout()) {
		template = params.splitLayoutVideoPosition === 'right' ? 'split-right' : 'split-left';
	} else if (videoSettings.isAutoPlay()) {
		template = 'auto-play';
	}

	return templates[template];
}
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/video-interface.js
function setup(video, uiElements, params) {
	uiElements.forEach(function (element) {
		if (element) {
			element.add(video, video.container, params);
		}
	});
}
// CONCATENATED MODULE: ./src/ad-products/templates/interface/video/index.js


// CONCATENATED MODULE: ./src/ad-products/templates/uap/universal-ad-package.js






var loadPorvata = function () {
	var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee(videoSettings, slotContainer, imageContainer) {
		var params, template, video;
		return regenerator_default.a.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						params = videoSettings.getParams();
						template = selectTemplate(videoSettings);


						params.autoPlay = videoSettings.isAutoPlay();
						videoSettings.updateParams(params);

						_context.next = 6;
						return ad_engine_["Porvata"].inject(params);

					case 6:
						video = _context.sent;


						video.container.style.position = 'relative';
						setup(video, template, {
							autoPlay: videoSettings.isAutoPlay(),
							image: imageContainer,
							container: slotContainer,
							thumbnail: params.thumbnail,
							clickThroughURL: params.clickThroughURL,
							aspectRatio: params.aspectRatio,
							videoAspectRatio: params.videoAspectRatio,
							hideWhenPlaying: params.videoPlaceholderElement || params.image,
							splitLayoutVideoPosition: params.splitLayoutVideoPosition
						});

						video.addEventListener('wikiaAdCompleted', function () {
							video.reload();
						});

						adjustVideoAdContainer(params);

						return _context.abrupt('return', video);

					case 12:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function loadPorvata(_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();

var loadTwitchPlayer = function () {
	var _ref2 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee2(iframe, params) {
		var channelName, player, options, twitchPlayer;
		return regenerator_default.a.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						channelName = params.channelName, player = params.player, options = {
							height: '100%',
							width: '100%',
							channel: channelName
						};


						iframe.parentNode.insertBefore(player, iframe);

						twitchPlayer = new ad_engine_["TwitchPlayer"](player, options, params);
						_context2.next = 5;
						return twitchPlayer.getPlayer();

					case 5:

						recalculateTwitchSize(params)();

						return _context2.abrupt('return', twitchPlayer);

					case 7:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}));

	return function loadTwitchPlayer(_x4, _x5) {
		return _ref2.apply(this, arguments);
	};
}();

var loadTwitchAd = function () {
	var _ref3 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee3(iframe, params) {
		var player;
		return regenerator_default.a.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						player = params.player;
						_context3.next = 3;
						return loadTwitchPlayer(iframe, params);

					case 3:
						window.addEventListener('resize', throttle_default()(recalculateTwitchSize(params), 250));
						player.firstChild.id = 'twitchPlayerContainer';

					case 5:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, this);
	}));

	return function loadTwitchAd(_x6, _x7) {
		return _ref3.apply(this, arguments);
	};
}();

var loadVideoAd = function () {
	var _ref4 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee4(videoSettings) {
		var params, imageContainer, size, recalculateVideoSize, video;
		return regenerator_default.a.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						recalculateVideoSize = function recalculateVideoSize(video) {
							return function () {
								var currentSize = getVideoSize(params.container, params, videoSettings);
								video.resize(currentSize.width, currentSize.height);
							};
						};

						params = videoSettings.getParams();
						imageContainer = params.container.querySelector('div:last-of-type');
						size = getVideoSize(params.container, params, videoSettings);


						params.vastTargeting = {
							passback: getType()
						};
						params.width = size.width;
						params.height = size.height;
						videoSettings.updateParams(params);

						_context4.next = 10;
						return loadPorvata(videoSettings, params.container, imageContainer);

					case 10:
						video = _context4.sent;

						window.addEventListener('resize', throttle_default()(recalculateVideoSize(video), 250));

						if (params.videoTriggerElement) {
							params.videoTriggerElement.addEventListener('click', function () {
								return video.play();
							});
						} else if (params.videoTriggers) {
							params.videoTriggers.forEach(function (trigger) {
								trigger.addEventListener('click', function () {
									return video.play();
								});
							});
						}

						return _context4.abrupt('return', video);

					case 14:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, this);
	}));

	return function loadVideoAd(_x8) {
		return _ref4.apply(this, arguments);
	};
}();






var uapId = DEFAULT_UAP_ID;
var uapType = DEFAULT_UAP_TYPE;

function getVideoSize(slot, params, videoSettings) {
	var width = videoSettings.isSplitLayout() ? params.videoPlaceholderElement.offsetWidth : slot.clientWidth;
	var height = width / params.videoAspectRatio;

	return {
		width: width,
		height: height
	};
}

function adjustVideoAdContainer(params) {
	if (params.splitLayoutVideoPosition) {
		var videoAdContainer = params.container.querySelector('.video-player');

		videoAdContainer.classList.add('video-player-' + params.splitLayoutVideoPosition);
	}
}

function recalculateTwitchSize(params) {
	return function () {
		var adContainer = params.adContainer,
		    clickArea = params.clickArea,
		    player = params.player,
		    twitchAspectRatio = params.twitchAspectRatio;

		player.style.height = adContainer.clientHeight + 'px';
		player.style.width = player.clientHeight * twitchAspectRatio + 'px';
		clickArea.style.width = params.adContainer.clientWidth - player.clientWidth + 'px';
	};
}

function getUapId() {
	return uapId;
}

function setUapId(id) {
	uapId = id;
	updateSlotsTargeting(id);
}

function getType() {
	return uapType;
}

function setType(type) {
	uapType = type;
}

function updateSlotsTargeting(id) {
	var slots = ad_engine_["context"].get('slots');
	keys_default()(slots).forEach(function (slotId) {
		if (!slots[slotId].nonUapSlot) {
			ad_engine_["context"].set('slots.' + slotId + '.targeting.uap', id);
		}
	});
}

function enableSlots(slotsToEnable) {
	if (getType() !== 'abcd') {
		slotsToEnable.forEach(function (slotName) {
			ad_engine_["btfBlockerService"].unblock(slotName);
		});
	}
}

function disableSlots(slotsToDisable) {
	slotsToDisable.forEach(function (slotName) {
		ad_engine_["slotService"].disable(slotName);
	});
}

function initSlot(params) {
	var adSlot = ad_engine_["slotService"].get(params.slotName);
	params.container = adSlot.getElement();

	if (params.isDarkTheme) {
		params.container.classList.add('is-dark');
	}
	if (params.isMobile) {
		params.container.classList.add('is-mobile-layout');
	}
	if (ad_engine_["utils"].client.isSmartphone() || ad_engine_["utils"].client.isTablet()) {
		params.container.classList.add('is-mobile-device');
	}
}

function universal_ad_package_reset() {
	setType(DEFAULT_UAP_TYPE);
	setUapId(DEFAULT_UAP_ID);
}

function isFanTakeoverLoaded() {
	return getUapId() !== DEFAULT_UAP_ID && FAN_TAKEOVER_TYPES.indexOf(getType()) !== -1;
}

var universalAdPackage = extends_default()({}, constants_namespaceObject, {
	init: function init(params) {
		var slotsToEnable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		var slotsToDisable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

		var adProduct = 'uap';

		if (this.isVideoEnabled(params)) {
			adProduct = 'vuap';
		}

		params.adProduct = params.adProduct || adProduct;

		setUapId(params.uap);
		disableSlots(slotsToDisable);
		enableSlots(slotsToEnable);
		setType(params.adProduct);

		if (params.slotName) {
			initSlot(params);
		}
	},

	initSlot: initSlot,
	isFanTakeoverLoaded: isFanTakeoverLoaded,
	getType: getType,
	getUapId: getUapId,
	isVideoEnabled: function isVideoEnabled(params) {
		var triggersArrayIsNotEmpty = Array.isArray(params.videoTriggers) && params.videoTriggers.length > 0;

		return !!params.videoAspectRatio && (params.videoPlaceholderElement || triggersArrayIsNotEmpty);
	},

	loadVideoAd: loadVideoAd,
	loadTwitchAd: loadTwitchAd,
	reset: universal_ad_package_reset,
	setType: setType,
	setUapId: setUapId
});
// EXTERNAL MODULE: external "babel-runtime/core-js/object/assign"
var assign_ = __webpack_require__(10);
var assign_default = /*#__PURE__*/__webpack_require__.n(assign_);

// EXTERNAL MODULE: external "babel-runtime/helpers/toArray"
var toArray_ = __webpack_require__(22);
var toArray_default = /*#__PURE__*/__webpack_require__.n(toArray_);

// CONCATENATED MODULE: ./src/ad-products/templates/uap/resolved-state-switch.js



var cacheKey = 'adEngine_resolvedStateCounter';
var cacheTtl = 24 * 3600;
var now = new Date();

function createCacheKey() {
	return cacheKey + '_' + universalAdPackage.getUapId();
}

function findRecordInCache() {
	return ad_engine_["localCache"].get(createCacheKey());
}

function wasDefaultStateSeen() {
	var record = findRecordInCache();

	// check for presence in localStorage and if present, make sure that we're
	// not comparing to current session data - bfab that wants to load after bfaa
	return !!record && now.getTime() !== record.lastSeenDate;
}

function updateInformationAboutSeenDefaultStateAd() {
	ad_engine_["localCache"].set(createCacheKey(), {
		adId: universalAdPackage.getUapId(),
		lastSeenDate: now.getTime()
	}, cacheTtl);
}

var resolvedStateSwitch = {
	updateInformationAboutSeenDefaultStateAd: updateInformationAboutSeenDefaultStateAd,
	wasDefaultStateSeen: wasDefaultStateSeen
};
// CONCATENATED MODULE: ./src/ad-products/templates/uap/resolved-state.js






var DEFAULT_STATE = 'default';
var RESOLVED_STATE = 'resolved';

function getQueryParam() {
	return ad_engine_["utils"].queryString.get('resolved_state', null);
}

function isForcedByURLParam() {
	return [true, 'true', '1'].indexOf(getQueryParam()) > -1;
}

function isBlockedByURLParam() {
	return [false, 'blocked', 'false', '0'].indexOf(getQueryParam()) > -1;
}

function setState(state, params) {
	var image1 = params.image1,
	    image2 = params.image2;

	var promises = [];
	var srcPropertyName = 'defaultStateSrc';

	if (state === RESOLVED_STATE) {
		params.aspectRatio = params.resolvedStateAspectRatio;
		srcPropertyName = 'resolvedStateSrc';
	}

	promises.push(promise_default.a.resolve(params));
	image1.element.src = image1[srcPropertyName];
	promises.push(promise_default.a.race([ad_engine_["utils"].once(image1.element, 'load'), ad_engine_["utils"].once(image1.element, 'error')]));

	if (image2 && image2[srcPropertyName]) {
		image2.element.src = image2[srcPropertyName];
		promises.push(promise_default.a.race([ad_engine_["utils"].once(image2.element, 'load'), ad_engine_["utils"].once(image2.element, 'error')]));
	}

	return promise_default.a.all(promises);
}

function setDefaultState(params) {
	return setState(DEFAULT_STATE, params);
}

function resolved_state_setResolvedState(params) {
	return setState(RESOLVED_STATE, params);
}

function templateSupportsResolvedState(params) {
	return !!(params.image1 && params.image1.resolvedStateSrc) || params.theme === 'hivi';
}

function isResolvedState(params) {
	var result = false;

	if (params.resolvedStateForced) {
		return true;
	}

	if (templateSupportsResolvedState(params)) {
		var showResolvedState = !isBlockedByURLParam();
		var defaultStateSeen = true;

		if (showResolvedState) {
			defaultStateSeen = resolvedStateSwitch.wasDefaultStateSeen() || isForcedByURLParam();
		}

		result = showResolvedState && defaultStateSeen;
	}

	return result;
}

var resolvedState = {
	// This method is used by classic UAP only (not-HiVi)
	// UAP:HiVi template does not support srcPropertyNames like defaultStateSrc
	// UAP:HiVi switch images in uap/themes/hivi/hivi.js by swapping hidden-state class
	// TODO: Remove this code once we get rid of old (classic) UAP
	setImage: function setImage(videoSettings) {
		var params = videoSettings.getParams();

		if (templateSupportsResolvedState(params)) {
			if (videoSettings.isResolvedState()) {
				return resolved_state_setResolvedState(params).then(function (_ref) {
					var _ref2 = toArray_default()(_ref),
					    updatedParams = _ref2[0],
					    args = _ref2.slice(1);

					videoSettings.updateParams(updatedParams);
					return [updatedParams].concat(toConsumableArray_default()(args));
				});
			}

			resolvedStateSwitch.updateInformationAboutSeenDefaultStateAd();
			return setDefaultState(params);
		}

		return promise_default.a.resolve();
	},

	isResolvedState: isResolvedState
};
// CONCATENATED MODULE: ./src/ad-products/templates/uap/video-settings.js





var video_settings_VideoSettings = function () {
	function VideoSettings(params) {
		classCallCheck_default()(this, VideoSettings);

		this.params = params;

		Object.defineProperty(this, 'resolvedState', {
			value: resolvedState.isResolvedState(this.params),
			writable: false
		});

		Object.defineProperty(this, 'autoPlay', {
			value: this.detectAutoPlay(),
			writable: false
		});

		Object.defineProperty(this, 'splitLayout', {
			value: Boolean(params.splitLayoutVideoPosition),
			writable: false
		});
	}

	createClass_default()(VideoSettings, [{
		key: 'detectAutoPlay',
		value: function detectAutoPlay() {
			var defaultStateAutoPlay = this.params.autoPlay && !this.resolvedState,
			    resolvedStateAutoPlay = this.params.resolvedStateAutoPlay && this.resolvedState;
			return Boolean(defaultStateAutoPlay || resolvedStateAutoPlay);
		}
	}, {
		key: 'getParams',
		value: function getParams() {
			return assign_default()({}, this.params);
		}
	}, {
		key: 'updateParams',
		value: function updateParams(params) {
			assign_default()(this.params, params);
		}
	}, {
		key: 'isAutoPlay',
		value: function isAutoPlay() {
			return this.autoPlay;
		}
	}, {
		key: 'isResolvedState',
		value: function isResolvedState() {
			return this.resolvedState;
		}
	}, {
		key: 'isSplitLayout',
		value: function isSplitLayout() {
			return this.splitLayout;
		}
	}]);

	return VideoSettings;
}();
// CONCATENATED MODULE: ./src/ad-products/templates/uap/themes/theme.js




var theme_BigFancyAdTheme = function () {
	function BigFancyAdTheme(adSlot, params) {
		classCallCheck_default()(this, BigFancyAdTheme);

		this.adSlot = adSlot;
		this.container = this.adSlot.getElement();
		this.config = ad_engine_["context"].get('templates.bfaa');
		this.params = params;
	}

	createClass_default()(BigFancyAdTheme, [{
		key: 'onAdReady',
		value: function onAdReady() {}
	}, {
		key: 'onVideoReady',
		value: function onVideoReady() {}
	}]);

	return BigFancyAdTheme;
}();
// CONCATENATED MODULE: ./src/ad-products/templates/uap/themes/classic/classic.js











var classic_BigFancyAdClassicTheme = function (_BigFancyAdTheme) {
	inherits_default()(BigFancyAdClassicTheme, _BigFancyAdTheme);

	function BigFancyAdClassicTheme() {
		classCallCheck_default()(this, BigFancyAdClassicTheme);

		return possibleConstructorReturn_default()(this, (BigFancyAdClassicTheme.__proto__ || get_prototype_of_default()(BigFancyAdClassicTheme)).apply(this, arguments));
	}

	createClass_default()(BigFancyAdClassicTheme, [{
		key: 'onAdReady',
		value: function onAdReady(iframe) {
			get_default()(BigFancyAdClassicTheme.prototype.__proto__ || get_prototype_of_default()(BigFancyAdClassicTheme.prototype), 'onAdReady', this).call(this, iframe);

			if (universalAdPackage.isVideoEnabled(this.params)) {
				var videoSettings = new video_settings_VideoSettings(this.params);

				if (videoSettings.isSplitLayout()) {
					var theme = videoSettings.getParams().splitLayoutVideoPosition === 'right' ? 'theme-split-right' : 'theme-split-left';

					this.params.container.classList.add(theme);
				} else if (!videoSettings.isAutoPlay()) {
					document.body.classList.add('ctp-vuap-loaded');
				}
			}
		}
	}]);

	return BigFancyAdClassicTheme;
}(theme_BigFancyAdTheme);

var classic_BfaaTheme = function (_BigFancyAdClassicThe) {
	inherits_default()(BfaaTheme, _BigFancyAdClassicThe);

	function BfaaTheme() {
		classCallCheck_default()(this, BfaaTheme);

		return possibleConstructorReturn_default()(this, (BfaaTheme.__proto__ || get_prototype_of_default()(BfaaTheme)).apply(this, arguments));
	}

	createClass_default()(BfaaTheme, [{
		key: 'onVideoReady',
		value: function onVideoReady(video) {
			var _this3 = this;

			if (!this.params.splitLayoutVideoPosition) {
				video.addEventListener('wikiaAdStarted', function () {
					_this3.recalculatePaddingTop(_this3.params.videoAspectRatio);
				});

				video.addEventListener('wikiaAdCompleted', function () {
					_this3.recalculatePaddingTop(_this3.params.aspectRatio);
				});
			}
		}
	}, {
		key: 'recalculatePaddingTop',
		value: function recalculatePaddingTop(finalAspectRatio) {
			var _this4 = this;

			this.config.mainContainer.style.paddingTop = 100 / finalAspectRatio + '%';

			this.container.style.height = this.container.offsetHeight + 'px';
			// get offsetWidth from existing DOM element in order to force repaint
			this.container.style.height = this.container.offsetWidth / finalAspectRatio + 'px';

			setTimeout(function () {
				// clear height so ad is responsive again
				_this4.container.style.height = '';
			}, toggle_animation.duration);
		}
	}]);

	return BfaaTheme;
}(classic_BigFancyAdClassicTheme);

var classic_BfabTheme = function (_BigFancyAdClassicThe2) {
	inherits_default()(BfabTheme, _BigFancyAdClassicThe2);

	function BfabTheme() {
		classCallCheck_default()(this, BfabTheme);

		return possibleConstructorReturn_default()(this, (BfabTheme.__proto__ || get_prototype_of_default()(BfabTheme)).apply(this, arguments));
	}

	return BfabTheme;
}(classic_BigFancyAdClassicTheme);
// CONCATENATED MODULE: ./src/ad-products/templates/uap/themes/classic/ready.js





var adIsReady = function () {
	var _ref2 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee(_ref) {
		var adSlot = _ref.adSlot,
		    params = _ref.params,
		    videoSettings = _ref.videoSettings;
		return regenerator_default.a.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return resolvedState.setImage(videoSettings);

					case 2:
						return _context.abrupt('return', ad_engine_["slotTweaker"].makeResponsive(adSlot, params.aspectRatio));

					case 3:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function adIsReady(_x) {
		return _ref2.apply(this, arguments);
	};
}();
// CONCATENATED MODULE: ./src/ad-products/templates/uap/themes/classic/index.js


// EXTERNAL MODULE: external "lodash/toPlainObject"
var toPlainObject_ = __webpack_require__(21);
var toPlainObject_default = /*#__PURE__*/__webpack_require__.n(toPlainObject_);

// EXTERNAL MODULE: external "lodash/isUndefined"
var isUndefined_ = __webpack_require__(20);
var isUndefined_default = /*#__PURE__*/__webpack_require__.n(isUndefined_);

// EXTERNAL MODULE: external "lodash/mapValues"
var mapValues_ = __webpack_require__(14);
var mapValues_default = /*#__PURE__*/__webpack_require__.n(mapValues_);

// EXTERNAL MODULE: external "lodash/debounce"
var debounce_ = __webpack_require__(19);
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce_);

// CONCATENATED MODULE: ./src/ad-products/templates/interface/advertisement-label.js








var advertisement_label_AdvertisementLabel = function (_UiComponent) {
	inherits_default()(AdvertisementLabel, _UiComponent);

	function AdvertisementLabel() {
		classCallCheck_default()(this, AdvertisementLabel);

		return possibleConstructorReturn_default()(this, (AdvertisementLabel.__proto__ || get_prototype_of_default()(AdvertisementLabel)).apply(this, arguments));
	}

	createClass_default()(AdvertisementLabel, [{
		key: 'render',
		value: function render() {
			var label = document.createElement('div');

			label.innerText = getTranslation('labels', 'advertisement');
			label.className = 'advertisement-label';

			return label;
		}
	}]);

	return AdvertisementLabel;
}(ui_component_UiComponent);


// CONCATENATED MODULE: ./src/ad-products/templates/uap/themes/hivi/hivi-theme.js











var hivi_theme_BigFancyAdHiviTheme = function (_BigFancyAdTheme) {
	inherits_default()(BigFancyAdHiviTheme, _BigFancyAdTheme);

	function BigFancyAdHiviTheme() {
		classCallCheck_default()(this, BigFancyAdHiviTheme);

		return possibleConstructorReturn_default()(this, (BigFancyAdHiviTheme.__proto__ || get_prototype_of_default()(BigFancyAdHiviTheme)).apply(this, arguments));
	}

	createClass_default()(BigFancyAdHiviTheme, [{
		key: 'onAdReady',
		value: function onAdReady() {
			get_default()(BigFancyAdHiviTheme.prototype.__proto__ || get_prototype_of_default()(BigFancyAdHiviTheme.prototype), 'onAdReady', this).call(this);
			this.container.classList.add('theme-hivi');
			this.addAdvertisementLabel();
		}
	}, {
		key: 'addAdvertisementLabel',
		value: function addAdvertisementLabel() {
			var advertisementLabel = new advertisement_label_AdvertisementLabel();

			this.container.appendChild(advertisementLabel.render());
		}
	}, {
		key: 'addUnstickButton',
		value: function addUnstickButton() {
			var _this2 = this;

			var closeButton = new close_button_CloseButton({
				classNames: ['button-unstick'],
				onClick: function onClick() {
					return _this2.stickiness.close();
				}
			});

			this.container.appendChild(closeButton.render());
		}
	}, {
		key: 'addUnstickEvents',
		value: function addUnstickEvents() {
			var _this3 = this;

			this.stickiness.on(stickiness_Stickiness.STICKINESS_CHANGE_EVENT, function (isSticky) {
				return _this3.onStickinessChange(isSticky);
			});
			this.stickiness.on(stickiness_Stickiness.CLOSE_CLICKED_EVENT, this.onCloseClicked.bind(this));
			this.stickiness.on(stickiness_Stickiness.UNSTICK_IMMEDIATELY_EVENT, this.unstickImmediately.bind(this));
		}
	}]);

	return BigFancyAdHiviTheme;
}(theme_BigFancyAdTheme);
hivi_theme_BigFancyAdHiviTheme.DEFAULT_UNSTICK_DELAY = 3000;
// CONCATENATED MODULE: ./src/ad-products/templates/uap/themes/hivi/hivi-bfaa.js


























var HIVI_RESOLVED_THRESHOLD = 0.995;

var hivi_bfaa_BfaaTheme = function (_BigFancyAdHiviTheme) {
	inherits_default()(BfaaTheme, _BigFancyAdHiviTheme);

	function BfaaTheme(adSlot, params) {
		classCallCheck_default()(this, BfaaTheme);

		var _this = possibleConstructorReturn_default()(this, (BfaaTheme.__proto__ || get_prototype_of_default()(BfaaTheme)).call(this, adSlot, params));

		assign_default()(_this, toPlainObject_default()(new external_eventemitter3_default.a()));

		_this.stickiness = null;
		_this.scrollListener = null;
		_this.video = null;
		_this.isLocked = false;
		_this.onResolvedStateScroll = null;

		if (_this.params.isSticky && _this.config.stickinessAllowed) {
			_this.addStickinessPlugin();
		}

		if (!_this.config.defaultStateAllowed) {
			_this.params.resolvedStateForced = true;
		}
		return _this;
	}

	createClass_default()(BfaaTheme, [{
		key: 'addStickinessPlugin',
		value: function addStickinessPlugin() {
			this.addUnstickLogic();
			this.addUnstickButton();
			this.addUnstickEvents();
			this.stickiness.run();
		}
	}, {
		key: 'addUnstickLogic',
		value: function addUnstickLogic() {
			var _this2 = this;

			var _params = this.params,
			    stickyAdditionalTime = _params.stickyAdditionalTime,
			    stickyUntilVideoViewed = _params.stickyUntilVideoViewed;

			var whenResolvedAndVideoViewed = function () {
				var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
					return regenerator_default.a.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									_context.next = 2;
									return promise_default.a.all([ad_engine_["utils"].once(_this2, BfaaTheme.RESOLVED_STATE_EVENT), stickyUntilVideoViewed ? ad_engine_["utils"].once(_this2.adSlot, ad_engine_["AdSlot"].VIDEO_VIEWED_EVENT) : promise_default.a.resolve()]);

								case 2:
									_context.next = 4;
									return ad_engine_["utils"].wait(isUndefined_default()(stickyAdditionalTime) ? BfaaTheme.DEFAULT_UNSTICK_DELAY : stickyAdditionalTime);

								case 4:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, _this2);
				}));

				return function whenResolvedAndVideoViewed() {
					return _ref.apply(this, arguments);
				};
			}();

			this.stickiness = new stickiness_Stickiness(this.adSlot, whenResolvedAndVideoViewed());
		}
	}, {
		key: 'onAdReady',
		value: function onAdReady() {
			var _this3 = this;

			get_default()(BfaaTheme.prototype.__proto__ || get_prototype_of_default()(BfaaTheme.prototype), 'onAdReady', this).call(this);

			if (resolvedState.isResolvedState(this.params)) {
				this.setResolvedState(true);
			} else {
				resolvedStateSwitch.updateInformationAboutSeenDefaultStateAd();
				this.scrollListener = ad_engine_["scrollListener"].addCallback(function () {
					return _this3.updateAdSizes();
				});
				// Manually run update on scroll once
				this.updateAdSizes();
			}
		}
	}, {
		key: 'onVideoReady',
		value: function onVideoReady(video) {
			var _this4 = this;

			get_default()(BfaaTheme.prototype.__proto__ || get_prototype_of_default()(BfaaTheme.prototype), 'onVideoReady', this).call(this, video);

			this.video = video;
			video.addEventListener('wikiaAdStarted', function () {
				_this4.updateAdSizes();

				if (!video.params.autoPlay) {
					_this4.resetResolvedState();
				}
			});
			video.addEventListener('wikiaAdCompleted', function () {
				if (!_this4.isLocked) {
					_this4.setResolvedState(true);
				}
			});
			video.addEventListener('wikiaFullscreenChange', function () {
				if (video.isFullscreen()) {
					_this4.stickiness.blockRevertStickiness();
					_this4.container.classList.add('theme-video-fullscreen');
				} else {
					_this4.stickiness.unblockRevertStickiness();
					_this4.container.classList.remove('theme-video-fullscreen');
					_this4.updateAdSizes();
				}
			});
		}
	}, {
		key: 'onStickinessChange',
		value: function () {
			var _ref2 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee2(isSticky) {
				var stickinessBeforeCallback, stickinessAfterCallback;
				return regenerator_default.a.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								stickinessBeforeCallback = isSticky ? this.config.onBeforeStickBfaaCallback : this.config.onBeforeUnstickBfaaCallback;
								stickinessAfterCallback = isSticky ? this.config.onAfterStickBfaaCallback : this.config.onAfterUnstickBfaaCallback;


								stickinessBeforeCallback.call(this.config, this.adSlot, this.params);

								if (isSticky) {
									_context2.next = 11;
									break;
								}

								this.config.moveNavbar(0, SLIDE_OUT_TIME);
								_context2.next = 7;
								return animate(this.adSlot.getElement(), CSS_CLASSNAME_SLIDE_OUT_ANIMATION, SLIDE_OUT_TIME);

							case 7:
								this.adSlot.getElement().classList.remove(CSS_CLASSNAME_STICKY_BFAA);
								animate(this.adSlot.getElement(), CSS_CLASSNAME_FADE_IN_ANIMATION, FADE_IN_TIME);
								_context2.next = 12;
								break;

							case 11:
								this.adSlot.getElement().classList.add(CSS_CLASSNAME_STICKY_BFAA);

							case 12:

								stickinessAfterCallback.call(this.config, this.adSlot, this.params);

							case 13:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function onStickinessChange(_x) {
				return _ref2.apply(this, arguments);
			}

			return onStickinessChange;
		}()
	}, {
		key: 'onCloseClicked',
		value: function onCloseClicked() {
			this.unstickImmediately();

			this.config.mainContainer.style.paddingTop = '0';

			this.adSlot.disable();
			this.adSlot.collapse();
		}
	}, {
		key: 'unstickImmediately',
		value: function unstickImmediately() {
			var stopVideo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			ad_engine_["scrollListener"].removeCallback(this.scrollListener);
			this.adSlot.getElement().classList.remove(CSS_CLASSNAME_STICKY_BFAA);

			if (stopVideo && this.video && this.video.ima.getAdsManager()) {
				this.video.stop();
			}

			this.config.moveNavbar(0, 0);
			this.stickiness.sticky = false;
		}
	}, {
		key: 'updateAdSizes',
		value: function updateAdSizes() {
			var _params$config = this.params.config,
			    aspectRatio = _params$config.aspectRatio,
			    state = _params$config.state;
			var currentWidth = this.config.mainContainer.offsetWidth;

			var isResolved = this.container.classList.contains('theme-resolved');
			var maxHeight = currentWidth / aspectRatio.default;
			var minHeight = currentWidth / aspectRatio.resolved;
			var scrollY = window.scrollY || window.pageYOffset || 0;
			var aspectScroll = this.isLocked ? minHeight : Math.max(minHeight, maxHeight - scrollY);
			var currentAspectRatio = currentWidth / aspectScroll;
			var aspectRatioDiff = aspectRatio.default - aspectRatio.resolved;
			var currentDiff = aspectRatio.default - currentAspectRatio;
			var currentState = 1 - (aspectRatioDiff - currentDiff) / aspectRatioDiff;
			var heightDiff = state.height.default - state.height.resolved;
			var heightFactor = (state.height.default - heightDiff * currentState) / 100;
			var relativeHeight = aspectScroll * heightFactor;

			this.adjustVideoSize(relativeHeight);

			if (this.params.thumbnail) {
				this.setThumbnailStyle(currentState);
			}

			if (currentState >= HIVI_RESOLVED_THRESHOLD && !isResolved) {
				this.setResolvedState();
			} else if (currentState < HIVI_RESOLVED_THRESHOLD && isResolved) {
				this.container.style.top = '';
				this.switchImagesInAd(false);
			}

			return ad_engine_["slotTweaker"].makeResponsive(this.adSlot, currentAspectRatio);
		}
	}, {
		key: 'adjustVideoSize',
		value: function adjustVideoSize(relativeHeight) {
			if (this.video && !this.video.isFullscreen()) {
				this.video.container.style.width = this.params.videoAspectRatio * relativeHeight + 'px';
			}
		}
	}, {
		key: 'setThumbnailStyle',
		value: function setThumbnailStyle(state) {
			var style = mapValues_default()(this.params.config.state, function (styleProperty) {
				var diff = styleProperty.default - styleProperty.resolved;
				return styleProperty.default - diff * state + '%';
			});

			assign_default()(this.params.thumbnail.style, style);

			if (this.video) {
				assign_default()(this.video.container.style, style);

				if (this.video.isFullscreen()) {
					this.video.container.style.height = '100%';
				}
			}
		}
	}, {
		key: 'switchImagesInAd',
		value: function switchImagesInAd(isResolved) {
			if (isResolved) {
				this.container.classList.add('theme-resolved');
				this.params.image2.element.classList.remove('hidden-state');
			} else {
				this.container.classList.remove('theme-resolved');
				this.params.image2.element.classList.add('hidden-state');
			}
		}
	}, {
		key: 'lock',
		value: function lock() {
			var offset = this.getHeightDifferenceBetweenStates();

			this.isLocked = true;
			this.container.classList.add('theme-locked');
			ad_engine_["scrollListener"].removeCallback(this.scrollListener);
			this.adjustSizesToResolved(offset);
			this.emit(BfaaTheme.RESOLVED_STATE_EVENT);
		}
	}, {
		key: 'unlock',
		value: function unlock() {
			var _this5 = this;

			this.isLocked = false;
			this.container.classList.remove('theme-locked');
			this.scrollListener = ad_engine_["scrollListener"].addCallback(function () {
				return _this5.updateAdSizes();
			});
		}
	}, {
		key: 'setResolvedState',
		value: function setResolvedState(immediately) {
			var _this6 = this;

			var isSticky = this.stickiness && this.stickiness.isSticky();
			var width = this.container.offsetWidth;
			var aspectRatio = this.params.config.aspectRatio;

			var resolvedHeight = width / aspectRatio.resolved;
			var offset = this.getHeightDifferenceBetweenStates();

			if (isSticky) {
				this.config.moveNavbar(resolvedHeight, SLIDE_OUT_TIME);
			} else {
				this.container.style.top = Math.min(window.scrollY, offset) + 'px';
			}

			this.switchImagesInAd(true);

			if (this.onResolvedStateScroll) {
				window.removeEventListener('scroll', this.onResolvedStateScroll);
				this.onResolvedStateScroll.cancel();
			}

			return new promise_default.a(function (resolve) {
				if (immediately) {
					_this6.lock();
					resolve();
				} else {
					_this6.onResolvedStateScroll = debounce_default()(function () {
						if (window.scrollY < offset) {
							return;
						}

						window.removeEventListener('scroll', _this6.onResolvedStateScroll);
						_this6.onResolvedStateScroll = null;
						_this6.lock();
						resolve();
					}, 50);
					window.addEventListener('scroll', _this6.onResolvedStateScroll);
					_this6.onResolvedStateScroll();
				}
			});
		}
	}, {
		key: 'resetResolvedState',
		value: function resetResolvedState() {
			var offset = this.getHeightDifferenceBetweenStates();

			if (this.isLocked && this.config.defaultStateAllowed && window.scrollY < offset) {
				var aspectRatio = this.params.config.aspectRatio.default;

				this.container.style.top = '';
				this.config.mainContainer.style.paddingTop = 100 / aspectRatio + '%';

				if (this.params.isSticky && this.config.stickinessAllowed) {
					this.unstickImmediately(false);
				}

				this.unlock();
				this.switchImagesInAd(false);
				this.setResolvedState(false);
				this.updateAdSizes();
			}
		}
	}, {
		key: 'getHeightDifferenceBetweenStates',
		value: function getHeightDifferenceBetweenStates() {
			var width = this.container.offsetWidth;
			var aspectRatio = this.params.config.aspectRatio;


			return Math.round(width / aspectRatio.default - width / aspectRatio.resolved);
		}
	}, {
		key: 'adjustSizesToResolved',
		value: function adjustSizesToResolved(offset) {
			if (this.adSlot.isEnabled()) {
				var aspectRatio = this.params.config.aspectRatio.resolved;

				this.container.style.top = '';
				this.config.mainContainer.style.paddingTop = 100 / aspectRatio + '%';
				ad_engine_["slotTweaker"].makeResponsive(this.adSlot, aspectRatio);
				window.scrollBy(0, -Math.min(offset, window.scrollY));
				this.updateAdSizes();
			}
		}
	}]);

	return BfaaTheme;
}(hivi_theme_BigFancyAdHiviTheme);
hivi_bfaa_BfaaTheme.RESOLVED_STATE_EVENT = symbol_default()('RESOLVED_STATE_EVENT');
// CONCATENATED MODULE: ./src/ad-products/templates/uap/themes/hivi/hivi-bfab.js





















var hivi_bfab_BfabTheme = function (_BigFancyAdHiviTheme) {
	inherits_default()(BfabTheme, _BigFancyAdHiviTheme);

	function BfabTheme(adSlot, params) {
		classCallCheck_default()(this, BfabTheme);

		var _this = possibleConstructorReturn_default()(this, (BfabTheme.__proto__ || get_prototype_of_default()(BfabTheme)).call(this, adSlot, params));

		_this.stickiness = null;
		_this.video = null;
		_this.isLocked = false;
		_this.config = ad_engine_["context"].get('templates.bfab');
		return _this;
	}

	createClass_default()(BfabTheme, [{
		key: 'onAdReady',
		value: function onAdReady() {
			get_default()(BfabTheme.prototype.__proto__ || get_prototype_of_default()(BfabTheme.prototype), 'onAdReady', this).call(this);

			if (this.params.isSticky && this.config.stickinessAllowed) {
				this.addStickinessPlugin();
			}

			if (!this.config.defaultStateAllowed) {
				this.params.resolvedStateForced = true;
			}

			if (resolvedState.isResolvedState(this.params)) {
				this.setResolvedState();
			} else {
				resolvedStateSwitch.updateInformationAboutSeenDefaultStateAd();
				this.updateAdSizes();
				ad_engine_["slotTweaker"].makeResponsive(this.adSlot, this.params.config.aspectRatio.default);
			}
		}
	}, {
		key: 'onVideoReady',
		value: function onVideoReady(video) {
			var _this2 = this;

			get_default()(BfabTheme.prototype.__proto__ || get_prototype_of_default()(BfabTheme.prototype), 'onVideoReady', this).call(this, video);

			this.video = video;
			video.addEventListener('wikiaAdStarted', function () {
				return _this2.updateAdSizes();
			});
			video.addEventListener('wikiaAdCompleted', function () {
				return _this2.setResolvedState();
			});
			video.addEventListener('wikiaFullscreenChange', function () {
				if (video.isFullscreen()) {
					_this2.stickiness.blockRevertStickiness();
					_this2.container.classList.add('theme-video-fullscreen');
				} else {
					_this2.stickiness.unblockRevertStickiness();
					_this2.container.classList.remove('theme-video-fullscreen');
					_this2.updateAdSizes();
				}
			});
		}
	}, {
		key: 'updateAdSizes',
		value: function updateAdSizes() {
			var state = resolvedState.isResolvedState(this.params) ? 'resolved' : 'default';
			var stateHeight = this.params.config.state.height[state];
			var relativeHeight = this.params.container.offsetHeight * (stateHeight / 100);

			this.adjustVideoSize(relativeHeight);

			if (this.params.thumbnail) {
				this.setThumbnailStyle(state);
			}
		}
	}, {
		key: 'adjustVideoSize',
		value: function adjustVideoSize(relativeHeight) {
			if (this.video && !this.video.isFullscreen()) {
				this.video.container.style.width = this.params.videoAspectRatio * relativeHeight + 'px';
			}
		}
	}, {
		key: 'setResolvedState',
		value: function () {
			var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
				var _params, config, image2;

				return regenerator_default.a.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_params = this.params, config = _params.config, image2 = _params.image2;


								this.container.classList.add('theme-resolved');
								image2.element.classList.remove('hidden-state');
								_context.next = 5;
								return ad_engine_["slotTweaker"].makeResponsive(this.adSlot, config.aspectRatio.resolved);

							case 5:

								if (this.params.thumbnail) {
									this.setThumbnailStyle('resolved');
								}

							case 6:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function setResolvedState() {
				return _ref.apply(this, arguments);
			}

			return setResolvedState;
		}()
	}, {
		key: 'setThumbnailStyle',
		value: function setThumbnailStyle() {
			var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
			var thumbnail = this.params.thumbnail;

			var style = mapValues_default()(this.params.config.state, function (styleProperty) {
				return styleProperty[state] + '%';
			});

			assign_default()(thumbnail.style, style);

			if (this.video) {
				assign_default()(this.video.container.style, style);
			}
		}
	}, {
		key: 'waitForScrollAndUnstickedBfaa',
		value: function waitForScrollAndUnstickedBfaa() {
			var _this3 = this;

			var resolvePromise = null;

			var promise = new promise_default.a(function (resolve) {
				resolvePromise = resolve;
			});
			var bfaa = ad_engine_["slotService"].get(this.config.bfaaSlotName);

			ad_engine_["scrollListener"].addCallback(function (event, id) {
				if (_this3.adSlot.isViewed()) {
					ad_engine_["scrollListener"].removeCallback(id);
					return;
				}

				var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop,
				    slotPosition = ad_engine_["utils"].getTopOffset(_this3.adSlot.getElement()),
				    isBfaaSticky = bfaa.getElement().classList.contains('sticky-bfaa'),
				    bfaaHeight = bfaa.getElement().offsetHeight;

				if (isBfaaSticky && scrollPosition >= slotPosition - _this3.config.topThreshold - bfaaHeight) {
					ad_engine_["scrollListener"].removeCallback(id);
					_this3.adSlot.setStatus('viewport-conflict');
				} else if (scrollPosition >= slotPosition - _this3.config.topThreshold && !isBfaaSticky) {
					ad_engine_["scrollListener"].removeCallback(id);
					resolvePromise();
				}
			});

			return promise;
		}
	}, {
		key: 'addStickinessPlugin',
		value: function () {
			var _ref2 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
				var _this4 = this;

				return regenerator_default.a.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return this.waitForScrollAndUnstickedBfaa();

							case 2:

								if (!this.adSlot.isViewed()) {
									this.addUnstickLogic();
									this.addUnstickButton();
									this.addUnstickEvents();
									this.stickiness.run();

									ad_engine_["scrollListener"].addCallback(function (event, id) {
										var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

										if (scrollPosition <= _this4.config.unstickInstantlyBelowPosition) {
											_this4.adSlot.setStatus('top-conflict');
											ad_engine_["scrollListener"].removeCallback(id);
											_this4.stickiness.revertStickiness();
										}
									});
								}

							case 3:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function addStickinessPlugin() {
				return _ref2.apply(this, arguments);
			}

			return addStickinessPlugin;
		}()
	}, {
		key: 'addUnstickLogic',
		value: function addUnstickLogic() {
			var _this5 = this;

			var whenResolvedAndVideoViewed = function () {
				var _ref3 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee3() {
					return regenerator_default.a.wrap(function _callee3$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									_context3.next = 2;
									return ad_engine_["utils"].wait(BfabTheme.DEFAULT_UNSTICK_DELAY);

								case 2:
								case 'end':
									return _context3.stop();
							}
						}
					}, _callee3, _this5);
				}));

				return function whenResolvedAndVideoViewed() {
					return _ref3.apply(this, arguments);
				};
			}();

			this.stickiness = new stickiness_Stickiness(this.adSlot, whenResolvedAndVideoViewed());
		}
	}, {
		key: 'onStickinessChange',
		value: function () {
			var _ref4 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee4(isSticky) {
				var element;
				return regenerator_default.a.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								element = this.adSlot.getElement();

								if (isSticky) {
									_context4.next = 12;
									break;
								}

								if (!(this.adSlot.getStatus() !== 'top-conflict')) {
									_context4.next = 5;
									break;
								}

								_context4.next = 5;
								return animate(this.adSlot.getElement(), CSS_CLASSNAME_SLIDE_OUT_ANIMATION, SLIDE_OUT_TIME);

							case 5:
								this.adSlot.setStatus(ad_engine_["AdSlot"].SLOT_UNSTICKED_STATE);
								element.style.top = null;
								element.parentNode.style.height = null;
								element.classList.remove(CSS_CLASSNAME_STICKY_BFAB);
								animate(this.adSlot.getElement(), CSS_CLASSNAME_FADE_IN_ANIMATION, FADE_IN_TIME);
								_context4.next = 16;
								break;

							case 12:
								this.adSlot.setStatus(ad_engine_["AdSlot"].SLOT_STICKED_STATE);
								element.parentNode.style.height = element.offsetHeight + 'px';
								element.classList.add(CSS_CLASSNAME_STICKY_BFAB);
								element.style.top = this.config.topThreshold + 'px';

							case 16:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function onStickinessChange(_x2) {
				return _ref4.apply(this, arguments);
			}

			return onStickinessChange;
		}()
	}, {
		key: 'onCloseClicked',
		value: function onCloseClicked() {
			this.unstickImmediately();

			this.adSlot.getElement().parentNode.style.height = null;
			this.adSlot.disable();
			this.adSlot.collapse();
		}
	}, {
		key: 'unstickImmediately',
		value: function unstickImmediately() {
			var stopVideo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			if (this.stickiness) {
				this.adSlot.getElement().classList.remove(CSS_CLASSNAME_STICKY_BFAB);

				if (stopVideo && this.video && this.video.ima.getAdsManager()) {
					this.video.stop();
				}

				this.stickiness.sticky = false;
			}
		}
	}]);

	return BfabTheme;
}(hivi_theme_BigFancyAdHiviTheme);
// CONCATENATED MODULE: ./src/ad-products/templates/uap/themes/hivi/ready.js


function ready_adIsReady(_ref) {
	var adSlot = _ref.adSlot,
	    params = _ref.params;

	return ad_engine_["slotTweaker"].makeResponsive(adSlot, params.aspectRatio);
}
// CONCATENATED MODULE: ./src/ad-products/templates/uap/themes/hivi/index.js



// CONCATENATED MODULE: ./src/ad-products/templates/uap/big-fancy-ad-above.js











var big_fancy_ad_above_BigFancyAdAbove = function () {
	createClass_default()(BigFancyAdAbove, null, [{
		key: 'getName',
		value: function getName() {
			return 'bfaa';
		}
	}, {
		key: 'getDefaultConfig',
		value: function getDefaultConfig() {
			return {
				desktopNavbarWrapperSelector: '.wds-global-navigation-wrapper',
				mobileNavbarWrapperSelector: '.global-navigation-mobile-wrapper',
				mainContainer: document.body,
				handleNavbar: false,
				autoPlayAllowed: true,
				defaultStateAllowed: true,
				fullscreenAllowed: true,
				stickinessAllowed: true,
				slotSibling: '.topic-header',
				slotsToEnable: ['bottom_leaderboard', 'incontent_boxad', 'top_boxad'],
				onInit: function onInit() {},
				onBeforeStickBfaaCallback: function onBeforeStickBfaaCallback() {},
				onAfterStickBfaaCallback: function onAfterStickBfaaCallback() {},
				onBeforeUnstickBfaaCallback: function onBeforeUnstickBfaaCallback() {},
				onAfterUnstickBfaaCallback: function onAfterUnstickBfaaCallback() {},
				moveNavbar: function moveNavbar(offset) {
					var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SLIDE_OUT_TIME;

					var navbarElement = document.querySelector('body > nav.navigation');

					if (navbarElement) {
						navbarElement.style.transition = offset ? '' : 'top ' + time + 'ms ' + universalAdPackage.CSS_TIMING_EASE_IN_CUBIC;
						navbarElement.style.top = offset ? offset + 'px' : '';
					}
				}
			};
		}

		/**
   * Constructor
   *
   * @param {object} adSlot
   */

	}]);

	function BigFancyAdAbove(adSlot) {
		classCallCheck_default()(this, BigFancyAdAbove);

		this.adSlot = adSlot;
		this.config = ad_engine_["context"].get('templates.bfaa');
		this.container = document.getElementById(this.adSlot.getSlotName());
		this.videoSettings = null;
		this.theme = null;
	}

	/**
  * Initializes the BFAA unit
  */


	createClass_default()(BigFancyAdAbove, [{
		key: 'init',
		value: function init(params) {
			var _this = this;

			this.params = params;

			if (!this.container) {
				return;
			}

			// TODO Remove this hack when all mobile apps support autoplay and fullscreen
			if (!this.config.autoPlayAllowed) {
				this.params.autoPlay = false;
				this.params.resolvedStateAutoPlay = false;
			}
			this.params.fullscreenAllowed = this.config.fullscreenAllowed;
			// TODO: End of hack

			var uapTheme = this.params.theme === 'hivi' ? hivi_namespaceObject : themes_classic_namespaceObject;

			universalAdPackage.init(this.params, this.config.slotsToEnable);
			this.videoSettings = new video_settings_VideoSettings(this.params);
			this.container.style.backgroundColor = this.getBackgroundColor();
			this.container.classList.add('bfaa-template');
			this.theme = new uapTheme.BfaaTheme(this.adSlot, this.params);

			uapTheme.adIsReady({
				adSlot: this.adSlot,
				videoSettings: this.videoSettings,
				params: this.params
			}).then(function (iframe) {
				return _this.onAdReady(iframe);
			});

			this.config.onInit(this.adSlot, this.params, this.config);
		}
	}, {
		key: 'setupNavbar',
		value: function setupNavbar() {
			var desktopNavbarWrapper = document.querySelector(this.config.desktopNavbarWrapperSelector);
			var mobileNavbarWrapper = document.querySelector(this.config.mobileNavbarWrapperSelector);
			var slotParent = this.container.parentNode;
			var sibling = document.querySelector(this.config.slotSibling) || this.container.nextElementSibling;

			if (mobileNavbarWrapper) {
				slotParent.insertBefore(mobileNavbarWrapper, sibling);
			}

			if (desktopNavbarWrapper) {
				slotParent.insertBefore(desktopNavbarWrapper, sibling);
			}
		}
	}, {
		key: 'getBackgroundColor',
		value: function getBackgroundColor() {
			var color = '#' + this.params.backgroundColor.replace('#', '');

			return this.params.backgroundColor ? color : '#000';
		}
	}, {
		key: 'onAdReady',
		value: function () {
			var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee(iframe) {
				var video;
				return regenerator_default.a.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								this.config.mainContainer.style.paddingTop = iframe.parentElement.style.paddingBottom;
								this.config.mainContainer.classList.add('has-bfaa');

								if (this.config.handleNavbar) {
									this.setupNavbar();
								}

								if (!document.hidden) {
									_context.next = 6;
									break;
								}

								_context.next = 6;
								return ad_engine_["utils"].once(window, 'visibilitychange');

							case 6:

								this.theme.onAdReady(iframe);

								if (!universalAdPackage.isVideoEnabled(this.params)) {
									_context.next = 14;
									break;
								}

								_context.next = 10;
								return ad_engine_["utils"].defer(universalAdPackage.loadVideoAd, this.videoSettings);

							case 10:
								video = _context.sent;
								// defers for proper rendering

								this.theme.onVideoReady(video);
								_context.next = 17;
								break;

							case 14:
								if (!this.params.channelName) {
									_context.next = 17;
									break;
								}

								_context.next = 17;
								return ad_engine_["utils"].defer(universalAdPackage.loadTwitchAd, iframe, this.params);

							case 17:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function onAdReady(_x2) {
				return _ref.apply(this, arguments);
			}

			return onAdReady;
		}()
	}]);

	return BigFancyAdAbove;
}();
// CONCATENATED MODULE: ./src/ad-products/templates/uap/big-fancy-ad-below.js











var big_fancy_ad_below_BigFancyAdBelow = function () {
	createClass_default()(BigFancyAdBelow, null, [{
		key: 'getName',
		value: function getName() {
			return 'bfab';
		}
	}, {
		key: 'getDefaultConfig',
		value: function getDefaultConfig() {
			return {
				autoPlayAllowed: true,
				defaultStateAllowed: true,
				fullscreenAllowed: true,
				stickinessAllowed: false,
				bfaaSlotName: 'top_leaderboard',
				unstickInstantlyBelowPosition: 500,
				topThreshold: 58,
				onInit: function onInit() {}
			};
		}

		/**
   * Constructor
   *
   * @param {object} adSlot
   */

	}]);

	function BigFancyAdBelow(adSlot) {
		classCallCheck_default()(this, BigFancyAdBelow);

		this.adSlot = adSlot;
		this.config = ad_engine_["context"].get('templates.bfab');
		this.container = document.getElementById(this.adSlot.getSlotName());
		this.theme = null;
		this.videoSettings = null;
	}

	/**
  * Initializes the BFAB unit
  */


	createClass_default()(BigFancyAdBelow, [{
		key: 'init',
		value: function init(params) {
			var _this = this;

			this.params = params;

			if (!this.container) {
				return;
			}

			// TODO Remove this hack when all mobile apps support autoplay and fullscreen
			if (!this.config.autoPlayAllowed) {
				this.params.autoPlay = false;
				this.params.resolvedStateAutoPlay = false;
			}
			this.params.fullscreenAllowed = this.config.fullscreenAllowed;
			// TODO: End of hack

			var uapTheme = this.params.theme === 'hivi' ? hivi_namespaceObject : themes_classic_namespaceObject;

			universalAdPackage.initSlot(params);

			this.container.classList.add('bfab-template');
			this.videoSettings = new video_settings_VideoSettings(params);
			this.theme = new uapTheme.BfabTheme(this.adSlot, this.params);

			uapTheme.adIsReady({
				adSlot: this.adSlot,
				videoSettings: this.videoSettings,
				params: this.params
			}).then(function (iframe) {
				return _this.onAdReady(iframe);
			});

			this.config.onInit(this.adSlot, this.params, this.config);
		}
	}, {
		key: 'onAdReady',
		value: function () {
			var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee(iframe) {
				var video;
				return regenerator_default.a.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (!document.hidden) {
									_context.next = 3;
									break;
								}

								_context.next = 3;
								return ad_engine_["utils"].once(window, 'visibilitychange');

							case 3:

								this.theme.onAdReady(iframe);

								if (!universalAdPackage.isVideoEnabled(this.params)) {
									_context.next = 9;
									break;
								}

								_context.next = 7;
								return ad_engine_["utils"].defer(universalAdPackage.loadVideoAd, this.videoSettings);

							case 7:
								video = _context.sent;


								this.theme.onVideoReady(video);

							case 9:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function onAdReady(_x) {
				return _ref.apply(this, arguments);
			}

			return onAdReady;
		}()
	}]);

	return BigFancyAdBelow;
}();
// CONCATENATED MODULE: ./src/ad-products/templates/uap/big-fancy-ad-in-player.js






var big_fancy_ad_in_player_BigFancyAdInPlayer = function () {
	createClass_default()(BigFancyAdInPlayer, null, [{
		key: 'getName',
		value: function getName() {
			return 'bfp';
		}
	}, {
		key: 'getDefaultConfig',
		value: function getDefaultConfig() {
			return {
				slotsToDisable: [],
				slotsToEnable: []
			};
		}
	}]);

	function BigFancyAdInPlayer() {
		classCallCheck_default()(this, BigFancyAdInPlayer);

		this.config = ad_engine_["context"].get('templates.bfp');
	}

	/**
  * Initializes the BFP unit
  */


	createClass_default()(BigFancyAdInPlayer, [{
		key: 'init',
		value: function init(params) {
			this.params = params;

			universalAdPackage.init(this.params, this.config.slotsToEnable, this.config.slotsToDisable);
		}
	}]);

	return BigFancyAdInPlayer;
}();
// CONCATENATED MODULE: ./src/ad-products/templates/uap/roadblock.js






var roadblock_Roadblock = function () {
	createClass_default()(Roadblock, null, [{
		key: 'getName',
		value: function getName() {
			return 'roadblock';
		}
	}, {
		key: 'getDefaultConfig',
		value: function getDefaultConfig() {
			return {
				slotsToEnable: [],
				slotsToDisable: [],
				onInit: function onInit() {}
			};
		}
	}]);

	function Roadblock() {
		classCallCheck_default()(this, Roadblock);

		this.config = ad_engine_["context"].get('templates.roadblock');
	}

	/**
  * Initializes the Roadblock unit
  */


	createClass_default()(Roadblock, [{
		key: 'init',
		value: function init(params) {
			this.params = params;
			this.params.adProduct = 'ruap';
			universalAdPackage.init(this.params, this.config.slotsToEnable, this.config.slotsToDisable);

			if (this.config.onInit) {
				this.config.onInit();
			}
		}
	}]);

	return Roadblock;
}();
// CONCATENATED MODULE: ./src/ad-products/templates/uap/index.js







// CONCATENATED MODULE: ./src/ad-products/templates/out-of-page/floor-adhesion.js





var floor_adhesion_FloorAdhesion = function () {
	function FloorAdhesion(adSlot) {
		classCallCheck_default()(this, FloorAdhesion);

		this.adSlot = adSlot;
		this.config = ad_engine_["context"].get('templates.floorAdhesion');
	}

	createClass_default()(FloorAdhesion, [{
		key: 'init',
		value: function init() {
			var _this = this;

			var wrapper = this.adSlot.getElement();
			var closeButton = new close_button_CloseButton({
				onClick: function onClick() {
					ad_engine_["slotTweaker"].hide(_this.adSlot);
					ad_engine_["utils"].logger(FloorAdhesion.getName(), 'closed');
				}
			});

			this.config.onInit();

			wrapper.appendChild(closeButton.render());
			wrapper.classList.add('floor-adhesion');
			wrapper.classList.add('out-of-page-template');

			ad_engine_["slotTweaker"].adjustIframeByContentSize(this.adSlot);

			ad_engine_["utils"].logger(FloorAdhesion.getName(), 'init');
		}
	}], [{
		key: 'getName',
		value: function getName() {
			return 'floorAdhesion';
		}
	}, {
		key: 'getDefaultConfig',
		value: function getDefaultConfig() {
			return {
				onInit: function onInit() {}
			};
		}
	}]);

	return FloorAdhesion;
}();
// CONCATENATED MODULE: ./src/ad-products/templates/out-of-page/interstitial.js






var interstitial_Interstitial = function () {
	function Interstitial(adSlot) {
		classCallCheck_default()(this, Interstitial);

		this.adSlot = adSlot;
		this.config = ad_engine_["context"].get('templates.interstitial');
	}

	createClass_default()(Interstitial, [{
		key: 'init',
		value: function init() {
			var _this = this;

			var wrapper = this.adSlot.getElement();
			var closeButton = new close_button_CloseButton({
				onClick: function onClick() {
					document.documentElement.classList.remove('stop-scrolling');
					ad_engine_["slotTweaker"].hide(_this.adSlot);
					ad_engine_["utils"].logger(Interstitial.getName(), 'closed');
				}
			});
			var label = new advertisement_label_AdvertisementLabel();

			this.config.onInit();

			wrapper.appendChild(closeButton.render());
			wrapper.appendChild(label.render());
			wrapper.classList.add('interstitial');
			wrapper.classList.add('out-of-page-template');
			document.documentElement.classList.add('stop-scrolling');

			ad_engine_["slotTweaker"].adjustIframeByContentSize(this.adSlot);

			ad_engine_["utils"].logger(Interstitial.getName(), 'init');

			ad_engine_["events"].once(ad_engine_["events"].BEFORE_PAGE_CHANGE_EVENT, function () {
				document.documentElement.classList.remove('stop-scrolling');
			});
		}
	}], [{
		key: 'getName',
		value: function getName() {
			return 'interstitial';
		}
	}, {
		key: 'getDefaultConfig',
		value: function getDefaultConfig() {
			return {
				onInit: function onInit() {}
			};
		}
	}]);

	return Interstitial;
}();
// CONCATENATED MODULE: ./src/ad-products/templates/out-of-page/index.js


// CONCATENATED MODULE: ./src/ad-products/templates/outstream/index.js

// CONCATENATED MODULE: ./src/ad-products/templates/index.js






// CONCATENATED MODULE: ./src/ad-products/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "getAdProductInfo", function() { return getAdProductInfo; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "FloatingRail", function() { return floating_rail_FloatingRail; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Skin", function() { return skin_Skin; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "StickyAd", function() { return sticky_ad_StickyAd; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "resolvedState", function() { return resolvedState; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "BigFancyAdAbove", function() { return big_fancy_ad_above_BigFancyAdAbove; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "BigFancyAdBelow", function() { return big_fancy_ad_below_BigFancyAdBelow; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "BigFancyAdInPlayer", function() { return big_fancy_ad_in_player_BigFancyAdInPlayer; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Roadblock", function() { return roadblock_Roadblock; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "universalAdPackage", function() { return universalAdPackage; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "FloorAdhesion", function() { return floor_adhesion_FloorAdhesion; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Interstitial", function() { return interstitial_Interstitial; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DEFAULT_VIDEO_ASPECT_RATIO", function() { return DEFAULT_VIDEO_ASPECT_RATIO; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "IMA_VPAID_INSECURE_MODE", function() { return IMA_VPAID_INSECURE_MODE; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PorvataTemplate", function() { return porvata_template_PorvataTemplate; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "utils", function() { return utils_namespaceObject; });







/***/ }),
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=ad-products.js.map
import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import { context, utils } from '@wikia/ad-engine';
/**
 * @abstract
 */

export var BaseBidder =
/*#__PURE__*/
function () {
  function BaseBidder(name, bidderConfig) {
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2000;

    _classCallCheck(this, BaseBidder);

    this.name = name;
    this.logGroup = "".concat(name, "-bidder");
    this.bidderConfig = bidderConfig;
    this.timeout = timeout;
    this.utils = utils;
    this.context = context;
    this.resetState();
    this.utils.logger(this.logGroup, 'created');
  }

  _createClass(BaseBidder, [{
    key: "resetState",
    value: function resetState() {
      var _this = this;

      this.called = false;
      this.response = false;
      this.onResponseCallbacks = new utils.LazyQueue();
      this.onResponseCallbacks.onItemFlush(function (callback) {
        callback(_this.name);
      });
    }
  }, {
    key: "call",
    value: function call() {
      var _this2 = this;

      this.response = false;
      this.called = true;
      this.callBids(function () {
        return _this2.onBidResponse();
      });
      this.utils.logger(this.logGroup, 'called');
    }
    /**
     * @protected
     */

  }, {
    key: "onBidResponse",
    value: function onBidResponse() {
      this.response = true;
      this.calculatePrices();
      this.onResponseCallbacks.flush();
      this.utils.logger(this.logGroup, 'respond');
    }
    /**
     * Returns bidder slot alias if available, otherwise slot name
     * @protected
     * @param {string} slotName
     * @returns {string}
     */

  }, {
    key: "getSlotAlias",
    value: function getSlotAlias(slotName) {
      return context.get("slots.".concat(slotName, ".bidderAlias")) || slotName;
    }
    /**
     * @param {string} slotName
     * @returns {{}}
     */

  }, {
    key: "getSlotBestPrice",
    value: function getSlotBestPrice(slotName) {
      return this.getBestPrice(slotName);
    }
    /**
     * @param {string} slotName
     * @returns {{}}
     */

  }, {
    key: "getSlotTargetingParams",
    value: function getSlotTargetingParams(slotName) {
      if (!this.called || !this.isSlotSupported(slotName)) {
        return {};
      }

      return this.getTargetingParams(slotName);
    }
    /**
     * @param {string} slotName
     * @returns {boolean}
     */

  }, {
    key: "isSlotSupported",
    value: function isSlotSupported(slotName) {
      return this.isSupported(slotName);
    }
    /**
     * Fires the Promise if bidder replied or timeout is reached
     * @returns {Promise}
     */

  }, {
    key: "waitForResponse",
    value: function waitForResponse() {
      var _this3 = this;

      return this.utils.createWithTimeout(function (resolve) {
        if (_this3.hasResponse()) {
          resolve();
        } else {
          _this3.addResponseListener(resolve);
        }
      }, this.timeout);
    }
    /**
     * @returns {boolean}
     */

  }, {
    key: "hasResponse",
    value: function hasResponse() {
      return this.response;
    }
  }, {
    key: "addResponseListener",
    value: function addResponseListener(callback) {
      this.onResponseCallbacks.push(callback);
    }
    /**
     * Check if bidder was called
     * @returns {boolean}
     */

  }, {
    key: "wasCalled",
    value: function wasCalled() {
      return this.called;
    }
    /**
     * @abstract
     * @protected
     */

  }, {
    key: "callBids",
    value: function callBids(cb) {
      throw new utils.NotImplementedException({
        cb: cb
      });
    }
    /**
     * @abstract
     * @protected
     */

  }, {
    key: "calculatePrices",
    value: function calculatePrices() {
      throw new utils.NotImplementedException();
    }
    /**
     * @abstract
     * @protected
     * @param {string} slotName
     * @returns {*|{}}
     */

  }, {
    key: "getBestPrice",
    value: function getBestPrice(slotName) {
      throw new utils.NotImplementedException({
        slotName: slotName
      });
    }
    /**
     * @abstract
     * @protected
     * @param {string} slotName
     * @returns {*|{}}
     */

  }, {
    key: "getTargetingParams",
    value: function getTargetingParams(slotName) {
      throw new utils.NotImplementedException({
        slotName: slotName
      });
    }
    /**
     * Checks if slot with given name is supported by bidder.
     * @abstract
     * @protected
     * @param {string} slotName
     * @returns {boolean}
     */

  }, {
    key: "isSupported",
    value: function isSupported(slotName) {
      throw new utils.NotImplementedException({
        slotName: slotName
      });
    }
  }]);

  return BaseBidder;
}();
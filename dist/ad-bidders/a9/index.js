import _regeneratorRuntime from "@babel/runtime-corejs2/regenerator";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/asyncToGenerator";
import _objectSpread from "@babel/runtime-corejs2/helpers/objectSpread";
import _Object$keys from "@babel/runtime-corejs2/core-js/object/keys";
import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime-corejs2/helpers/defineProperty";
import { context, events, slotService, utils } from '@wikia/ad-engine';
import { Apstag, cmp } from "../wrappers";
import { BaseBidder } from "../base-bidder";
var logGroup = 'A9';
/**
 * @typedef {Object} A9SlotDefinition
 * @property {string} slotID
 * @property {string} slotName
 */

export var A9 =
/*#__PURE__*/
function (_BaseBidder) {
  _inherits(A9, _BaseBidder);

  /** @private */
  function A9(bidderConfig) {
    var _this;

    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

    _classCallCheck(this, A9);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(A9).call(this, 'a9', bidderConfig, timeout));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "loaded", false);

    _this.isCMPEnabled = context.get('custom.isCMPEnabled');
    _this.amazonId = _this.bidderConfig.amazonId;
    _this.slots = _this.bidderConfig.slots;
    _this.slotsNames = _Object$keys(_this.slots);
    _this.bids = {};
    _this.priceMap = {};
    _this.slotNamesMap = {};
    _this.targetingKeys = [];
    _this.apstag = Apstag.make();
    _this.cmp = cmp;
    _this.utils = utils;
    _this.events = events;
    _this.slotService = slotService;
    _this.timeout = timeout;
    _this.bidsRefreshing = context.get('bidders.a9.bidsRefreshing') || {};
    _this.isRenderImpOverwritten = false;
    return _this;
  }

  _createClass(A9, [{
    key: "getPrices",
    value: function getPrices() {
      return this.priceMap;
    }
  }, {
    key: "getTargetingKeysToReset",
    value: function getTargetingKeysToReset() {
      return this.targetingKeys;
    }
  }, {
    key: "init",
    value: function init() {
      var consentData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.initIfNotLoaded(consentData);
      this.bids = {};
      this.priceMap = {};
      var a9Slots = this.getA9SlotsDefinitions(this.slotsNames);
      this.fetchBids(a9Slots);
    }
    /**
     * @private
     * @param consentData
     */

  }, {
    key: "initIfNotLoaded",
    value: function initIfNotLoaded(consentData) {
      if (!this.loaded) {
        this.apstag.init(this.getApstagConfig(consentData));
        this.loaded = true;
      }
    }
    /**
     * @private
     * @param consentData
     * @returns {{videoAdServer: string, deals: boolean, pubID: (*|string), gdpr: ()}}
     */

  }, {
    key: "getApstagConfig",
    value: function getApstagConfig(consentData) {
      return _objectSpread({
        pubID: this.amazonId,
        videoAdServer: 'DFP',
        deals: !!this.bidderConfig.dealsEnabled
      }, this.getGdprIfApplicable(consentData));
    }
    /**
     * @private
     * @param consentData
     * @returns {*}
     */

  }, {
    key: "getGdprIfApplicable",
    value: function getGdprIfApplicable(consentData) {
      if (this.isCMPEnabled && consentData && consentData.consentData) {
        return {
          gdpr: {
            enabled: consentData.gdprApplies,
            consent: consentData.consentData,
            cmpTimeout: 5000
          }
        };
      }

      return {};
    }
    /**
     * Transforms slots names into A9 slot definitions.
     * @param {string[]} slotsNames
     * @returns {A9SlotDefinition[]}
     */

  }, {
    key: "getA9SlotsDefinitions",
    value: function getA9SlotsDefinitions(slotsNames) {
      var _this2 = this;

      return slotsNames.map(function (slotName) {
        return _this2.getSlotAlias(slotName);
      }).map(function (slotAlias) {
        return _this2.createSlotDefinition(slotAlias);
      }).filter(function (slot) {
        return slot !== null;
      });
    }
    /**
     * Fetches bids from A9.
     * Calls this.onBidResponse() upon success.
     * @private
     * @param {A9SlotDefinition[]} slots
     * @param {boolean} refresh
     */

  }, {
    key: "fetchBids",
    value: function () {
      var _fetchBids = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(slots) {
        var _this3 = this;

        var refresh,
            currentBids,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                refresh = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
                utils.logger(logGroup, 'fetching bids for slots', slots);
                _context2.next = 4;
                return this.apstag.fetchBids({
                  slots: slots,
                  timeout: this.timeout
                });

              case 4:
                currentBids = _context2.sent;
                utils.logger(logGroup, 'bids fetched for slots', slots, 'bids', currentBids);
                this.addApstagRenderImpHookOnFirstFetch();
                currentBids.forEach(
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  _regeneratorRuntime.mark(function _callee(bid) {
                    var slotName, _ref2, keys, bidTargeting;

                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            slotName = _this3.slotNamesMap[bid.slotID] || bid.slotID;
                            _context.next = 3;
                            return _this3.getBidTargetingWithKeys(bid);

                          case 3:
                            _ref2 = _context.sent;
                            keys = _ref2.keys;
                            bidTargeting = _ref2.bidTargeting;

                            _this3.updateBidSlot(slotName, keys, bidTargeting);

                          case 7:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }());
                this.onBidResponse();

                if (refresh) {
                  this.events.emit(this.events.BIDS_REFRESH);
                }

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchBids(_x) {
        return _fetchBids.apply(this, arguments);
      }

      return fetchBids;
    }()
    /**
     * @private
     */

  }, {
    key: "addApstagRenderImpHookOnFirstFetch",
    value: function addApstagRenderImpHookOnFirstFetch() {
      if (!this.isRenderImpOverwritten) {
        this.isRenderImpOverwritten = true;
        this.addApstagRenderImpHook();
      }
    }
    /**
     * Wraps apstag.renderImp
     * Calls this.refreshBid() if bids refreshing is enabled.
     * @private
     */

  }, {
    key: "addApstagRenderImpHook",
    value: function addApstagRenderImpHook() {
      var _this4 = this;

      utils.logger(logGroup, 'overwriting window.apstag.renderImp');
      this.apstag.onRenderImpEnd(function (doc, impId) {
        var slot = _this4.getRenderedSlot(impId);

        var slotName = slot.getSlotName();
        utils.logger(logGroup, "bid used for slot ".concat(slotName));
        delete _this4.bids[_this4.getSlotAlias(slotName)];

        if (_this4.bidsRefreshing.enabled) {
          _this4.refreshBid(slot);
        }
      });
    }
    /**
     * Returns slot which used bid with given impression id.
     * @private
     * @param {string | number} impId
     * @returns {AdSlot | undefined }
     */

  }, {
    key: "getRenderedSlot",
    value: function getRenderedSlot(impId) {
      var renderedSlot;
      slotService.forEach(function (slot) {
        if (slot.getTargeting().amzniid === impId) {
          renderedSlot = slot;
        }
      });
      return renderedSlot;
    }
    /**
     * Refreshes bid for given slot.
     * @private
     * @param {AdSlot} slot
     */

  }, {
    key: "refreshBid",
    value: function refreshBid(slot) {
      if (!this.shouldRefreshSlot(slot)) {
        return;
      }

      var slotDef = this.createSlotDefinition(this.getSlotAlias(slot.getSlotName()));

      if (slotDef) {
        utils.logger(logGroup, 'refresh bids for slot', slotDef);
        this.fetchBids([slotDef], true);
      }
    }
    /**
     * Checks if slot should be refreshed.
     * @private
     * @param {AdSlot} slot
     * @returns {boolean}
     */

  }, {
    key: "shouldRefreshSlot",
    value: function shouldRefreshSlot(slot) {
      return this.bidsRefreshing.slots.includes(this.getSlotAlias(slot.getSlotName()));
    }
    /**
     * Creates A9 slot definition from slot alias.
     * @param {string} slotAlias
     * @returns {A9SlotDefinition | null} Returns null i
     */

  }, {
    key: "createSlotDefinition",
    value: function createSlotDefinition(slotAlias) {
      var config = this.slots[slotAlias];
      var slotID = config.slotId || slotAlias;
      var definition = {
        slotID: slotID,
        slotName: slotID
      };
      this.slotNamesMap[slotID] = slotAlias;

      if (!this.bidderConfig.videoEnabled && config.type === 'video') {
        return null;
      }

      if (config.type === 'video') {
        definition.mediaType = 'video';
      } else {
        definition.sizes = config.sizes;
      }

      return definition;
    }
    /**
     * @private
     * @param bid
     * @returns {*}
     */

  }, {
    key: "getBidTargetingWithKeys",
    value: function () {
      var _getBidTargetingWithKeys = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(bid) {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.bidderConfig.dealsEnabled) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return bid.helpers.targetingKeys;

              case 3:
                _context3.t0 = _context3.sent;
                _context3.t1 = bid.targeting;
                return _context3.abrupt("return", {
                  keys: _context3.t0,
                  bidTargeting: _context3.t1
                });

              case 6:
                _context3.next = 8;
                return this.apstag.targetingKeys();

              case 8:
                _context3.t2 = _context3.sent;
                _context3.t3 = bid;
                return _context3.abrupt("return", {
                  keys: _context3.t2,
                  bidTargeting: _context3.t3
                });

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getBidTargetingWithKeys(_x3) {
        return _getBidTargetingWithKeys.apply(this, arguments);
      }

      return getBidTargetingWithKeys;
    }()
    /**
     * @private
     * @param slotName
     * @param keys
     * @param bidTargeting
     */

  }, {
    key: "updateBidSlot",
    value: function updateBidSlot(slotName, keys, bidTargeting) {
      var _this5 = this;

      this.bids[slotName] = {};
      keys.forEach(function (key) {
        if (_this5.targetingKeys.indexOf(key) === -1) {
          _this5.targetingKeys.push(key);
        }

        _this5.bids[slotName][key] = bidTargeting[key];
      });
    }
    /**
     * @protected
     * @returns {Promise<void>}
     */

  }, {
    key: "callBids",
    value: function () {
      var _callBids = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var consentData;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.cmp.exists) {
                  _context4.next = 7;
                  break;
                }

                _context4.next = 3;
                return this.cmp.getConsentData(null);

              case 3:
                consentData = _context4.sent;
                this.init(consentData);
                _context4.next = 8;
                break;

              case 7:
                this.init();

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function callBids() {
        return _callBids.apply(this, arguments);
      }

      return callBids;
    }()
    /**
     * @inheritDoc
     */

  }, {
    key: "calculatePrices",
    value: function calculatePrices() {
      var _this6 = this;

      return _Object$keys(this.bids).forEach(function (slotName) {
        _this6.priceMap[slotName] = _this6.bids[slotName].amznbid;
      });
    }
    /**
     * @inheritDoc
     */

  }, {
    key: "getBestPrice",
    value: function getBestPrice(slotName) {
      var slotAlias = this.getSlotAlias(slotName);
      return this.priceMap[slotAlias] ? {
        a9: this.priceMap[slotAlias]
      } : {};
    }
    /**
     * @inheritDoc
     */

  }, {
    key: "getTargetingParams",
    value: function getTargetingParams(slotName) {
      return this.bids[this.getSlotAlias(slotName)] || {};
    }
    /**
     * @inheritDoc
     */

  }, {
    key: "isSupported",
    value: function isSupported(slotName) {
      return !!this.slots[this.getSlotAlias(slotName)];
    }
  }]);

  return A9;
}(BaseBidder);
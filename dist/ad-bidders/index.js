import _Promise from "@babel/runtime-corejs2/core-js/promise";
import _Object$assign from "@babel/runtime-corejs2/core-js/object/assign";
import _Object$keys from "@babel/runtime-corejs2/core-js/object/keys";
import { context, events, utils } from '@wikia/ad-engine';
import { A9 } from "./a9";
import { Prebid } from "./prebid";
import * as prebidHelper from "./prebid/prebid-helper";
import { transformPriceFromBid } from "./prebid/price-helper";
var biddersRegistry = {};
var realSlotPrices = {};
var logGroup = 'bidders';
events.on(events.VIDEO_AD_REQUESTED, function (adSlot) {
  adSlot.updateWinningPbBidderDetails();
});
events.on(events.VIDEO_AD_USED, function (adSlot) {
  updateSlotTargeting(adSlot.getSlotName());
});

function applyTargetingParams(slotName, targeting) {
  _Object$keys(targeting).forEach(function (key) {
    return context.set("slots.".concat(slotName, ".targeting.").concat(key), targeting[key]);
  });
}
/**
 * Executes callback function on each enabled bidder
 *
 * @param {function} callback
 */


function forEachBidder(callback) {
  _Object$keys(biddersRegistry).forEach(function (bidderName) {
    callback(biddersRegistry[bidderName]);
  });
}

function getBidParameters(slotName) {
  var slotParams = {};
  forEachBidder(function (bidder) {
    if (bidder && bidder.wasCalled()) {
      var params = bidder.getSlotTargetingParams(slotName);

      _Object$assign(slotParams, params);
    }
  });
  return slotParams;
}

function getCurrentSlotPrices(slotName) {
  var slotPrices = {};
  forEachBidder(function (bidder) {
    if (bidder && bidder.isSlotSupported(slotName)) {
      var priceFromBidder = bidder.getSlotBestPrice(slotName);

      _Object$keys(priceFromBidder).forEach(function (bidderName) {
        slotPrices[bidderName] = priceFromBidder[bidderName];
      });
    }
  });
  return slotPrices;
}

function getDfpSlotPrices(slotName) {
  return realSlotPrices[slotName] || {};
}
/**
 * Returns true if all bidders replied
 *
 * @returns {boolean}
 */


function hasAllResponses() {
  var missingBidders = _Object$keys(biddersRegistry).filter(function (bidderName) {
    var bidder = biddersRegistry[bidderName];
    return !bidder.hasResponse();
  });

  return missingBidders.length === 0;
}

function resetTargetingKeys(slotName) {
  forEachBidder(function (bidder) {
    bidder.getTargetingKeysToReset().forEach(function (key) {
      context.remove("slots.".concat(slotName, ".targeting.").concat(key));
    });
  });
  utils.logger(logGroup, 'resetTargetingKeys', slotName);
}

function requestBids(_ref) {
  var _ref$responseListener = _ref.responseListener,
      responseListener = _ref$responseListener === void 0 ? null : _ref$responseListener;
  var config = context.get('bidders');

  if (config.prebid && config.prebid.enabled) {
    biddersRegistry.prebid = new Prebid(config.prebid, config.timeout);
  }

  if (config.a9 && config.a9.enabled) {
    biddersRegistry.a9 = new A9(config.a9, config.timeout);
  }

  forEachBidder(function (bidder) {
    if (responseListener) {
      bidder.addResponseListener(responseListener);
    }

    bidder.call();
  });
}
/**
 * Executes callback function if bidding is finished or timeout is reached
 *
 * @param {function} callback
 *
 * @returns {Promise}
 */


function runOnBiddingReady(callback) {
  var responses = [];
  forEachBidder(function (bidder) {
    responses.push(bidder.waitForResponse());
  });
  return _Promise.all(responses).then(callback);
}

function storeRealSlotPrices(slotName) {
  realSlotPrices[slotName] = getCurrentSlotPrices(slotName);
}

function updateSlotTargeting(slotName) {
  var bidderTargeting = getBidParameters(slotName);
  storeRealSlotPrices(slotName);
  resetTargetingKeys(slotName);
  applyTargetingParams(slotName, bidderTargeting);
  utils.logger(logGroup, 'updateSlotTargeting', slotName, bidderTargeting);
  return bidderTargeting;
}

export var bidders = {
  getBidParameters: getBidParameters,
  getCurrentSlotPrices: getCurrentSlotPrices,
  getDfpSlotPrices: getDfpSlotPrices,
  hasAllResponses: hasAllResponses,
  prebidHelper: prebidHelper,
  requestBids: requestBids,
  runOnBiddingReady: runOnBiddingReady,
  transformPriceFromBid: transformPriceFromBid,
  updateSlotTargeting: updateSlotTargeting
};
export * from "./wrappers";
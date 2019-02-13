import _slicedToArray from "@babel/runtime-corejs2/helpers/slicedToArray";
import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/assertThisInitialized";
import _parseInt from "@babel/runtime-corejs2/core-js/parse-int";
import { buildVastUrl, context, utils } from '@wikia/ad-engine';
import { BaseAdapter } from "./base-adapter";
var price = utils.queryString.get('wikia_video_adapter');
var limit = _parseInt(utils.queryString.get('wikia_adapter_limit'), 10) || 99;
var timeout = _parseInt(utils.queryString.get('wikia_adapter_timeout'), 10) || 0;
var useRandomPrice = utils.queryString.get('wikia_adapter_random') === '1';
export var WikiaVideo =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(WikiaVideo, _BaseAdapter);

  function WikiaVideo(options) {
    var _this;

    _classCallCheck(this, WikiaVideo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WikiaVideo).call(this, options));
    _this.bidderName = 'wikiaVideo';
    _this.enabled = !!price;
    _this.limit = limit;
    _this.useRandomPrice = useRandomPrice;
    _this.timeout = timeout;

    _this.create = function () {
      return _assertThisInitialized(_assertThisInitialized(_this));
    };

    return _this;
  }

  _createClass(WikiaVideo, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code) {
      return {
        code: code,
        mediaTypes: {
          video: {
            context: 'outstream',
            playerSize: [640, 480]
          }
        },
        bids: [{
          bidder: this.bidderName
        }]
      };
    }
  }, {
    key: "getSpec",
    value: function getSpec() {
      return {
        code: this.bidderName,
        supportedMediaTypes: ['video']
      };
    }
  }, {
    key: "getPrice",
    value: function getPrice() {
      if (this.useRandomPrice) {
        return Math.floor(Math.random() * 20);
      }

      return _parseInt(price, 10) / 100;
    }
  }, {
    key: "getVastUrl",
    value: function getVastUrl(width, height, slotName) {
      return buildVastUrl(width / height, slotName, {
        videoAdUnitId: context.get("bidders.prebid.wikiaVideo.slots.".concat(slotName, ".videoAdUnitId")),
        customParams: context.get("bidders.prebid.wikiaVideo.slots.".concat(slotName, ".customParams"))
      });
    }
  }, {
    key: "callBids",
    value: function callBids(bidRequest, addBidResponse, done) {
      var _this2 = this;

      window.pbjs.que.push(function () {
        _this2.addBids(bidRequest, addBidResponse, done);
      });
    }
  }, {
    key: "addBids",
    value: function addBids(bidRequest, addBidResponse, done) {
      var _this3 = this;

      setTimeout(function () {
        bidRequest.bids.forEach(function (bid) {
          if (_this3.limit === 0) {
            return;
          }

          var bidResponse = window.pbjs.createBid(1);

          var _bid$sizes$ = _slicedToArray(bid.sizes[0], 2),
              width = _bid$sizes$[0],
              height = _bid$sizes$[1];

          var slotName = bid.adUnitCode;
          bidResponse.bidderCode = bidRequest.bidderCode;
          bidResponse.cpm = _this3.getPrice();
          bidResponse.creativeId = 'foo123_wikiaVideoCreativeId';
          bidResponse.ttl = 300;
          bidResponse.mediaType = 'video';
          bidResponse.width = width;
          bidResponse.height = height;
          bidResponse.vastUrl = _this3.getVastUrl(width, height, slotName);
          bidResponse.videoCacheKey = '123foo_wikiaVideoCacheKey';
          addBidResponse(bid.adUnitCode, bidResponse);
          _this3.limit -= 1;
        });
        done();
      }, this.timeout);
    }
  }]);

  return WikiaVideo;
}(BaseAdapter);
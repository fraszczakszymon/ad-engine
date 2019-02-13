import _slicedToArray from "@babel/runtime-corejs2/helpers/slicedToArray";
import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/assertThisInitialized";
import _parseInt from "@babel/runtime-corejs2/core-js/parse-int";
import { utils } from '@wikia/ad-engine';
import { BaseAdapter } from "./base-adapter";
var price = utils.queryString.get('wikia_adapter');
var limit = _parseInt(utils.queryString.get('wikia_adapter_limit'), 10) || 99;
var timeout = _parseInt(utils.queryString.get('wikia_adapter_timeout'), 10) || 0;
var useRandomPrice = utils.queryString.get('wikia_adapter_random') === '1';
export var Wikia =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(Wikia, _BaseAdapter);

  function Wikia(options) {
    var _this;

    _classCallCheck(this, Wikia);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Wikia).call(this, options));
    _this.bidderName = 'wikia';
    _this.enabled = !!price;
    _this.limit = limit;
    _this.useRandomPrice = useRandomPrice;
    _this.timeout = timeout;

    _this.create = function () {
      return _assertThisInitialized(_assertThisInitialized(_this));
    };

    return _this;
  }

  _createClass(Wikia, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code, _ref) {
      var sizes = _ref.sizes;
      return {
        code: code,
        mediaTypes: {
          banner: {
            sizes: sizes
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
        supportedMediaTypes: ['banner']
      };
    }
  }, {
    key: "getPrice",
    value: function getPrice() {
      if (this.useRandomPrice) {
        return Math.floor(Math.random() * 2000) / 100;
      }

      return _parseInt(price, 10) / 100;
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

          var cpm = _this3.getPrice();

          bidResponse.ad = _this3.getCreative(bid.sizes[0], cpm);
          bidResponse.bidderCode = bidRequest.bidderCode;
          bidResponse.cpm = cpm;
          bidResponse.ttl = 300;
          bidResponse.mediaType = 'banner';
          bidResponse.width = width;
          bidResponse.height = height;
          addBidResponse(bid.adUnitCode, bidResponse);
          _this3.limit -= 1;
        });
        done();
      }, this.timeout);
    }
  }, {
    key: "getCreative",
    value: function getCreative(size, cpm) {
      var creative = document.createElement('div');
      creative.style.background = '#00b7e0';
      creative.style.color = '#fff';
      creative.style.fontFamily = 'sans-serif';
      creative.style.height = '100%';
      creative.style.textAlign = 'center';
      creative.style.width = '100%';
      var title = document.createElement('p');
      title.innerText = 'Wikia Creative';
      title.style.fontWeight = 'bold';
      title.style.margin = '0';
      title.style.paddingTop = '10px';
      var details = document.createElement('small');
      details.innerText = "cpm: ".concat(cpm, ", size: ").concat(size.join('x'));
      creative.appendChild(title);
      creative.appendChild(details);
      return creative.outerHTML;
    }
  }]);

  return Wikia;
}(BaseAdapter);
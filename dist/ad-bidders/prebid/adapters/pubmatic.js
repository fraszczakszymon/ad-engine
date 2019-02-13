import _objectSpread from "@babel/runtime-corejs2/helpers/objectSpread";
import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import { BaseAdapter } from "./base-adapter";
export var Pubmatic =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(Pubmatic, _BaseAdapter);

  function Pubmatic(options) {
    var _this;

    _classCallCheck(this, Pubmatic);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Pubmatic).call(this, options));
    _this.bidderName = 'pubmatic';
    _this.publisherId = options.publisherId;
    return _this;
  }

  _createClass(Pubmatic, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code, _ref) {
      var sizes = _ref.sizes,
          ids = _ref.ids;

      switch (code.toLowerCase()) {
        case 'featured':
        case 'incontent_player':
          return this.getVideoConfig(code, ids);

        default:
          return this.getStandardConfig(code, sizes, ids);
      }
    }
  }, {
    key: "getVideoConfig",
    value: function getVideoConfig(code, ids) {
      var videoParams = {
        video: {
          mimes: ['video/mp4', 'video/x-flv', 'video/webm', 'video/ogg'],
          skippable: true,
          minduration: 1,
          maxduration: 30,
          startdelay: 0,
          playbackmethod: [2, 3],
          protocols: [2, 3, 5, 6],
          linearity: 1,
          placement: 1
        }
      };
      return {
        code: code,
        mediaTypes: {
          video: {
            playerSize: [640, 480],
            context: 'instream'
          }
        },
        bids: this.getBids(ids, videoParams)
      };
    }
  }, {
    key: "getStandardConfig",
    value: function getStandardConfig(code, sizes, ids) {
      return {
        code: code,
        mediaTypes: {
          banner: {
            sizes: sizes
          }
        },
        bids: this.getBids(ids)
      };
    }
  }, {
    key: "getBids",
    value: function getBids(ids) {
      var _this2 = this;

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return ids.map(function (adSlot) {
        return {
          bidder: _this2.bidderName,
          params: _objectSpread({
            adSlot: adSlot,
            publisherId: _this2.publisherId
          }, params)
        };
      });
    }
  }]);

  return Pubmatic;
}(BaseAdapter);
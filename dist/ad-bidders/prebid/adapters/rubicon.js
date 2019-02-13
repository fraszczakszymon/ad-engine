import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import { context } from '@wikia/ad-engine';
import { getTargeting } from "../prebid-helper";
import { BaseAdapter } from "./base-adapter";
export var Rubicon =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(Rubicon, _BaseAdapter);

  function Rubicon(options) {
    var _this;

    _classCallCheck(this, Rubicon);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rubicon).call(this, options));
    _this.bidderName = 'rubicon';
    _this.accountId = options.accountId;
    return _this;
  }

  _createClass(Rubicon, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code, _ref) {
      var siteId = _ref.siteId,
          zoneId = _ref.zoneId,
          sizeId = _ref.sizeId,
          position = _ref.position;

      if (code === 'featured' && !context.get('custom.rubiconInFV')) {
        return null;
      }

      var targeting = getTargeting(code);
      return {
        code: code,
        mediaType: 'video',
        mediaTypes: {
          video: {
            playerSize: [640, 480],
            context: 'instream'
          }
        },
        bids: [{
          bidder: this.bidderName,
          params: {
            accountId: this.accountId,
            siteId: siteId,
            zoneId: zoneId,
            name: code,
            position: position,
            inventory: targeting,
            video: {
              playerWidth: '640',
              playerHeight: '480',
              size_id: sizeId,
              language: targeting.lang ? targeting.lang[0] : 'en'
            }
          }
        }]
      };
    }
  }]);

  return Rubicon;
}(BaseAdapter);
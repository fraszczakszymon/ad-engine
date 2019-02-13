import _Object$keys from "@babel/runtime-corejs2/core-js/object/keys";
import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import { getTargeting } from "../prebid-helper";
import { BaseAdapter } from "./base-adapter";
export var RubiconDisplay =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(RubiconDisplay, _BaseAdapter);

  function RubiconDisplay(options) {
    var _this;

    _classCallCheck(this, RubiconDisplay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RubiconDisplay).call(this, options));
    _this.bidderName = 'rubicon_display';
    _this.aliases = {
      rubicon: [_this.bidderName]
    };
    _this.accountId = options.accountId;
    return _this;
  }

  _createClass(RubiconDisplay, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code, _ref) {
      var siteId = _ref.siteId,
          zoneId = _ref.zoneId,
          sizes = _ref.sizes,
          position = _ref.position,
          targeting = _ref.targeting;
      var pageTargeting = getTargeting(code);

      _Object$keys(targeting || {}).forEach(function (key) {
        pageTargeting[key] = targeting[key];
      });

      return {
        code: code,
        mediaTypes: {
          banner: {
            sizes: sizes
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
            keywords: ['rp.fastlane'],
            inventory: pageTargeting
          }
        }]
      };
    }
  }]);

  return RubiconDisplay;
}(BaseAdapter);
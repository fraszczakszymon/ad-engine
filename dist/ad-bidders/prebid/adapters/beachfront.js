import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import { utils } from '@wikia/ad-engine';
import { BaseAdapter } from "./base-adapter";
export var Beachfront =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(Beachfront, _BaseAdapter);

  function Beachfront(options) {
    var _this;

    _classCallCheck(this, Beachfront);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Beachfront).call(this, options));
    _this.bidderName = 'beachfront';
    _this.bidfloor = 0.01;
    _this.debugAppId = options.debugAppId;
    _this.isDebugMode = utils.queryString.get('beachfront_debug_mode') === '1';
    return _this;
  }

  _createClass(Beachfront, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code, _ref) {
      var appId = _ref.appId;
      return {
        code: code,
        mediaTypes: {
          video: {
            context: 'instream',
            playerSize: [640, 480]
          }
        },
        bids: [{
          bidder: this.bidderName,
          params: {
            bidfloor: this.bidfloor,
            appId: this.isDebugMode ? this.debugAppId : appId
          }
        }]
      };
    }
  }]);

  return Beachfront;
}(BaseAdapter);
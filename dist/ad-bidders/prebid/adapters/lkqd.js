import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import { BaseAdapter } from "./base-adapter";
export var Lkqd =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(Lkqd, _BaseAdapter);

  function Lkqd(options) {
    var _this;

    _classCallCheck(this, Lkqd);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Lkqd).call(this, options));
    _this.bidderName = 'lkqd';
    return _this;
  }

  _createClass(Lkqd, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code, _ref) {
      var placementId = _ref.placementId,
          siteId = _ref.siteId;
      return {
        code: code,
        mediaTypes: {
          video: {
            playerSize: [640, 480]
          }
        },
        bids: [{
          bidder: this.bidderName,
          params: {
            siteId: siteId,
            placementId: placementId,
            pageurl: window.location.hostname,
            output: 'svpaid'
          }
        }]
      };
    }
  }]);

  return Lkqd;
}(BaseAdapter);
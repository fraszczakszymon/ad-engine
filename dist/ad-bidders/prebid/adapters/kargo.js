import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import { BaseAdapter } from "./base-adapter";
export var Kargo =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(Kargo, _BaseAdapter);

  function Kargo(options) {
    var _this;

    _classCallCheck(this, Kargo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Kargo).call(this, options));
    _this.bidderName = 'kargo';
    return _this;
  }

  _createClass(Kargo, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code, _ref) {
      var sizes = _ref.sizes,
          placementId = _ref.placementId;
      return {
        code: code,
        sizes: sizes,
        bids: [{
          bidder: this.bidderName,
          params: {
            placementId: placementId
          }
        }]
      };
    }
  }]);

  return Kargo;
}(BaseAdapter);
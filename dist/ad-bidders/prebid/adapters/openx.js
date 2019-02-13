import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import { BaseAdapter } from "./base-adapter";
export var Openx =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(Openx, _BaseAdapter);

  function Openx(options) {
    var _this;

    _classCallCheck(this, Openx);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Openx).call(this, options));
    _this.bidderName = 'openx';
    _this.delDomain = options.delDomain;
    return _this;
  }

  _createClass(Openx, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code, _ref) {
      var sizes = _ref.sizes,
          unit = _ref.unit;
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
            unit: unit,
            delDomain: this.delDomain
          }
        }]
      };
    }
  }]);

  return Openx;
}(BaseAdapter);
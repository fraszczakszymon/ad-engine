import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import { BaseAdapter } from "./base-adapter";
export var Onemobile =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(Onemobile, _BaseAdapter);

  function Onemobile(options) {
    var _this;

    _classCallCheck(this, Onemobile);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Onemobile).call(this, options));
    _this.bidderName = 'onemobile';
    _this.siteId = options.siteId;
    return _this;
  }

  _createClass(Onemobile, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code, _ref) {
      var size = _ref.size,
          pos = _ref.pos;
      return {
        code: code,
        mediaTypes: {
          banner: {
            sizes: [size]
          }
        },
        bids: [{
          bidder: this.bidderName,
          params: {
            dcn: this.siteId,
            pos: pos
          }
        }]
      };
    }
  }]);

  return Onemobile;
}(BaseAdapter);
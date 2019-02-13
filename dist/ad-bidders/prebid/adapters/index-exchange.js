import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import { BaseAdapter } from "./base-adapter";
export var IndexExchange =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(IndexExchange, _BaseAdapter);

  function IndexExchange(options) {
    var _this;

    _classCallCheck(this, IndexExchange);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IndexExchange).call(this, options));
    _this.bidderName = 'indexExchange';
    _this.aliases = {
      ix: [_this.bidderName]
    };
    return _this;
  }

  _createClass(IndexExchange, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code, _ref) {
      var _this2 = this;

      var sizes = _ref.sizes,
          siteId = _ref.siteId;
      return {
        code: code,
        mediaTypes: {
          banner: {
            sizes: sizes
          }
        },
        bids: sizes.map(function (size) {
          return {
            bidder: _this2.bidderName,
            params: {
              siteId: siteId,
              size: size
            }
          };
        })
      };
    }
  }]);

  return IndexExchange;
}(BaseAdapter);
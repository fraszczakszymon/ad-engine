import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import { BaseAdapter } from "./base-adapter";
export var Aol =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(Aol, _BaseAdapter);

  function Aol(options) {
    var _this;

    _classCallCheck(this, Aol);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Aol).call(this, options));
    _this.bidderName = 'aol';
    _this.network = options.network;
    return _this;
  }

  _createClass(Aol, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code, _ref) {
      var sizes = _ref.sizes,
          placement = _ref.placement,
          alias = _ref.alias,
          sizeId = _ref.sizeId;
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
            placement: placement,
            network: this.network,
            alias: alias,
            sizeId: sizeId
          }
        }]
      };
    }
  }]);

  return Aol;
}(BaseAdapter);
import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import { context } from '@wikia/ad-engine';
import { BaseAdapter } from "./base-adapter";
export var Appnexus =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(Appnexus, _BaseAdapter);

  function Appnexus(options) {
    var _this;

    _classCallCheck(this, Appnexus);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Appnexus).call(this, options));
    _this.bidderName = 'appnexus';
    _this.placements = options.placements;
    return _this;
  }

  _createClass(Appnexus, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code, _ref) {
      var sizes = _ref.sizes,
          _ref$position = _ref.position,
          position = _ref$position === void 0 ? 'mobile' : _ref$position;
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
            placementId: this.getPlacement(position)
          }
        }]
      };
    }
  }, {
    key: "getPlacement",
    value: function getPlacement(position) {
      if (position === 'mobile') {
        var vertical = context.get('targeting.mappedVerticalName');
        position = vertical && this.placements[vertical] ? vertical : 'other';
      }

      return this.placements[position];
    }
  }]);

  return Appnexus;
}(BaseAdapter);
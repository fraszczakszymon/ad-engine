import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import { utils } from '@wikia/ad-engine';
import { BaseAdapter } from "./base-adapter";
export var AudienceNetwork =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(AudienceNetwork, _BaseAdapter);

  function AudienceNetwork(options) {
    var _this;

    _classCallCheck(this, AudienceNetwork);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AudienceNetwork).call(this, options));
    _this.bidderName = 'audienceNetwork';
    _this.testMode = utils.queryString.get('audiencenetworktest') === 'true';
    return _this;
  }

  _createClass(AudienceNetwork, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code, _ref) {
      var sizes = _ref.sizes,
          placementId = _ref.placementId;
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
            testMode: this.testMode,
            placementId: placementId
          }
        }]
      };
    }
  }]);

  return AudienceNetwork;
}(BaseAdapter);
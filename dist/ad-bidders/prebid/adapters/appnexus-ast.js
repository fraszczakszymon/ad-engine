import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/inherits";
import { utils } from '@wikia/ad-engine';
import { BaseAdapter } from "./base-adapter";
export var AppnexusAst =
/*#__PURE__*/
function (_BaseAdapter) {
  _inherits(AppnexusAst, _BaseAdapter);

  function AppnexusAst(options) {
    var _this;

    _classCallCheck(this, AppnexusAst);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppnexusAst).call(this, options));
    _this.bidderName = 'appnexusAst';
    _this.aliases = {
      appnexus: [_this.bidderName]
    };
    _this.debugPlacementId = options.debugPlacementId;
    _this.isDebugMode = utils.queryString.get('appnexusast_debug_mode') === '1';
    return _this;
  }

  _createClass(AppnexusAst, [{
    key: "prepareConfigForAdUnit",
    value: function prepareConfigForAdUnit(code, _ref) {
      var placementId = _ref.placementId;
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
            placementId: this.isDebugMode ? this.debugPlacementId : placementId,
            video: {
              skippable: false,
              playback_method: ['auto_play_sound_off']
            }
          }
        }]
      };
    }
  }]);

  return AppnexusAst;
}(BaseAdapter);
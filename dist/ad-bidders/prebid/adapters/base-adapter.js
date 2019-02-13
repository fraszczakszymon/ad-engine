import _Object$keys from "@babel/runtime-corejs2/core-js/object/keys";
import _classCallCheck from "@babel/runtime-corejs2/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/createClass";
export var BaseAdapter =
/*#__PURE__*/
function () {
  function BaseAdapter(_ref) {
    var enabled = _ref.enabled,
        slots = _ref.slots;

    _classCallCheck(this, BaseAdapter);

    this.enabled = enabled;
    this.slots = slots;
  }

  _createClass(BaseAdapter, [{
    key: "prepareAdUnits",
    value: function prepareAdUnits() {
      var _this = this;

      return _Object$keys(this.slots).map(function (slotName) {
        return _this.prepareConfigForAdUnit(slotName, _this.slots[slotName]);
      });
    }
  }]);

  return BaseAdapter;
}();
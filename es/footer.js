"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = Footer;

var _react = _interopRequireDefault(require("react"));

require("./footer.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Footer(_ref) {
  var year = _ref.year,
      org = _ref.org;
  return _react["default"].createElement("footer", {
    className: "app-footer"
  }, "\xA9 ", year, " ", org);
}
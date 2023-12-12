"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.link = link;
var _extract = _interopRequireDefault(require("./extract"));
var _autoLink = _interopRequireDefault(require("./autoLink"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var defaultOptions = {
  targetBlank: true,
  extractUrlsWithoutProtocol: true
};
function link(text) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;
  var entities = (0, _extract.default)(text, options);
  return (0, _autoLink.default)(text, entities, options);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _extractUrls = _interopRequireDefault(require("./extractUrls"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Returns an Indexed Array with URL entities found in text.

function _default(text, options) {
  var entities = (0, _extractUrls.default)(text, options);
  if (entities.length === 0) {
    return [];
  }
  return entities;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _helpers = require("./helpers");
var _linkToText = _interopRequireDefault(require("./linkToText"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Converts URL entity to an html anchor tag.

var urlHasProtocol = /^https?:\/\//i;
function _default(entity, text, options) {
  var url = entity.url;
  var displayUrl = url;
  var linkText = (0, _helpers.htmlEscape)(displayUrl);
  var attrs = (0, _helpers.clone)(options.htmlAttrs || {});
  if (!url.match(urlHasProtocol)) {
    url = "http://".concat(url);
  }
  attrs.href = url;
  if (options.targetBlank) {
    attrs.target = '_blank';
  }

  // set class only if urlClass is specified.
  if (options.urlClass) {
    attrs['class'] = options.urlClass;
  }

  // set target only if urlTarget is specified.
  if (options.urlTarget) {
    attrs.target = options.urlTarget;
  }
  return (0, _linkToText.default)(entity, linkText, attrs, options);
}
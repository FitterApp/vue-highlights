"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _helpers = require("./helpers");
var _extractHtmlAttrs = _interopRequireDefault(require("./extractHtmlAttrs"));
var _linkToUrl = _interopRequireDefault(require("./linkToUrl"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Inserts an <a> or <router-link> tag with given css classes around
// matched url, mentions or hashtags in text.

var DEFAULT_URL_CLASS = "highlights url";
function _default(text, entities, opts) {
  var options = (0, _helpers.clone)(opts || {});
  options.urlClass = options.urlClass || DEFAULT_URL_CLASS;
  options.htmlAttrs = (0, _extractHtmlAttrs.default)(options);
  options.invisibleTagAttrs = options.invisibleTagAttrs || "style='position:absolute;left:-9999px;'";
  var result = "";
  var beginIndex = 0;

  // sort entities by start index
  entities.sort(function (a, b) {
    return a.indices[0] - b.indices[0];
  });
  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    result += (0, _helpers.htmlEscape)(text.substring(beginIndex, entity.indices[0]));
    if (entity.url) {
      result += (0, _linkToUrl.default)(entity, text, options);
    }
    beginIndex = entity.indices[1];
  }
  result += (0, _helpers.htmlEscape)(text.substring(beginIndex, text.length));
  return result;
}
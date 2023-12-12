"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _helpers = require("./helpers");
// Returns html as text with given

var BOOLEAN_ATTRIBUTES = {
  disabled: true,
  readonly: true,
  multiple: true,
  checked: true
};
function _tagAttrs(attributes) {
  var htmlAttrs = '';
  for (var k in attributes) {
    var v = attributes[k];
    if (BOOLEAN_ATTRIBUTES[k]) {
      v = v ? k : null;
    }
    if (v == null) {
      continue;
    }
    htmlAttrs += " ".concat((0, _helpers.htmlEscape)(k), "=\"").concat((0, _helpers.htmlEscape)(v.toString()), "\"");
  }
  return htmlAttrs;
}

/* eslint-disable-next-line no-unused-vars */
function _default(entity, text, attributes, options) {
  var opts = {
    text: text,
    attr: _tagAttrs(attributes)
  };
  return (0, _helpers.stringSupplant)('<a #{attr}>#{text}</a>', opts);
}
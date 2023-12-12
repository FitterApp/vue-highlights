"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var BOOLEAN_ATTRIBUTES = {
  disabled: true,
  readonly: true,
  multiple: true,
  checked: true
};

// Options which should not be passed as HTML attributes
var OPTIONS_NOT_ATTRIBUTES = {
  urlClass: true,
  targetBlank: true,
  urlTarget: true,
  invisibleTagAttrs: true,
  linkAttributeBlock: true,
  htmlEscapeNonEntities: true,
  extractUrlsWithoutProtocol: true
};
function _default(options) {
  var htmlAttrs = {};
  for (var k in options) {
    var v = options[k];
    if (OPTIONS_NOT_ATTRIBUTES[k]) {
      continue;
    }
    if (BOOLEAN_ATTRIBUTES[k]) {
      v = v ? k : null;
    }
    if (v == null) {
      continue;
    }
    htmlAttrs[k] = v;
  }
  return htmlAttrs;
}
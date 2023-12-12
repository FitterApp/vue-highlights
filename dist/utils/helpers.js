"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clone = clone;
exports.htmlEscape = htmlEscape;
exports.stringSupplant = stringSupplant;
var HTML_ENTITIES = {
  "&": "&amp;",
  '"': "&quot;",
  "'": "&#39;"
};
function htmlEscape(text) {
  return text && text.replace(/[&"']/g, function (character) {
    return HTML_ENTITIES[character];
  });
}
function clone(o) {
  var r = {};
  for (var k in o) {
    if (o.hasOwnProperty(k)) {
      r[k] = o[k];
    }
  }
  return r;
}
function stringSupplant(str, map) {
  return str.replace(/#\{(\w+)\}/g, function (match, name) {
    return map[name] || "";
  });
}
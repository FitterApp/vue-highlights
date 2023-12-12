"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoLink = autoLink;
var _utils = require("./utils");
function autoLink(text, options) {
  return (0, _utils.link)(text, options);
}
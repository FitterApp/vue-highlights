"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regex = require("./regex");
var _idna = _interopRequireDefault(require("./idna"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Extracts URLs from text

var DEFAULT_PROTOCOL = 'https://';
var DEFAULT_PROTOCOL_OPTIONS = {
  extractUrlsWithoutProtocol: true
};
var MAX_URL_LENGTH = 4096;
var invalidUrlWithoutProtocolPrecedingChars = /[-_./]$/;
function isValidUrl(url, protocol, domain) {
  var urlLength = url.length;
  var punycodeEncodedDomain = _idna.default.toAscii(domain);
  if (!punycodeEncodedDomain || !punycodeEncodedDomain.length) {
    return false;
  }
  urlLength = urlLength + punycodeEncodedDomain.length - domain.length;
  return protocol.length + urlLength <= MAX_URL_LENGTH;
}
var extractUrlsWithIndices = function extractUrlsWithIndices(text) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PROTOCOL_OPTIONS;
  if (!text || (options.extractUrlsWithoutProtocol ? !text.match(/\./) : !text.match(/:/))) {
    return [];
  }
  var urls = [];
  var _loop = function _loop() {
      var before = RegExp.$2;
      var url = RegExp.$3;
      var protocol = RegExp.$4;
      var domain = RegExp.$5;
      var path = RegExp.$7;
      var endPosition = _regex.extractUrl.lastIndex;
      var startPosition = endPosition - url.length;
      if (!isValidUrl(url, protocol || DEFAULT_PROTOCOL, domain)) {
        return 0; // continue
      }
      // extract ASCII-only domains.
      if (!protocol) {
        if (!options.extractUrlsWithoutProtocol || before.match(invalidUrlWithoutProtocolPrecedingChars)) {
          return 0; // continue
        }
        var lastUrl = null;
        var asciiEndPosition = 0;
        domain.replace(_regex.validAsciiDomain, function (asciiDomain) {
          var asciiStartPosition = domain.indexOf(asciiDomain, asciiEndPosition);
          asciiEndPosition = asciiStartPosition + asciiDomain.length;
          lastUrl = {
            url: asciiDomain,
            indices: [startPosition + asciiStartPosition, startPosition + asciiEndPosition]
          };
          urls.push(lastUrl);
        });

        // no ASCII-only domain found. Skip the entire URL.
        if (lastUrl == null) {
          return 0; // continue
        }

        // lastUrl only contains domain. Need to add path and query if they exist.
        if (path) {
          lastUrl.url = url.replace(domain, lastUrl.url);
          lastUrl.indices[1] = endPosition;
        }
      } else {
        urls.push({
          url: url,
          indices: [startPosition, endPosition]
        });
      }
    },
    _ret;
  while (_regex.extractUrl.exec(text)) {
    _ret = _loop();
    if (_ret === 0) continue;
  }
  return urls;
};
var _default = exports.default = extractUrlsWithIndices;
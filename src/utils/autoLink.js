// Inserts an <a> or <router-link> tag with given css classes around
// matched url, mentions or hashtags in text.

import { clone, htmlEscape } from "./helpers";
import extractHtmlAttrs from "./extractHtmlAttrs";
import linkToUrl from "./linkToUrl";

const DEFAULT_URL_CLASS = "highlights url";

export default function (text, entities, opts) {
  let options = clone(opts || {});
  options.urlClass = options.urlClass || DEFAULT_URL_CLASS;
  options.htmlAttrs = extractHtmlAttrs(options);
  options.invisibleTagAttrs =
    options.invisibleTagAttrs || "style='position:absolute;left:-9999px;'";

  let result = "";
  let beginIndex = 0;

  // sort entities by start index
  entities.sort(function (a, b) {
    return a.indices[0] - b.indices[0];
  });

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    result += htmlEscape(text.substring(beginIndex, entity.indices[0]));

    if (entity.url) {
      result += linkToUrl(entity, text, options);
    }
    beginIndex = entity.indices[1];
  }

  result += htmlEscape(text.substring(beginIndex, text.length));

  return result;
}

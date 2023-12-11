// Returns an Indexed Array with URL entities found in text.

import extractUrls from "./extractUrls";

export default function (text, options) {
  const entities = extractUrls(text, options);

  if (entities.length === 0) {
    return [];
  }

  return entities;
}

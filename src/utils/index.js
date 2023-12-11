import extract from "./extract";
import autoLink from "./autoLink";

const defaultOptions = {
  targetBlank: true,
  extractUrlsWithoutProtocol: true,
};

export function link(text, options = defaultOptions) {
  const entities = extract(text, options);
  return autoLink(text, entities, options);
}

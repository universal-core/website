export default function prismIncludeLanguages(PrismObject) {
  // Prism components register on the global Prism; prism-react-renderer keeps its own instance.
  globalThis.Prism = PrismObject;
  require("prismjs/components/prism-lua");
  require("prismjs/components/prism-protobuf");
  require("prismjs/components/prism-markup-templating");
  require("prismjs/components/prism-django");
  delete globalThis.Prism;

  // Forge and quest files are Lua with block keywords around it.
  PrismObject.languages.forge = PrismObject.languages.extend("lua", {
    keyword: /\b(?:quest|forge|environment|state|when|begin|with|and|break|do|else|elseif|end|for|function|goto|if|in|local|not|or|repeat|return|then|until|while)\b/,
  });
  PrismObject.languages.quest = PrismObject.languages.forge;
  PrismObject.languages.jinja = PrismObject.languages.django;
  PrismObject.languages["c++"] = PrismObject.languages.cpp;
  PrismObject.languages.sh = PrismObject.languages.sh || PrismObject.languages.bash;
}

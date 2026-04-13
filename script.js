if (!CSS.highlights) {
  document.querySelector("#sentence").textContent =
    "CSS Custom Highlight API is not supported in this browser.";
} else {
  const node = document.querySelector("#sentence").firstChild;
  const text = node.textContent;

  const words = {
    noun: ["highlight", "API", "ranges", "text", "styles"],
    verb: ["lets", "paint"],
    adjective: ["custom", "precise", "beautiful"],
    special: ["The"]
  };

  const hlMap = {
    noun: new Highlight(),
    verb: new Highlight(),
    adjective: new Highlight(),
    special: new Highlight()
  };

  CSS.highlights.set("hl-noun", hlMap.noun);
  CSS.highlights.set("hl-verb", hlMap.verb);
  CSS.highlights.set("hl-adjective", hlMap.adjective);
  CSS.highlights.set("hl-special", hlMap.special);

  for (const [kind, list] of Object.entries(words)) {
    for (const word of list) {
      let pos = 0;
      while ((pos = text.indexOf(word, pos)) !== -1) {
        const r = new Range();
        r.setStart(node, pos);
        r.setEnd(node, pos + word.length);
        hlMap[kind].add(r);
        pos += word.length;
      }
    }
  }
}

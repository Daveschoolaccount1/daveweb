if (!CSS.highlights) {
  document.body.innerHTML = "Custom Highlight API not supported.";
} else {
  const sentences = document.querySelectorAll(".sentence");

  const words = {
    traits: ["kind", "ambitious", "bright", "reliable", "unique"],
    actions: ["try", "succeed", "improve", "helping"],
    values: ["effort", "honesty", "values"],
    identity: ["I’m", "Dave", "student"]
  };

  const hlMap = {
    traits: new Highlight(),
    actions: new Highlight(),
    values: new Highlight(),
    identity: new Highlight()
  };

  CSS.highlights.set("hl-traits", hlMap.traits);
  CSS.highlights.set("hl-actions", hlMap.actions);
  CSS.highlights.set("hl-values", hlMap.values);
  CSS.highlights.set("hl-identity", hlMap.identity);

  sentences.forEach(sentence => {
    const node = sentence.firstChild;
    const text = node.textContent;

    for (const [kind, list] of Object.entries(words)) {
      for (const word of list) {
        let pos = 0;
        while ((pos = text.indexOf(word)) !== -1) {
          const r = new Range();
          r.setStart(node, pos);
          r.setEnd(node, pos + word.length);
          hlMap[kind].add(r);
          text = text.replace(word, " ".repeat(word.length)); // prevent repeat match
        }
      }
    }
  });
}

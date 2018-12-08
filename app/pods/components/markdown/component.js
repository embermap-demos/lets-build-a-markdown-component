import Component from '@ember/component';
import MarkdownIt from 'markdown-it';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

// Import all of Highlight js
import hljs from 'highlight.js';

// Whitelisting languages
// import hljs from 'highlight.js/lib/highlight';
// import javascript from 'highlight.js/lib/languages/javascript';
// import css from 'highlight.js/lib/languages/css';
// import handlebars from 'highlight.js/lib/languages/handlebars';
// import htmlbars from 'highlight.js/lib/languages/htmlbars';
// import json from 'highlight.js/lib/languages/json';
// import xml from 'highlight.js/lib/languages/xml';
// import diff from 'highlight.js/lib/languages/diff';

const md = new MarkdownIt({
  highlight(code, lang) {
    let highlightedCode;
    if (lang && hljs.getLanguage(lang)) {
      highlightedCode = hljs.highlight(lang, code).value;
    } else {
      highlightedCode = code;
    }

    return `<pre class='mb-3'><code class='rounded p-3 hljs'>${highlightedCode}</code></pre>`;
  }
});

md.renderer.rules.paragraph_open = () => `<p class="mb-3">`;
md.renderer.rules.heading_open = function(tokens) {
  let classes = 'mt-8 mb-3';
  // let token = tokens[i];
  //
  // if (token.tag === 'h1') {
  //   str = `mb-1`;
  // } else {
  //   str = `<${token.tag}>`;
  // }

  return `<h1 class='${classes}'>`;
};

export default Component.extend({

  classNames: 'Markdown',
  source: `Hello, _Markdown_!`,

  html: computed('source', function() {
    return htmlSafe(md.render(this.source));
  })

});

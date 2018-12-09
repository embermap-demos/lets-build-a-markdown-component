import Component from '@ember/component';
import MarkdownIt from 'markdown-it';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

// Set up HighlightJS
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import handlebars from 'highlight.js/lib/languages/handlebars';
import htmlbars from 'highlight.js/lib/languages/htmlbars';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import diff from 'highlight.js/lib/languages/diff';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('handlebars', handlebars);
hljs.registerLanguage('htmlbars', htmlbars);
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('diff', diff);

const md = new MarkdownIt({
  highlight(code, lang) {
    let highlightedCode = code;

    if (hljs.getLanguage(lang)) {
      highlightedCode = hljs.highlight(lang, code).value;
    }

    return `<pre class='hljs'><code>${highlightedCode}</code></pre>`;
  }
});

export default Component.extend({

  classNames: 'Markdown',
  source: 'Hello, *markdown*!',

  html: computed('source', function() {
    return htmlSafe(md.render(this.source));
  })

});

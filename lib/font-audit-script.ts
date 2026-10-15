// Plain JavaScript source for the font audit. The bookmarklet and the demo button both run this string.
// It must stay self-contained: no imports, no TypeScript syntax.
export const FONT_AUDIT_SOURCE = `(function () {
  var OLD = document.getElementById('rc-font-audit');
  if (OLD) { OLD.remove(); return; }

  var groups = {};
  var nodes = document.body.querySelectorAll('*');
  for (var i = 0; i < nodes.length; i++) {
    var el = nodes[i];
    if (/^(SCRIPT|STYLE|NOSCRIPT|SVG|PATH)$/i.test(el.tagName)) continue;
    var hasText = false;
    for (var c = 0; c < el.childNodes.length; c++) {
      var n = el.childNodes[c];
      if (n.nodeType === 3 && n.textContent.trim().length > 0) { hasText = true; break; }
    }
    if (!hasText) continue;
    var cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    var family = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    var size = parseFloat(cs.fontSize);
    var weight = cs.fontWeight;
    var lh = cs.lineHeight === 'normal' ? 'normal' : Math.round(parseFloat(cs.lineHeight) * 100) / 100 + 'px';
    var key = [family, size, weight, lh].join('|');
    if (!groups[key]) groups[key] = { family: family, size: size, weight: weight, lineHeight: lh, count: 0 };
    groups[key].count++;
  }

  var rows = Object.keys(groups).map(function (k) { return groups[k]; });
  rows.sort(function (a, b) { return b.size - a.size || a.family.localeCompare(b.family) || a.weight - b.weight; });
  var total = rows.reduce(function (s, r) { return s + r.count; }, 0);
  var sizes = {};
  rows.forEach(function (r) { sizes[r.size] = true; });

  function toCss() {
    return rows.map(function (r) {
      return '/* ' + r.count + ' elements */\\nfont-family: ' + r.family + '; font-size: ' + r.size + 'px; font-weight: ' + r.weight + '; line-height: ' + r.lineHeight + ';';
    }).join('\\n\\n');
  }

  var box = document.createElement('div');
  box.id = 'rc-font-audit';
  box.style.cssText = 'position:fixed;top:12px;right:12px;z-index:2147483647;width:440px;max-height:80vh;overflow:auto;background:#0b0b0b;color:#eaeaea;font:12px/1.4 ui-monospace,Menlo,monospace;border:1px solid #333;border-radius:8px;box-shadow:0 12px 40px rgba(0,0,0,.5);padding:12px';

  var head = document.createElement('div');
  head.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;gap:8px';
  var title = document.createElement('strong');
  title.textContent = rows.length + ' styles, ' + Object.keys(sizes).length + ' sizes, ' + total + ' text elements';
  head.appendChild(title);

  function button(label, fn) {
    var b = document.createElement('button');
    b.textContent = label;
    b.style.cssText = 'background:#1f1f1f;color:#eaeaea;border:1px solid #444;border-radius:4px;padding:3px 8px;font:inherit;cursor:pointer';
    b.onclick = fn;
    return b;
  }
  var actions = document.createElement('div');
  actions.style.cssText = 'display:flex;gap:6px';
  actions.appendChild(button('Copy CSS', function (e) { navigator.clipboard.writeText(toCss()); e.target.textContent = 'Copied'; }));
  actions.appendChild(button('Copy JSON', function (e) { navigator.clipboard.writeText(JSON.stringify(rows, null, 2)); e.target.textContent = 'Copied'; }));
  actions.appendChild(button('Close', function () { box.remove(); }));
  head.appendChild(actions);
  box.appendChild(head);

  var table = document.createElement('table');
  table.style.cssText = 'width:100%;border-collapse:collapse';
  var hr = document.createElement('tr');
  ['Family', 'Size', 'Weight', 'Line', 'Uses'].forEach(function (h) {
    var th = document.createElement('th');
    th.textContent = h;
    th.style.cssText = 'text-align:left;padding:4px 6px;border-bottom:1px solid #333;color:#9a9a9a;font-weight:600';
    hr.appendChild(th);
  });
  table.appendChild(hr);
  rows.forEach(function (r) {
    var tr = document.createElement('tr');
    [r.family, r.size + 'px', r.weight, r.lineHeight, r.count].forEach(function (v) {
      var td = document.createElement('td');
      td.textContent = v;
      td.style.cssText = 'padding:4px 6px;border-bottom:1px solid #1d1d1d';
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  box.appendChild(table);
  document.body.appendChild(box);
})();`;

export const FONT_AUDIT_BOOKMARKLET = `javascript:${encodeURIComponent(FONT_AUDIT_SOURCE)}`;

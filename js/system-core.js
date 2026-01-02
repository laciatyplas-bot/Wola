(function () {
  'use strict';

  if (window.__BELLA_WORK_FIXED__) return;
  window.__BELLA_WORK_FIXED__ = true;

  function editor() {
    return (
      document.getElementById('editor') ||
      document.getElementById('mainEditor') ||
      document.querySelector('[contenteditable="true"]')
    );
  }

  function bella(action) {
    const ed = editor();
    if (!ed) return;

    const text = ed.innerText.trim();
    if (!text) return;

    let out = text;

    if (action === 'short') {
      out =
        text.split(/\s+/).slice(0, 120).join(' ') +
        '\n\n[BELLA · STRESZCZENIE]';
    }

    if (action === 'expand') {
      out =
        text +
        '\n\n' +
        text +
        '\n\n[BELLA · ROZWINIĘCIE]';
    }

    if (action === 'rewrite') {
      out =
        text
          .split('\n')
          .map(l => l.trim())
          .filter(Boolean)
          .map(l => '— ' + l)
          .join('\n\n') +
        '\n\n[BELLA · PRZEPISANE]';
    }

    ed.innerText = out;
    localStorage.setItem('BELLA_LAST_EDIT', out);
  }

  function injectPanel() {
    if (document.getElementById('bellaWorkPanel')) return;

    const ed = editor();
    if (!ed) return;

    const panel = document.createElement('div');
    panel.id = 'bellaWorkPanel';
    panel.style.cssText = `
      display:flex;
      gap:6px;
      margin:10px 0;
    `;

    [
      { t: 'STREŚĆ', a: 'short' },
      { t: 'ROZWIŃ', a: 'expand' },
      { t: 'PRZEPISZ', a: 'rewrite' }
    ].forEach(b => {
      const btn = document.createElement('button');
      btn.textContent = b.t;
      btn.style.cssText = `
        flex:1;
        padding:10px;
        background:#00ffff;
        color:#000;
        font-weight:700;
      `;
      btn.onclick = () => bella(b.a);
      panel.appendChild(btn);
    });

    ed.parentNode.insertBefore(panel, ed);
  }

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(injectPanel, 300);
    console.log('BELLA WORK FIXED — READY');
  });
})();
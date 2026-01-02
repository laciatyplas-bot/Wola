(function () {
  'use strict';

  if (window.__ETERNIVERSE_WORK__) return;
  window.__ETERNIVERSE_WORK__ = true;

  const STATE = {
    gate: null,
    chapter: null,
    gates: [
      { id: 1, name: 'CIENIA' },
      { id: 2, name: 'GENEZY' },
      { id: 3, name: 'WOLI' },
      { id: 4, name: 'ARCHETYPÓW' },
      { id: 5, name: 'OBFITOŚCI' },
      { id: 6, name: 'CIAŁA' },
      { id: 7, name: 'SPLĄTANIA' },
      { id: 8, name: 'CZASU' },
      { id: 9, name: 'KOLEKTYWU' },
      { id: 10, name: 'INTEGRACJI' }
    ],
    chapters: []
  };

  const $ = id => document.getElementById(id);
  const editor = () =>
    $('editor') ||
    $('mainEditor') ||
    document.querySelector('[contenteditable="true"]');

  const chaptersKey = g => `ETERNIVERSE_CHAPTERS_${g.id}`;

  function loadChapters() {
    if (!STATE.gate) return [];
    const raw = localStorage.getItem(chaptersKey(STATE.gate));
    return raw ? JSON.parse(raw) : [];
  }

  function saveChapters() {
    if (!STATE.gate) return;
    localStorage.setItem(
      chaptersKey(STATE.gate),
      JSON.stringify(STATE.chapters)
    );
  }

  /* =========================
     BELLA — OPERACJE
  ========================= */
  function bella(action) {
    if (!editor()) return;
    const text = editor().innerText.trim();
    if (!text) return;

    let out = text;

    if (action === 'short') {
      out =
        text.split(/\s+/).slice(0, Math.max(80, text.split(/\s+/).length / 3)).join(' ') +
        '\n\n[STRESZCZENIE — BELLA]';
    }

    if (action === 'expand') {
      out =
        text +
        '\n\n' +
        text +
        '\n\n[ROZWINIĘCIE — BELLA]';
    }

    if (action === 'rewrite') {
      out =
        text
          .split('\n')
          .map(l => l.trim())
          .filter(Boolean)
          .map(l => '— ' + l)
          .join('\n\n') +
        '\n\n[PRZEPISANE — BELLA]';
    }

    editor().innerText = out;

    if (STATE.chapter !== null) {
      STATE.chapters[STATE.chapter].content = out;
      saveChapters();
    }
  }

  /* =========================
     UI — PANEL BELLA
  ========================= */
  function injectBellaPanel() {
    if ($('bellaWorkPanel')) return;

    const panel = document.createElement('div');
    panel.id = 'bellaWorkPanel';
    panel.style.cssText = `
      display:flex;
      gap:6px;
      margin:8px 0;
    `;

    const btns = [
      { t: 'STREŚĆ', a: 'short' },
      { t: 'ROZWIŃ', a: 'expand' },
      { t: 'PRZEPISZ', a: 'rewrite' }
    ];

    btns.forEach(b => {
      const x = document.createElement('button');
      x.textContent = b.t;
      x.style.cssText = `
        flex:1;
        background:#00ffff;
        color:#000;
        font-weight:bold;
      `;
      x.onclick = () => bella(b.a);
      panel.appendChild(x);
    });

    editor()?.parentNode?.insertBefore(panel, editor());
  }

  /* =========================
     BRAMY
  ========================= */
  function renderGates() {
    const list = $('gateList');
    if (!list) return;
    list.innerHTML = '';

    STATE.gates.forEach(g => {
      const b = document.createElement('button');
      b.textContent = 'BRAMA ' + g.id + ' — ' + g.name;
      b.onclick = () => {
        STATE.gate = g;
        STATE.chapters = loadChapters();
        injectBellaPanel();
      };
      list.appendChild(b);
    });
  }

  /* =========================
     START
  ========================= */
  document.addEventListener('DOMContentLoaded', () => {
    renderGates();
    injectBellaPanel();
    console.log('BELLA: PRACA NA ROZDZIALE READY');
  });

})();
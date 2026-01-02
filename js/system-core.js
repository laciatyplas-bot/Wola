/* =========================================================
   ETERNIVERSE — ROZDZIAŁY PER BRAMA (AUTOMAT)
   PODMIENIASZ CAŁOŚĆ: js/system-core.js
   NIC INNEGO NIE RUSZASZ
   ========================================================= */

(function () {
  'use strict';

  if (window.__ETERNIVERSE_CHAPTERS__) return;
  window.__ETERNIVERSE_CHAPTERS__ = true;

  /* =========================
     STAN
  ========================= */
  const STATE = {
    gate: null,
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
    chapters: [],
    activeChapter: null
  };

  /* =========================
     HELPERY
  ========================= */
  const $ = id => document.getElementById(id);
  const editor = () =>
    $('editor') ||
    $('mainEditor') ||
    document.querySelector('[contenteditable="true"]');

  const gateKey = (g) => `ETERNIVERSE_GATE_${g.id}`;
  const chaptersKey = (g) => `ETERNIVERSE_CHAPTERS_${g.id}`;

  function saveGateText() {
    if (!STATE.gate || !editor()) return;
    localStorage.setItem(gateKey(STATE.gate), editor().innerText);
  }

  function loadGateText() {
    if (!STATE.gate || !editor()) return;
    editor().innerText = localStorage.getItem(gateKey(STATE.gate)) || '';
  }

  /* =========================
     ROZDZIAŁY — AUTOMAT
  ========================= */
  function splitIntoChapters(text) {
    const parts = text
      .split(/(?=ROZDZIAŁ|Rozdział|CHAPTER|Chapter|KAPITEL|Kapitel)/g)
      .map(t => t.trim())
      .filter(t => t.length > 40);

    if (!parts.length) return [{ title: 'ROZDZIAŁ 1', content: text.trim() }];

    return parts.map((p, i) => ({
      title: `ROZDZIAŁ ${i + 1}`,
      content: p
    }));
  }

  function saveChapters() {
    if (!STATE.gate) return;
    localStorage.setItem(
      chaptersKey(STATE.gate),
      JSON.stringify(STATE.chapters)
    );
  }

  function loadChapters() {
    if (!STATE.gate) return [];
    const raw = localStorage.getItem(chaptersKey(STATE.gate));
    return raw ? JSON.parse(raw) : [];
  }

  /* =========================
     UI — LISTA ROZDZIAŁÓW
  ========================= */
  function ensureChapterPanel() {
    let panel = $('chapterPanel');
    if (panel) return panel;

    panel = document.createElement('div');
    panel.id = 'chapterPanel';
    panel.style.cssText = `
      padding:8px;
      background:#000;
      margin:8px 0;
      border-radius:8px;
    `;

    const btnSplit = document.createElement('button');
    btnSplit.textContent = 'PODZIEL NA ROZDZIAŁY';
    btnSplit.style.cssText = `
      width:100%;
      margin-bottom:6px;
      background:#00ffff;
      color:#000;
      font-weight:bold;
    `;
    btnSplit.onclick = () => {
      const txt = editor()?.innerText || '';
      STATE.chapters = splitIntoChapters(txt);
      saveChapters();
      renderChapterList();
    };

    const list = document.createElement('div');
    list.id = 'chapterList';

    panel.appendChild(btnSplit);
    panel.appendChild(list);

    editor()?.parentNode?.insertBefore(panel, editor());
    return panel;
  }

  function renderChapterList() {
    const list = $('chapterList');
    if (!list) return;
    list.innerHTML = '';

    STATE.chapters.forEach((c, i) => {
      const b = document.createElement('button');
      b.textContent = c.title;
      b.style.cssText = `
        width:100%;
        margin-bottom:4px;
        background:#111;
        color:#00ffff;
      `;
      b.onclick = () => openChapter(i);
      list.appendChild(b);
    });
  }

  function openChapter(i) {
    STATE.activeChapter = i;
    if (!editor()) return;
    editor().innerText = STATE.chapters[i].content;
  }

  function saveActiveChapter() {
    if (STATE.activeChapter === null || !editor()) return;
    STATE.chapters[STATE.activeChapter].content = editor().innerText;
    saveChapters();
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
      b.onclick = () => selectGate(g);
      list.appendChild(b);
    });
  }

  function selectGate(g) {
    STATE.gate = g;
    loadGateText();
    STATE.chapters = loadChapters();
    ensureChapterPanel();
    renderChapterList();
  }

  /* =========================
     AUTO SAVE
  ========================= */
  setInterval(() => {
    saveGateText();
    saveActiveChapter();
  }, 2000);

  /* =========================
     START
  ========================= */
  document.addEventListener('DOMContentLoaded', () => {
    renderGates();
    ensureChapterPanel();
    console.log('ETERNIVERSE: ROZDZIAŁY PER BRAMA READY');
  });

})();
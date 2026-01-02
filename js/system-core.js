/* =========================================================
   ETERNIVERSE SYSTEM CORE — PANCERNY
   TEN PLIK PO PROSTU DZIAŁA
   ========================================================= */

(function () {
  'use strict';

  if (window.ETERNIVERSE_CORE) return;
  window.ETERNIVERSE_CORE = true;

  /* =========================
     STAN GLOBALNY
  ========================= */
  const STATE = {
    activeGate: null,
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
    ]
  };

  /* =========================
     HELPERY
  ========================= */
  function $(id) {
    return document.getElementById(id);
  }

  function save() {
    if (!STATE.activeGate) return;
    const editor = $('editor');
    if (!editor) return;
    localStorage.setItem(
      'ETERNIVERSE_GATE_' + STATE.activeGate.id,
      editor.innerText
    );
  }

  function load() {
    if (!STATE.activeGate) return;
    const editor = $('editor');
    if (!editor) return;
    editor.innerText =
      localStorage.getItem('ETERNIVERSE_GATE_' + STATE.activeGate.id) || '';
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

  function selectGate(gate) {
    STATE.activeGate = gate;
    load();
  }

  /* =========================
     BELLA (OFFLINE)
  ========================= */
  window.BellaGenerate = function (prompt) {
    if (!STATE.activeGate) return 'Wybierz Bramę.';
    return (
      'BRAMA ' +
      STATE.activeGate.id +
      ' — ' +
      STATE.activeGate.name +
      '\n\n' +
      prompt +
      '\n\nNie jesteś myślą. Jesteś polem.'
    );
  };

  /* =========================
     AUTO SAVE
  ========================= */
  setInterval(save, 2000);

  /* =========================
     START
  ========================= */
  document.addEventListener('DOMContentLoaded', () => {
    renderGates();
    console.log('ETERNIVERSE CORE READY');
  });
})();
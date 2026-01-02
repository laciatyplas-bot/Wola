(function () {
  'use strict';

  if (window.__ETERNIVERSE_BOOT__) return;
  window.__ETERNIVERSE_BOOT__ = true;

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
    ]
  };

  function $(id) {
    return document.getElementById(id);
  }

  function editor() {
    return $('editor') || $('mainEditor') || document.querySelector('[contenteditable="true"]');
  }

  function save() {
    if (!STATE.gate || !editor()) return;
    localStorage.setItem(
      'ETERNIVERSE_GATE_' + STATE.gate.id,
      editor().innerText
    );
  }

  function load() {
    if (!STATE.gate || !editor()) return;
    editor().innerText =
      localStorage.getItem('ETERNIVERSE_GATE_' + STATE.gate.id) || '';
  }

  function renderGates() {
    const list = $('gateList');
    if (!list) return;

    list.innerHTML = '';
    STATE.gates.forEach(g => {
      const b = document.createElement('button');
      b.textContent = 'BRAMA ' + g.id + ' — ' + g.name;
      b.onclick = () => {
        STATE.gate = g;
        load();
      };
      list.appendChild(b);
    });
  }

  // BELLA – prosta reakcja (żebyś WIDZIAŁ, że działa)
  window.BellaGenerate = function (text) {
    if (!STATE.gate) return 'Wybierz Bramę.';
    return (
      'BRAMA ' + STATE.gate.id + ' — ' + STATE.gate.name +
      '\n\n' + text +
      '\n\n[ Bella aktywna ]'
    );
  };

  // AUTO SAVE
  setInterval(save, 2000);

  // START
  document.addEventListener('DOMContentLoaded', () => {
    renderGates();
    console.log('ETERNIVERSE BOOTSTRAP READY');
  });

})();
// js/app.js — ETERNIVERSE BOOK MASTER v2.3
// CORE APPLICATION CONTROLLER
// 8 Światów × 10 Bram × Rozdziały
// Master Edition 2026 | Maciej Maciuszek

'use strict';

class EterNiverseApp {
  constructor() {
    this.state = {
      world: 1,
      gate: 1,
      chapter: 1
    };

    this.elements = {};
    this.saveTimer = null;

    this.init();
  }

  /* ===============================
     INICJALIZACJA
  =============================== */
  init() {
    this.cacheDOM();
    this.bindUIEvents();
    this.syncInitialState();
    this.loadContent();

    this.updateTitle();
    this.updateStatus('Splątanie aktywne · Gotowy');

    console.log('🚀 EterNiverseApp v2.3 uruchomiony', this.state);
  }

  /* ===============================
     CACHE DOM
  =============================== */
  cacheDOM() {
    this.elements = {
      editor: document.getElementById('mainEditor'),
      status: document.getElementById('status'),
      bookTitle: document.getElementById('bookTitle'),
      worldBtns: document.querySelectorAll('.world-btn'),
      gateItems: document.querySelectorAll('.world-item'),
      tabBtns: document.querySelectorAll('.tab-btn'),
      aiInput: document.getElementById('aiCommand')
    };
  }

  /* ===============================
     WIĄZANIE ZDARZEŃ
  =============================== */
  bindUIEvents() {
    // Światy
    this.elements.worldBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const world = Number(btn.dataset.world);
        this.setWorld(world);
      });
    });

    // Bramy
    this.elements.gateItems.forEach(item => {
      item.addEventListener('click', () => {
        const gate = Number(item.dataset.brama);
        this.setGate(gate);
      });
    });

    // Tabs
    this.elements.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchTab(btn.dataset.tab);
      });
    });

    // Edytor – autosave
    if (this.elements.editor) {
      this.elements.editor.addEventListener('input', () => this.scheduleSave());
    }

    // AI command
    if (this.elements.aiInput) {
      this.elements.aiInput.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          const command = this.elements.aiInput.value.trim();
          if (command) {
            this.handleAICommand(command);
            this.elements.aiInput.value = '';
          }
        }
      });
    }

    // Globalne hotkeys
    document.addEventListener('keydown', e => this.handleHotkeys(e));
  }

  /* ===============================
     ZMIANA STANU
  =============================== */
  setWorld(world) {
    if (this.state.world === world) return;

    this.state.world = world;
    this.state.gate = 1;
    this.state.chapter = 1;

    this.updateActive('.world-btn', 'data-world', world);
    this.updateActive('.world-item', 'data-brama', 1);

    this.updateTitle();
    this.loadContent();

    this.emit('worldChanged', { world });
  }

  setGate(gate) {
    if (this.state.gate === gate) return;

    this.state.gate = gate;
    this.state.chapter = 1;

    this.updateActive('.world-item', 'data-brama', gate);

    this.updateTitle();
    this.loadContent();

    this.emit('gateChanged', { gate });
  }

  setChapter(chapter) {
    this.state.chapter = chapter;
    this.loadContent();
    this.emit('chapterChanged', { chapter });
  }

  /* ===============================
     AKTUALIZACJA UI
  =============================== */
  updateActive(selector, attr, value) {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.toggle('active', Number(el.dataset[attr.replace('data-', '')]) === value);
    });
  }

  switchTab(tabId) {
    this.elements.tabBtns.forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    const btn = document.querySelector(`[data-tab="${tabId}"]`);
    const tab = document.getElementById(`${tabId}Tab`);

    if (btn) btn.classList.add('active');
    if (tab) tab.classList.add('active');
  }

  updateTitle() {
    if (!this.elements.bookTitle) return;

    const worldName = window.eterData?.worldPresets[this.state.world]?.name || `Świat ${this.state.world}`;
    const gateName = window.eterData?.gateTemplates[this.state.gate - 1]?.name || `Brama ${this.state.gate}`;

    this.elements.bookTitle.textContent = `${worldName} · ${gateName}`;
  }

  updateStatus(msg) {
    if (this.elements.status) {
      this.elements.status.textContent = msg;
    }
  }

  /* ===============================
     ZAPIS / ODCZYT TREŚCI
  =============================== */
  storageKey() {
    return window.eterDataAPI?.contentKey(this.state.world, this.state.gate, this.state.chapter) || 
           `eter_w\( {this.state.world}_g \){this.state.gate}_ch${this.state.chapter}`;
  }

  loadContent() {
    if (!this.elements.editor) return;

    const key = this.storageKey();
    const saved = localStorage.getItem(key);

    if (saved) {
      this.elements.editor.innerHTML = saved.replace(/\n/g, '<br>');
    } else {
      const defaultContent = window.eterData?.getDefaultContent(this.state.world, this.state.gate) || '';
      this.elements.editor.innerHTML = defaultContent.replace(/\n/g, '<br>');
    }
  }

  saveContent() {
    if (!this.elements.editor) return;

    const key = this.storageKey();
    const content = this.elements.editor.innerHTML.replace(/<br>/g, '\n').replace(/<div>/g, '\n').replace(/<\/div>/g, '');

    localStorage.setItem(key, content);

    this.updateStatus(`Zapisano ${new Date().toLocaleTimeString()}`);
    this.emit('contentSaved', { key, content });
  }

  scheduleSave() {
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => this.saveContent(), 800);
    this.updateStatus('Zapisywanie...');
  }

  /* ===============================
     AI COMMAND
  =============================== */
  handleAICommand(command) {
    const output = document.getElementById('aiOutput');
    if (output) {
      output.innerHTML += `<p><strong>> ${command}</strong></p>`;
      output.innerHTML += `<p>AI przetwarza żądanie... (integracja w budowie)</p>`;
      output.scrollTop = output.scrollHeight;
    }
  }

  /* ===============================
     HOTKEYS
  =============================== */
  handleHotkeys(e) {
    if (!e.ctrlKey && !e.metaKey) return;

    switch (e.key.toLowerCase()) {
      case 's':
        e.preventDefault();
        this.saveContent();
        break;
      case '1':
        e.preventDefault();
        this.switchTab('book');
        break;
      case '2':
        e.preventDefault();
        this.switchTab('cover');
        break;
      case '3':
        e.preventDefault();
        this.switchTab('audio');
        break;
      case '4':
        e.preventDefault();
        this.switchTab('bella');
        break;
    }
  }

  /* ===============================
     EVENT EMITTER
  =============================== */
  emit(name, detail = {}) {
    document.dispatchEvent(new CustomEvent(name, { detail }));
  }

  /* ===============================
     INICJALNA SYNCHRONIZACJA
  =============================== */
  syncInitialState() {
    this.updateActive('.world-btn', 'data-world', this.state.world);
    this.updateActive('.world-item', 'data-brama', this.state.gate);
  }
}

/* ===============================
   BOOTSTRAP
=============================== */
document.addEventListener('DOMContentLoaded', () => {
  // Czekamy na EterData
  if (window.eterData) {
    window.eterApp = new EterNiverseApp();
  } else {
    document.addEventListener('datastore:ready', () => {
      window.eterApp = new EterNiverseApp();
    });
  }
});
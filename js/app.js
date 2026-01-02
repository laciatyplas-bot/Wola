// js/app.js — ETERNIVERSE BOOK MASTER v3.0
// Centralny silnik aplikacji (STATE + EVENTS + AUTOSAVE)
// Master Edition 2026 | Maciej Maciuszek

'use strict';

class EterApp {
  constructor() {
    this.state = {
      world: 1,
      gate: 1,
      chapter: 1,
      tab: 'book'
    };

    this.STORAGE_STATE_KEY = 'eter-app-state';
    this.AUTOSAVE_DELAY = 1200;
    this.saveTimer = null;

    this.restoreState();
    this.bindUI();
    this.bindGlobalEvents();
    this.initEditor();
    this.emitAll();

    console.log('🚀 EterApp v3.0 READY', this.state);
  }

  /* ===============================
     🔄 STATE
  =============================== */
  restoreState() {
    const raw = localStorage.getItem(this.STORAGE_STATE_KEY);
    if (!raw) return;

    try {
      const saved = JSON.parse(raw);
      this.state = { ...this.state, ...saved };
    } catch (_) {}
  }

  persistState() {
    localStorage.setItem(this.STORAGE_STATE_KEY, JSON.stringify(this.state));
  }

  setState(patch) {
    this.state = { ...this.state, ...patch };
    this.persistState();
  }

  /* ===============================
     🔗 UI BINDINGS
  =============================== */
  bindUI() {
    // 🌍 Światy
    document.querySelectorAll('.world-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const world = Number(btn.dataset.world) || 1;
        this.setWorld(world);
      });
    });

    // 🚪 Bramy (delegacja)
    document.addEventListener('click', e => {
      const gateEl = e.target.closest('[data-brama]');
      if (!gateEl) return;
      const gate = Number(gateEl.dataset.brama);
      this.setGate(gate);
    });

    // 📑 Rozdziały
    document.addEventListener('click', e => {
      const chEl = e.target.closest('[data-chapter]');
      if (!chEl) return;
      const chapter = Number(chEl.dataset.chapter);
      this.setChapter(chapter);
    });

    // 📂 Taby
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setTab(btn.dataset.tab);
      });
    });

    // ➕ Nowy rozdział
    const addChapterBtn = document.getElementById('addChapterBtn');
    if (addChapterBtn) {
      addChapterBtn.addEventListener('click', () => this.addChapter());
    }
  }

  /* ===============================
     ⌨️ EDYTOR
  =============================== */
  initEditor() {
    this.editor = document.getElementById('mainEditor');
    if (!this.editor) return;

    this.loadEditorContent();

    this.editor.addEventListener('input', () => {
      clearTimeout(this.saveTimer);
      this.saveTimer = setTimeout(() => this.saveEditorContent(), this.AUTOSAVE_DELAY);
    });
  }

  loadEditorContent() {
    if (!this.editor || !window.eterDataAPI) return;

    const key = window.eterDataAPI.contentKey(
      this.state.world,
      this.state.gate,
      this.state.chapter
    );

    const content = localStorage.getItem(key) || '';
    this.editor.innerText = content;
  }

  saveEditorContent() {
    if (!this.editor || !window.eterDataAPI) return;

    const key = window.eterDataAPI.contentKey(
      this.state.world,
      this.state.gate,
      this.state.chapter
    );

    localStorage.setItem(key, this.editor.innerText);

    document.dispatchEvent(new CustomEvent('contentSaved'));
    this.toast('Zapisano');
  }

  addChapter() {
    let ch = 1;
    let key;

    do {
      ch++;
      key = window.eterDataAPI.contentKey(this.state.world, this.state.gate, ch);
    } while (localStorage.getItem(key));

    localStorage.setItem(key, '');
    this.setChapter(ch);
    this.toast(`Dodano rozdział ${ch}`);
  }

  /* ===============================
     🌍 ZMIANY STANU
  =============================== */
  setWorld(world) {
    this.setState({ world, gate: 1, chapter: 1 });
    this.updateWorldButtons();
    this.loadEditorContent();
    this.emit('worldChanged', { world });
  }

  setGate(gate) {
    this.setState({ gate, chapter: 1 });
    this.loadEditorContent();
    this.emit('gateChanged', { gate });
  }

  setChapter(chapter) {
    this.setState({ chapter });
    this.loadEditorContent();
    this.emit('chapterChanged', { chapter });
  }

  setTab(tab) {
    this.setState({ tab });
    this.updateTabs();
  }

  /* ===============================
     🔔 EVENTS
  =============================== */
  emit(name, detail = {}) {
    document.dispatchEvent(new CustomEvent(name, { detail }));
  }

  emitAll() {
    this.emit('worldChanged', { world: this.state.world });
    this.emit('gateChanged', { gate: this.state.gate });
    this.emit('chapterChanged', { chapter: this.state.chapter });
  }

  bindGlobalEvents() {
    // CTRL + S
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.saveEditorContent();
      }
    });
  }

  /* ===============================
     🧭 UI HELPERS
  =============================== */
  updateWorldButtons() {
    document.querySelectorAll('.world-btn').forEach(b =>
      b.classList.toggle('active', Number(b.dataset.world) === this.state.world)
    );
  }

  updateTabs() {
    document.querySelectorAll('.tab-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.tab === this.state.tab)
    );
    document.querySelectorAll('.tab-content').forEach(c =>
      c.classList.toggle('active', c.id === `${this.state.tab}Tab`)
    );
  }

  toast(text) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  }
}

/* ===============================
   🚀 START
=============================== */
document.addEventListener('DOMContentLoaded', () => {
  window.eterApp = new EterApp();
});
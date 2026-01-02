// ========================================
// ETERNIVERSE BOOK MASTER v2.2 — APP CORE
// AI-READY • BELLA-INTEGRATED • STABLE
// 8 Światów × 10 Bram
// ========================================

'use strict';

class EterNiverse {
  constructor() {
    this.currentWorld = 1;
    this.currentBrama = 1;
    this.currentChapter = 1;

    this.STORAGE_KEY = 'ETERNIVERSE_BOOK_DATA_V2';
    this.data = this.loadData();

    this.saveTimeout = null;

    this.init();
  }

  // ===============================
  // INIT
  // ===============================
  init() {
    this.bindUI();
    this.updateUI();
    this.loadEditor();
    this.emitWorldContext();

    console.log('🚀 ETERNIVERSE APP v2.2 READY');
  }

  // ===============================
  // UI BINDINGS
  // ===============================
  bindUI() {
    // ŚWIATY
    document.querySelectorAll('.world-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchWorld(Number(btn.dataset.world));
      });
    });

    // BRAMY
    document.querySelectorAll('.world-item').forEach(item => {
      item.addEventListener('click', () => {
        this.switchBrama(Number(item.dataset.brama));
      });
    });

    // TABS
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
    });

    // EDITOR
    const editor = document.getElementById('mainEditor');
    if (editor) {
      editor.addEventListener('input', () => this.debounceSave());
    }

    // AI → SAVE
    document.addEventListener('editorContentChanged', () => {
      this.saveNow();
      document.dispatchEvent(new Event('statsUpdated'));
      console.log('🤖 AI → zapis wykonany');
    });

    // HOTKEYS
    document.addEventListener('keydown', e => this.handleHotkeys(e));
  }

  // ===============================
  // WORLD / GATE
  // ===============================
  switchWorld(id) {
    this.currentWorld = id;
    this.currentBrama = 1;
    this.currentChapter = 1;

    document.querySelectorAll('.world-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-world="${id}"]`)?.classList.add('active');

    this.updateUI();
    this.loadEditor();
    this.emitWorldContext();

    document.dispatchEvent(new Event('worldChanged'));
  }

  switchBrama(id) {
    this.currentBrama = id;
    this.currentChapter = 1;

    document.querySelectorAll('.world-item').forEach(i => i.classList.remove('active'));
    document.querySelector(`[data-brama="${id}"]`)?.classList.add('active');

    this.updateUI();
    this.loadEditor();
    this.emitWorldContext();

    document.dispatchEvent(new Event('bramaChanged'));
  }

  // ===============================
  // TAB SYSTEM
  // ===============================
  switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
    document.getElementById(`${tab}Tab`)?.classList.add('active');
  }

  // ===============================
  // DATA
  // ===============================
  loadData() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw) return JSON.parse(raw);

    const data = {};
    for (let w = 1; w <= 8; w++) {
      data[w] = {};
      for (let g = 1; g <= 10; g++) {
        data[w][g] = {
          chapters: {
            1: { title: 'Rozdział 1', content: '' }
          }
        };
      }
    }
    return data;
  }

  persist() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
  }

  loadEditor() {
    const editor = document.getElementById('mainEditor');
    if (!editor) return;

    const node =
      this.data[this.currentWorld]?.[this.currentBrama]?.chapters[this.currentChapter];

    editor.innerText = node?.content || '';
  }

  saveNow() {
    const editor = document.getElementById('mainEditor');
    if (!editor) return;

    const text = editor.innerText;

    const world = this.currentWorld;
    const gate = this.currentBrama;
    const ch = this.currentChapter;

    if (!this.data[world][gate].chapters[ch]) {
      this.data[world][gate].chapters[ch] = {
        title: `Rozdział ${ch}`,
        content: ''
      };
    }

    this.data[world][gate].chapters[ch].content = text;
    this.persist();

    const status = document.getElementById('status');
    if (status) status.textContent = `Zapisano ${new Date().toLocaleTimeString()}`;
  }

  debounceSave() {
    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => this.saveNow(), 1200);
  }

  // ===============================
  // UI UPDATE
  // ===============================
  updateUI() {
    const title = document.getElementById('bookTitle');
    const cw = document.getElementById('currentWorld');
    const cb = document.getElementById('currentBrama');

    if (title)
      title.textContent = `Świat ${this.currentWorld} | Brama ${this.currentBrama}`;
    if (cw) cw.textContent = this.currentWorld;
    if (cb) cb.textContent = this.currentBrama;
  }

  // ===============================
  // AI CONTEXT
  // ===============================
  emitWorldContext() {
    if (!window.eterDataAPI) return;

    const world = window.eterDataAPI.getWorld(this.currentWorld);
    const gate = window.eterDataAPI.getGate(this.currentBrama);

    document.dispatchEvent(
      new CustomEvent('worldSelected', {
        detail: {
          world: {
            id: this.currentWorld,
            name: world.name,
            description: world.starter,
            gate: gate.name
          }
        }
      })
    );
  }

  // ===============================
  // HOTKEYS
  // ===============================
  handleHotkeys(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      this.saveNow();
      console.log('💾 Zapis ręczny');
    }
  }
}

// ===============================
// START
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  window.eterNiverse = new EterNiverse();
});
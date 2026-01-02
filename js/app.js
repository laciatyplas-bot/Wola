// ========================================
// ETERNIVERSE BOOK MASTER v4.0 — APP CORE
// Silnik świata, bram, rozdziałów, AI, uploadów
// Architekt: Maciej Maciuszek | 2026
// ========================================

'use strict';

class EterniverseApp {
  constructor() {
    // ====== STAN ======
    this.worlds = {
      1: { id: 1, key: 'core', name: 'Rdzeń' },
      2: { id: 2, key: 'polaris', name: 'Polaris' }
    };

    this.currentWorld = 1;
    this.currentGate = 1;
    this.currentChapter = 1;

    this.STORAGE_KEY = 'ETERNIVERSE_BOOK_MASTER_V4';

    this.data = this.loadData();

    this.editor = document.getElementById('mainEditor');
    this.preview = document.getElementById('bookPreview');
    this.status = document.getElementById('status');

    this.init();
  }

  // ========================================
  // INIT
  // ========================================
  init() {
    this.bindTabs();
    this.bindWorlds();
    this.renderGates();
    this.bindGates();
    this.bindChapters();
    this.bindEditor();
    this.bindUploads();
    this.bindExport();
    this.loadContent();
    this.startAutosave();

    console.log('🚀 ETERNIVERSE APP v4.0 READY');
  }

  // ========================================
  // WORLD
  // ========================================
  bindWorlds() {
    document.querySelectorAll('.world-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.world;
        const world = Object.values(this.worlds).find(w => w.key === key);
        if (!world) return;

        this.currentWorld = world.id;
        this.currentGate = 1;
        this.currentChapter = 1;

        document.querySelectorAll('.world-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.renderGates();
        this.bindGates();
        this.loadContent();
        this.updateTitle();

        document.dispatchEvent(new CustomEvent('worldSelected', { detail: world }));
      });
    });
  }

  // ========================================
  // GATES
  // ========================================
  renderGates() {
    const gateList = document.getElementById('gateList');
    gateList.innerHTML = '';

    for (let i = 1; i <= 10; i++) {
      const div = document.createElement('div');
      div.className = 'world-item' + (i === this.currentGate ? ' active' : '');
      div.dataset.brama = i;
      div.textContent = `Brama ${i}`;
      gateList.appendChild(div);
    }
  }

  bindGates() {
    document.querySelectorAll('.world-item').forEach(item => {
      item.addEventListener('click', () => {
        this.currentGate = Number(item.dataset.brama);
        this.currentChapter = 1;

        document.querySelectorAll('.world-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        this.renderChapters();
        this.loadContent();
        this.updateTitle();

        document.dispatchEvent(new CustomEvent('bramaChanged', {
          detail: { world: this.currentWorld, gate: this.currentGate }
        }));
      });
    });
  }

  // ========================================
  // CHAPTERS
  // ========================================
  bindChapters() {
    const addBtn = document.getElementById('addChapterBtn');
    if (addBtn) {
      addBtn.addEventListener('click', () => this.addChapter());
    }
    this.renderChapters();
  }

  renderChapters() {
    const list = document.getElementById('chaptersList');
    list.innerHTML = '';

    const chapters = this.getGateData().chapters;

    Object.keys(chapters).forEach(id => {
      const div = document.createElement('div');
      div.className = 'chapter-item' + (Number(id) === this.currentChapter ? ' active' : '');
      div.textContent = chapters[id].title;
      div.dataset.chapter = id;

      div.addEventListener('click', () => {
        this.currentChapter = Number(id);
        this.loadContent();
        this.renderChapters();
      });

      list.appendChild(div);
    });
  }

  addChapter() {
    const gate = this.getGateData();
    const id = Object.keys(gate.chapters).length + 1;

    gate.chapters[id] = {
      title: `Rozdział ${id}`,
      content: ''
    };

    this.currentChapter = id;
    this.saveData();
    this.renderChapters();
    this.loadContent();
  }

  // ========================================
  // EDITOR
  // ========================================
  bindEditor() {
    if (!this.editor) return;
    this.editor.addEventListener('input', () => {
      this.updatePreview();
    });
  }

  loadContent() {
    const ch = this.getChapterData();
    if (this.editor) this.editor.innerText = ch.content || '';
    this.updatePreview();
  }

  updatePreview() {
    if (this.preview && this.editor) {
      this.preview.innerText = this.editor.innerText;
    }
  }

  // ========================================
  // UPLOADS
  // ========================================
  bindUploads() {
    const coverInput = document.getElementById('coverUpload');
    const coverPreview = document.getElementById('coverPreview');
    const coverInfo = document.getElementById('coverInfo');

    if (coverInput) {
      coverInput.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        coverPreview.src = url;
        coverPreview.style.display = 'block';
        coverInfo.textContent = `Załadowano: ${file.name}`;

        this.data.covers = this.data.covers || {};
        this.data.covers[this.currentWorld] = file.name;
        this.saveData();
      });
    }

    const audioInput = document.getElementById('audioUpload');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioInfo = document.getElementById('audioInfo');

    if (audioInput) {
      audioInput.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        audioPlayer.src = url;
        audioInfo.textContent = `MP3: ${file.name}`;

        this.data.audio = this.data.audio || {};
        this.data.audio[this.currentWorld] = file.name;
        this.saveData();
      });
    }
  }

  // ========================================
  // EXPORT (HOOKI)
  // ========================================
  bindExport() {
    const pdf = document.getElementById('exportPDF');
    const docx = document.getElementById('exportDOCX');
    const epub = document.getElementById('exportEPUB');

    if (pdf) pdf.onclick = () => alert('PDF — podpiąć generator');
    if (docx) docx.onclick = () => alert('DOCX — podpiąć generator');
    if (epub) epub.onclick = () => alert('EPUB — podpiąć generator');
  }

  // ========================================
  // TABS
  // ========================================
  bindTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(btn.dataset.tab + 'Tab').classList.add('active');
      });
    });
  }

  // ========================================
  // AUTOSAVE
  // ========================================
  startAutosave() {
    setInterval(() => {
      this.saveEditorContent();
      if (this.status) {
        this.status.textContent = 'Zapisano ' + new Date().toLocaleTimeString();
      }
    }, 2500);
  }

  saveEditorContent() {
    const ch = this.getChapterData();
    if (this.editor) ch.content = this.editor.innerText;
    this.saveData();
  }

  // ========================================
  // DATA
  // ========================================
  loadData() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw) return JSON.parse(raw);

    const data = {};
    Object.values(this.worlds).forEach(w => {
      data[w.id] = {};
      for (let g = 1; g <= 10; g++) {
        data[w.id][g] = {
          chapters: {
            1: { title: 'Rozdział 1', content: '' }
          }
        };
      }
    });
    return data;
  }

  saveData() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
  }

  getGateData() {
    return this.data[this.currentWorld][this.currentGate];
  }

  getChapterData() {
    return this.getGateData().chapters[this.currentChapter];
  }

  updateTitle() {
    const title = document.getElementById('bookTitle');
    if (title) {
      title.textContent = `Świat ${this.currentWorld} · Brama ${this.currentGate}`;
    }
  }
}

// ========================================
// START
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  window.ETERNIVERSE_APP = new EterniverseApp();
});
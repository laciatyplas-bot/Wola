// app.js — ETERNIVERSE BOOK MASTER v2.1 — KWANTOWE PIÓRO (STABLE)
// Architektura 8 Światów × 10 Bram
// 2026 | Maciej Maciuszek

class EterNiverse {
  constructor() {
    this.currentWorld = 1;
    this.currentBrama = 1;
    this.currentChapter = 1;

    this.STORAGE_KEY = 'ETERNIVERSE_BOOK_DATA';
    this.data = this.loadData();

    this.saveTimeout = null;
    this.init();
  }

  // 🌌 INIT
  init() {
    this.bindEvents();
    this.updateUI();
    this.loadCurrentContent();
    this.startAutoSave();
    console.log('🚀 ETERNIVERSE BOOK MASTER v2.1 uruchomiony');
  }

  // 🔗 EVENTS
  bindEvents() {
    document.querySelectorAll('.world-btn').forEach(btn => {
      btn.addEventListener('click', () => this.switchWorld(btn.dataset.world));
    });

    document.querySelectorAll('.world-item').forEach(item => {
      item.addEventListener('click', () => this.switchBrama(item.dataset.brama));
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
    });

    const chaptersList = document.getElementById('chaptersList');
    if (chaptersList) {
      chaptersList.addEventListener('click', e => {
        if (e.target.classList.contains('chapter-item')) {
          this.switchChapter(e.target);
        }
      });
    }

    const editor = document.getElementById('mainEditor');
    if (editor) {
      editor.addEventListener('input', () => this.debounceSave());
    }

    const aiInput = document.getElementById('aiCommand');
    if (aiInput) {
      aiInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.executeAI();
        }
      });
    }

    document.addEventListener('keydown', e => this.handleHotkeys(e));

    this.initCoverControls();
    this.initAudioControls();
  }

  // 🌍 WORLD
  switchWorld(id) {
    this.currentWorld = Number(id);
    document.querySelectorAll('.world-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-world="${id}"]`)?.classList.add('active');
    this.currentChapter = 1;
    this.updateUI();
    this.loadCurrentContent();
    this.notify(`Świat ${id} aktywny`, 'world');
  }

  // 🚪 BRAMA
  switchBrama(id) {
    this.currentBrama = Number(id);
    document.querySelectorAll('.world-item').forEach(i => i.classList.remove('active'));
    document.querySelector(`[data-brama="${id}"]`)?.classList.add('active');
    this.currentChapter = 1;
    this.updateUI();
    this.loadCurrentContent();
    this.notify(`Brama ${id} otwarta`, 'gate');
  }

  // 📑 TAB
  switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));

    document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');
    document.getElementById(`${tabId}Tab`)?.classList.add('active');
  }

  // 📖 CHAPTER
  switchChapter(el) {
    document.querySelectorAll('.chapter-item').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    this.currentChapter = [...el.parentNode.children].indexOf(el) + 1;
    this.loadCurrentContent();
    this.notify(el.textContent, 'chapter');
  }

  // ✨ UI
  updateUI() {
    const cw = document.getElementById('currentWorld');
    const cb = document.getElementById('currentBrama');
    const title = document.getElementById('bookTitle');
    const audio = document.getElementById('audioTitle');

    if (cw) cw.textContent = this.currentWorld;
    if (cb) cb.textContent = this.currentBrama;
    if (title) title.textContent = `Świat ${this.currentWorld} | Brama ${this.currentBrama}`;
    if (audio) audio.textContent = `Rozdział ${this.currentChapter} – Świat ${this.currentWorld}`;
  }

  // 💾 DATA
  loadData() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw) return JSON.parse(raw);

    const data = {};
    for (let w = 1; w <= 8; w++) {
      data[w] = {};
      for (let b = 1; b <= 10; b++) {
        data[w][b] = {
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

  loadCurrentContent() {
    const editor = document.getElementById('mainEditor');
    if (!editor) return;

    const node = this.data[this.currentWorld][this.currentBrama].chapters[this.currentChapter];
    editor.innerText = node?.content || '';
  }

  saveData() {
    const editor = document.getElementById('mainEditor');
    if (!editor) return;

    const text = editor.innerText;
    const world = this.currentWorld;
    const brama = this.currentBrama;
    const ch = this.currentChapter;

    if (!this.data[world][brama].chapters[ch]) {
      this.data[world][brama].chapters[ch] = { title: `Rozdział ${ch}`, content: '' };
    }

    this.data[world][brama].chapters[ch].content = text;
    this.persist();
  }

  startAutoSave() {}

  debounceSave() {
    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      this.saveData();
      const status = document.getElementById('status');
      if (status) status.textContent = `Zapisano ${new Date().toLocaleTimeString()}`;
    }, 1200);
  }

  // 🤖 AI
  executeAI() {
    const input = document.getElementById('aiCommand');
    const output = document.getElementById('aiOutput');
    if (!input || !output) return;

    const cmd = input.value.trim().toLowerCase();
    if (!cmd) return;

    let res = 'Nieznana komenda';

    if (cmd.includes('add chapter')) {
      this.addChapter();
      res = 'Dodano nowy rozdział';
    } else if (cmd.includes('generate plot')) {
      this.generatePlot();
      res = 'Wygenerowano fabułę';
    } else if (cmd.includes('tts')) {
      this.generateTTS();
      res = 'TTS uruchomiony';
    }

    output.innerHTML += `<div>[AI] ${res}</div>`;
    output.scrollTop = output.scrollHeight;
    input.value = '';
  }

  addChapter() {
    const list = document.getElementById('chaptersList');
    if (!list) return;

    const id = Object.keys(this.data[this.currentWorld][this.currentBrama].chapters).length + 1;
    this.data[this.currentWorld][this.currentBrama].chapters[id] = {
      title: `Rozdział ${id}`,
      content: ''
    };
    this.persist();

    const el = document.createElement('div');
    el.className = 'chapter-item';
    el.textContent = `Rozdział ${id}`;
    list.appendChild(el);
  }

  generatePlot() {
    const editor = document.getElementById('mainEditor');
    editor.innerText += `\n\n[AI]\nW Bramie ${this.currentBrama} świat zaczyna pękać...\n`;
  }

  generateTTS() {
    const editor = document.getElementById('mainEditor');
    const utter = new SpeechSynthesisUtterance(editor.innerText.slice(0, 300));
    utter.lang = 'pl-PL';
    speechSynthesis.speak(utter);
  }

  // 🎧 AUDIO
  initAudioControls() {
    // bezpiecznie puste – nie wywala
  }

  // 🖼️ COVER
  initCoverControls() {
    const canvas = document.querySelector('.cover-canvas');
    if (!canvas) return;

    let rot = 0, drag = false;
    canvas.addEventListener('mousedown', () => drag = true);
    document.addEventListener('mouseup', () => drag = false);
    document.addEventListener('mousemove', e => {
      if (drag) {
        rot += e.movementX * 0.4;
        canvas.style.transform = `rotateY(${rot}deg)`;
      }
    });
  }

  // ⌨️ HOTKEYS
  handleHotkeys(e) {
    if (!e.ctrlKey && !e.metaKey) return;
    if (e.key === 's') {
      e.preventDefault();
      this.saveData();
      this.notify('Zapis ręczny', 'save');
    }
  }

  // 🔔 TOAST
  notify(msg) {
    const t = document.createElement('div');
    t.className = 'toast show';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }
}

// 🚀 START
document.addEventListener('DOMContentLoaded', () => {
  window.eterNiverse = new EterNiverse();
});
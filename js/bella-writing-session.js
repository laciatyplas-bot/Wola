// session.js — zarządzanie stanem pisania ETERNIVERSE
// Kompatybilne z Bella Pro, zapisuje sesje, bramy, rozdziały

class EterSession {
  constructor() {
    this.storageKey = 'eterniverse_bella';
    this.init();
  }

  init() {
    this.state = this.load() || {
      chapter: 1,
      gate: 'inter',
      scene: 'enter',
      blocksUsed: [],
      timestamp: Date.now(),
      autosaves: []
    };
    this.syncUI();
    this.autoSaveInterval = setInterval(() => this.autoSave(), 30000); // 30s
  }

  load() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey));
    } catch {
      return null;
    }
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
  }

  autoSave() {
    const bookContent = document.getElementById('book')?.value || '';
    this.state.autosaves.unshift({
      content: bookContent,
      gate: this.state.gate,
      scene: this.state.scene,
      time: new Date().toLocaleString('pl-PL')
    });
    this.state.autosaves = this.state.autosaves.slice(0, 5); // max 5
    this.save();
  }

  updateFromUI() {
    const book = document.getElementById('book');
    const gateSelect = document.getElementById('gate');
    const sceneSelect = document.getElementById('scene');

    if (book) this.state.currentContent = book.value;
    if (gateSelect) this.state.gate = gateSelect.value;
    if (sceneSelect) this.state.scene = sceneSelect.value;

    this.save();
  }

  syncUI() {
    const book = document.getElementById('book');
    const gateSelect = document.getElementById('gate');
    const sceneSelect = document.getElementById('scene');

    if (book && this.state.currentContent) {
      book.value = this.state.currentContent;
    }
    if (gateSelect) {
      gateSelect.value = this.state.gate;
    }
    if (sceneSelect) {
      sceneSelect.value = this.state.scene;
    }
  }

  newChapter(chapterNum) {
    this.state.chapter = chapterNum;
    this.state.currentContent = `ROZDZIAŁ ${chapterNum}

Początek jeszcze nie wiedział, że jest początkiem.`;
    this.syncUI();
    this.save();
  }

  trackBlock(gate, scene, blockIndex) {
    this.state.blocksUsed.push({
      gate, scene, blockIndex,
      usedAt: Date.now()
    });
    this.state.blocksUsed = this.state.blocksUsed.slice(-20); // ostatnie 20
    this.save();
  }

  loadAutosave(index = 0) {
    if (this.state.autosaves[index]) {
      document.getElementById('book').value = this.state.autosaves[index].content;
      this.state.gate = this.state.autosaves[index].gate;
      this.state.scene = this.state.autosaves[index].scene;
      this.syncUI();
      this.save();
    }
  }

  clearSession() {
    localStorage.removeItem(this.storageKey);
    location.reload();
  }

  exportSession() {
    const dataStr = JSON.stringify(this.state, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `eterniverse_session_${new Date().toISOString().slice(0,10)}.json`;
    link.click();
  }

  stats() {
    return {
      totalBlocks: this.state.blocksUsed.length,
      sessions: this.state.autosaves.length,
      lastSave: new Date(this.state.timestamp).toLocaleString('pl-PL'),
      chapter: this.state.chapter
    };
  }
}

// Inicjalizacja globalna
const session = new EterSession();

// Rozszerzenie funkcji expandScene o session tracking
const originalExpandScene = window.expandScene;
window.expandScene = function() {
  session.updateFromUI();
  
  const g = document.getElementById('gate').value;
  const s = document.getElementById('scene').value;
  const blocks = EXPAND[g][s];
  const blockIndex = Math.floor(Math.random() * blocks.length);
  
  session.trackBlock(g, s, blockIndex);
  
  originalExpandScene();
  
  session.updateFromUI();
  session.autoSave();
};

// API dla przycisków UI (możesz dodać do HTML)
window.EterAPI = {
  newChapter: (num) => session.newChapter(num),
  loadAutosave: (index) => session.loadAutosave(index),
  clear: () => session.clearSession(),
  export: () => session.exportSession(),
  stats: () => session.stats()
};